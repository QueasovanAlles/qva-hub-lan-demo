# QvA Hub LAN - DEMO
This demo illustrates functionality of Qva Hub LAN, Monitor and Core client operations

![QvA Hub LAN](/docs/qvahublandemo.png)

## Overview
QvA Hub LAN is a Node.js server application that manages local network connections between QvA applications. Over HTTP the monitor app is ran, and can only be requested on the server LAN IP.
Over WebSocket interaction communication the Hub does WebRTC signalling for the establishment
of Peer to Peer connections between devices and apps. A demo is created using the core client code
simulating devices and P2P connecting them, the demo can also only be ran on the actual server.

## Features
- WebSocket server for client connections
- WebRTC signaling server
- Built-in monitoring dashboard
- Multi-client support
- Automatic LAN discovery
- Port management (default: 52330)
- Monitor connections in your LAN

## Installation
You need the QvA Hub LAN server running for the demo simulating connections can work :

```bash
git clone https://github.com/QueasovanAlles/qva-hub-lan.git
cd qva-hub-lan
node server --port 52330
```
and in another terminal :
```bash
git clone https://github.com/QueasovanAlles/qva-hub-lan-demo.git
cd qva-hub-lan-demo
ng serve --port 52401
```

then browse to : localhost:52404

### Dependencies
- Node.js 18+
- ws: ^8.0.0
- express: ^4.18.0
- qva-hub-lan-monitor: ^1.0.0 (included)

## Usage
```bash
# Start the hub
npm start

# Access monitor interface
http://<server LAN IPv4>:52330
```

![QvA Hub LAN](/docs/qvahublanmonitor.png)

## Configuration

Just running the server and watching the monitor which will show nothing happening :
```bash
node server --port 52330
```

This is configuration of QvATPC terminals for full test, demonstrating all aspects as seperated apps :
```json
[
	{       "name": "CMD",
		"path": "G:\\qva\\QvAHub",
		"domain": "",
		"port": 0,
		"cmd": "echo QvATPC_terminal",
		"output" : true,
		"running" : false,
		"runningConfirmation" : "QvATPC_terminal",
		"process": null  
	},
	{
		"name": "QvAHub-LAN",
		"path": "G:\\qva\\QvAHub\\QvAHub-LAN",
		"domain": "http://192.168.1.2",
		"port": 52330,
		"cmd": "node server",
		"output" : true,
		"running" : false,
		"runningConfirmation" : "Server running on https?://[0-9.]+:52330",
		"process": null  
	},
	{
		"name": "Monitor",
		"path": "G:\\qva\\QvAHub\\qvahub-lan-monitor",
		"domain": "http://localhost",
		"port": 52400,
		"cmd": "ng serve --port PORT",
		"output" : true,
		"running" : false,
		"runningConfirmation" : "Angular Live Development Server is listening on localhost:52400",
		"process": null  
	},
	{
		"name": "QvAHub-LAN Demo",
		"path": "G:\\qva\\QvAHub\\qvahub-lan-demo",
		"domain": "http://localhost",
		"port": 52401,
		"cmd": "ng serve --port PORT",
		"output" : true,
		"running" : false,
		"runningConfirmation" : "Angular Live Development Server is listening on localhost:52401",
		"process": null  
	}
]
```

## Development
Developed using QvATPC for efficient process management and testing.

![QvA Hub LAN](/docs/qvahublantpc.png)

## Community
Join our Google Group for discussions and updates:
queaso-van-alles@googlegroups.com

## License
MIT License - © 2025 Queaso van Alles