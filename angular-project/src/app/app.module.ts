import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { HttpClientModule } from '@angular/common/http';

import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WindowModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { StudentAddComponent } from './student-add/student-add.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ProfessorAddComponent } from './professor-add/professor-add.component';
import { ProfessorListComponent } from './professor-list/professor-list.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { StudentViewComponent } from './student-view/student-view.component';
import { ProfessorViewComponent } from './professor-view/professor-view.component';


const appRoutes: Routes = [
  {
    path: 'home',
    component: StartComponent,
    data: { title: 'Home' }
  },
  {
    path: 'admin',
    component: AdminViewComponent,
    data: { title: 'Admin' }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    StudentAddComponent,
    StudentListComponent,
    ProfessorAddComponent,
    ProfessorListComponent,
    AdminViewComponent,
    StudentViewComponent,
    ProfessorViewComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    ScrollViewModule,
    BrowserAnimationsModule,
    ButtonsModule,
    WindowModule,
    NgbModule,
    DateInputsModule,
    DropDownsModule,
    HttpClientModule,
    GridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
