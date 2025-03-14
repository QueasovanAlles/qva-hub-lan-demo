import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { QvahubLanCoreModule, QvaLoggerService, QvahubLocalhostService } from 'qvahub-lan-core';
import { ClientSimulatorService } from './client-simulator.service';
import { AppLockDialogComponent } from './app-lock-dialog/app-lock-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLockDialogComponent
  ],
  imports: [
    BrowserModule,
    QvahubLanCoreModule
  ],
  providers: [
    ClientSimulatorService,
    QvahubLocalhostService,
    QvaLoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }