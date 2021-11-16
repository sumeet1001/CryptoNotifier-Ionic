import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllCryptoListPageRoutingModule } from './all-crypto-list-routing.module';

import { AllCryptoListPage } from './all-crypto-list.page';
import { SharedModule } from 'src/app/common-module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllCryptoListPageRoutingModule,
    SharedModule
  ],
  declarations: [AllCryptoListPage]
})
export class AllCryptoListPageModule {}
