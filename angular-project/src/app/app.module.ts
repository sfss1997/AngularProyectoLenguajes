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
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';

import { StudentAddComponent } from './student-add/student-add.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ProfessorAddComponent } from './professor-add/professor-add.component';
import { ProfessorListComponent } from './professor-list/professor-list.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { ProfessorViewComponent } from './professor-view/professor-view.component';
import { NewsListComponent } from './news-list/news-list.component';

import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login/login.component'

const appRoutes: Routes = [
  {
    path: 'home',
    component: StartComponent,
    data: { title: 'Home' }
  },
  {
    path: 'admin-view',
    component: AdminViewComponent,
    data: { title: 'Admin' }
  },
  {
    path: 'student-view',
    component: StudentViewComponent,
    data: { title: 'Student' }
  },
  {
    path: 'professor-view',
    component: ProfessorViewComponent,
    data: { title: 'Professor' }
  },
  {
    path: 'news',
    component: NewsListComponent,
    data: { title: 'News' }
  },
  {
    path: 'student-add',
    component: StudentAddComponent,
    data: { title: 'Registrar estudiante' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Iniciar sesión' }
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
    ProfessorViewComponent,
    NewsListComponent,
    LoginComponent
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
    GridModule,
    LayoutModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
