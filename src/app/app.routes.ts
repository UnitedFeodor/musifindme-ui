import { Routes } from '@angular/router';
import { MatchPageComponent } from './pages/match-page/match-page.component';
import { HelpCardComponent } from './components/help-card/help-card.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

// TODO add routes
export const routes: Routes = [
    { path: '', component: HomeCardComponent }, 
    { path: 'help', component: HelpCardComponent },
    { path: 'people', component: MatchPageComponent },
    { path: 'profile', component: ProfilePageComponent },

];
