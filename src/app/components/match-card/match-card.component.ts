import { Component } from '@angular/core';
import { AvatarModule, CardModule, GridModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { cibTelegramPlane,cibVk,cibFacebook,cibSpotify,cibAppleMusic,cibSoundcloud,cibYandex } from '@coreui/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-match-card',
  standalone: true,
  imports: [CardModule, GridModule, AvatarModule,IconModule, RouterLink ],
  templateUrl: './match-card.component.html',
  styleUrl: './match-card.component.scss'
})
export class MatchCardComponent {
  constructor(public iconSet: IconSetService) {
    // iconSet singleton
    iconSet.icons = { 
      cibTelegramPlane, cibVk, cibFacebook, cibSpotify, cibAppleMusic, cibSoundcloud, cibYandex, 
    };
  }
}
