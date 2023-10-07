import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
