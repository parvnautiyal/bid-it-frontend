import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from "./components/about/about.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {ContentComponent} from "./components/dashboard/content/content.component";
import {DetailsComponent} from "./components/dashboard/content/details/details.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ProductComponent} from "./components/dashboard/content/details/product/product.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {NotLoggedGuard} from "./guards/not-logged.guard";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: "full" },
  { path: 'home', component: HomeComponent, canActivate: [NotLoggedGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent, canActivate: [NotLoggedGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: ContentComponent, pathMatch: "full" },
      { path: 'details', component: DetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, NotLoggedGuard]
})
export class AppRoutingModule {}
