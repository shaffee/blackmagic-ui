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
 draw2d.shape.analog.decoder_2x4 = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.decoder_2x4",
    s0:'0',
    s1:'0',
    
    q0:'',
    q1:'',
    q2:'',
    q3:'',
    
    en:'',
    

    
	onPortValueChanged: function(relatedPort){

	 
	    console.log("Dsad");
	    if( relatedPort.getName() == "input0" || relatedPort.getName() == "input1" || relatedPort.getName() == "input2" )
	    {
	    	console.log(relatedPort.getName());
	    	
	    	this.q0.setValue("0");
	    	this.q1.setValue("0");
	    	this.q2.setValue("0");
	    	this.q3.setValue("0");
	    	

	    	if( this.en.getValue() == "0" ) return; // the decoder is disabled

	    	var val = this.s0.getValue()+this.s1.getValue();
	    	
	    	console.log(relatedPort.getName());
	    
		    if( val == "00" )
		    {
		    	this.q0.setValue("1");
		    }
		    else if( val == "01" )
		    {
		    	this.q1.setValue("1");
		    }
		    else if( val == "10" )
		    {
		    	this.q2.setValue("1");
		    }
		    else if( val == "11" )
		    {
		    	this.q3.setValue("1");
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
        console.log("init1");

        
        this._super({width:width,height:height});
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.decoder_2x4.inputLocator();
        this.outputLocator = new draw2d.shape.analog.decoder_2x4.outputLocator();
        
        this.s0 = this.createPort("input",this.inputLocator);
        this.s1 = this.createPort("input",this.inputLocator);
        this.en = this.createPort("input",this.inputLocator);

        this.q0 = this.createPort("output",this.outputLocator);
        this.q1 = this.createPort("output",this.outputLocator);
        this.q2 = this.createPort("output",this.outputLocator);
        this.q3 = this.createPort("output",this.outputLocator);
	    
	    /*
	    this.oldClk = "0";
	    this.qout2.setValue("1");
	    this.qout1.setValue("0");
	    this.dinput.setValue("0");
	    */
	    var labelLocator = new draw2d.shape.analog.decoder_2x4.labelLocator();
	    this.add( new draw2d.shape.basic.componentLabel("S0") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("S1") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("EN") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("Q0") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("Q1") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("Q2") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("Q3") , labelLocator );
        console.log("init2");
        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
    },
    

    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="112" height="80" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <line fill="none" stroke="#010202" stroke-width="2" x1="12.455" y1="16.5" x2="0.5" y2="16.5" id="svg_1"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="12.455" y1="64.5" x2="1" y2="64.5" id="svg_2"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="32.5" x2="100.54509" y2="32.5" id="svg_3"/>  <rect x="12.98" y="0.62614" fill="none" stroke-width="2" width="87.54127" height="78.6245" id="svg_4" stroke="#010202"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="16.5" x2="100.54509" y2="16.5" id="svg_5"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="64.5" x2="100.54509" y2="64.5" id="svg_6"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="12.455" y1="32.5" x2="0.5" y2="32.5" id="svg_7"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="48.5" x2="100.54509" y2="48.5" id="svg_8"/>  <rect fill="none" stroke-width="0" fill-opacity="null" x="0" y="0" width="112" height="80" id="svg_9"/>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_10" y="20.56266" x="16.87532" stroke-width="0" stroke="#000" fill="#000000">S0</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_11" y="37.06252" x="16.87532" stroke-width="0" stroke="#000" fill="#000000">S1</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_12" y="69.56226" x="16.25033" stroke-width="0" stroke="#000" fill="#000000">EN</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_13" y="20.43766" x="78.99981" stroke-width="0" stroke="#000" fill="#000000">Q0</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_14" y="37.06252" x="78.99981" stroke-width="0" stroke="#000" fill="#000000">Q1</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_16" y="53.18739" x="78.49981" stroke-width="0" stroke="#000" fill="#000000">Q2</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_17" y="69.18726" x="78.49981" stroke-width="0" stroke="#000" fill="#000000">Q3</text> </svg>';
    }
});

    
// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.decoder_2x4.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.decoder_2x4.inputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        
        if( index < 2 )
            figure.setPosition(0, index*16+16);
        else
            figure.setPosition(0, index*16+32);
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.decoder_2x4.outputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.decoder_2x4.outputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        //index = index - 3;
        figure.setPosition(w, index*16+16);
    }
});
// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.decoder_2x4.labelLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.decoder_2x4.labelLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();

        if( index == 1 )
            figure.setPosition(15, 5);
        
        if( index == 2 )
            figure.setPosition(15, 22);
        
        if( index == 3 )
            figure.setPosition(15, h-28);
        
        if( index == 4 )
            figure.setPosition(w-33, 5);
        
        if( index == 5 )
            figure.setPosition(w-33, 21);
        
        if( index == 6 )
            figure.setPosition(w-33, 37);
        
        if( index == 7 )
            figure.setPosition(w-33, 53);


    }
});