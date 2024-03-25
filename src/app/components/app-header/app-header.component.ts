import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AvatarModule, DropdownModule, GridModule, HeaderModule, ImgModule, NavModule } from '@coreui/angular';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, HeaderModule, GridModule, NavModule, DropdownModule, AvatarModule, CommonModule
  ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {
  constructor(
    private storageService: StorageService,
    private router: Router
  ) {

  }

  getUserName(): string {
    return this.storageService.getUser()?.name || 'Профиль'
  }
  isLoggedIn(): boolean {
    const loggedIn = this.storageService.isLoggedIn();
    console.log('isLoggedIn',loggedIn)
    return loggedIn
  }

  logout(): void {
    this.storageService.clean();
    console.log('logout',this.storageService.getUser())
    this.router.navigate(['/']);
  }
}
