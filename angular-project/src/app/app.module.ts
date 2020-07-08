import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { CourseAddComponent } from './course-add/course-add.component';

import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login/login.component'
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PopupModule } from '@progress/kendo-angular-popup';
import { CourseUpdateComponent } from './course-update/course-update.component';
import { ProfessorUpdateComponent } from './professor-update/professor-update.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsUpdateComponent } from './news-update/news-update.component';
import { UploadModule } from '@progress/kendo-angular-upload';
import { MatListModule } from '@angular/material/list'

const appRoutes: Routes = [
  {
    path: 'home',
    component: StartComponent,
    data: { title: 'Home' }
  },
  {
    path: 'admin-view/:id',
    component: AdminViewComponent,
    data: { title: 'Admin' }
  },
  {
    path: 'student-view/:id',
    component: StudentViewComponent,
    data: { title: 'Student' }
  },
  {
    path: 'professor-view/:id',
    component: ProfessorViewComponent,
    data: { title: 'Professor' }
  },
  {
    path: 'professor-add',
    component: ProfessorAddComponent,
    data: { title: 'Registrar profesor' }
  },
  {
    path: 'professor-update/:id',
    component: ProfessorUpdateComponent,
    data: { title: 'Actualizar profesor' }
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
    path: 'course-add',
    component: CourseAddComponent,
    data: { title: 'Registrar curso' }
  },
  {
    path: 'course-update/:id',
    component: CourseUpdateComponent,
    data: { title: 'Actualizar curso' }
  },
  {
    path: 'student-update/:id',
    component: StudentUpdateComponent,
    data: { title: 'Actualizar estudiante' }
  },
  {
    path: 'news-add/:id',
    component: NewsAddComponent,
    data: { title: 'Añadir noticia' }
  },
  {
    path: 'news-update/:id',
    component: NewsUpdateComponent,
    data: { title: 'Actualizar noticia' }
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
    LoginComponent,
    CourseAddComponent,
    CourseUpdateComponent,
    ProfessorUpdateComponent,
    StudentUpdateComponent,
    NewsAddComponent,
    NewsUpdateComponent
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
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule,
    MatSnackBarModule,
    PopupModule,
    ReactiveFormsModule,
    MatToolbarModule,
    UploadModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
