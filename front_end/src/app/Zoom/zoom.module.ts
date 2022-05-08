import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoomRoutingModule } from './zoom-routing.module';
import { ZoomService } from './zoom.service';
import { ZoomComponent } from './zoom/zoom.component';


@NgModule({
  declarations: [ZoomComponent],
  imports: [
    CommonModule,
    ZoomRoutingModule
  ],
  providers: [ZoomService]
})
export class ZoomModule { }
