import { Injectable, EventEmitter } from '@angular/core';

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

export interface SimulationLog {
    timestamp: number;
    action: string;
    result: string;
    details?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ClientSimulatorService {

	private qvaHubLanClients: Map<string, any> = new Map();
	private webrtcConnections: Map<string, RTCPeerConnection> = new Map();

	private clientProfiles: QvaHubLanWebRTCClient[] = [
		{
			webRTCType: QvaHubLanWebRTCType.PEER,
			clientType: QvaHubLanClientType.QvAACAM,
			allowedPeers: [QvaHubLanClientType.QvAVIHUB]
		},
		{
			webRTCType: QvaHubLanWebRTCType.PEER,
			clientType: QvaHubLanClientType.QvABroVi,
			allowedPeers: [QvaHubLanClientType.QvAVIHUB]
		},
		{
			webRTCType: QvaHubLanWebRTCType.HOST,
			clientType: QvaHubLanClientType.MyLoReFIO,
			allowedPeers: [QvaHubLanClientType.QvAVIHUB]
		},
        {
			webRTCType: QvaHubLanWebRTCType.HOST,
			clientType: QvaHubLanClientType.QvAVIHUB,
			allowedPeers: [QvaHubLanClientType.QvAACAM]
		},
		{
			webRTCType: QvaHubLanWebRTCType.BROADCAST,
			clientType: QvaHubLanClientType.QvAVIHUB,
			allowedPeers: [QvaHubLanClientType.MyLoReFIO]
		},
		{
			webRTCType: QvaHubLanWebRTCType.PEER,
			clientType: QvaHubLanClientType.QvAVIHUB,
			allowedPeers: [QvaHubLanClientType.MyLoReFIO]
		},
        {
			webRTCType: QvaHubLanWebRTCType.PEER,
			clientType: QvaHubLanClientType.MyLoReFIO,
			allowedPeers: [QvaHubLanClientType.QvAVIHUB]
		}
	];

	constructor(private localhost : QvahubLocalhostService,
				private log : QvaLoggerService) {}


    simulationEvents = new EventEmitter<SimulationLog>();

    logSimulation(action: string, result: string, details?: any) {
        this.simulationEvents.emit({
            timestamp: Date.now(),
            action,
            result,
            details
        });
    }

	simulateRandomAction() {
		/*const actions = [
		    () => this.createNewClient(),
		    () => this.initiateWebRTCConnection(),
		    () => this.dropRandomPeerConnection(),
		    () => this.disconnectRandomClient(),
            () => this.sendTextFromRandomPeer()
		];
		
		const randomAction = actions[Math.floor(Math.random() * actions.length)];
		randomAction();*/
	}

	private createNewClient() {
        // Random profile selection based on WebRTC type
		const availableProfiles = this.clientProfiles.filter(profile => 
			profile.webRTCType === QvaHubLanWebRTCType.BROADCAST || 
			profile.webRTCType === QvaHubLanWebRTCType.HOST || 
			profile.webRTCType === QvaHubLanWebRTCType.PEER
		);
		const selectedProfile = availableProfiles[Math.floor(Math.random() * availableProfiles.length)];
		
		// Create appropriate client instance
		let client;
		switch (selectedProfile.webRTCType) {
			case QvaHubLanWebRTCType.BROADCAST:
				client = new QvahubLanBroadcast();
				break;
			case QvaHubLanWebRTCType.HOST:
				client = new QvahubLanHost(this.log);
				break;
			case QvaHubLanWebRTCType.PEER:
				client = new QvahubLanPeer(this.log);
				break;
		}

		// Store and setup the client
		const clientId = `client_${Date.now()}`;
		this.qvaHubLanClients.set(clientId, client);
		
		this.logSimulation(
			'CreateClient', 
			'Success', 
			{ clientId, type: selectedProfile.webRTCType, clientType: selectedProfile.clientType }
		);

	}

	private initiateWebRTCConnection() {

	}

	private dropRandomPeerConnection() {

	}

	private disconnectRandomClient() {

	}

	private sendTextFromRandomPeer() {

	}


    createTestPeer() {

		const peer = new QvahubLanPeer(this.log);
		const clientId = `test_peer_${Date.now()}`;
		this.qvaHubLanClients.set(clientId, peer);

        //QvaHubLanClientType.QvAACAM,
		const profile = {
			webRTCType: QvaHubLanWebRTCType.PEER,
			clientType: QvaHubLanClientType.QvAACAM,
			allowedPeers: [QvaHubLanClientType.QvAVIHUB]
		};

		peer.getHostListEvents().subscribe((hosts : any) => {
			if (hosts.length > 0) {
				const randomHost = hosts[Math.floor(Math.random() * hosts.length)];
				peer.connectToHost(randomHost.clientId);
				
				this.logSimulation(
					'HostSelection',
					'Connecting',
					{ peerId: clientId, hostId: randomHost.clientId }
				);
			}
		});

		peer.wsConnect(
			this.localhost.getIPv4(),
			this.localhost.getPort(),
			profile.clientType,
			profile.webRTCType.toString() + '_' + profile.clientType.toString() + '_' + Math.ceil(Math.random()*100000),
			{ allowedPeers : profile.allowedPeers }
		);
		
		this.logSimulation(
			'CreateTestPeer', 
			'Registered', 
			{ clientId, type: profile.webRTCType }
		);
	}

    createTestFIOPeer() {

		const peer = new QvahubLanPeer(this.log);
		const clientId = `test_peer_${Date.now()}`;
		this.qvaHubLanClients.set(clientId, peer);

        //QvaHubLanClientType.QvAVIHUB,
		const profile = {
			webRTCType: QvaHubLanWebRTCType.PEER,
			clientType: QvaHubLanClientType.QvAVIHUB,
			allowedPeers: [QvaHubLanClientType.MyLoReFIO]
		};

		peer.getHostListEvents().subscribe((hosts:any) => {
			if (hosts.length > 0) {
				const randomHost = hosts[Math.floor(Math.random() * hosts.length)];
				peer.connectToHost(randomHost.clientId);
				
				this.logSimulation(
					'HostSelection',
					'Connecting',
					{ peerId: clientId, hostId: randomHost.clientId }
				);
			}
		});

		peer.wsConnect(
			this.localhost.getIPv4(),
			this.localhost.getPort(),
			profile.clientType,
			profile.webRTCType.toString() + '_' + profile.clientType.toString() + '_' + Math.ceil(Math.random()*100000),
			{ allowedPeers : profile.allowedPeers }
		);
		
		this.logSimulation(
			'CreateTestFIOPeer', 
			'Registered', 
			{ clientId, type: profile.webRTCType }
		);
	}

    createTestHost() {

		const host = new QvahubLanHost(this.log);
		const clientId = `test_peer_${Date.now()}`;
		this.qvaHubLanClients.set(clientId, host);

        //QvaHubLanClientType.QvAACAM,
		const profile =  {
			webRTCType: QvaHubLanWebRTCType.HOST,
			clientType: QvaHubLanClientType.QvAVIHUB,
			allowedPeers: [QvaHubLanClientType.QvAACAM]
		};

		host.wsConnect(
			this.localhost.getIPv4(),
			this.localhost.getPort(),
			profile.clientType,
			profile.webRTCType.toString() + '_' + profile.clientType.toString() + '_' + Math.ceil(Math.random()*100000),	
			{ allowedPeers : profile.allowedPeers }
		);
		
		this.logSimulation(
			'CreateTestHost', 
			'Registered', 
			{ clientId, type: profile.webRTCType }
		);

	}

    createTestFIOHost() {

		const host = new QvahubLanHost(this.log);
		const clientId = `test_peer_${Date.now()}`;
		this.qvaHubLanClients.set(clientId, host);

        //QvaHubLanClientType.MyLoReFIO host,
		const profile = {
			webRTCType: QvaHubLanWebRTCType.HOST,
			clientType: QvaHubLanClientType.MyLoReFIO,
			allowedPeers: [QvaHubLanClientType.QvAVIHUB]
		}

		host.wsConnect(
			this.localhost.getIPv4(),
			this.localhost.getPort(),
			profile.clientType,
			profile.webRTCType.toString() + '_' + profile.clientType.toString() + '_' + Math.ceil(Math.random()*100000),	
			{ allowedPeers : profile.allowedPeers }
		);
		
		this.logSimulation(
			'CreateTestFIOHost', 
			'Registered', 
			{ clientId, type: profile.webRTCType }
		);

	}


}