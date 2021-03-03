import {Component, OnInit, ViewChild} from '@angular/core';
import {Post} from '../../models/Post';
import {User} from '../../models/User';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {CommentService} from '../../services/comment.service';
import {NotificationService} from '../../services/notification.service';
import {ImageUploadService} from '../../services/image-upload.service';
import {categoriesList} from '../../models/categories';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

  btnOneLow = 0;
  btnOneHigh = 49;
  btnTwoLow = 49;
  btnTwoHigh = 100;
  btnThreeLow = 100;
  btnThreeHigh = 149;
  btnFourLow = 149;
  btnFourHigh = 200;

  categorySelected = false;
  lowValue = 0;
  highValue = 49;

  isImagesToPostLoaded: boolean;
  isPostsLoaded = false;
  posts: Post[];
  isUserDataLoaded = false;
  user: User;
  category: string;

  categories = categoriesList.categories;

  @ViewChild('commentField') commentField: string;


  constructor(private postService: PostService,
              private userService: UserService,
              private commentService: CommentService,
              private notificationService: NotificationService,
              private imageService: ImageUploadService,
  ) {
  }


  ngOnInit(): void {
    this.postService.getPostsForCurrentPage(this.lowValue, this.highValue)
      .subscribe(data => {
        console.log(data);
        this.posts = data;
        this.getImagesToPosts(this.posts);
        this.getCommentsToPosts(this.posts);
        this.isPostsLoaded = true;
      });

    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
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

  likePost(postId: number, postIndex: number): void {
    const post = this.posts[postIndex];
    console.log(post);

    if (!post.userLiked.includes(this.user.userName)) {
      this.postService.likePost(postId, this.user.userName)
        .subscribe(() => {
          post.userLiked.push(this.user.userName);
          this.notificationService.showSnackBar('Liked!');
        });
    } else {
      this.postService.likePost(postId, this.user.userName)
        .subscribe(() => {
          const index = post.userLiked.indexOf(this.user.userName, 0);
          if (index > -1) {
            post.userLiked.splice(index, 1);
          }
        });
    }
  }

  postComment(message: string, postId: number, postIndex: number): void {
    const post = this.posts[postIndex];

    console.log(post);
    this.commentService.addCommentToPost(postId, message)
      .subscribe(data => {
        console.log(data);
        post.comments.push(data);
        this.commentField = '';
      });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  formatImagePath(img: string): any {
    if (img == null) {
      return null;
    }
    return img.substring(img.indexOf('https://api.surfspot.ee/var/www/uploads'));
  }

  showPostsForCurrentPage(lowValue: number, highValue: number): void {
    this.postService.getPostsForCurrentPage(lowValue, highValue)
      .subscribe(data => {
        console.log(data);
        this.posts = data;
        this.getImagesToPosts(this.posts);
        this.getCommentsToPosts(this.posts);
        this.isPostsLoaded = true;
      });

    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      });

  }

  showPostsForCurrentPageByCategory(lowValue: number, highValue: number, currentCategory: string): void {
    this.postService.getPostsForCurrentPageByCategory(lowValue, highValue, currentCategory)
      .subscribe(data => {
        console.log(data);
        this.posts = data;
        this.getImagesToPosts(this.posts);
        this.getCommentsToPosts(this.posts);
        this.isPostsLoaded = true;
        this.categorySelected = true;
      });

    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      });

  }

  public changeMainImg(image: any, i: number): void {
    this.posts[i].mainImage = image;
    this.posts[i].isImageThumbnailTouched = true;
  }

}

