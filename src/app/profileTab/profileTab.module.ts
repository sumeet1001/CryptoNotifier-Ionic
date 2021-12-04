import { SharedModule } from 'src/app/common-module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileTabPage } from './profileTab.page';

import {ProfileTabPageRoutingModule } from './profileTab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProfileTabPageRoutingModule,
    SharedModule
  ],
  declarations: [ProfileTabPage]
})
export class ProfileTabModule {}
