import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { IPost } from '../../interfaces/post';
import { IComment } from '../../interfaces/comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  @Input() post: IPost = null;
  @Output() addedComment: EventEmitter<IComment | null> = new EventEmitter<IComment | null>()

  form: FormGroup = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(10)]]
  })

  constructor(private postService: PostService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  async onSubmit(){
    try {
      const res = await this.postService.addComment({post: this.post.id, ...this.form.value}).toPromise()
      this.form.reset()
      this.addedComment.emit(res)
    }catch(e) {
      this.addedComment.emit(null)
    }
  }

}
