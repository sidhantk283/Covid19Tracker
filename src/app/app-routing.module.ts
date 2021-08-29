import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountiresComponent } from './components/countires/countires.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'countires' , component : CountiresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
