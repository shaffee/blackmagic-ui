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
 draw2d.shape.analog.xnorGate2 = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.xnorGate2",
    input1:"",
    input2:"",
	output:"",
	operation:"XNOR",


  onDoubleClick: function(){
    },
    
     onPortValueChanged: function(relatedPort){
   
	    //var outputVal = this.output.getValue() != null ? this.output.getValue() : "0";
	    var in1 = this.input1.getValue();
	    var in2 = this.input2.getValue();

    	if(  ((in1 == "1" && in2 == "0" )||( in1=="0" && in2=="1")) && ( this.output.getValue()=="1" || this.output.getValue() == null ))
    	{
	    	this.output.setValue("0");
    	}
    	else if( ((in1 == "1" && in2 == "1" )||( in1=="0" && in2=="0")) && (this.output.getValue()=="0" || this.output.getValue() == null) )
       	{
    		this.output.setValue("1");
    	}
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
        
        this._super(width,height);
        this.setCenter( 0 , 11.5 );
        this.setResizeable(false);
        this.inputLocator = new this.MyInputPortLocator();
        this.outputLocator = new this.MyOutputPortLocator();
        
        this.input1 = this.createPort("input",this.inputLocator);
        this.input2 = this.createPort("input",this.inputLocator);
        
        this.output = this.createPort("output",this.outputLocator);
        
        this.input1.setValue("0");
        this.input2.setValue("0");
        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
    },
    

    getSVG: function(){
    	 this.setBackgroundColor(null);
         return '<svg width="90" height="64" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <line stroke-linecap="null" stroke-linejoin="null" id="svg_8" y2="32.5" x2="90.29801" y1="32.5" x1="75.56964" fill-opacity="null" stroke-opacity="null" stroke-width="2" stroke="#010101" fill="none"/>  <line id="svg_2" y2="16.5" x2="0.042" y1="16.5" x1="15.695" stroke-width="2" stroke="#030404" fill="none"/>  <line id="svg_4" y2="48.5" x2="0.042" y1="48.5" x1="15.695" stroke-width="2" stroke="#030404" fill="none"/>  <path stroke="#030404" id="svg_5" d="m8.139,0.74341l27.181,0c18.594,1.40154 31.19108,13.53231 40.46708,31.59273c-9.276,18.05652 -21.87308,29.29646 -40.46708,30.698l-27.181,0c13.52,-18.68527 13.52,-43.60448 0,-62.29073z" stroke-width="2" fill="#FFFFFF"/>  <path id="svg_6" d="m3.799,64c13.52,-19.199 13.52,-44.801 0,-64" stroke-width="2" stroke="#030404" fill="none"/>  <circle stroke="#030404" id="svg_7" r="4.77501" cy="32.32871" cx="80.09913" stroke-width="2" fill="#FFFFFF"/> </svg>';
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.xnorGate2.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.xnorGate2.inputLocator',
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
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.xnorGate2.outputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.xnorGate2.outputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        
        figure.setPosition(w-1, 32);
    }
});