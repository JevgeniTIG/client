import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../services/notification.service';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/Post';
import {categoriesList} from '../../models/categories';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  public postEditForm: FormGroup;
  postId: number;
  posts: Post[];
  post: Post;
  selection: number;

  categories = categoriesList.categories;

  constructor(private dialogRef: MatDialogRef<EditPostComponent>,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data,
              private postService: PostService) {
  }

  ngOnInit(): void {
    this.postEditForm = this.createPostForm();
  }

  createPostForm(): FormGroup {
    return this.formBuilder.group({
      title: [
        this.data.post.title,
        Validators.compose([Validators.required])
      ],
      caption: [
        this.data.post.caption,
        Validators.compose([Validators.required])
      ],
      location: [
        this.data.post.location,
        Validators.compose([Validators.required])
      ],
      category: [
        this.data.post.category,
        Validators.compose([Validators.required])
      ],
      price: [
        this.data.post.price,
        Validators.compose([Validators.required, Validators.pattern('^[1-9]([0-9]{1,4}$)')])
      ],
    });
  }

  submit(): void {
    this.postService.updatePost(this.updatePost().id, this.updatePost())
      .subscribe(() => {
        this.notificationService.showSnackBar('Post updated successfully');
        this.dialogRef.close();
      });
  }

  private updatePost(): Post {

    this.data.post.title = this.postEditForm.value.title;
    this.data.post.caption = this.postEditForm.value.caption;
    this.data.post.location = this.postEditForm.value.location;
    this.data.post.category = this.postEditForm.value.category;
    this.data.post.price = this.postEditForm.value.price;

    if (this.selection === 1) {
      this.data.post.status = 'ON SALE';
    }
    if (this.selection === 2) {
      this.data.post.status = 'SOLD OUT';
    }
    return this.data.post;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
