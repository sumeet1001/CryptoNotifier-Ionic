import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeTabPage } from './homeTab.page';
import { HomeTabPageRoutingModule } from './homeTab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomeTabPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HomeTabPage],
  providers: [FirebaseAuthentication]
})
export class Tab1PageModule {}
