import { CryptoListInfoComponent } from './components/crypto-list-info/crypto-list-info.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    LoadingComponent,
    HeaderComponent,
    CryptoListInfoComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    LoadingComponent,
    HeaderComponent,
    CryptoListInfoComponent
  ],
})

export class SharedModule {}
