import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule, GridModule, AvatarModule, ButtonModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { isObjectNotEmpty, isSupportedSocialByName, socialIcons } from '../../app.utils';
import { FlatUserDto, FullUserDto } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { cibTelegramPlane,cibVk,cibFacebook,cibSpotify,cibAppleMusic,cibSoundcloud,cibYandex, cibInstagram, cibTwitter } from '@coreui/icons';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-edit-profile-card',
  standalone: true,
  imports: [CardModule, GridModule, AvatarModule, IconModule, RouterLink, ButtonModule, CommonModule,],
  templateUrl: './edit-profile-card.component.html',
  styleUrl: './edit-profile-card.component.scss'
})
export class EditProfileCardComponent {
  user: FullUserDto = {} as FullUserDto;
  isObjectNotEmpty = isObjectNotEmpty
  isSupportedSocial = isSupportedSocialByName
  socialIcons = socialIcons
  
  constructor(
    public iconSet: IconSetService, 
    private userService: UserService,
    private storageService: StorageService
  ) {
    // iconSet singleton
    iconSet.icons = { 
      cibTelegramPlane, 
      cibVk, 
      cibFacebook, 
      cibSpotify, 

      cibAppleMusic, 
      cibSoundcloud, 
      cibYandex, 
      cibInstagram,

      cibTwitter, 
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
  


}
