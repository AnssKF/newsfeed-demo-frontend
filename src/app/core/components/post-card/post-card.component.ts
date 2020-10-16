import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPost } from '../../interfaces/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: IPost = null;
  @Output() click: EventEmitter<IPost> = new EventEmitter<IPost>()

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  getDateObj(date: string){
    return new Date(date)
  }

  onClick() {
    this.click.emit(this.post)
  }

  async onLike($e) {
    $e.stopPropagation();
    
    if(!this.post.liked){
      try {
        const res = await this.postService.like(this.post.id).toPromise()
        this.post.liked = res.id
        this.post.likes_count = this.post.likes_count+1
      }catch(e){
        
      }
    }else {
      try{
        await this.postService.disLike(this.post.liked).toPromise()
        this.post.liked = false
        this.post.likes_count = this.post.likes_count-1
      }catch(e){

      }
    }
  }

}
