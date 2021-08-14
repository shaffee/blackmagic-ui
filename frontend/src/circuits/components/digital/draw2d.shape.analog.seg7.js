import draw2d from 'draw2d'
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
 
 draw2d.shape.analog.seg7 = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.seg7",
    inputs:null,
    leds:null,
	comm:"",
	
	led_1:null,
	led_2:null,
	led_3:null,
	led_4:null,
	led_5:null,
	led_6:null,
	led_7:null,

   
   beforeAdd : function(){
   		console.log("Adding 7Segment");
   },

     onPortValueChanged: function(relatedPort){
   		
   		//console.log("7Seg Changed "+relatedPort.getName() );
   		var visible;
		   
   		if( relatedPort.getValue() == "1" )
   			visible = true;
   		else
   			visible = false;

   		if( relatedPort.getName() == "a" )
   		{
   			this.leds[0].setVisible(visible);
   		}
   		else if( relatedPort.getName() == "b" )
   		{
   			this.leds[1].setVisible(visible);
   		}
   		else if( relatedPort.getName() == "c" )
   		{
   			this.leds[2].setVisible(visible);
   		}
   		else if( relatedPort.getName() == "d" )
   		{
   			this.leds[3].setVisible(visible);
   		}
   		else if( relatedPort.getName() == "e" )
   		{
   			this.leds[4].setVisible(visible);
   		}
   		else if( relatedPort.getName() == "f" )
   		{
   			this.leds[5].setVisible(visible);
   		}
   		else if( relatedPort.getName() == "g" )
   		{
   			this.leds[6].setVisible(visible);
   		}
   		
   		
    },


    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 86;
            height= 105;
        }
        
        this._super(width,height);
        //this.setCenter( 0 , 11.5 );
        this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.seg7.inputLocator();
        //this.outputLocator = new this.MyOutputPortLocator();
        
        this.inputs = [];
        this.inputs[0] = this.createPort("input",this.inputLocator);
        this.inputs[0].setName("a");
        
        this.inputs[1] = this.createPort("input",this.inputLocator);
        this.inputs[1].setName("b");
        
        this.inputs[2] = this.createPort("input",this.inputLocator);
        this.inputs[2].setName("c");
        
        this.inputs[3] = this.createPort("input",this.inputLocator);
        this.inputs[3].setName("d");
        
        this.inputs[4] = this.createPort("input",this.inputLocator);
        this.inputs[4].setName("e");
        
        this.inputs[5] = this.createPort("input",this.inputLocator);
        this.inputs[5].setName("f");
        
        this.inputs[6] = this.createPort("input",this.inputLocator);
        this.inputs[6].setName("g");
        
        //this.inputs[7] = this.createPort("input",this.inputLocator);
        //this.inputs[0].setName("a");
        
        this.leds = [];
        
        this.leds[0] = new draw2d.shape.analog.seg7h();
		//this.leds[0].setBackgroundColor( "#cccccc");
        this.add( this.leds[0] , new draw2d.shape.analog.seg7.inputLocator.segmentLocator(this) );
		//this.leds[0].setVisible(false);
		
		this.leds[1] = new draw2d.shape.analog.seg7v();
		this.add( this.leds[1] , new draw2d.shape.analog.seg7.inputLocator.segmentLocator(this) );
		//this.leds[1].setVisible(false);
		
		this.leds[2] = new draw2d.shape.analog.seg7v();
		this.add( this.leds[2] , new draw2d.shape.analog.seg7.inputLocator.segmentLocator(this) );
		//this.leds[2].setVisible(false);
				
		this.leds[3] = new draw2d.shape.analog.seg7h();
		this.add( this.leds[3] , new draw2d.shape.analog.seg7.inputLocator.segmentLocator(this) );
		//this.leds[3].setVisible(false);

				
		this.leds[4] = new draw2d.shape.analog.seg7v();
		this.add( this.leds[4] , new draw2d.shape.analog.seg7.inputLocator.segmentLocator(this) );
		//this.leds[5].setVisible(false);
		
		this.leds[5] = new draw2d.shape.analog.seg7v();
		this.add( this.leds[5] , new draw2d.shape.analog.seg7.inputLocator.segmentLocator(this) );
		//this.leds[4].setVisible(false);

		
		this.leds[6] = new draw2d.shape.analog.seg7h();
		this.add( this.leds[6] , new draw2d.shape.analog.seg7.inputLocator.segmentLocator(this) );
		//this.leds[6].setVisible(false);
		
		//this.leds[7] = new draw2d.shape.analog.seg7h();
		//this.add( this.leds[7] , new this.MySegmentLocator(this) );
		//this.leds[7].setVisible(false);
		

		//this.repaint();
        //this.input1.setValue("0");
        //this.input2.setValue("0");

        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
    },
    

    getSVG: function(){
    	 this.setBackgroundColor(null);
         return '<svg width="86" height="105" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <rect stroke="#231F20" id="svg_1" height="96.75292" width="70" stroke-miterlimit="10" fill="#FFFFFF" y="0.172" x="15.54551"/>  <line stroke-width="2" id="svg_2" y2="0.5" x2="0.5" y1="0.5" x1="15.58" stroke-miterlimit="10" stroke="#231F20" fill="none"/>  <line stroke-width="2" id="svg_3" y2="16.5" x2="0.5" y1="16.5" x1="16" stroke-miterlimit="10" stroke="#231F20" fill="none"/>  <line stroke-width="2" id="svg_4" y2="32.5" x2="0.5" y1="32.5" x1="15.581" stroke-miterlimit="10" stroke="#231F20" fill="none"/>  <line stroke-width="2" id="svg_5" y2="48.5" x2="0.5" y1="48.5" x1="15.581" stroke-miterlimit="10" stroke="#231F20" fill="none"/>  <line stroke-width="2" id="svg_6" y2="64.5" x2="0.5" y1="64.5" x1="15.581" stroke-miterlimit="10" stroke="#231F20" fill="none"/>  <line stroke-width="2" id="svg_7" y2="80.5" x2="0.5" y1="80.5" x1="15.581" stroke-miterlimit="10" stroke="#231F20" fill="none"/>  <line stroke-width="2" id="svg_8" y2="96.5" x2="0.33" y1="96.5" x1="15.581" stroke-miterlimit="10" stroke="#231F20" fill="none"/>  <line stroke-width="2" id="svg_9" y2="104.828" x2="50.202" y1="96.578" x1="50.202" stroke-miterlimit="10" stroke="#231F20" fill="none"/>  <polygon id="svg_10" points="80.5,43.556 76,48 71.5,43.556 71.5,12.445 76,8 80.5,12.445 " fill="#f2f2f2"/>  <polygon id="svg_11" points="80.5,83.557 76,88 71.5,83.557 71.5,52.445 76,48 80.5,52.445 " fill="#f2f2f2"/>  <polygon id="svg_12" points="28.5,43.556 23.999,48 19.5,43.556 19.5,12.445 23.999,8 28.5,12.445 " fill="#f2f2f2"/>  <polygon id="svg_13" points="28.5,83.557 23.999,88 19.5,83.557 19.5,52.445 23.999,48 28.5,52.445 " fill="#f2f2f2"/>  <polygon id="svg_14" points="68.682,43.5 73.037,48.001 68.682,52.5 31.32,52.5 26.963,48.001 31.32,43.5 " fill="#f2f2f2"/>  <polygon id="svg_15" points="69.557,2.5 74,7.001 69.557,11.5 30.445,11.5 26,7.001 30.445,2.5 " fill="#f2f2f2"/>  <polygon id="svg_16" points="69.057,84.5 73.5,89 69.057,93.5 30.945,93.5 26.5,89 30.945,84.5 " fill="#f2f2f2"/>  <rect id="svg_17" height="105" width="86" y="0" x="0" stroke-opacity="null" stroke-width="0" stroke="#231F20" fill="none"/> </svg>';
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.seg7.inputLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.seg7.inputLocator',
	init:function( ){
		this._super();
	},    
	relocate:function(index, figure){
		var w = figure.getParent().getWidth();
		var h = figure.getParent().getHeight();
		
		if( index == 1 )
		figure.setPosition(0, 16);
		
		else if( index == 2 )
		figure.setPosition(0, 32);
		
		else if( index == 3 )
		figure.setPosition(0, 48);

		else if( index == 4 )
		figure.setPosition(0, 64);

		else if( index == 5 )
		figure.setPosition(0, 80);

		else if( index == 6 )
		figure.setPosition(0, 96);
		
		else if( index == 0 )
		figure.setPosition(0, 0);
		
		else if( index == 7 )
		figure.setPosition(50, 101);
		
	}
}),


draw2d.shape.analog.seg7.inputLocator.segmentLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.seg7.inputLocator.segmentLocator',
	init:function( ){
		this._super();
	},    
	relocate:function(index, figure){
		
		if( index == 1 )
		figure.setPosition(26.2, 2.5);
		
		else if( index == 2 )
		figure.setPosition(72, 8);
		
		else if( index == 3 )
		figure.setPosition(72, 48.5);
		
		else if( index == 4 )
		figure.setPosition(26.2, 85);

		else if( index == 6 )
		figure.setPosition(19.5, 8);

		else if( index == 5 )
		figure.setPosition(19.5, 48.5);

		else if( index == 7 )
		figure.setPosition(26.2, 44);
		
		/*
		if( index == 8 )
		figure.setPosition(50, 101);
		*/
	}
});