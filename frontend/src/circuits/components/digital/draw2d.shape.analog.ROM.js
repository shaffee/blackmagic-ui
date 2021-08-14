
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
 draw2d.shape.analog.ROM = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.ROM",
    input1:'',
    input2:'',
    input3:'',
    input4:'',
	o0:'',
	o1:'',
	o2:'',
	o3:'',
	o4:'',
	o5:'',
	o6:'',
	o7:'',
	state:"unknow",

     

    
     timer10msTick: function(){ 
   

	    var A = this.input4.getValue();
	    var B = this.input3.getValue();
	    var C = this.input2.getValue();
	    var D = this.input1.getValue();
	    var data = this.getUserData();
	    var values = data['formData'];
		var out;

	  if( A=="0" && B == "0" &&  C == "0" && D == "0" )
	    {
	    		out = values.loc0
	    		this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));	
	    }
		
		else
	    if( A=="0" && B == "0" &&  C == "0" && D == "1" )
	    	{
	    		out = values.loc1
				this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));
	    	}
	    else
	    if( A=="0" && B == "0" &&  C == "1" && D == "0" )
	    	{
	    		out = values.loc2
				this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));
	    	}
		else
	    if( A=="0" && B == "0" &&  C == "1" && D == "1" )
	    	{
	    		out = values.loc3
				this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));
	    	}
	    else
	    if( A=="0" && B == "1" &&  C == "0" && D == "0" )
	    	{
	    		out = values.loc4
				this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));
	    	}
	    else
	    if( A=="0" && B == "1" &&  C == "0" && D == "1" )
	    	{
	    		out = values.loc5
				this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));
	    	}
	    else
	    if( A=="0" && B == "1" &&  C == "1" && D == "0" )
	    	{
	    		out = values.loc6
				this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));
				
	    	}
	    else
	    if( A=="0" && B == "1" &&  C == "1" && D == "1" )
	    	{
	    		out = values.loc7
				this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));
	    	}
	    else
	    if( A=="1" && B == "0" &&  C == "0" && D == "0" )
	    	{
	    		out = values.loc8
	    		this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));
	   		 }
		else
	    if( A=="1" && B == "0" &&  C == "0" && D == "1" )
	    	{	
	    		out = values.loc9
				this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));
	    	}
	    else
	    if( A=="1" && B == "0" &&  C == "1" && D == "0" )
	    	{
	    		out = values.loc10
				this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));
	    	}
		else
	    if( A=="1" && B == "0" &&  C == "1" && D == "1" )
	    	{	
	    		out = values.loc11
				this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));
	    	}
	    else
	    if( A=="1" && B == "1" &&  C == "0" && D == "0" )
	    	{
	    		out = values.loc12
				this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));
	    	}
	    else
	    if( A=="1" && B == "1" &&  C == "0" && D == "1" )
	    	{	out = values.loc13
				this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));
	 	    	}
	    else
	    if( A=="1" && B == "1" &&  C == "1" && D == "0" )
	    	{	out = values.loc14
				this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));
				
	    	}
	    else
	    if( A=="1" && B == "1" &&  C == "1" && D == "1" )
	    	{
	    		out = values.loc15
				this.o0.setValue(out.charAt(0));
	    		this.o1.setValue(out.charAt(1));
	    		this.o2.setValue(out.charAt(2));
	    		this.o3.setValue(out.charAt(3));	
	    		this.o4.setValue(out.charAt(4));	
	    		this.o5.setValue(out.charAt(5));	
	    		this.o6.setValue(out.charAt(6));
	    		this.o7.setValue(out.charAt(7));	  
	    	}
	     
 },
    
    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 112;
            height= 144;
        }
        
        this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
    	
        this._super(width,height);
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.ROM.inputLocator();
        this.outputLocator = new draw2d.shape.analog.ROM.outputLocator();
        

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
		this.o7 = this.createPort("output",this.outputLocator);


	    this.defaultValues = { label:'ROM' ,loc0:"00000000", loc1:"00000000" ,loc2:"00000000",loc3:"00000000",loc4:"00000000",loc5:"00000000",loc6:"00000000",loc7:"00000000",loc8:"00000000",loc9:"00000000",
	    loc10:"00000000", loc11:"00000000" ,loc12:"00000000",loc13:"00000000",loc14:"00000000",loc15:"00000000"}; 
	    this.params = {
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  },
	
		 loc0: {
		        "type": "string",
		        "title": "location 0 (write it in 8-bit) " ,
		        //"format": "color"
		      }, 
		 loc1: {
		        "type": "string",
		        "title": "location 1 (write it in 8-bit) " ,
		        //"format": "color"
		      }, 
		 loc2: {
		        "type": "string",
		        "title": "location 2 (write it in 8-bit) " ,
		        //"format": "color"
		      }, 
		 loc3: {
		        "type": "string",
		        "title": "location 3 (write it in 8-bit) " ,
		        //"format": "color"
		      }, 
		 loc4: {
		        "type": "string",
		        "title": "location 4 (write it in 8-bit) " ,
		        //"format": "color"
		      },
		 loc5: {
		        "type": "string",
		        "title": "location 5 (write it in 8-bit)  " ,
		        //"format": "color"
		      },
		  loc6: {
		        "type": "string",
		        "title": "location 6 (write it in 8-bit) " ,
		        //"format": "color"
		      },
		  loc7: {
		        "type": "string",
		        "title": "location 7 (write it in 8-bit) " ,
		        //"format": "color"
		      },
		   loc8: {
		        "type": "string",
		        "title": "location 8 (write it in 8-bit) " ,
		        //"format": "color"
		      },
		   loc9: {
		        "type": "string",
		        "title": "location 9 (write it in 8-bit) " ,
		        //"format": "color"
		      },
		   loc10: {
		        "type": "string",
		        "title": "location 10 (write it in 8-bit) " ,
		        //"format": "color"
		      },
		   loc11: {
		        "type": "string",
		        "title": "location 11 (write it in 8-bit) " ,
		        //"format": "color"
		      },
		   loc12: {
		        "type": "string",
		        "title": "location 12 (write it in 8-bit) " ,
		        //"format": "color"
		      },
		   loc13: {
		        "type": "string",
		        "title": "location 13 (write it in 8-bit) " ,
		        //"format": "color"
		      },
		   loc14: {
		        "type": "string",
		        "title": "location 14 (write it in 8-bit) " ,
		        //"format": "color"
		      },
		   loc15: {
		        "type": "string",
		        "title": "location 15 (write it in 8-bit) " ,
		        //"format": "color"
		      },
		       
 			
		//this.label.setText("tesT");
        
        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
    }
    },


    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="112" height="144" xmlns="http://www.w3.org/2000/svg"> <title>background</title> <title>Layer 1</title>  <title>Layer 1</title>  <line fill="none" stroke="#010202" stroke-width="2" x1="12.455" y1="16.5" x2="0" y2="16.5" id="svg_1"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="12.455" y1="48.5" x2="0" y2="48.5" id="svg_2"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.25109" y1="32.5" x2="100.79509" y2="32.5" id="svg_3"/>  <rect stroke="#010202" x="12.98" fill="#ffffff" stroke-width="2" width="87.54127" height="144" id="svg_4"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="48.5" x2="100.54509" y2="48.5" id="svg_6"/>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_10" y="20.26454" x="17" stroke-width="0" stroke="#000" fill="#000000">A0</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_12" y="53.59992" x="17" stroke-width="0" stroke="#000" fill="#000000">A1</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_13" y="36.33595" x="83.10146" stroke-width="0" stroke="#000" fill="#000000">F1</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_14" y="52.26115" x="83.10146" stroke-width="0" stroke="#000" fill="#000000">F2</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_16" y="68.86725" x="83.15803" stroke-width="0" stroke="#000" fill="#000000">F3</text>  <line fill="none" stroke="#010202" stroke-width="2" x1="13.05124" y1="80.5" x2="0" y2="80.5" id="svg_7"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="12.15688" y1="112.5" x2="0" y2="112.5" id="svg_11"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="80.5" x2="100.54509" y2="80.5" id="svg_15"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.59733" y1="64.5" x2="101.14133" y2="64.5" id="svg_19"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112" y1="112.5" x2="100.24697" y2="112.5" id="svg_20"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.29921" y1="96.5" x2="100.84321" y2="96.5" id="svg_21"/>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_29" y="83.96252" x="17" stroke-width="0" stroke="#000" fill="#000000">A2</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_30" y="115.46828" x="17" stroke-width="0" stroke="#000" fill="#000000">A3</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_32" y="132.12797" x="82.36111" stroke-width="0" stroke="#000" fill="#000000">F7</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_33" y="116.36337" x="82.67503" stroke-width="0" stroke="#000" fill="#000000">F6</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_34" y="100.73621" x="82.65923" stroke-width="0" stroke="#000" fill="#000000">F5</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_35" y="85.73173" x="82.95735" stroke-width="0" stroke="#000" fill="#000000">F4</text>  <line fill="none" stroke="#010202" stroke-width="2" x1="112.00109" y1="16.5" x2="100.54509" y2="16.5" id="svg_36"/>  <line fill="none" stroke="#010202" stroke-width="2" x1="112" y1="128.5" x2="100.24697" y2="128.5" id="svg_5"/>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_8" y="20.19603" x="83.26285" stroke-width="0" stroke="#000" fill="#000000">F0</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_9" y="76.11963" x="40.33927" stroke-width="0" stroke="#000" fill="#adabab">4 X 8</text></svg>';
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.ROM.inputLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.ROM.inputLocator',
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
}),


// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.ROM.outputLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.ROM.outputLocator',
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
		if( index == 7 )
		figure.setPosition(w-1, 128);
	}
});