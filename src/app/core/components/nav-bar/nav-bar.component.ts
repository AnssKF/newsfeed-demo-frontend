import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isLoggedIn: boolean = false
  subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.loginStatusChange.subscribe(({isLoggedIn})=>{
      this.isLoggedIn = isLoggedIn
    })
  }

  logout(){
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
