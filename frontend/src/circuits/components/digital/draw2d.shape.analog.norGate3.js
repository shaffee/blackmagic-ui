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
 *     canvas.add(figure,10,10);
 *     
 *     
 * @extends draw2d.SVGFigure
 */
 draw2d.shape.analog.norGate3 = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.norGate3",
    input1:"",
    input2:"",
    input3:"",
	output:"",
	operation:"NOR",

    
	timer10msTick: function(){
   
	    var in1 = this.input1.getValue();
	    var in2 = this.input2.getValue();
	    var in3 = this.input3.getValue();
	    
    	if( in1 != "1" && in2 != "1"  && in3 != "1")
    	{
	    	this.output.setValue("1");
    	}
    	else 
    		this.output.setValue("0");
    },

    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 90;
            height= 64;
        }
        
        this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
    	
        this._super(width,height);
        this.setCenter( 0 , 11.5 );
        this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.norGate3.inputLocator();
        this.outputLocator = new draw2d.shape.analog.norGate3.outputLocator();
        
        this.input1 = this.createPort("input",this.inputLocator);
        this.input2 = this.createPort("input",this.inputLocator);
        this.input3 = this.createPort("input",this.inputLocator);
         
        this.output = this.createPort("output",this.outputLocator);
        
        this.input1.setValue("0");
        this.input2.setValue("0");
        this.input3.setValue("0");
        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
    },
    

    getSVG: function(){
    	 this.setBackgroundColor(null);
        return '<svg width="90" height="64" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title> <title>Layer 1</title>  <line fill="none" stroke="#010101" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="75.56964" y1="32" x2="90.29801" y2="32" id="svg_8" stroke-linejoin="null" stroke-linecap="null"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="15.695" y1="16" x2="0.042" y2="16" id="svg_2"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="15.695" y1="48" x2="0.042" y2="48" id="svg_4"/>  <path fill="#FFFFFF" stroke-width="2" d="m8.139,0.74341l27.181,0c18.594,1.40154 31.19108,13.53231 40.46708,31.59273c-9.276,18.05652 -21.87308,29.29646 -40.46708,30.698l-27.181,0c13.52,-18.68527 13.52,-43.60448 0,-62.29073z" id="svg_5" stroke="#030404"/>  <circle fill="#FFFFFF" stroke-width="2" cx="80.09913" cy="32.32871" r="4.77501" id="svg_7" stroke="#030404"/>  <line stroke="#030404" fill="none" stroke-width="2" x1="17.56845" y1="32" x2="0.042" y2="32" id="svg_1"/></svg>';
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.norGate3.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.norGate3.inputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        
        if( index == 0 )
        figure.setPosition(0, 16);
        if( index == 1 )
        figure.setPosition(0, 48);
        if( index == 2 )
        figure.setPosition(0, 32);
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.norGate3.outputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.norGate3.outputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        
        figure.setPosition(w-1, 32);
    }
});
