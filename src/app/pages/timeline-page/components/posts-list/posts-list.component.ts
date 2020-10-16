import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';
import { PostService } from 'src/app/core/services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  posts: IPost[] = [];
  order: 'ASCE' | 'DESC' = 'DESC';

  subscription: Subscription;

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.subscription = this.postService.postsChange.subscribe((posts)=>[
      this.posts = posts
    ])

    await this.getData(this.order)
  }
  
  async getData(order: 'ASCE' | 'DESC'){
    await this.postService.fetchAll(order)
  }

  postClicked(post: IPost) {
    this.router.navigate([post.id], {
      relativeTo: this.route,
      state: {
        post
      }
    })
  }

  async toggleOrder() {
    this.order = this.order === 'DESC'? 'ASCE': 'DESC'
    await this.postService.fetchAll(this.order)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
