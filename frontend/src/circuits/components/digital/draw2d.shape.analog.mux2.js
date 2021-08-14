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
 draw2d.shape.analog.mux2 = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.mux2",
    i0:'',
    i1:'',
    selector:'',
    en:'',
    output:'',
    

    
	timer10msTick: function(){
	console.log(this.en.getValue());
	
	if ( this.en.getValue() == "0" )
	{ 	
		if( this.selector.getValue() == "0" )
		    this.output.setValue(this.i0.getValue());
		else
		    this.output.setValue(this.i1.getValue());
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
            width = 112;
            height= 96;
        }
        
        this._super(width,height);
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.mux2.inputLocator();
        this.outputLocator = new draw2d.shape.analog.mux2.outputLocator();
        
        this.i0 = this.createPort("input",this.inputLocator);
        this.i1 = this.createPort("input",this.inputLocator);
        this.output = this.createPort("output",this.outputLocator);
        this.selector = this.createPort("input",this.inputLocator);
	    this.selector.setName("selector");
	    this.en = this.createPort("input",this.inputLocator);
	    this.i0.setValue("0");
	    this.i1.setValue("0");
	    this.en.setValue("0");
	    this.output.setValue("0");
	    

    },
    
    getSVG: function(){
    
    	this.setBackgroundColor(null);

         return '<svg width="112" height="96.00000000000001" xmlns="http://www.w3.org/2000/svg">  <title>background</title>  <rect fill="none" id="canvas_background" height="98" width="114" y="-1" x="-1"/>   <title>Layer 1</title>  <line id="svg_1" y2="33.25907" x2="0" y1="33.25907" x1="12.455" stroke-width="2" stroke="#010202" fill="none"/>  <line stroke="#010202" id="svg_3" y2="49.51209" x2="100.58687" y1="49.51209" x1="112" stroke-width="2" fill="none"/>  <rect id="svg_4" height="64" width="87.54127" stroke-width="2" fill="#ffffff" y="16" x="12.22937" stroke="#010202"/>  <line id="svg_7" y2="65.75892" x2="0" y1="65.75892" x1="12.455" stroke-width="2" stroke="#010202" fill="none"/>  <text fill="#000000" stroke="#000" stroke-width="0" x="17" y="36.81446" id="svg_10" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">D0</text>  <text fill="#000000" stroke="#000" stroke-width="0" x="17" y="69.97552" id="svg_11" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">D1</text>  <text fill="#000000" stroke="#000" stroke-width="0" x="55.31667" y="30.22735" id="svg_12" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">EN</text>  <text fill="#000000" stroke="#000" stroke-width="0" x="85.20889" y="53.72254" id="svg_13" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">Q</text>  <text fill="#000000" stroke="#000" stroke-width="0" x="57.58934" y="73.87697" id="svg_2" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">S0</text>  <text stroke="#000" transform="matrix(1,0,0,0.890907883644104,0,3.7926556076854467) " fill="#4f4f4f" stroke-width="0" x="42.66469" y="45.97034" id="svg_5" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">2 to1</text>  <text stroke="#000" transform="matrix(1,0,0,0.890907883644104,0,3.7926556076854467) " fill="#4f4f4f" stroke-width="0" x="42.67236" y="60.81864" id="svg_6" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">MUX</text>  <ellipse ry="2.90956" rx="2.81573" id="svg_8" cy="12.73428" cx="65.51931" fill-opacity="null" stroke-opacity="null" fill="none" stroke="#010202"/>  <line stroke="#010202" fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="65.51931" y1="9.74911" x2="65.51931" y2="0.33558" id="svg_9" stroke-linejoin="null" stroke-linecap="null"/>  <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_15" y2="96" x2="65.51931" y1="79.76249" x1="65.51931" stroke-width="2" fill="none" stroke="#000"/></svg>';
    }
});


// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.mux2.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.mux2.inputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        
        if( index == 0 )
            figure.setPosition(0, 32);
        if( index == 1 )
            figure.setPosition(0, 64);
        if( index == 2 )
            figure.setPosition(64, 93);
        if( index == 3 )
            figure.setPosition(64, 0);

        
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.mux2.outputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.mux2.outputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();

        if( index == 0 )
        figure.setPosition(w-2, 48);
    }
});