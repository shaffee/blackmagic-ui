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
 draw2d.shape.analog.BCDC = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.BCDC",
    clock:'',
    A0:'',
    A1:'',
    A2:'',
    A3:'',
    CLR:'',
    temp: 0,
    oldClk:'',
 
       
  timer10msTick: function(){ 

	    if( this.clock.getValue() != this.oldClk )
	    {

	    		if( this.CLR.getValue() == "1" )
	    	{
   	 				this.temp = 0b0000;
   	 				this.A0.setValue("0");
	    			this.A1.setValue("0");
	    			this.A2.setValue("0");
	    			this.A3.setValue("0"); 
	    		}
	    		else 
	    		if( this.clock.getValue() == "1" && this.CLR.getValue() != "1"  && this.oldClk == "0" )
	    		{
	    			console.log(this.temp);	
	    			if ( this.temp < 10 )
	    			{
	    				
	    				if(this.temp == 0)
	    				{
		    				this.A0.setValue("0");
		    				this.A1.setValue("0");
		    				this.A2.setValue("0");
		    				this.A3.setValue("0");
	    				}
	    				else if ( this.temp == 1 )
	    				{
		    				this.A0.setValue("1");
		    				this.A1.setValue("0");
		    				this.A2.setValue("0");
		    				this.A3.setValue("0");
	    				}
	    				else if ( this.temp == 2 )
	    				{
	    					this.A1.setValue("1");
		    				this.A0.setValue("0");
		    				this.A2.setValue("0");
		    				this.A3.setValue("0");
	    				}
	    				else if ( this.temp == 3 )
	    				{
		    				this.A0.setValue("1");
		    				this.A1.setValue("1");
		    				this.A2.setValue("0");
		    				this.A3.setValue("0");
	    				}
	    				else if ( this.temp == 4 )
	    				{
		    				this.A0.setValue("0");
		    				this.A1.setValue("0");
		    				this.A2.setValue("1");
		    				this.A3.setValue("0");
	    				}
	    				else if ( this.temp== 5 )
	    				{
		    				this.A0.setValue("1");
		    				this.A1.setValue("0");
		    				this.A2.setValue("1");
		    				this.A3.setValue("0");
	    				}
	    				else if ( this.temp == 6 )
	    				{
		    				this.A0.setValue("0");
		    				this.A1.setValue("1");
		    				this.A2.setValue("1");
		    				this.A3.setValue("0");
	    				}
	    				else if ( this.temp == 7 )
	    				{
		    				this.A0.setValue("1");
		    				this.A1.setValue("1");
		    				this.A2.setValue("1");
		    				this.A3.setValue("0");
	    				}
	    				else if ( this.temp == 8 )
	    				{
		    				this.A0.setValue("0");
		    				this.A1.setValue("0");
		    				this.A2.setValue("0");
		    				this.A3.setValue("1");
	    				}
	    				else if ( this.temp == 9 )
	    				{
		    				this.A0.setValue("1");
		    				this.A1.setValue("0");
		    				this.A2.setValue("0");
		    				this.A3.setValue("1");
		    				this.temp = -1 ;
	    				}
	    					this.temp = this.temp + 1 ;
	    				
	    				}
	    			
	 	 }						this.oldClk = this.clock.getValue();	
    		
    	}


	    this.oldClk = this.clock.getValue();
    },

    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
         	 width = 108;
            height= 80;
        }
        this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
    	
        this._super({width:width,height:height});
        this.inputLocator = new draw2d.shape.analog.BCDC.inputLocator();
        this.outputLocator = new draw2d.shape.analog.BCDC.outputLocator();
        
        this.clock  = this.createPort("input",this.inputLocator);
        this.CLR = this.createPort("input",this.inputLocator);
        
        this.oldClk = "0";
        this.clock.setName("clock");
        this.A0 = this.createPort("output",this.outputLocator);
        this.A1 = this.createPort("output",this.outputLocator);
	    this.A2 = this.createPort("output",this.outputLocator);
	    this.A3 = this.createPort("output",this.outputLocator);
	    


        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
    },
    

    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="112" height="80" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title>   <title>Layer 1</title>  <line fill="none" stroke="#010202" stroke-width="2" x1="12.455" y1="16.5" x2="0.5" y2="16.5" id="svg_1"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="12.455" y1="64.5" x2="1" y2="64.5" id="svg_2"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="32.5" x2="100.54509" y2="32.5" id="svg_3"/>  <rect x="12.98" y="0" fill="#ffffff" stroke-width="2" width="87.54127" height="80" id="svg_4" stroke="#010202"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="16.5" x2="100.54509" y2="16.5" id="svg_5"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="64.5" x2="100.54509" y2="64.5" id="svg_6"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="48.5" x2="100.54509" y2="48.5" id="svg_8"/>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_10" y="20.56266" x="16.87532" stroke-width="0" stroke="#000" fill="#000000">CLK</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_12" y="69.56226" x="16.25033" stroke-width="0" stroke="#000" fill="#000000">RESET</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_13" y="20.43766" x="78.99981" stroke-width="0" stroke="#000" fill="#000000">Q0</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_14" y="37.06252" x="78.99981" stroke-width="0" stroke="#000" fill="#000000">Q1</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_16" y="53.18739" x="78.49981" stroke-width="0" stroke="#000" fill="#000000">Q2</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_17" y="69.18726" x="78.49981" stroke-width="0" stroke="#000" fill="#000000">Q3</text></svg>';
    }
});

draw2d.shape.analog.BCDC.inputLocator = draw2d.layout.locator.Locator.extend({
	NAME: 'draw2d.shape.analog.BCDC.inputLocator',
	init:function( ){
	  this._super();
	},    
	relocate:function(index, figure){
		var w = figure.getParent().getWidth();
		var h = figure.getParent().getHeight();
	
	  if( index == 0 )
			figure.setPosition(0, 16);
	  if( index == 1 )
			figure.setPosition(0, 64);

	}
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.BCDC.outputLocator = draw2d.layout.locator.Locator.extend({
	NAME: 'draw2d.shape.analog.BCDC.outputLocator',
	init:function( ){
	  this._super();
	},    
	relocate:function(index, figure){
		console.log("figureee",figure);
		var w = figure.getParent().getWidth();
		var h = figure.getParent().getHeight();

   figure.setPosition(w, index*16+16);

	}
});
