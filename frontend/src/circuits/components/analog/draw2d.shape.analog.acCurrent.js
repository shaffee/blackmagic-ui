import draw2d from 'draw2d';
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
 draw2d.shape.analog.acCurrent = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.acCurrent",
    dinput:'',
    clock:'',
    node1:'',
    node2:'',
	ngspiceSymbol:'I',
	simulations : ['dc_bias','ac_analysis','transient_response'],
    // custom locator for the special design of the ResistorBridge Input area

    
	onPortValueChanged: function(relatedPort){

    },

       init:function(width, height){
        width = 32;
        height= 80;
        this.defaultRotation = 'v';
	    this.rotation = 'v';
	    
	    this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
    	
        this._super({width:width,height:height});
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.acCurrent.inputLocator();
        
        this.node1 = this.createPort("hybrid",this.inputLocator);
        this.node2 = this.createPort("hybrid",this.inputLocator);

	    var labelLocator = new draw2d.shape.analog.acCurrent.labelLocator();
	    
		this.defaultValues = { label:'I',voltage:'1a',frequency:'1000000' };

	    this.params = {
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  },
		  Current: {
		        "type": "string",
		        "title": "Current",
		      },
		  frequency: {
		        "type": "number",
		        "title": "Frequency [Hz]",
		      }
		 
		};


	},
    
	ngSpiceCommand: function(nodes,deviceIndex)
	{
		var data = this.getUserData();
		var values = data['formData'];
		
		var node1_name = nodes[this.node1.id];
		var node2_name = nodes[this.node2.id];

		var command = "I"+deviceIndex+" "+node1_name+" "+node2_name+" AC ( "+values.Current+" 0 ) sin(0 "+values.Current+" "+values.frequency+")";
		
		
		//var command = "V"+deviceIndex+" "+node1_name+" "+node2_name+" AC ( 1V 0 ) SINE ( 1.0 1.0 1Khz 0.0S 0.0 )";

		if( typeof node1_name == 'undefined' || typeof node2_name == 'undefined' )
		{
			return {type:'error',msg:'connection error'};
		}
		
		if( command.indexOf("undefined") != -1 )
		{
			return {type:'error',msg:'missing Parameters'};
		}
		
		
		return { type:'ngspice' , msg:command };		
	},
	
    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="32" height="80" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title>  <title>Layer 1</title>  <line stroke-linecap="round" stroke-linejoin="round" id="svg_3" y2="23" x2="16.5" y1="0.5" x1="16.5" fill-opacity="null" stroke-opacity="null" stroke-width="2" stroke="#000000" fill="none"/>  <line stroke="#000000" stroke-linecap="round" stroke-linejoin="round" id="svg_4" y2="80" x2="16.5" y1="56.02291" x1="16.5" fill-opacity="null" stroke-opacity="null" stroke-width="2" fill="none"/>  <ellipse fill="#ffffff" stroke="#000000" stroke-width="2" stroke-opacity="null" cx="16" cy="40" id="svg_1" rx="16" ry="16"/>  <path fill="none" stroke="#050202" stroke-width="2" opacity="0.5" d="m5.84527,47.33847c5.1093,-4.98156 6.2589,-5.36476 10.85726,-0.3832c4.59836,4.98156 7.66395,-1.27732 8.94128,-2.93784" id="svg_6"/>  <path id="svg_2" d="m13.99457,30.62739l2.00543,-2.83695l2.00543,2.83695l-4.01086,0z" stroke-opacity="null" stroke-width="2" stroke="#000000" fill="#000000"/>  <line stroke="#000000" stroke-linecap="round" stroke-linejoin="round" id="svg_5" y2="40.18486" x2="16" y1="29.60992" x1="16" fill-opacity="null" stroke-opacity="null" stroke-width="2" fill="none"/></svg>';
    }
});


draw2d.shape.analog.acCurrent.inputLocator = draw2d.layout.locator.PortLocator.extend({
	NAME : "draw2d.shape.analog.acCurrent.inputLocator",
	init:function( ){
	  this._super();
	},    
	relocate:function(index, figure){
		var w = figure.getParent().getWidth();
		var h = figure.getParent().getHeight();
		var r = figure.getParent().rotationAngle;

		if( r == 0 )
		{
			if( index == 0 )
				figure.setPosition(16, 0);
			if( index == 1 )
				figure.setPosition(16, 80);
		}
		else if( r == 90 )
		{
			if( index == 0 )
				figure.setPosition(80, 16);
			if( index == 1 )
				figure.setPosition(0, 16);
		}
		else if( r == 180 )
		{
			if( index == 0 )
				figure.setPosition(16, 80);
			if( index == 1 )
				figure.setPosition(16, 0);
		}
		else if( r == 270 )
		{
			if( index == 0 )
				figure.setPosition(0, 16);
			if( index == 1 )
				figure.setPosition(80, 16);

		}
	}
});

draw2d.shape.analog.acCurrent.labelLocator = draw2d.layout.locator.PortLocator.extend({
	NAME : "draw2d.shape.analog.acCurrent.labelLocator",
	init:function( ){
	  this._super();
	},    
	relocate:function(index, figure){
		var w = figure.getParent().getWidth();
		var h = figure.getParent().getHeight();

		if( index == 1 )
		figure.setPosition(15, 5);
		if( index == 2 )
		figure.setPosition(w-32, 5);
		if( index == 3 )
		figure.setPosition(w-30, h-26);
		if( index == 4 )
		figure.setPosition(15, h-28);
	}
});