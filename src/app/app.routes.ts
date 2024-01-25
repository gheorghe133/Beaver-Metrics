import { Routes } from '@angular/router';
import { UserComponent } from './components/UserComponent/user/user.component';
import { HomeComponent } from './components/HomeComponent/home/home.component';
import { NotFoundComponent } from './components/404Component/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'user/:name',
    component: UserComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
