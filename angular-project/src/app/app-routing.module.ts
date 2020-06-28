import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
            MatGridListModule]
})
export class AppRoutingModule { }
