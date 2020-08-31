import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { HomeComponent } from '../home/home.component';
import { BoardContainerComponent } from '../boards/board-container/board-container.component';
import { BoardComponent } from '../board/board/board.component';
import { TopicComponent } from '../topic/topic/topic.component';
import { ProfileComponent } from '../profile/profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  // dynamic category path
  {path: 'forum/:category', component: BoardComponent},
  // dynamic board path
  {path: 'forum/:category/:board', component: BoardComponent},
  // dynamic post path
   {path: 'forum/:category/:board/:post', component: TopicComponent},
  // dynamic profile path
   {path: 'profile/:userUrl', component: ProfileComponent},
  //

  { path: 'forum', component: BoardContainerComponent},
  { path: '*', component: HomeComponent},

];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }

