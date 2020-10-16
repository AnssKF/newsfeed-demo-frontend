import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/core/interfaces/post';
import { PostService } from 'src/app/core/services/post.service';
import { IComment } from 'src/app/core/interfaces/comment';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post: IPost = null;
  comments: IComment[] = [];

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) {
    this.post = this.router.getCurrentNavigation()?.extras?.state?.post || null
  }

  async ngOnInit(): Promise<void> {
    const id = +this.route.snapshot.params['id'] || null

    if(id === null) this.router.navigate(['../'], {relativeTo: this.route})

    if(this.post === null) {
      try {
        this.post = await this.postService.fetchById(id).toPromise()
      }catch(e) {
        this.router.navigate(['../'], {relativeTo: this.route})
      }
    }
    
    this.comments = (await this.postService.fetchCommentsByPostId(id).toPromise()).results || []
  }



}
