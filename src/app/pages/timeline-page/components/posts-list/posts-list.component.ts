import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';
import { PostService } from 'src/app/core/services/post.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  posts: IPost[] = []

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    await this.getData()
  }
  
  async getData(){
    const res = await this.postService.fetchAll().toPromise()
    this.posts = res.results
  }

  postClicked(post: IPost) {
    this.router.navigate([post.id], {
      relativeTo: this.route,
      state: {
        post
      }
    })
  }

}
