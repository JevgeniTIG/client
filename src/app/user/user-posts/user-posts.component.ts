import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {PostService} from '../../services/post.service';
import {ImageUploadService} from '../../services/image-upload.service';
import {CommentService} from '../../services/comment.service';
import {NotificationService} from '../../services/notification.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditPostComponent} from '../../post/edit-post/edit-post.component';
import {log} from 'util';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  isUserPostsLoaded = false;
  isImagesToPostLoaded: boolean;
  posts: Post [];
  post: Post;


  constructor(private postService: PostService,
              private imageService: ImageUploadService,
              private commentService: CommentService,
              private notificationService: NotificationService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.postService.getPostsForCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.posts = data;
        this.getImagesToPosts(this.posts);
        this.getCommentsToPosts(this.posts);
        this.isUserPostsLoaded = true;
      });
  }

  getImagesToPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.imageService.getImagesToPost(p.id)
        .subscribe(data => {
          console.log(data);
          p.image = data;
          this.isImagesToPostLoaded = true;
        });
    });
  }


  getCommentsToPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.commentService.getCommentsToPost(p.id)
        .subscribe(data => {
          p.comments = data;
        });
    });
  }

  removePost(post: Post, index: number): void {
    console.log(post);
    const result = confirm('Do you really want to delete this post?');
    if (result) {
      this.postService.deletePost(post.id)
        .subscribe(() => {
          this.posts.splice(index, 1);
          this.notificationService.showSnackBar('Post deleted');
        });
    }
  }


  formatImagePath(img: string): any {
    if (img == null) {
      return null;
    }
    return img.substring(img.indexOf('https://api.surfspot.ee/home/ssh droplet/var/www/uploads/'));
  }


  deleteComment(commentId: number, postIndex: number, commentIndex: number): void {
    const post = this.posts[postIndex];

    this.commentService.deleteComment(commentId)
      .subscribe(() => {
        this.notificationService.showSnackBar('Comment removed');
        post.comments.splice(commentIndex, 1);
      });
  }


  openEditDialog(postToUpdate): void {
    const dialogEditPostConfig = new MatDialogConfig();
    dialogEditPostConfig.width = '400px';
    dialogEditPostConfig.data = {
      post: postToUpdate
    };
    this.dialog.open(EditPostComponent, dialogEditPostConfig);
  }

  public changeMainImg(image: any, i: number): void{
    this.posts[i].mainImage = image;
    this.posts[i].isImageThumbnailTouched = true;
  }


}
