import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllCryptoListPage } from './all-crypto-list.page';

const routes: Routes = [
  {
    path: '',
    component: AllCryptoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllCryptoListPageRoutingModule {}
