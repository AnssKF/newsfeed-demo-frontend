import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRESTResponse } from '../interfaces/rest-response';
import { IPost } from '../interfaces/post';
import { K_POST_API, K_COMMENT_API, K_LIKE_APU } from '../constants/api';
import { IComment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  fetchAll(order: 'ASCE' | 'DESC' = 'DESC'){
    return this.http.get<IRESTResponse<IPost>>(K_POST_API.FETCH(), {
      params: {
        ordering: order === 'ASCE'? 'created_at': '-created_at'
      }
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
}
