import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../models/Post';
import {PostService} from '../../services/post.service';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';
import {ImageUploadService} from '../../services/image-upload.service';
import {categoriesList} from '../../models/categories';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  postForm: FormGroup;
  selectedFile: File;

  selectedFiles: File[];

  message = '';
  urls = [];

  isPostCreated = false;
  createdPost: Post;
  showMailIsChecked: boolean;
  showPhoneIsChecked: boolean;
  categories = categoriesList.categories;


  constructor(private postService: PostService,
              private imageUploadService: ImageUploadService,
              private notificationService: NotificationService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.postForm = this.createPostForm();
  }


  createPostForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      caption: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required, Validators.pattern('^[1-9]([0-9]{1,4}$)')])],
      showMail: [''],
      showPhone: ['']
    });
  }

  submit(): void {

    this.postService.createPost({
      title: this.postForm.value.title,
      caption: this.postForm.value.caption,
      location: this.postForm.value.location,
      category: this.postForm.value.category,
      price: this.postForm.value.price,
      showMail: !this.showMailIsChecked ? this.postForm.value.showMail = false : this.postForm.value.showMail = true,
      showPhone: !this.showPhoneIsChecked ? this.postForm.value.showPhone = false : this.postForm.value.showPhone = true,

    }).subscribe(data => {
      this.createdPost = data;
      console.log(data);


      if (this.createdPost.id != null && this.selectedFiles != null) {
        const fileListAsArray = Array.from(this.selectedFiles);
        fileListAsArray.forEach((file: File) => {
          this.imageUploadService.uploadImageToPost(file, this.createdPost.id)
            .subscribe(() => {
              console.log('Uploading images...');
            });
        });
        // this.notificationService.showSnackBar('Post created successfully');
        this.isPostCreated = true;
        // this.router.navigate(['/profile']);
          // .then(() => {
          //   window.location.reload();
          // });
      }
    });
  }



  selectFiles(event): void {

    if (event.target.files && event.target.files[0] && event.target.files.length < 5) {
      const files = event.target.files;
      let isImage = true;

      for (let i = 0; i < files.length; i++) {
        if (files.item(i).type.match('image.*')) {

          const reader = new FileReader();
          reader.onload = (e) => {
            console.log(event.target.result);
            this.urls.push(reader.result);
          };
          reader.readAsDataURL(event.target.files[i]);

          continue;
        } else {
          isImage = false;
          alert('invalid format!');
          break;
        }
      }

      if (isImage) {
        this.selectedFiles = event.target.files;
      } else {
        this.selectedFiles = undefined;
      }
    }
  }

}
