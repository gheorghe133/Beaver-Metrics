import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './components/UserComponent/user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'user/:name',
    component: UserComponent,
  },
  {
    path: '**',
    component: AppComponent,
  },
];
