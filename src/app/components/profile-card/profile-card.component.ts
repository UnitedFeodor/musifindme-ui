import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule, GridModule, AvatarModule, ButtonModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { isObjectNotEmpty, socialIcons } from '../../app.utils';
import { FlatUserDto, FullUserDto } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { cibTelegramPlane,cibVk,cibFacebook,cibSpotify,cibAppleMusic,cibSoundcloud,cibYandex, cibInstagram, cibTwitter } from '@coreui/icons';
import { StorageService } from '../../services/storage.service';
import { error } from 'console';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CardModule, GridModule, AvatarModule, IconModule, RouterLink, ButtonModule, CommonModule,],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent implements OnInit{
  user: FullUserDto = {} as FullUserDto;
  isObjectNotEmpty = isObjectNotEmpty
  socialIcons: { [key: string]: string } = socialIcons
  @Input() editButtonLabel: string = ''; // TODO maybe change to something else
  @Input() editButtonRouterLink: string = '';

  
  constructor(
    public iconSet: IconSetService, 
    private userService: UserService,
    private storageService: StorageService
  ) {
    // iconSet singleton
    iconSet.icons = { 
      cibTelegramPlane, cibVk, cibFacebook, cibSpotify, cibAppleMusic, cibSoundcloud, cibYandex, cibInstagram, cibTwitter, 
    };
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.fetchUser()
    
    
  }

  fetchUser(): void {
    const storedUser = this.storageService.getUser();
    if (storedUser) {
      this.userService.getUser(storedUser.id)
        .subscribe({
          next: (data: FullUserDto) => {
            this.user = data;
            console.log('User fetched successfully:', data);
          },
          error: (error) => {
            console.log('Error fetching user',error)
          }
      });
    } else {
      this.user = {} as FullUserDto;
    }
  }

  isSupportedSocial(network: string): boolean {
    return this.socialIcons.hasOwnProperty(network.toLowerCase());
  }



}
