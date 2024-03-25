import { Component } from '@angular/core';
import { CardModule } from '@coreui/angular';

@Component({
  selector: 'app-home-card',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.scss'
})
export class HomeCardComponent {

}
