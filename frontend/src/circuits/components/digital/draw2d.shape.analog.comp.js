
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
 draw2d.shape.analog.comp = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.comp",
    input1:'',
    input2:'',
	Abig:'',
	Bbig:'',
	eq:'',
    
timer10msTick: function(){    
   
	      
	    var A = this.input1.getValue();
	    var B = this.input2.getValue();

	    
	    if( A > B  )
	    {
	    		this.Abig.setValue("1");
				this.Bbig.setValue("0");
				this.eq.setValue("0");
	    }
		
		else
	    if( A < B  )
	    {
	    		this.Abig.setValue("0");
				this.Bbig.setValue("1");
				this.eq.setValue("0");
	    }
	    else if( A == B  )
	    {
	    		this.Abig.setValue("0");
				this.Bbig.setValue("0");
				this.eq.setValue("1");
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
        
        this._super(width,height);
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.comp.inputLocator();
        this.outputLocator = new draw2d.shape.analog.comp.outputLocator();

        this.input1 = this.createPort("input",this.inputLocator);
        this.input2 = this.createPort("input",this.inputLocator);
	    
		this.Abig = this.createPort("output",this.outputLocator);
		this.Bbig = this.createPort("output",this.outputLocator);
		this.eq = this.createPort("output",this.outputLocator);

	
	},


  getSVG: function(){
    	 this.setBackgroundColor(null);
         return '<svg width="112.00000000000001" height="64" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title> <title>Layer 1</title>  <line opacity="0.95" fill="none" stroke="#010202" stroke-width="2" x1="12.455" y1="16.5" x2="0" y2="16.5" id="svg_1"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="12.455" y1="48.5" x2="0" y2="48.5" id="svg_2"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="16.5" x2="100.54509" y2="16.5" id="svg_3"/>  <rect x="12.98" y="0" fill="#ffffff" stroke-width="2" width="87.54127" height="64" id="svg_4" stroke="#010202"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="48.5" x2="100.54509" y2="48.5" id="svg_6"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="32.5" x2="100.54509" y2="32.5" id="svg_8"/>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_10" y="20.10143" x="15.87106" stroke-width="0" stroke="#000" fill="#000000">A</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_12" y="52.27963" x="16.37378" stroke-width="0" stroke="#000" fill="#000000">B</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_14" y="21.01436" x="73.9785" stroke-width="0" stroke="#000" fill="#000000">A&gt;B</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_16" y="37.13923" x="73.4785" stroke-width="0" stroke="#000" fill="#000000">A&lt;B</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_17" y="53.1391" x="73.4785" stroke-width="0" stroke="#000" fill="#000000">A=B</text></svg>';
    }
});


draw2d.shape.analog.comp.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.comp.inputLocator',
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
draw2d.shape.analog.comp.outputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.comp.outputLocator',
    init:function( ){
      this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        
        if( index == 0 )
        figure.setPosition(w, 16);
           if( index == 1 )
        figure.setPosition(w, 32);
        if( index == 2 )
        figure.setPosition(w, 48);
    }
});