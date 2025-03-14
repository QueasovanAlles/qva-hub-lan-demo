import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { QvaHubLanCoreModule, QvaLoggerService, QvaHubLocalhostService } from 'qvahub-lan-core';
import { ClientSimulatorService } from './client-simulator.service';
import { AppLockDialogComponent } from './app-lock-dialog/app-lock-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLockDialogComponent
  ],
  imports: [
    BrowserModule,
    QvaHubLanCoreModule
  ],
  providers: [
    ClientSimulatorService,
    QvaHubLocalhostService,
    QvaLoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }