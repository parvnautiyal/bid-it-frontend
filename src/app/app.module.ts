import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BootstrapModule} from "./bootstrap.module";
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/about/contact/contact.component';
import {TechnologyComponent} from './components/about/technology/technology.component';
import {TicketComponent} from './components/about/ticket/ticket.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HomeComponent} from './components/home/home.component';
import {IntroComponent} from './components/home/intro/intro.component';
import {AuthorizationInterceptor} from "./interceptors/authorization.interceptor";
import {FooterComponent} from './components/navigation/footer/footer.component';
import {NavbarComponent} from "./components/navigation/navbar/navbar.component";
import { AuctionsComponent } from './components/dashboard/content/auctions/auctions.component';
import { AddProductComponent } from './components/dashboard/content/add-product/add-product.component';
import { ProductComponent } from './components/dashboard/content/details/product/product.component';
import { ContentComponent } from './components/dashboard/content/content.component';
import { DetailsComponent } from './components/dashboard/content/details/details.component';
import { SellerComponent } from './components/dashboard/content/details/seller/seller.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    IntroComponent,
    AboutComponent,
    ContactComponent,
    TicketComponent,
    TechnologyComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AuctionsComponent,
    AddProductComponent,
    ProductComponent,
    ContentComponent,
    DetailsComponent,
    SellerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
