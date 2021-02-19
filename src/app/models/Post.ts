import {Comment} from './Comment';
import {Image} from './Image';

export interface Post {
  id?: number;
  title: string;
  caption: string;
  location: string;
  image?: Image[];
  price: string;
  likes?: number;
  userLiked?: string[];
  comments?: Comment[];
  userName?: string;
  status?: string;
  createdDate?: string;
  category: string;
  userId?: number;
  email?: string;
  phone?: string;
  showMail?: boolean;
  showPhone?: boolean;
  mainImage?: Image;
  isImageThumbnailTouched?: boolean;

}
