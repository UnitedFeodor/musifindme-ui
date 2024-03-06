import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownModule, GridModule, HeaderModule, ImgModule, NavModule } from '@coreui/angular';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, HeaderModule, GridModule, NavModule, DropdownModule, ImgModule, 
  ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {

}
