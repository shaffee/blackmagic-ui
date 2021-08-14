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
 draw2d.shape.analog.fullsub = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.fullsub",
    input1:'',
    input2:'',
    input3:'',
	Dif:'',
	Bow:'',

  

 timer10msTick: function(){    
 
 	    var A = this.input1.getValue();
	    var B = this.input2.getValue();
	    var Bin = this.input3.getValue();
	
 
	    if( A == "0" &&  B == "0" && Bin == "0" )
	    {
	    		this.Dif.setValue("0");
				this.Bow.setValue("0");	
	    }
		
		else
	    if( A == "0" &&  B == "0" && Bin == "1" )
	    	{
				this.Dif.setValue("1");
				this.Bow.setValue("1");
	    	}
	    else
	    if( A == "0" &&  B == "1" && Bin == "0" )
	    	{
				this.Dif.setValue("1");
				this.Bow.setValue("1");
	    	}
		else
	    if( A == "0" &&  B == "1" && Bin == "1" )
	    	{
				this.Dif.setValue("0");
				this.Bow.setValue("1");
	    	}
	    else
	    if( A == "1" &&  B == "0" && Bin == "0" )
	    	{
				this.Dif.setValue("1");
				this.Bow.setValue("0");
	    	}
	    else
	    if( A == "1" &&  B == "0" && Bin == "1" )
	    	{
				this.Dif.setValue("0");
				this.Bow.setValue("0");
	    	}
	    else
	    if( A == "1" &&  B == "1" && Bin == "0" )
	    	{
				this.Dif.setValue("0");
				this.Bow.setValue("0");
				
	    	}
	    else
	    if( A == "1" &&  B == "1" && Bin == "1" )
	    	{
				this.Dif.setValue("1");
				this.Bow.setValue("1");
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
        this.inputLocator = new draw2d.shape.analog.fullsub.inputLocator();
        this.outputLocator = new draw2d.shape.analog.fullsub.outputLocator();
        

        this.input1 = this.createPort("input",this.inputLocator);
        this.input2 = this.createPort("input",this.inputLocator);
        this.input3 = this.createPort("input",this.inputLocator);
	    
		this.Dif = this.createPort("output",this.outputLocator);
		this.Bow = this.createPort("output",this.outputLocator);


    },
   getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="112" height="96" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title> <title>Layer 1</title>  <rect fill="none" stroke="#030404" stroke-width="0" stroke-opacity="null" fill-opacity="null" x="0" y="0" width="112" height="96" id="svg_11"/>  <line fill="none" stroke-width="2" x1="13.38121" y1="16.5" x2="0" y2="16.5" id="svg_1" stroke="#030404"/>  <line fill="none" stroke-width="2" x1="13.08382" y1="80.5" x2="0" y2="80.5" id="svg_2" stroke="#030404"/>  <rect x="13.16383" fill="#ffffff" stroke-width="2" width="84.04" height="94.86992" id="svg_3" y="0.25113" stroke="#030404"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="112" y1="16.5" x2="98" y2="16.5" id="svg_8"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="112" y1="80.5" x2="97.544" y2="80.5" id="svg_9"/>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_4" y="22.81319" x="18.00104" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#030303" fill="#000000">A</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_6" y="20.15923" x="74.89247" fill-opacity="null" stroke-opacity="null" stroke-width="0" fill="#000000" stroke="#030303">diff</text>  <text style="cursor: move;" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_7" y="84.79698" x="64.77905" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#030303" fill="#000000">Bout</text>  <text style="cursor: move;" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_12" y="83.68653" x="18" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#030404" fill="#000000">Bin</text>  <line fill="none" stroke-width="2" x1="13.38121" y1="48.5" x2="0" y2="48.5" id="svg_13" stroke="#030404"/>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_14" y="51.89627" x="18.00104" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#030303" fill="#000000">B</text></svg>';
    }
});


// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.fullsub.inputLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.fullsub.inputLocator',
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
		if( index == 2 )
		figure.setPosition(0, 80);
	}
}),


// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.fullsub.outputLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.fullsub.outputLocator',
	init:function( ){
		this._super();
	},    
	relocate:function(index, figure){
		var w = figure.getParent().getWidth();
		var h = figure.getParent().getHeight();
		
		if( index == 0 )
		figure.setPosition(w, 16);
		if( index == 1 )
		figure.setPosition(w, 80);
	}
});