/**
Library is under GPL License (GPL)

Copyright (c) 2012 Andreas Herz

**/



/**
 * @class draw2d.shape.analog.ResistorBridge
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var figure =  new draw2d.shape.analog.ResistorBridge();
 *     canvas.addFigure(figure,10,10);
 *     
 *     
 * @extends draw2d.SVGFigure
 */
draw2d.shape.mcu.pic.pic16f877a = draw2d.shape.mcu.pic.extend({

    NAME:"draw2d.shape.mcu.pic.pic16f877a",
    params:null,
    // custom locator for the special design of the ResistorBridge Input area
   label:null,
   labelLocator:null,
   pins:null,
   pinsCount:0,
   model:"PIC16F877A",
   type:'MCU',
 	maps : {},
 	pinsPositions: {},
	speeds: ["4","8"],
    onPortValueChanged: function(relatedPort){
        //var map = { 12:7 , 11:6 , 10:5 , 9:4 , 8:3 , 7:2 , 6:1 , 5:0 };
    	//console.log(relatedPort.getValue());

   		//var pin = map[relatedPort.getName()];
   		///mcu.setPortbBit(pin,relatedPort.getValue());
   		if( relatedPort.direction != "out" )
   		{
   			var name = relatedPort.getName().replace("pin","");

	   		if( typeof this.prevValues[name] == 'undefined' || this.prevValues[name] != relatedPort.getValue() )
	   		{
   				this.setPinValue( name , relatedPort.getValue() );
   				
	   			this.prevValues[name] = relatedPort.getValue();
	   		}
	   		
	   		
   		}
		
   		//console.log(name);
    },
    
    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height)
    {
        
		this.pinsPositions =  {
									'right':
									{
										'B':{0:33,1:34,2:35,3:36,4:37,5:38,6:39,7:40},
										'D':{0:19,1:20,2:21,3:22,4:27,5:28,6:29,7:30},
	
									},
									
									'left':
									{
										'A':{0:2,1:3,2:4,3:5,4:6,5:7},
										'C':{0:15,1:16,2:17,3:18,4:23,5:24,6:25,7:26},
									}
								};
								
        this.portSpacing = 16;
		this.pinsCount = 40;
		this.layout = "vertical";
        this._super();
        
        this.label.setText("PIC16F877A");
	    
	    this.diagramFile = "pic16f877a.png";
	    this.datasheet = "pic16f877a.pdf";
	    
		this.defaultValues = {label:"PIC16F84"};
		
		this.maps['portb'] = { 0:33 , 1:34 , 2:35 , 3:36 , 4:37 , 5:38 , 6:39 , 7:40 };
		this.maps['porta'] = { 0:2 , 1:3 , 2:4 , 3:5 , 4:6 , 5:7  };
		this.maps['portc'] = { 0:15 , 1:16 , 2:17 , 3:18 , 4:23 , 5:24 , 6:25 , 7:26  };
		this.maps['portd'] = { 0:19 , 1:20 , 2:21 , 3:22 , 4:27 , 5:28 , 6:29 , 7:30  };
		

											
    }
});