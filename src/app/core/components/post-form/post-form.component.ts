import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  form: FormGroup = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(50)]]
  })

  constructor(private postService: PostService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  async onPost(){
    try {
      const res = await this.postService.addPost(this.form.value)
      this.form.reset()
    }catch(e) {
    }
  }

}
