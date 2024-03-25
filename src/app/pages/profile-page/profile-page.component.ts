import { Component, OnInit } from '@angular/core';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import { FullUserDto } from '../../interfaces/user';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  
  storageUserId: number | null = null

  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.setUserIdFromStorage();
  }

  setUserIdFromStorage(): void {
    this.storageUserId = this.storageService.getUser()?.id || null;
  }  
}
