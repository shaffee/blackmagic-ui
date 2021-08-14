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
 draw2d.shape.analog.dcCurrent = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.dcCurrent",
    node1:'',
    node2:'',
   	ngspiceSymbol:'I',
	valueField:'Current',
	simulations : ['dc_sweep','dc_bias','ac_analysis','transient_response'],
	
    // custom locator for the special design of the ResistorBridge Input area

    
	onPortValueChanged: function(relatedPort){
   
	    
	    		

	    if( relatedPort.getName() == "clock" && this.clock.getValue() != this.oldClk )
	    {
	    	
	    	if( this.clock.getValue() == "1" && this.oldClk == "0" )
	    	{
	    		
	    		if( this.dinput.getValue() == "1" )
	    		{
	    			//delay(100000010000001000000);
	    		    this.qout1.setNextNodeValue("1");
	    			this.qout2.setNextNodeValue("0");
	    		}
	    		else
	    		{
	    			//delay(100000010000001000000);
	    			this.qout1.setNextNodeValue("0");
	    			this.qout2.setNextNodeValue("1");
	    		}
	    		
	    		this.oldClk = this.clock.getValue();	
	    		
	    		this.clock.setNextNodeValue("1");
	    	}
	    	else if( this.clock.getValue() == "0" && this.oldClk == "1"  )
	    	{
	    		this.oldClk = this.clock.getValue();
	    		this.clock.setNextNodeValue("0");	
	    	}
		    
	
	
		    this.oldClk = this.clock.getValue();
	    }
    },

    
    init:function(width, height){
        width = 32;
        height= 80;
        this.defaultRotation = 'v';
	    this.defaultWidth = '32';
	    this.rotation = 'v';
	    
	    this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
    	
        this._super({width:width,height:height});
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.dcCurrent.inputLocator();
        
        this.node1 = this.createPort("hybrid",this.inputLocator);
        this.node2 = this.createPort("hybrid",this.inputLocator);

	    var labelLocator = new draw2d.shape.analog.dcCurrent.labelLocator();
		this.defaultValues = { label:'I',Ampere:'1a',frequency:'1000000' };

	    this.params = {
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  },
		  Ampere: {
		        "type": "string",
		        "title": "Ampere",
		        //"format": "color"
		      }
	    }
	   
    },
    
	ngSpiceCommand: function(nodes,deviceIndex)
	{
		var data = this.getUserData();
		var values = data['formData'];
				
		var node1_name = nodes[this.node1.id];
		var node2_name = nodes[this.node2.id];
		
		 console.log("A" +values.Ampere);
		if( typeof node1_name == 'undefined' || typeof node2_name == 'undefined' )
		{
			return {type:'error',msg:'connection error'};
		}
		
		var command = "I"+deviceIndex+" "+node1_name+" "+node2_name+" "+values.Ampere;

		if( command.indexOf("undefined") != -1 )
		{
			return {type:'error',msg:'missing Parameters'};
		}
		
		
		return { type:'ngspice' , msg:command };
	},
	
    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="32" height="80" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title> <title>Layer 1</title>  <line stroke-linecap="round" stroke-linejoin="round" id="svg_3" y2="23" x2="16.5" y1="0.5" x1="16.5" fill-opacity="null" stroke-opacity="null" stroke-width="2" stroke="#000000" fill="none"/>  <line stroke="#000000" stroke-linecap="round" stroke-linejoin="round" id="svg_4" y2="80" x2="16.5" y1="56.02291" x1="16.5" fill-opacity="null" stroke-opacity="null" stroke-width="2" fill="none"/>  <ellipse fill="#ffffff" stroke="#000000" stroke-width="2" stroke-opacity="null" cx="16" cy="40" id="svg_1" rx="16" ry="16"/>  <path id="svg_2" d="m12.06759,34.54031l3.93241,-5.33942l3.93241,5.33942l-7.86482,0z" stroke-opacity="null" stroke-width="2" stroke="#000000" fill="#000000"/>  <line stroke="#000000" stroke-linecap="round" stroke-linejoin="round" id="svg_6" y2="49.6952" x2="16" y1="32.212" x1="16" fill-opacity="null" stroke-opacity="null" stroke-width="2" fill="none"/> </svg>';
    }
});

draw2d.shape.analog.dcCurrent.inputLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.dcCurrent.inputLocator',
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

draw2d.shape.analog.dcCurrent.labelLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.dcCurrent.labelLocator',
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