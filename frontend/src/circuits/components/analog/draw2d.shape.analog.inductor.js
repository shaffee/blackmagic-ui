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
 draw2d.shape.analog.inductor = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.inductor",
    dinput:'',
    clock:'',
    node1:'',
    node2:'',
    oldClk:'',
    rotatable:'yes',
    ngspiceSymbol:'L',
    // custom locator for the special design of the ResistorBridge Input area

    
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

        
        
        this._super({width:width,height:height});
        
        

        
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.inductor.inputLocator();
        
        this.node1 = this.createPort("hybrid",this.inputLocator);
        this.node2 = this.createPort("hybrid",this.inputLocator);

	    var labelLocator = new draw2d.shape.analog.inductor.labelLocator();
	    
	    this.params = {
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  },
		  inductance: {
		        "type": "string",
		        "title": "Inductance [Henry]",
		        //"format": "color"
		      }
		  /*
		  ,
		  labelPosition: {
		    "type": "string",
		    "title": "Label Position",
		    "enum": [ "Left", "Top", "Right", "Bottom" , "Inside" ]
		  }
		  */
		};

		
	    //this.addFigure( new draw2d.shape.basic.componentLabel("D") , labelLocator );
	    //this.addFigure( new draw2d.shape.basic.componentLabel("Q") , labelLocator );
	    //this.addFigure( new draw2d.shape.basic.componentLabel("Q") , labelLocator );
	    //this.addFigure( new draw2d.shape.basic.componentLabel("CLK") , labelLocator );

        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
    	
    	this.defaultRotation = 'v';
	    this.defaultWidth = '32';
	    this.rotation = 'v';
    },
    
	ngSpiceCommand: function(nodes,deviceIndex)
	{
		var data = this.getUserData();
		var values = data['formData'];
				
		var node1_name = nodes[this.node1.id];
		var node2_name = nodes[this.node2.id];
		
		
		if( typeof node1_name == 'undefined' || typeof node2_name == 'undefined' )
		{
			return {type:'error',msg:'connection error'};
		}
		
		var command = "L"+deviceIndex+" "+node1_name+" "+node2_name+" "+values.inductance;

		if( command.indexOf("undefined") != -1 )
		{
			return {type:'error',msg:'missing Parameters'};
		}
		
		return { type:'ngspice' , msg:command };
	},
    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="32" height="80" xmlns="http://www.w3.org/2000/svg"> <metadata id="metadata1312">image/svg+xml</metadata>   <title>Layer 1</title>  <rect opacity="0" id="svg_8" height="80" width="32" y="0" x="0" stroke-width="0" fill="none"/>  <path d="m16.526262,0.5l-0.026262,11.328786c0,0 7.258112,0 7.258112,7.23185c0,7.23185 -7.258112,7.23185 -7.258112,7.23185c0,0 7.258112,0 7.258112,7.23185c0,7.23185 -7.258112,7.23185 -7.258112,7.23185c0,0 7.258112,0 7.258112,7.23185c0,7.23185 -7.258112,7.23185 -7.258112,7.23185c0,0 7.258112,0 7.258112,7.23185c0,7.23185 -7.258112,7.23185 -7.258112,7.23185l0.026262,9.9438" id="svg_2" stroke-width="2" fill-rule="evenodd" fill-opacity="0.75" fill="none" stroke="#000000"/> </svg>';
    }
});


draw2d.shape.analog.inductor.inputLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.inductor.inputLocator',
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

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.inductor.labelLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.inductor.labelLocator', 
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