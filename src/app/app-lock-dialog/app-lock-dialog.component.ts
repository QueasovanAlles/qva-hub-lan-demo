import { Component, Output, EventEmitter } from '@angular/core';
import { QvahubLocalhost, QvaLoggerService } from 'qvahub-lan-core';

@Component({
  selector: 'app-app-lock-dialog',
  templateUrl: './app-lock-dialog.component.html',
  styleUrls: ['./app-lock-dialog.component.scss']
})
export class AppLockDialogComponent {

	@Output() serverAvailable = new EventEmitter<any>();

    constructor(private localhost : QvahubLocalhost,
			    private log : QvaLoggerService) {}

    async doPing() {
        const isAvailable = await this.localhost.pingServer();
        if (!isAvailable) {
            this.log.log(`Could not connect to ${this.localhost.toString()}`);
        } else this.serverAvailable.emit({serverFound : isAvailable});
    }

	getServerString() {
		this.localhost.toString()
	}

}