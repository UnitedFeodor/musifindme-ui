import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule, GridModule, AvatarModule, ButtonModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { isObjectNotEmpty, socialIcons } from '../../app.utils';
import { FlatUserDto } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { cibTelegramPlane,cibVk,cibFacebook,cibSpotify,cibAppleMusic,cibSoundcloud,cibYandex, cibInstagram, cibTwitter } from '@coreui/icons';


@Component({
  selector: 'app-edit-profile-card',
  standalone: true,
  imports: [CardModule, GridModule, AvatarModule, IconModule, RouterLink, ButtonModule, CommonModule,],
  templateUrl: './edit-profile-card.component.html',
  styleUrl: './edit-profile-card.component.scss'
})
export class EditProfileCardComponent {
  user: FlatUserDto = {} as FlatUserDto;
  isObjectNotEmpty = isObjectNotEmpty
  socialIcons: { [key: string]: string } = socialIcons

  
  constructor(public iconSet: IconSetService, private userService: UserService) {
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
    this.userService.getUser(2)
      .subscribe(
        (data: FlatUserDto) => {
        this.user = data;
        console.log('User fetched successfully:', data);
      });
  }

  isSupportedSocial(network: string): boolean {
    return this.socialIcons.hasOwnProperty(network.toLowerCase());
  }


}
