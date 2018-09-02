import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';
import { ChannelComponent } from './channel/channel.component';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
    {"path":"login","component":LoginComponent},
    {"path":"logout","component":LogoutComponent},
    {"path":"groups","component":GroupsComponent},
    {"path":"channel","component":ChannelComponent},
    {"path":"user","component":UserComponent},
    {"path":"create-user","component":CreateUserComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
