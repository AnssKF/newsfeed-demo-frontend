import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRESTResponse } from '../interfaces/rest-response';
import { IPost, IPostPayload } from '../interfaces/post';
import { K_POST_API, K_COMMENT_API, K_LIKE_APU } from '../constants/api';
import { IComment, ICommentPayload } from '../interfaces/comment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PostService {

  posts: IPost[] = []
  postsChange: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>(this.posts);
  current_ordering: 'ASCE' | 'DESC' = 'DESC'

  constructor(private http: HttpClient) { }

  fetchAll(order: 'ASCE' | 'DESC' = 'DESC'){
    this.current_ordering = order;
    return new Promise<IPost[]>((res, rej)=>{
      this.http.get<IRESTResponse<IPost>>(K_POST_API.FETCH(), {
        params: {
          ordering: order === 'ASCE'? 'created_at': '-created_at'
        }
      }).subscribe((response)=>{
        this.posts = response.results
        this.postsChange.next(this.posts)
        res(this.posts)
      }, (err)=>{
        rej(err)
      })
    }) 
  }
  
  fetchById(id: number){
    return this.http.get<IPost>(K_POST_API.BYID(id))
  }

  fetchCommentsByPostId(post_id) {
    return this.http.get<IRESTResponse<IComment>>(K_COMMENT_API.FETCH(), {
      params: {
        post: post_id
      }
    })
  }

  like(post: number) {
    return this.http.post<{id:number, author: number, post: number}>(K_LIKE_APU.POST(), {
      post
    })
  }

  disLike(like_id: number){
    return this.http.delete(K_LIKE_APU.DELETE(like_id))
  }

  addPost({content}: IPostPayload){
    return new Promise<IPost>((res, rej)=>{
      this.http.post<IPost>(K_POST_API.FETCH(), {content}).subscribe((post: IPost)=>{
        if(this.current_ordering === 'DESC'){
          this.posts.unshift(post)
          this.postsChange.next(this.posts)
        }
        else {
          this.posts.push(post)
          this.postsChange.next(this.posts)
        }
        res(post)
      }, (err)=>{
        rej(err)
      })
    })
  }

  addComment(payload: ICommentPayload){
    return this.http.post<IComment>(K_COMMENT_API.FETCH(), payload)
  }
}
