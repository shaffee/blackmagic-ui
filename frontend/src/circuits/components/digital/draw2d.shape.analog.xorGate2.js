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
 draw2d.shape.analog.xorGate2 = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.xorGate2",
    input1:"",
    input2:"",
	output:"",
	operation:"XOR",


     onPortValueChanged: function(relatedPort){
   
	    //var outputVal = this.output.getValue() != null ? this.output.getValue() : "0";
	    var in1 = this.input1.getValue();
	    var in2 = this.input2.getValue();

    	if(  ((in1 == "1" && in2 == "0" )||( in1=="0" && in2=="1")) && ( this.output.getValue()=="0" || this.output.getValue() == null ))
    	{
    		this.output.setValue("1");
    	}
    	else if( ((in1 == "1" && in2 == "1" )||( in1=="0" && in2=="0")) && (this.output.getValue()=="1" || this.output.getValue() == null) )
       	{
	    	this.output.setValue("0");
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
        
        this._super({width:width,height:height});
        this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.xorGate2.inputLocator();
        this.outputLocator = new draw2d.shape.analog.xorGate2.outputLocator();
        
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
         return '<svg width="89.99999999999999" height="64" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <rect fill="none" stroke="#030404" stroke-width="0" stroke-opacity="null" fill-opacity="null" x="0" y="0" width="90" height="64" id="svg_7"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="16.5" y1="16.5" x2="0.5" y2="16.5" id="svg_2"/>  <line stroke="#030404" fill="none" stroke-width="2" x1="78.259304" y1="32.5" x2="88.916648" y2="32.5" id="svg_3"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="16" y1="48.5" x2="0.5" y2="48.5" id="svg_4"/>  <path stroke="#030404" fill="#FFFFFF" stroke-width="2" d="m8.139,0.8543l26.47315,0c18.109773,1.402499 34.521389,13.453894 43.555822,31.526657c-9.034433,18.068867 -25.446049,29.404149 -43.555822,30.806648l-26.47315,0c13.167911,-18.698043 13.167911,-43.634287 0,-62.333305z" id="svg_5"/>  <path fill="none" stroke="#030404" stroke-width="2" d="m3.799,64c13.52,-19.199 13.52,-44.801 0,-64" id="svg_6"/> </svg>';
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.xorGate2.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.xorGate2.inputLocator',
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
draw2d.shape.analog.xorGate2.outputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.xorGate2.outputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        
        figure.setPosition(w-1, 32);
    }
});