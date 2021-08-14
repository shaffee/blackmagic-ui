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
 draw2d.shape.analog.halfadder = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.half_adder",
    input1:'',
    input2:'',
	sum:'',
	cout:'',

    

    
     timer10msTick: function(){   
	   
	    var A = this.input1.getValue();
	    var B = this.input2.getValue();

	 
 
	    if( A == "0" &&  B == "0" )
	    {
	    		this.sum.setValue("0");
				this.cout.setValue("0");	
	    }
		
		else
	    if( A == "0" &&  B == "1" )
	    	{
				this.sum.setValue("1");
				this.cout.setValue("0");
	    	}
	    else
	    if( A == "1" &&  B == "0" )
	    	{
				this.sum.setValue("1");
				this.cout.setValue("0");
	    	}
		else
	    if( A == "1" &&  B == "1" )
	    	{
				this.sum.setValue("0");
				this.cout.setValue("1");
	    	}
 },
    
    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 112;
            height= 80;
        }
        
        this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
    	
	    this._super({width:width,height:height});   
        this.inputLocator = new draw2d.shape.analog.halfadder.inputLocator();
        this.outputLocator = new draw2d.shape.analog.halfadder.outputLocator();

        this.input1 = this.createPort("input",this.inputLocator);
        this.input2 = this.createPort("input",this.inputLocator);
	    
		this.sum = this.createPort("output",this.outputLocator);
		this.cout = this.createPort("output",this.outputLocator);

	
		
	
    },
   getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="112" height="80" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title>  <title>Layer 1</title>  <line id="svg_1" y2="16.5" x2="0.5" y1="16.5" x1="12.455" stroke-width="2" stroke="#010202" fill="none"/>  <line id="svg_2" y2="64.5" x2="1" y1="64.5" x1="12.455" stroke-width="2" stroke="#010202" fill="none"/>  <rect stroke="#010202" id="svg_4" height="80" width="87.54127" stroke-width="2" fill="#ffffff" y="0" x="12.98"/>  <line id="svg_5" y2="16.5" x2="100.54509" y1="16.5" x1="112.00109" stroke-width="2" stroke="#010202" fill="none"/>  <line id="svg_6" y2="64.5" x2="100.54509" y1="64.5" x1="112.00109" stroke-width="2" stroke="#010202" fill="none"/>  <text fill="#000000" stroke="#000" stroke-width="0" x="16.87532" y="20.56266" id="svg_10" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">A</text>  <text fill="#000000" stroke="#000" stroke-width="0" x="16.25033" y="69.56226" id="svg_12" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">B</text>  <text fill="#000000" stroke="#000" stroke-width="0" x="73.99972" y="20.43766" id="svg_13" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">sum</text>  <text style="cursor: move;" fill="#000000" stroke="#000" stroke-width="0" x="71.6245" y="69.18726" id="svg_17" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">Cout</text></svg>';
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.halfadder.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.halfadder.inputLocator',
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
draw2d.shape.analog.halfadder.outputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.halfadder.outputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        
        if( index == 0 )
        figure.setPosition(w, 16);
        if( index == 1 )
        figure.setPosition(w, 64);
    }
});