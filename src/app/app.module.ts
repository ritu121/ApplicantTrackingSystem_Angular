import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module'; // Import the AppRoutingModule
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule , ReactiveFormsModule  } from '@angular/forms'; 
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreatecandidateComponent,UploadInterceptor } from './createcandidate/createcandidate.component';
import { VendorComponent } from './vendor/vendor.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule, DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { UploadModule } from '@progress/kendo-angular-upload';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from "@progress/kendo-angular-label";
import { ModalComponent } from './documentmodal/modal.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { AlertboxModalComponent } from './alertbox-modal/alertbox-modal.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { CandidateComponent } from './candidate/candidate.component';
import { PostdetailsComponent } from './postdetails/postdetails.component';
import { SkillsComponent } from './skills/skills.component';
import { RegisterComponent } from './register/register.component';
import { AddregisterComponent } from './addregister/addregister.component';
import { AddJobsComponent } from './add-jobs/add-jobs.component';
import { JobsComponent } from './jobs/jobs.component';
import { DocumentModalComponent } from './document-modal-component/document-modal-component.component';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    CreatecandidateComponent,
    VendorComponent,
    AddVendorComponent,
    CandidateComponent,
    ModalComponent,
    PostdetailsComponent,
    SkillsComponent,
    RegisterComponent,
    AddregisterComponent,
    AddJobsComponent,
    JobsComponent,
    DocumentModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Include AppRoutingModule in the imports array
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdbCollapseModule,
    MultiSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    ButtonsModule,
    GridModule,
    DropDownsModule,
    DropDownListModule,
    UploadModule,
    DateInputsModule,
    InputsModule,
    LabelModule,
    TreeViewModule,
    HttpClientModule,
    CommonModule,
    AlertboxModalComponent,
    ExcelExportModule
  ],
  providers: [
    // provideAnimationsAsync(),
  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UploadInterceptor,
      multi: true
  },DatePipe
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

