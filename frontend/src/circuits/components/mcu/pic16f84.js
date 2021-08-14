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
draw2d.shape.mcu.pic.pic16f84 = draw2d.shape.mcu.pic.extend({

    NAME:"draw2d.shape.mcu.pic.pic16f84",
    params:null,
    // custom locator for the special design of the ResistorBridge Input area
   label:null,
   labelLocator:null,
   pins:null,
   pinsCount:0,
   model:"PIC16F84",
   type:'MCU',
 	maps : {},
   
    onPortValueChanged: function(relatedPort){
    	//console.log(relatedPort.getValue());
        //var map = { 12:7 , 11:6 , 10:5 , 9:4 , 8:3 , 7:2 , 6:1 , 5:0 };

   		//var pin = map[relatedPort.getName()];
   		///mcu.setPortbBit(pin,relatedPort.getValue());
   		if( relatedPort.direction != "out" )
   		{
   			var name = relatedPort.getName().replace("pin","");
	   		
	   		if( prevValues[name] != relatedPort.getValue() )
	   		{
   				this.setPinValue( name , relatedPort.getValue() );
	   		}
   		}
		
   		//console.log(name);
    },
    
    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        
		this.pinsCount = 18;
        this._super();
        
        this.label.setText("PIC16F84");
	    
	    this.diagramFile = "pic16f84.png";
	    this.datasheet = "PIC16F84A.pdf";
	    
	    
		this.defaultValues = {label:"PIC16F84"};
		
		this.maps['portb'] = { 0:12 , 1:11 , 2:10 , 3:9 , 4:8 , 5:7 , 6:6 , 7:5 };
		this.maps['porta'] = { 0:17 , 1:18 , 2:1 , 3:2 };

    }
});