import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {TokenStorageService} from '../../services/token-storage.service';
import {PostService} from '../../services/post.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NotificationService} from '../../services/notification.service';
import {ImageUploadService} from '../../services/image-upload.service';
import {UserService} from '../../services/user.service';
import {EditUserComponent} from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  selectedFile: File;
  userProfileImage: File;
  previewImageUrl: any;
  isUserDataLoaded = false;

  constructor(private tokenService: TokenStorageService,
              private postService: PostService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private imageUploadService: ImageUploadService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      });
    this.imageUploadService.getUserProfileImage()
      .subscribe(data => {
        this.userProfileImage = data.imageBytes;
      });
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImageUrl = reader.result;
    };
  }

  openEditDialog(): void {
    const dialogEditUserConfig = new MatDialogConfig();
    dialogEditUserConfig.width = '400px';
    dialogEditUserConfig.data = {
      user: this.user
    };
    this.dialog.open(EditUserComponent, dialogEditUserConfig);
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  onUpload(): void {
    if (this.selectedFile != null) {
      this.imageUploadService.uploadImageToUser(this.selectedFile)
        .subscribe(data => {
          this.notificationService.showSnackBar('Profile image upload successfull');
        });
    }
  }


}
