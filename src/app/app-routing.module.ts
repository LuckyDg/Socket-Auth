import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from './guards/Auth.guard';
import { NoAuthorizationComponent } from './components/no-authorization/no-authorization.component';
import { AdminGuard } from './guards/Admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch:'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'chat',
    component: ChatComponent,
    //canActivate: [AdminGuard],
  },
  {
    path: 'no-auth',
    component: NoAuthorizationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
