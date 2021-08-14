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
 draw2d.shape.analog.seg4bit = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.seg4bit",
    input1:'',input2:'',input3:'',input4:'',
	o0:'',o1:'',o2:'',o3:'',o4:'',o5:'',o6:'',

       
       
     timer10msTick: function(){ 
      
	    var A = this.input4.getValue();
	    var B = this.input3.getValue();
	    var C = this.input2.getValue();
	    var D = this.input1.getValue();
	
	    if( A=="0" && B == "0" &&  C == "0" && D == "0" )
	    {
	    		this.o0.setValue("1");
	    		this.o1.setValue("1");
	    		this.o2.setValue("1");	
	    		this.o3.setValue("1");	
	    		this.o4.setValue("1");	
	    		this.o5.setValue("1");	
	    		this.o6.setValue("0");	
	    }
		
		else
	    if( A=="0" && B == "0" &&  C == "0" && D == "1" )
	    	{
				this.o0.setValue("0");
				this.o1.setValue("1");
				this.o2.setValue("1");	
				this.o3.setValue("0");	
	    		this.o4.setValue("0");	
	    		this.o5.setValue("0");
	    		this.o6.setValue("0");
	    	}
	    else
	    if( A=="0" && B == "0" &&  C == "1" && D == "0" )
	    	{
				this.o0.setValue("1");
				this.o1.setValue("1");
				this.o2.setValue("0");	
				this.o3.setValue("1");	
	    		this.o4.setValue("1");
	    		this.o5.setValue("0");
	    		this.o6.setValue("1");
	    	}
		else
	    if( A=="0" && B == "0" &&  C == "1" && D == "1" )
	    	{
				this.o0.setValue("1");
				this.o1.setValue("1");
				this.o2.setValue("1");	
				this.o3.setValue("1");	
	    		this.o4.setValue("0");
	    		this.o5.setValue("0");
	    		this.o6.setValue("1");
	    	}
	    else
	    if( A=="0" && B == "1" &&  C == "0" && D == "0" )
	    	{
				this.o0.setValue("0");
				this.o1.setValue("1");
				this.o2.setValue("1");
				this.o3.setValue("0");	
	    		this.o4.setValue("0");
	    		this.o5.setValue("1");
	    		this.o6.setValue("1");
	    	}
	    else
	    if( A=="0" && B == "1" &&  C == "0" && D == "1" )
	    	{
				this.o0.setValue("1");
				this.o1.setValue("0");
				this.o2.setValue("1");	
				this.o3.setValue("1");	
	    		this.o4.setValue("0");	
	    		this.o5.setValue("1");	
	    		this.o6.setValue("1");
	    	}
	    else
	    if( A=="0" && B == "1" &&  C == "1" && D == "0" )
	    	{
				this.o0.setValue("1");
				this.o1.setValue("0");
				this.o2.setValue("1");	
				this.o3.setValue("1");	
	    		this.o4.setValue("1");	
	    		this.o5.setValue("1");	
	    		this.o6.setValue("1");
				
	    	}
	    else
	    if( A=="0" && B == "1" &&  C == "1" && D == "1" )
	    	{
				this.o0.setValue("1");
				this.o1.setValue("1");
				this.o2.setValue("1");	
				this.o3.setValue("0");	
	    		this.o4.setValue("0");	
	    		this.o5.setValue("0");	
	    		this.o6.setValue("0");
	    	}
	    else
	    if( A=="1" && B == "0" &&  C == "0" && D == "0" )
	    	{
	    		this.o0.setValue("1");
	    		this.o1.setValue("1");
	    		this.o2.setValue("1");	
	    		this.o3.setValue("1");	
	    		this.o4.setValue("1");	
	    		this.o5.setValue("1");	
	    		this.o6.setValue("1");	
	   		 }
		else
	    if( A=="1" && B == "0" &&  C == "0" && D == "1" )
	    	{
				this.o0.setValue("1");
				this.o1.setValue("1");
				this.o2.setValue("1");	
				this.o3.setValue("1");	
	    		this.o4.setValue("0");	
	    		this.o5.setValue("1");	
	    		this.o6.setValue("1");
	    	}
	    else
	    if( A=="1" && B == "0" &&  C == "1" && D == "0" )
	    	{
				this.o0.setValue("1");
				this.o1.setValue("1");
				this.o2.setValue("1");	
				this.o3.setValue("0");	
	    		this.o4.setValue("1");	
	    		this.o5.setValue("1");	
	    		this.o6.setValue("1");
	    	}
		else
	    if( A=="1" && B == "0" &&  C == "1" && D == "1" )
	    	{
				this.o0.setValue("0");
				this.o1.setValue("0");
				this.o2.setValue("1");	
				this.o3.setValue("1");	
	    		this.o4.setValue("1");	
	    		this.o5.setValue("1");	
	    		this.o6.setValue("1");
	    	}
	    else
	    if( A=="1" && B == "1" &&  C == "0" && D == "0" )
	    	{
				this.o0.setValue("1");
				this.o1.setValue("0");
				this.o2.setValue("0");	
				this.o3.setValue("1");	
	    		this.o4.setValue("1");
	       		this.o5.setValue("1");
	       		this.o6.setValue("0");
	    	}
	    else
	    if( A=="1" && B == "1" &&  C == "0" && D == "1" )
	    	{
				this.o0.setValue("0");
				this.o1.setValue("1");
				this.o2.setValue("1");	
			    this.o3.setValue("1");	
	    		this.o4.setValue("1");	
	    		this.o5.setValue("0");
	    		this.o6.setValue("1");
	    	}
	    else
	    if( A=="1" && B == "1" &&  C == "1" && D == "0" )
	    	{
				this.o0.setValue("1");
				this.o1.setValue("0");
				this.o2.setValue("0");
				this.o3.setValue("1");	
	    		this.o4.setValue("1");
	    		this.o5.setValue("1");
	    		this.o6.setValue("1");
				
	    	}
	    else
	    if( A=="1" && B == "1" &&  C == "1" && D == "1" )
	    	{
				this.o0.setValue("1");
				this.o1.setValue("0");
				this.o2.setValue("0");	
				this.o3.setValue("0");	
	    		this.o4.setValue("1");	
	    		this.o5.setValue("1");	
	    		this.o6.setValue("1");	   
	     	}
    },
    
    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 112;
            height= 128;
        }
        this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
    	
        
        this._super(width,height);
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.seg4bit.inputLocator();
        this.outputLocator = new draw2d.shape.analog.seg4bit.outputLocator();
        
        this.input1 = this.createPort("input",this.inputLocator);
        this.input2 = this.createPort("input",this.inputLocator);
        this.input3 = this.createPort("input",this.inputLocator);
	    this.input4 = this.createPort("input",this.inputLocator);
	    
		this.o0 = this.createPort("output",this.outputLocator);
		this.o1 = this.createPort("output",this.outputLocator);
		this.o2 = this.createPort("output",this.outputLocator);
		this.o3 = this.createPort("output",this.outputLocator);
		this.o4 = this.createPort("output",this.outputLocator);
		this.o5 = this.createPort("output",this.outputLocator);
		this.o6 = this.createPort("output",this.outputLocator);
	

    },
    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="112" height="128" xmlns="http://www.w3.org/2000/svg"> <title>background</title> <title>Layer 1</title>  <title>Layer 1</title>  <line id="svg_1" y2="16.5" x2="0" y1="16.5" x1="12.455" stroke-width="2" stroke="#010202" fill="none"/>  <line id="svg_2" y2="48.5" x2="0" y1="48.5" x1="12.455" stroke-width="2" stroke="#010202" fill="none"/>  <line id="svg_3" y2="32.5" x2="100.79509" y1="32.5" x1="112.25109" stroke-width="2" stroke="#010202" fill="none"/>  <rect id="svg_4" height="128" width="87.54127" stroke-width="2" fill="#ffffff" y="0" x="12.98" stroke="#010202"/>  <line id="svg_6" y2="48.5" x2="100.54509" y1="48.5" x1="112.00109" stroke-width="2" stroke="#010202" fill="none"/>  <text fill="#000000" stroke="#000" stroke-width="0" x="17" y="20.26454" id="svg_10" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">A0</text>  <text fill="#000000" stroke="#000" stroke-width="0" x="17" y="53.59992" id="svg_12" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">A1</text>  <text fill="#000000" stroke="#000" stroke-width="0" x="87.94343" y="18.58204" id="svg_13" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">A</text>  <text fill="#000000" stroke="#000" stroke-width="0" x="87.94343" y="36.12124" id="svg_14" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">B</text>  <text fill="#000000" stroke="#000" stroke-width="0" x="88" y="52.72734" id="svg_16" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">C</text>  <line id="svg_7" y2="80.5" x2="0" y1="80.5" x1="13.05124" stroke-width="2" stroke="#010202" fill="none"/>  <line id="svg_11" y2="112.5" x2="0" y1="112.5" x1="12.15688" stroke-width="2" stroke="#010202" fill="none"/>  <line id="svg_15" y2="80.5" x2="100.54509" y1="80.5" x1="112.00109" stroke-width="2" stroke="#010202" fill="none"/>  <line id="svg_19" y2="64.5" x2="101.14133" y1="64.5" x1="112.59733" stroke-width="2" stroke="#010202" fill="none"/>  <line id="svg_20" y2="112.5" x2="100.24697" y1="112.5" x1="112" stroke-width="2" stroke="#010202" fill="none"/>  <line id="svg_21" y2="96.5" x2="100.84321" y1="96.5" x1="112.29921" stroke-width="2" stroke="#010202" fill="none"/>  <text fill="#000000" stroke="#000" stroke-width="0" x="17" y="83.96252" id="svg_29" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">A2</text>  <text fill="#000000" stroke="#000" stroke-width="0" x="17" y="115.46828" id="svg_30" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">A3</text>  <text fill="#000000" stroke="#000" stroke-width="0" x="87.20308" y="117.60205" id="svg_32" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">G</text>  <text fill="#000000" stroke="#000" stroke-width="0" x="88.0012" y="101.67605" id="svg_33" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">F</text>  <text fill="#000000" stroke="#000" stroke-width="0" x="87.5012" y="84.5963" id="svg_34" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">E</text>  <text fill="#000000" stroke="#000" stroke-width="0" x="87.79932" y="67.97782" id="svg_35" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">D</text>  <line id="svg_36" y2="16.5" x2="100.54509" y1="16.5" x1="112.00109" stroke-width="2" stroke="#010202" fill="none"/> </svg>';
    }
});

	
// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.seg4bit.inputLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.seg4bit.inputLocator',
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
		if( index == 3 )
		figure.setPosition(0, 112);
	}
});


// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.seg4bit.outputLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.seg4bit.outputLocator',
	init:function( ){
		this._super();
	},    
	relocate:function(index, figure){
		var w = figure.getParent().getWidth();
		var h = figure.getParent().getHeight();
		
		if( index == 0 )
		figure.setPosition(w-1, 16);
		if( index == 1 )
		figure.setPosition(w-1, 32);
		if( index == 2 )
		figure.setPosition(w-1, 48);
		if( index == 3 )
		figure.setPosition(w-1, 64);
		if( index == 4 )
		figure.setPosition(w-1, 80);
		if( index == 5 )
		figure.setPosition(w-1, 96);
		if( index == 6 )
		figure.setPosition(w-1, 112);
	}
});
