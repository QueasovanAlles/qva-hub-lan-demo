import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { QvahubLocalhost, QvaLoggerService } from 'qvahub-lan-core';
import { ClientSimulatorService } from './client-simulator.service';
import { AppLockDialogComponent } from './app-lock-dialog/app-lock-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLockDialogComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ClientSimulatorService,
    QvahubLocalhost,
    QvaLoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
