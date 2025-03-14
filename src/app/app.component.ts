import { Component, OnInit, ViewChild, ElementRef,AfterViewInit  } from '@angular/core';
import { ClientSimulatorService, SimulationLog } from './client-simulator.service';
import { 
    QvahubLocalhostService,
    QvaLoggerService,
    QvahubLanClient,
    QvahubLanHost,
    QvahubLanPeer,
    QvahubLanBroadcast,
    QvaHubLanClientType,
    QvaHubLanWebRTCType,
    QvaHubLanWebRTCClient,
    ConnectionStatus, 
    WSClient 
} from 'qvahub-lan-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @ViewChild('mermaidContainer', {static: true}) mermaidContainer!: ElementRef;

	title = 'QvAHUB LAN Demo';
    description  = 'Simulation demonstrating QvAHUB client connections, peer discovery, and real-time video, audio and data routing between WebRTC stations. Watch as clients connect, discover peers, and establish WebRTC connections.';
    appLocked = false;
    simulationLogs: SimulationLog[] = [];

    isRunning = false;

    constructor(private simulator: ClientSimulatorService,
				private localhost : QvahubLocalhostService,
				private log : QvaLoggerService) {

		this.log.setLogging(true);
	    this.localhost.setFromLocation();

		
		


		// Capture simulation events
        this.simulator.simulationEvents.subscribe((log: SimulationLog) => {
            this.simulationLogs.unshift(log);  // Newest first
        });      

    }

	ngOnInit() {
     
    }

	ngAfterViewInit() {
        setTimeout(async() => this.appLocked = !(await this.localhost.pingServer()), 10);
        //if (this.appLocked === false) {};
	}

	handleServerStatus(e : any) {
		this.appLocked = !e.serverFound;
	}

	startSimulation() {
		const factor = 5;

		this.isRunning = true;
		// Create test clients in sequence
		this.simulator.createTestHost();
		
		// Create host for testing
		setTimeout(()=>{this.simulator.createTestPeer();},1000);

		// Create host for testing
		setTimeout(()=>{this.simulator.createTestPeer();},Math.random() * 2000*factor);

		// Create host for testing
		setTimeout(()=>{this.simulator.createTestPeer();},Math.random() * 3000*factor);

		// Create host for testing
		setTimeout(()=>{this.simulator.createTestPeer();},Math.random() * 4000*factor);

		// Create fio host for testing
		setTimeout(()=>{this.simulator.createTestFIOHost();},Math.random() * 2000*factor);

		// Create fio peer for testing
		setTimeout(()=>{this.simulator.createTestFIOPeer();},Math.random() * 4000*factor);

        setTimeout(()=>{this.isRunning = false;},4000*factor);
		
	}
	//setInterval(() => this.simulator.simulateRandomAction(), 60000);

    

}
