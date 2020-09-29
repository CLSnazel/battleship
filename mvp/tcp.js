const net = require('net');
const ip = require('ip');
const { connected } = require('process');

class TCP {
  // constructor(peerIP, peerPort, playerPort) {
  //   //this.socket = net.socket()
  //   this.senderReady = false;
  //   //this. receiverReady = false; Do I need this?

  //   //setting up receiver (aka a server);
  //   this.receiver = net.createServer();
  //   this.receiver.listen(playerPort, () => {
  //     console.log(`Opening for connections on port ${playerPort}`);
  //     console.log(`Command for other player: <file> ${ip.address()} ${playerPort} ${peerPort}`);
  //   })

    
  //   this.sender;
  //   this.receiver.on('connection', (client) => {
  //     // this.sender = client;
  //     console.log('somone has connected!');
  //   });
  //   this.sender = new net.Socket();
  //   this.sender.connect(peerPort, peerIP);
  //   //this.sender = net.createConnection({host:peerIP, port:peerPort});
  //   this.sender.on('connect', () => {
  //       console.log('I have connected!');
  //       console.log("Sender:",this.sender.address());
  //   })
    
  //   //catch ECONNECTREFUSED. Often the other player is not ready first,
  //   //so instead of dying, we wait for the server to recieve a connection
  //   //this.receiver.on('connection' (client)), the param client is a socket
  //   //so we save this socket for sending messages later.
  //   this.sender.on('error', () => {
  //     console.log("Waiting for connection...");
  //     //adding another listener that will save the socket when the other player connects
  //     this.receiver.on('connection', (client) => {
  //       this.sender = client;
  //       // this.sender = net.createConnection({host:peerIP, port:peerPort});
  //       // this.sender.on('connect', () => {
  //       //     console.log('I have connected!');
  //       //     console.log("Sender:",this.sender.address());
  //       // })
  //       console.log("Client",client.address());
  //     });
  //   });

  //   this.receiver.on('data', (data) => {
  //     console.log("RECEIVER RECEIVED", data);
  //   });
  //   this.sender.on('data', (data) => {
  //     console.log("SENDER RECEIVED:", data);
  //   });
  //   //this.sender.on('data')
  // }
  constructor(peerIP, peerPort, playerPort) {
    this.server;
    this.client = net.createConnection(peerPort, peerIP , () => {
        console.log('Client connection created');
        console.log(this.client.address(), this.client.remoteAddress, this.client.remotePort );
        this.client.on('data', (data) => {
          console.log("SENDER RECEIVED:", data);
        });
      });
    this.client.on('error', (error) => {
      console.log('Waiting for connection...');
      console.log(error);
      this.server = net.createServer()
      this.server.listen(playerPort, () => {
        console.log(`Listening on port ${playerPort}...`);
        console.log(`Command for other player: node mvp/serverTest.js ${this.server.address().address} ${playerPort} ${peerPort}`);
      });
      this.server.on('connect', (client) => {
        console.log("Client connection found");
        this.client = client;
        console.log(this.client.address());
      });
      this.server.on('data', (data) => {
        console.log("RECEIVER RECEIVED", data);
      });
    });  
    
    //this.sender.on('data')
  }

  
  writeTest(data) {
    console.log('sending data...', data);
    this.client.write(data, 'utf-8');
  }
  //receiveData(data) /// callback given to this.receiver.on('data') to process data;
}

module.exports = TCP;