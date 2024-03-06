import { Routes } from '@angular/router';
import { MatchCardComponent } from './components/match-card/match-card.component';
import { HelpCardComponent } from './components/help-card/help-card.component';

// TODO add routes
export const routes: Routes = [
    { path: 'help', component: HelpCardComponent },
    { path: 'people', component: MatchCardComponent },

];
