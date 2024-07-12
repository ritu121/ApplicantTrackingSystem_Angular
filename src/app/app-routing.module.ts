import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatecandidateComponent } from './createcandidate/createcandidate.component';
import { VendorComponent } from './vendor/vendor.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { CandidateComponent } from './candidate/candidate.component';
import { PostdetailsComponent } from './postdetails/postdetails.component';
import { SkillsComponent } from './skills/skills.component';
import { RegisterComponent } from './register/register.component';
import { AddregisterComponent } from './addregister/addregister.component';
import { authGuard } from './auth.guard';
import { JobsComponent } from './jobs/jobs.component';
import { AddJobsComponent } from './add-jobs/add-jobs.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'createcandidate', component: CreatecandidateComponent, canActivate: [authGuard] },
  { path: 'vendor', component: VendorComponent, canActivate: [authGuard] },
  { path: 'candidates', component: CandidateComponent, canActivate: [authGuard] },
  { path: 'createcandidate/:id', component: CreatecandidateComponent, canActivate: [authGuard] },
  { path: 'skills', component: SkillsComponent, canActivate: [authGuard] },
  { path: 'vendor/addVendor', component: AddVendorComponent, canActivate: [authGuard] },
  { path: 'editVendor/:id', component: AddVendorComponent, canActivate: [authGuard] },
  { path: 'postdetails', component: PostdetailsComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  { path: 'register/addregister', component: AddregisterComponent, canActivate: [authGuard] },
  { path: 'editRegister/:id', component: AddregisterComponent, canActivate: [authGuard] },
  { path: 'add-jobs/:id', component: AddJobsComponent, canActivate: [authGuard] },
  { path: 'add-jobs', component: AddJobsComponent, canActivate: [authGuard] },
  { path: 'jobs', component: JobsComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
