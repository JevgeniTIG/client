import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/Post';
import {conf} from '../config/conf';

const POST_API = conf.host + '/post/';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  createPost(post: Post): Observable<any> {
    return this.http.post(POST_API + 'create', post);
  }

  saveImagePathToPost(filesNames: string, postId: number): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('filesNames', filesNames);
    return this.http.post(POST_API + postId + '/upload', uploadData);
  }


  getAllPosts(): Observable<any> {
    return this.http.get(POST_API + 'all');
  }

  getPostsForCurrentUser(): Observable<any> {
    return this.http.get(POST_API + 'user/posts');
  }

  deletePost(id: number): Observable<any> {
    return this.http.post(POST_API + id + '/delete', null);
  }

  likePost(id: number, userName: string): Observable<any> {
    return this.http.post(POST_API + id + '/' + userName + '/like', null);
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http.post(POST_API + id + '/update', post);
  }

  getPostsByCategory(category: string): Observable<any> {
    return this.http.get(POST_API + category + '/all');
  }

  getPostsForCurrentPage(lowValue: number, highValue: number): Observable<any> {
    return this.http.get(POST_API + 'all' + '/' + lowValue + '/' + highValue);
  }

  getPostsForCurrentPageByCategory(lowValue: number, highValue: number, category: string): Observable<any> {
    return this.http.get(POST_API + 'all' + '/' + lowValue + '/' + highValue + '/' + category);
  }


}
