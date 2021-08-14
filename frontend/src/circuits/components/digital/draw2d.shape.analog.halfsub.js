
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
 draw2d.shape.analog.halfsub = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.half_sub",
    input1:'',
    input2:'',
	Diff:'',
	Bo:'',

    
    
   timer10msTick: function(){   
       
	    var A = this.input1.getValue();
	    var B = this.input2.getValue();


	    if( A == "0" &&  B == "0" )
	    {
	    		this.Diff.setValue("0");
				this.Bo.setValue("0");	
	    }
		
		else
	    if( A == "0" &&  B == "1" )
	    	{
				this.Diff.setValue("1");
				this.Bo.setValue("1");
	    	}
	    else
	    if( A == "1" &&  B == "0" )
	    	{
				this.Diff.setValue("1");
				this.cout.setValue("0");
	    	}
		else
	    if( A == "1" &&  B == "1" )
	    	{
				this.Diff.setValue("0");
				this.Bo.setValue("0");
	    	}
	},
    
    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 110;
            height= 96;
        }
        
        this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
    	
        this._super(width,height);
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.halfsub.inputLocator();
        this.outputLocator = new draw2d.shape.analog.halfsub.outputLocator();
        

        this.input1 = this.createPort("input",this.inputLocator);
        this.input2 = this.createPort("input",this.inputLocator);
	    
		this.Diff = this.createPort("output",this.outputLocator);
		this.Bo = this.createPort("output",this.outputLocator);

	

    },
     getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="112.00000000000001" height="80" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title>  <title>Layer 1</title>  <line fill="none" stroke="#010202" stroke-width="2" x1="12.455" y1="16.5" x2="0.5" y2="16.5" id="svg_1"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="12.455" y1="64.5" x2="1" y2="64.5" id="svg_2"/>  <rect x="12.98" y="0" fill="#ffffff" stroke-width="2" width="87.54127" height="80" id="svg_4" stroke="#010202"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="16.5" x2="100.54509" y2="16.5" id="svg_5"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="64.5" x2="100.54509" y2="64.5" id="svg_6"/>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_10" y="20.56266" x="16.87532" stroke-width="0" stroke="#000" fill="#000000">A</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_12" y="69.56226" x="16.25033" stroke-width="0" stroke="#000" fill="#000000">B</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_13" y="20.43766" x="81.03961" stroke-width="0" stroke="#000" fill="#000000">diff</text>  <text style="cursor: move;" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_17" y="69.18726" x="71.51453" stroke-width="0" stroke="#000" fill="#000000">Bout</text> </svg>';
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.halfsub.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.halfsub.inputLocator',
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
draw2d.shape.analog.halfsub.outputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.halfsub.outputLocator',
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