import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComparisionPageComponent } from './components/comparision-page/comparision-page.component';

const routes: Routes = [
  { path: '', component: ComparisionPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
