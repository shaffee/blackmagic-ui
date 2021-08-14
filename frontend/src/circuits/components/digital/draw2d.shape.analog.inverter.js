import draw2d from 'draw2d';

/**
Library is under GPL License (GPL)

Copyright (c) 2012 Andreas Herz

**/



/**
 * @class draw2d.shape.analog.ResistorVertical
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var figure =  new draw2d.shape.analog.ResistorVertical();
 *     canvas.add(figure,10,10);
 *     
 *     
 * @extends draw2d.SVGFigure
 */
 draw2d.shape.analog.inverter = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.inverter",
    input:"",
	output:"",
	operation:"*",

     onPortValueChanged: function(relatedPort){

	    //var outputVal = this.output.getValue() != null ? this.output.getValue() : "0";
	    
    	if( this.input.getValue()=="1" &&  ( this.output.getValue()=="1" || this.output.getValue() == null ))
    	{
    		this.output.setValue("0");
    	}
    	else if( this.input.getValue()=="0"&&  ( this.output.getValue()=="0" || this.output.getValue() == null ))
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
            width = 64;
            height= 32;
        }
        
        this._super({width:width,height:height});
        this.inputLocator = new draw2d.shape.analog.inverter.inputLocator();
        this.outputLocator = new draw2d.shape.analog.inverter.outputLocator();

        this.input = this.createPort("input", this.inputLocator); 
        this.input.delayed = 'yes';

        
        this.output = this.createPort("output",this.outputLocator);
        
    },

       
    getSVG: function(){
    	 this.setBackgroundColor(null);
         return '<svg width="64" height="32" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <rect fill="none" stroke="null" stroke-width="0" stroke-opacity="null" x="0" y="0" width="64" height="32" id="svg_9"/>  <line stroke="#030404" fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="46.54381" y1="16.5" x2="64.5" y2="16.5" id="svg_7" stroke-linejoin="null" stroke-linecap="null"/>  <path fill="#FFFFFF" stroke-width="2" d="m45.87007,16.29029l-31,-15.43494l0,30.86987l31,-15.43493z" id="svg_1" stroke="#030404"/>  <circle fill="#FFFFFF" stroke="#030404" stroke-width="2" cx="49.1015" cy="17" r="3" id="svg_3"/>  <line stroke="#030404" fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="0.5" y1="16.5" x2="14.20242" y2="16.5" id="svg_8" stroke-linejoin="null" stroke-linecap="null"/> </svg>';
    },
    

    
    
});

// custom locator for the special design of the Input area
draw2d.shape.analog.inverter.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.inverter.inputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var h = figure.getParent().getHeight();
        figure.setPosition(0, 16);
    }
});

// custom locator for the special design of the Output area
draw2d.shape.analog.inverter.outputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.inverter.outputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        figure.setPosition(w, 16);
    }
});
