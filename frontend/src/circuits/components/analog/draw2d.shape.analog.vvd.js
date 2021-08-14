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
draw2d.shape.analog.vvd = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.vvd",
    node1:'',
    node2:'',
    node3:'',
    node4:'',
   	ngspiceSymbol:'E',
	valueField:'voltage',
	simulations : ['dc_sweep','dc_bias','ac_analysis','transient_response'],
	

    
	onPortValueChanged: function(relatedPort){
   
	    
	    		
	    //var outputVal = this.output.getValue() != null ? this.output.getValue() : "0";

	    if( relatedPort.getName() == "clock" && this.clock.getValue() != this.oldClk )
	    {
	    	//console.log(relatedPort);
	    	
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

    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        width = 32;
        height= 80;
        this.defaultRotation = 'v';
	    this.defaultWidth = '32';
	    this.rotation = 'v';
	    
        this._super({width:width,height:height});
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.vvd.inputLocator();
        
        this.node1 = this.createPort("hybrid",this.inputLocator);
        this.node2 = this.createPort("hybrid",this.inputLocator);
        this.node3 = this.createPort("hybrid",this.inputLocator);
        this.node4 = this.createPort("hybrid",this.inputLocator);

	    var labelLocator = new draw2d.shape.analog.vvd.labelLocator();
		this.defaultValues = { label:'AVx',voltageG:'1'};

	    this.params = {
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  },
		  voltageG: {
		        "type": "string",
		        "title": "voltage gain",
		        
		      }
	
		};



    },
    
	ngSpiceCommand: function(nodes,deviceIndex)
	{
		var data = this.getUserData();
		var values = data['formData'];
		
		
		
		var node1_name = nodes[this.node1.id];
		var node2_name = nodes[this.node2.id];
		var node3_name = nodes[this.node3.id];
		var node4_name = nodes[this.node4.id];
		
		if( typeof node1_name == 'undefined' || typeof node2_name == 'undefined' )
		{
			return {type:'error',msg:'connection error'};
		}
		
		var command = "E"+deviceIndex+" "+node1_name+" "+node2_name+" "+node3_name+" "+node4_name+" "+values.voltageG;

		if( command.indexOf("undefined") != -1 )
		{
			return {type:'error',msg:'missing Parameters'};
		}
		
		
		return { type:'ngspice' , msg:command };
	},
	
    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="32" height="80" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title> <title>Layer 1</title>  <line fill="none" stroke="#000000" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="16.5" y1="0.5" x2="16.5" y2="23" id="svg_3" stroke-linejoin="round" stroke-linecap="round"/>  <line fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="16.5" y1="56.02291" x2="16.5" y2="80" id="svg_4" stroke-linejoin="round" stroke-linecap="round" stroke="#000000"/>  <path fill="#ffffff" stroke-width="2" stroke-opacity="null" fill-opacity="null" d="m2.9152,39.59763l13.55718,-16.53314l13.55718,16.53314l-13.55718,16.53314l-13.55718,-16.53314z" id="svg_2" stroke="#000000"/>  <line fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="null" y1="48" x2="9.76464" y2="48" id="svg_6" stroke-linejoin="null" stroke-linecap="null" stroke="#000000" x1="0"/>  <text fill="#000000" stroke="#000000" stroke-width="0" stroke-opacity="null" fill-opacity="null" x="12.01441" y="45.48954" id="svg_7" font-size="16" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">v</text>  <text fill="#000000" stroke="#000000" stroke-width="0" stroke-opacity="null" fill-opacity="null" x="10.33149" y="33.67017" id="svg_8" font-size="3" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">+</text>  <text fill="#000000" stroke="#000000" stroke-width="0" stroke-opacity="null" fill-opacity="null" x="11.27624" y="47.84143" id="svg_9" font-size="3" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">-</text>  <rect fill="none" stroke="#000000" stroke-width="0" stroke-opacity="null" fill-opacity="null" x="0" y="0" width="32" height="80" id="svg_10"/>  <line stroke="#000000" fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="null" y1="32.5" x2="9.16974" y2="32.5" id="svg_1" stroke-linejoin="null" stroke-linecap="null" x1="0"/></svg>';
    }
});

    // custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.vvd.inputLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.vvd.inputLocator',
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
	        var r = figure.getParent().rotationAngle;
	        	console.log("X="+ r);
            if( r == 0 )
            {
	            if( index == 0 )
	            	figure.setPosition(16, 0);
	            if( index == 1 )
	            	figure.setPosition(16, 80);
	            if( index == 2 )
	            	figure.setPosition(0, 32);
	            if( index == 3 )
	            	figure.setPosition(0, 48);
            }
            else if( r == 90 )
            {
	            if( index == 0 )
	            	figure.setPosition(80, 16);
	            if( index == 1 )
	            	figure.setPosition(0, 16);
	           	if( index == 2 )
	            	figure.setPosition(32, 0);
	            if( index == 3 )
	            	figure.setPosition(48, 0);
            }
            else if( r == 180 )
            {
	            if( index == 0 )
	            	figure.setPosition(16, 80);
	            if( index == 1 )
	            	figure.setPosition(16, 0);
	            if( index == 2 )
	            	figure.setPosition(32, 32);
	            if( index == 3 )
	            	figure.setPosition(32, 48);
            }
            else if( r == 270 )
            {
	            if( index == 0 )
	            	figure.setPosition(0, 16);
	            if( index == 1 )
	            	figure.setPosition(80, 16);
	            if( index == 2 )
	            	figure.setPosition(32, 32);
	            if( index == 3 )
	            	figure.setPosition(48, 32);
            }
        }
    });

    draw2d.shape.analog.vvd.labelLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.vvd.labelLocator',
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();

            if( index == 1 )
            figure.setPosition(15, 5);
         
        }
    });