import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddCharacterComponent } from './components/add-character/add-character.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'characters', component: CharacterListComponent},
  {path: 'character/:id', component: CharacterDetailsComponent},
  {path: 'add', component: AddCharacterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
