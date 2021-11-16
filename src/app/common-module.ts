import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    LoadingComponent
  ]
})

export class SharedModule {}
