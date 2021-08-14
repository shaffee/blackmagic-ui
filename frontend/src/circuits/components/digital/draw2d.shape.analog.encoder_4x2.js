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
 draw2d.shape.analog.encoder_4x2 = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.encoder_4x2",
    a0:'0',
    a1:'0',
    
    i0:'',
    i1:'',
    i2:'',
    i3:'',
        

    
	onPortValueChanged: function(relatedPort){
    
		if( relatedPort.cssClass == "draw2d_InputPort" )
	    {
	    	
	    	if( this.i3.getValue() == "1" )
	    	{
	    		this.a0.setValue("1");
	    		this.a1.setValue("1");
	    		
	    	}
	    	else
	    	if( this.i2.getValue() == "1" )
	    	{
				this.a0.setValue("0");
				this.a1.setValue("1");
	    	}
	    	else
	    	if( this.i1.getValue() == "1" )
	    	{
				this.a0.setValue("1");
				this.a1.setValue("0");
	    	}
	    	else
	    	if( this.i0.getValue() == "1" )
	    	{
				this.a0.setValue("0");
				this.a1.setValue("0");
	    	}
	    	
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
        
        this._super({width:width,height:height});
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.encoder_4x2.inputLocator();
        this.outputLocator = new draw2d.shape.analog.encoder_4x2.outputLocator();
        

        this.i0 = this.createPort("input",this.inputLocator);
        this.i1 = this.createPort("input",this.inputLocator);
        this.i2 = this.createPort("input",this.inputLocator);
        this.i3 = this.createPort("input",this.inputLocator);
	    
		this.a0 = this.createPort("output",this.outputLocator);
		this.a1 = this.createPort("output",this.outputLocator);

	    /*
	    this.oldClk = "0";
	    this.qout2.setValue("1");
	    this.qout1.setValue("0");
	    this.dinput.setValue("0");
	    */
	    var labelLocator = new draw2d.shape.analog.encoder_4x2.labelLocator();
	    this.add( new draw2d.shape.basic.componentLabel("I0") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("I1") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("I2") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("I3") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("A0") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("A1") , labelLocator );
		
		
		//this.label.setText("tesT");
        
        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
    },
    

    getSVG: function(){
    
    	this.setBackgroundColor(null);

         return '<svg width="112" height="80" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <rect fill="none" stroke="#030404" stroke-width="0" stroke-opacity="null" fill-opacity="null" x="0" y="-0.16667" width="112" height="80" id="svg_8"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="11.455" y1="16.5" x2="0.5" y2="16.5" id="svg_1"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="11.456" y1="32.5" x2="0.5" y2="32.5" id="svg_2"/>  <rect x="11.456" fill="none" stroke-width="2" width="88.39733" height="78.5" id="svg_3" y="0.83333" stroke="#030404"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="112.5" y1="32.5" x2="100" y2="32.5" id="svg_4"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="11.456" y1="64.5" x2="0.5" y2="64.5" id="svg_5"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="112.5" y1="48.5" x2="100.043" y2="48.5" id="svg_6"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="11.456" y1="48.5" x2="0.5" y2="48.5" id="svg_7"/>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_9" y="20.78007" x="16.12022" stroke-width="0" stroke="#000" fill="#000000">I0</text>  <text style="cursor: move;" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_10" y="36.6819" x="16.12022" stroke-width="0" stroke="#000" fill="#000000">I1</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_11" y="52.45852" x="16.12022" stroke-width="0" stroke="#000" fill="#000000">I2</text>  <text style="cursor: move;" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_12" y="68.61077" x="16.12022" stroke-width="0" stroke="#000" fill="#000000">I3</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_13" y="52.83415" x="80.10317" stroke-width="0" stroke="#000" fill="#000000">A0</text>  <text style="cursor: move;" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_14" y="36.55669" x="80.10317" stroke-width="0" stroke="#000" fill="#000000">A1</text> </svg>';
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.encoder_4x2.outputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.encoder_4x2.outputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        
            figure.setPosition(w, index*16+32);

    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.encoder_4x2.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.encoder_4x2.inputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        //index = index - 3;
        figure.setPosition(0, index*16+16);
    }
});
// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.encoder_4x2.labelLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.encoder_4x2.labelLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();

        if( index == 4 )
            figure.setPosition(w-33, 20);
        
        if( index == 5 )
            figure.setPosition(w-33, 36);
        
        
        if( index == 0 )
            figure.setPosition(15, 5);
        
        if( index == 1 )
            figure.setPosition(15, 21);
        
        if( index == 2 )
            figure.setPosition(15, 37);
        
        if( index == 3 )
            figure.setPosition(15, 53);
    
    }
});