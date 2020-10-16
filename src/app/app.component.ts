import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'news-feed';

  constructor(private authService: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    await this.authService.init()
  }
}
