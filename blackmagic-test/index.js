var ATEM = require('applest-atem');
 
var atem = new ATEM();
atem.connect('192.168.1.20'); // Replace your ATEM switcher. address.
 
atem.on('connect', function() {
  //atem.changeProgramInput(1); // ME1(0)
  //atem.changePreviewInput(2); // ME1(0)
  //atem.autoTransition(); // ME1(0)
  //atem.changeProgramInput(3, 1); // ME2(1)


  var data = Buffer.alloc(20);
		
  //434b436b
  //88:24:80:6c:0a:ce:00:00:00:00:0d:3f:00:18:00:00:43:4b:43:6b: 
  
  //08:00:00:00:92:80:  0d:4f :9a:60  :03:e8: 00:00:00:00

  data.writeUInt8(0, 0);

				
  //Keyer
  data.writeUInt8(0, 1);

  /* Type
  0: Luma
  1: Chroma
  2: Pattern
  3: DVE
  */
  data.writeUInt32BE(1, 2);

  
  //Key Enabled?	
  data.writeUInt8(255, 3);
  data.writeUInt8(255, 4);
  data.writeUInt8(1, 5);

  //Fill Source 6-7
  data.writeUInt16BE(2001, 6);

  
  //Key Source 8-9
  data.writeUInt16BE(2, 8);

  //masked 
  //masked 
  data.writeUInt8(1, 10);
  // unknown
  data.writeUInt8(1, 11);

  // 
  data.writeUInt16BE(0, 12);
  data.writeUInt16BE(0, 14);
  data.writeUInt16BE(0, 16);
  data.writeUInt16BE(0, 1);




  atem._sendCommand('KeBP', data);
});
 
atem.on('stateChanged', function(err, state) {
  //console.log(state); // catch the ATEM state.
});
//console.log(atem.state); // or use this.
