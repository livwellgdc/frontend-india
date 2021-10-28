import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapComponent } from './google-map.component';
import { MatDialogModule, MatInputModule, MatIconModule, MatButtonModule, MAT_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { environment } from './../../../environments/environment';
import { GoogleMapService } from './google-map.service';

@NgModule({
  declarations: [GoogleMapComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.MAP_API_KEY,
      libraries: ["places"]
    })
  ],
  entryComponents: [GoogleMapComponent],
  exports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: [] },
    GoogleMapService
  ],
})
export class GoogleMapModule { }
