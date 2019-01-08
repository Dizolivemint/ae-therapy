import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MilesliderComponent } from './mileslider/mileslider.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageClientComponent } from './page-client/page-client.component';
import { PageExperienceComponent } from './page-experience/page-experience.component';
import { PageTherapyComponent } from './page-therapy/page-therapy.component';

@NgModule({
  declarations: [
    AppComponent,
    MilesliderComponent,
    HeaderComponent,
    FooterComponent,
    PageHomeComponent,
    PageNotFoundComponent,
    NavigationComponent,
    PageAboutComponent,
    PageClientComponent,
    PageExperienceComponent,
    PageTherapyComponent
  ],
  imports:[
    BrowserModule.withServerTransition({appId: "app-root"}),
    CommonModule,
    NgtUniversalModule,
    AppRoutingModule
  ],
  providers: [],
})
export class AppModule { }
