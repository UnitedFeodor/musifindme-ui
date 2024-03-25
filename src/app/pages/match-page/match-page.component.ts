import { Component, OnInit } from '@angular/core';
import { AvatarModule, ButtonModule, CardModule, GridModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { cibTelegramPlane,cibVk,cibFacebook,cibSpotify,cibAppleMusic,cibSoundcloud,cibYandex, cibInstagram, cibTwitter } from '@coreui/icons';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FlatUserDto } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { isObjectNotEmpty, socialIcons } from '../../app.utils';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
@Component({
  selector: 'app-match-page',
  standalone: true,
  imports: [ProfileCardComponent,],
  templateUrl: './match-page.component.html',
  styleUrl: './match-page.component.scss'
})
export class MatchPageComponent {
  userId: number = 2
}
