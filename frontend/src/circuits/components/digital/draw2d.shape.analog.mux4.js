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
 draw2d.shape.analog.mux4 = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.mux4",
    i0:'',
    i1:'',
    i2:'',
    i3:'',
    sel1:'',
    sel2:'',
    EN:'',
    output:'',
    


    
    
timer10msTick: function(){    
	    
			var s0 = this.sel1.getValue();
			var s1 = this.sel2.getValue();
			var e = this.EN.getValue();
		if (  e == "0" ){	
			if( s1 == "0" &&  s0 == "0"  )
			{
				 this.output.setValue(this.i0.getValue());
			}
			else if( s1 == "0" &&  s0 == "1"  )
			{
			   	 this.output.setValue(this.i1.getValue());
			}
			else if( s1 == "1" &&  s0 == "0"  )
			{
			   	 this.output.setValue(this.i2.getValue());
			}
			else if( s1 == "1" &&  s0 == "1"  )
			{
			   	 this.output.setValue(this.i3.getValue());
			}
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
            width = 84;
            height= 131;
        }
        
        this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
    	
        this._super(width,height);
        //this.setResizeable(false);
        this.inputLocator = new this.MyInputPortLocator();
        this.outputLocator = new this.MyOutputPortLocator();
        
        this.i0 = this.createPort("input",this.inputLocator);
        this.i1 = this.createPort("input",this.inputLocator);
	    this.i2 = this.createPort("input",this.inputLocator);
	    this.i3 = this.createPort("input",this.inputLocator);
	    this.sel1 = this.createPort("input",this.inputLocator);
	    this.sel2 = this.createPort("input",this.inputLocator);
	    this.EN = this.createPort("input",this.inputLocator);
        this.output = this.createPort("output",this.outputLocator);
	    
	    this.i0.setValue("0");
	    this.i1.setValue("0");
	    this.i2.setValue("0");
	    this.i3.setValue("0");
	    this.output.setValue("0");
	    
	
    },
    
    getSVG: function(){
    
    	this.setBackgroundColor(null);

         return '<svg width="112" height="112" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title>  <title>Layer 1</title>  <line fill="none" stroke="#030404" stroke-width="2" x1="11.455" y1="32.6523" x2="0" y2="32.6523" id="svg_1"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="11.456" y1="48.80461" x2="0" y2="48.80461" id="svg_2"/>  <rect x="10.54217" fill="#ffffff" stroke-width="2" width="88.39733" height="80" id="svg_3" y="17.06613" stroke="#030404"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="11.456" y1="80.95691" x2="0" y2="80.95691" id="svg_5"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="112.5" y1="48.80461" x2="100.043" y2="48.80461" id="svg_6"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="11.456" y1="64.80461" x2="0" y2="64.80461" id="svg_7"/>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_9" y="36.0105" x="16.12022" stroke-width="0" stroke="#000" fill="#000000">D0</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_10" y="53.28307" x="16.12022" stroke-width="0" stroke="#000" fill="#000000">D1</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_11" y="69.21199" x="16.12022" stroke-width="0" stroke="#000" fill="#000000">D2</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_12" y="83.8412" x="16.12022" stroke-width="0" stroke="#000" fill="#000000">D3</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_13" y="52.83415" x="85.58613" stroke-width="0" stroke="#000" fill="#000000">Q</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_4" y="53.98156" x="40.64121" stroke-width="0" stroke="#000" fill="#adabab">4 to 1</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_14" y="67.68895" x="40.94582" stroke-width="0" stroke="#000" fill="#adabab">MUX</text>  <ellipse stroke="#030404" ry="2.58917" rx="2.66533" id="svg_15" cy="13.65537" cx="64.65627" fill-opacity="null" stroke-opacity="null" fill="none"/>  <line stroke-width="2" stroke-linecap="null" stroke-linejoin="null" id="svg_16" y2="11" x2="64.75002" y1="-0.20432" x1="64.75002" fill-opacity="null" stroke-opacity="null" stroke="#030404" fill="none"/>  <line stroke-width="2" stroke-linecap="null" stroke-linejoin="null" id="svg_17" y2="112.42875" x2="48.81251" y1="96.4368" x1="48.81251" fill-opacity="null" stroke-opacity="null" stroke="#030404" fill="none"/>  <line stroke-width="2" stroke-linecap="null" stroke-linejoin="null" id="svg_18" y2="112.42875" x2="80.81251" y1="96.4368" x1="80.81251" fill-opacity="null" stroke-opacity="null" stroke="#030404" fill="none"/>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_19" y="93.28407" x="39.90149" stroke-width="0" stroke="#000" fill="#000000">S1</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_20" y="93.38177" x="73.21975" stroke-width="0" stroke="#000" fill="#000000">S0</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_21" y="29.91833" x="55.60401" stroke-width="0" stroke="#000" fill="#000000">EN</text> </svg>';
    }
});


// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.mux4.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.mux4.inputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        
        if( index == 0 )
            figure.setPosition(0, 32);
        if( index == 1 )
            figure.setPosition(0, 48);
        if( index == 2 )
            figure.setPosition(0, 64);
        if( index == 3 )
            figure.setPosition(0, 80);
        if( index == 4 )
            figure.setPosition(80, 111);
        if( index == 5 )
            figure.setPosition(48, 111);
        if( index == 6 )
            figure.setPosition(64, 0);
        
        
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.mux4.outputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.mux4.outputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();

        if( index == 0 )
        figure.setPosition(w, 48);
    }
});