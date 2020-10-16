import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss']
})
export class TimelinePageComponent implements OnInit {

  subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log('hmm');
    
    this.subscription = this.authService.loginStatusChange.subscribe(({isLoggedIn})=>{
      console.log('b', isLoggedIn);
      
      if(!isLoggedIn){
        this.router.navigate(['/auth/login'])
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
