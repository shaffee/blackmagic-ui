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
 
draw2d.shape.analog.lcd1602 = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.lcd1602",
    inputs:null,
    leds:null,
	comm:"",
	oldEn:0,
	oldBin:'',
	led_1:null,
	led_2:null,
	led_3:null,
	led_4:null,
	led_5:null,
	led_6:null,
	led_7:null,
	draw:0,
	emulator : null,
	labels:[],
	calls:0,
    // custom locator for the special design of the ResistorBridge Input area
    MyInputPortLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
            
            if( index < 6 )
            {
            	figure.setPosition( (index*16)+16, 0 );
            }
            else if( index < 14 )
            {
            	figure.setPosition( (index*16)+48 , 0 );
            }
            else
            {
            	figure.setPosition( (index*16)+74 , 0 );
            }
			
			
        }
    }),
	
    MyLabelLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
            
            index = index-2;
            if( index < 6 )
            {
            	figure.setPosition( (index*16), 20 );
            }
            else if( index < 14 )
            {
            	figure.setPosition( (index*16)+32 , 20 );
            }
            else
            {
            	figure.setPosition( (index*16)+58 , 20 );
            }
			
			
        }
    }),
	
	
 	MySegmentLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
           figure.setPosition( 37 + ( index * 3.1 ) + (parseInt(index/6)*2)  , 70);
        }
    }),
   
   beforeAdd : function(){
   		console.log("Adding 7Segment");
   },

    
     onPortValueChanged: function(relatedPort){
   		
   		//console.log("7Seg Changed "+relatedPort.getName() );
   		
	   	
	   	var bin = [this.inputs[13].getValue(), this.inputs[12].getValue(), this.inputs[11].getValue(), this.inputs[10].getValue(), this.inputs[9].getValue(), this.inputs[8].getValue(), this.inputs[7].getValue(), this.inputs[6].getValue() ].join('');
	   	var DB = parseInt(bin, 2);
	   	
	   	//this.inputs[5].getValue() , this.inputs[4].getValue() , this.inputs[3].getValue()
	   	
	   	if( typeof this.pixels != 'undefined' )
	   	{
			//console.log("Old en : "+ this.oldEn + " , current "+ this.inputs[5].getValue());
			
			
			if( this.oldEn == "0" && this.inputs[5].getValue() == "1" )
			{
				//console.log("============================================ "+DB);
		   		this.pixels.emulator.readWrite( this.inputs[5].getValue() , this.inputs[3].getValue() , this.inputs[4].getValue() , DB );

				//var data = parseInt( bin , 2 );
				//this.pixels.emulator.lcd(data ,  );
				
				//if( this.calls++%4 == 0 )
				
		   		//this.pixels.setVisible(0);
		        //this.pixels.svgNodes = this.pixels.createSet();
		        //this.pixels.repaint();
		       //	this.pixels.setVisible(1);
				
			}
			else if( this.oldBin != bin )
			{
				
				//console.log("Checking the command for opcode : " + bin + " Decimal : " + parseInt(bin,2));
				//this.pixels.emulator.instrpeek(parseInt(bin,2));
			}
	   	}
	   	
		//console.log("Setting Value of EN" +  this.inputs[5].getValue() );
		this.oldEn = this.inputs[5].getValue();
		this.oldBin = bin;

       	
    },


    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 330;
            height= 150;
        }
        this.enabled = false;
        this._super(width,height);
        //this.setCenter( 0 , 11.5 );
        this.setResizeable(false);
        this.inputLocator = new this.MyInputPortLocator();
        //this.outputLocator = new this.MyOutputPortLocator();
        
        this.inputs = [];
        this.inputs[0] = this.createPort("input",this.inputLocator);
        this.inputs[0].setName("vss");
        
        this.inputs[1] = this.createPort("input",this.inputLocator);
        this.inputs[1].setName("vdd");
        
        this.inputs[2] = this.createPort("input",this.inputLocator);
        this.inputs[2].setName("ve");
        
        this.inputs[3] = this.createPort("input",this.inputLocator);
        this.inputs[3].setName("rs");
        
        this.inputs[4] = this.createPort("input",this.inputLocator);
        this.inputs[4].setName("rw");
        
        this.inputs[5] = this.createPort("input",this.inputLocator);
        this.inputs[5].setName("e");
        
        this.inputs[6] = this.createPort("input",this.inputLocator);
        this.inputs[6].setName("d0");

        this.inputs[7] = this.createPort("input",this.inputLocator);
        this.inputs[7].setName("d1");


        this.inputs[8] = this.createPort("input",this.inputLocator);
        this.inputs[8].setName("d2");

        this.inputs[9] = this.createPort("input",this.inputLocator);
        this.inputs[9].setName("d3");


        this.inputs[10] = this.createPort("input",this.inputLocator);
        this.inputs[01].setName("d4");


        this.inputs[11] = this.createPort("input",this.inputLocator);
        this.inputs[11].setName("d5");


        this.inputs[12] = this.createPort("input",this.inputLocator);
        this.inputs[12].setName("d6");


        this.inputs[13] = this.createPort("input",this.inputLocator);
        this.inputs[13].setName("d7");


        this.inputs[14] = this.createPort("input",this.inputLocator);
        this.inputs[14].setName("backLightPlus");


        this.inputs[15] = this.createPort("input",this.inputLocator);
        this.inputs[15].setName("backLightMinus");

     	//this.pixels = [];
     	
     	this.pixels = new draw2d.shape.analog.pixels();
	   	this.add( this.pixels , new this.MySegmentLocator(this) );

	    this.labelLocator = new this.MyLabelLocator();

		var labelsText = [ 'GND' , 'VDD' , 'VE', 'RS' , 'RW' , 'EN', 'D0' , 'D1' , 'D2' , 'D3' , 'D4' , 'D5' , 'D6' , 'D7', 'L+' , 'L-'   ];
		
		for(var i=0; i<labelsText.length; i++ )
		{
		    this.labels[i] =new draw2d.shape.basic.Label(labelsText[i]);
			this.labels[i].setRotationAngle(90);
			this.labels[i].setStroke(0)
		    this.add(this.labels[i], this.labelLocator);
		}
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
         	return '<svg width="330" height="150" xmlns="http://www.w3.org/2000/svg">  <path id="svg_1" d="m-0.666,16.75v133.25h330.166v-133.25h-330.166l0,0z" fill="#237B3D"/>  <path id="svg_2" d="m316.51099,133.13901c0,6.08899 -5.37299,11.02499 -12,11.02499h-280.31899c-6.627,0 -12,-4.936 -12,-11.02499v-78.61401c0,-6.089 5.373,-11.025 12,-11.025h280.31899c6.62701,0 12,4.936 12,11.025v78.61401l0,0z" fill="#303030"/>  <path id="svg_3" d="m303.435,124.202c0,3.21999 -2.63501,5.855 -5.85699,5.855h-266.454c-3.22,0 -5.855,-2.63501 -5.855,-5.855v-59.438c0,-3.22 2.635,-5.855 5.855,-5.855h266.45498c3.22202,0 5.85703,2.635 5.85703,5.855l-0.00101,59.438l0,0z" fill="#88AE3F"/>  <rect id="svg_4" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="39.401"/>  <rect id="svg_5" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="55.085"/>  <rect id="svg_6" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="70.769"/>  <rect id="svg_7" height="24.118" width="14.639" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="86.453"/>  <rect id="svg_8" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="102.139"/>  <rect id="svg_9" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="117.823"/>  <rect id="svg_10" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="133.507"/>  <rect id="svg_11" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="149.191"/>  <rect id="svg_12" height="24.118" width="14.639" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="164.875"/>  <rect id="svg_13" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="180.56"/>  <rect id="svg_14" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="196.244"/>  <rect id="svg_15" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="211.928"/>  <rect id="svg_16" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="227.612"/>  <rect id="svg_17" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="243.296"/>  <rect id="svg_18" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="258.979"/>  <rect id="svg_19" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="94.989" x="274.665"/>  <rect id="svg_20" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="39.401"/>  <rect id="svg_21" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="55.085"/>  <rect id="svg_22" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="70.769"/>  <rect id="svg_23" height="24.118" width="14.639" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="86.453"/>  <rect id="svg_24" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="102.139"/>  <rect id="svg_25" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="117.823"/>  <rect id="svg_26" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="133.507"/>  <rect id="svg_27" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="149.191"/>  <rect id="svg_28" height="24.118" width="14.639" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="164.875"/>  <rect id="svg_29" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="180.56"/>  <rect id="svg_30" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="196.244"/>  <rect id="svg_31" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="211.928"/>  <rect id="svg_32" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="227.612"/>  <rect id="svg_33" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="243.296"/>  <rect id="svg_34" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="258.979"/>  <rect id="svg_35" height="24.118" width="14.637" fill-opacity="0.1" fill="#1A1A1A" y="69.857" x="274.665"/>  <line id="svg_36" y2="16.75" x2="16" y1="0" x1="16" stroke-miterlimit="10" stroke="#237B3D" fill="none"/>  <line id="svg_37" y2="16.75" x2="32" y1="0" x1="32" stroke-miterlimit="10" stroke="#237B3D" fill="none"/>  <line id="svg_38" y2="16.75" x2="48" y1="0" x1="48" stroke-miterlimit="10" stroke="#237B3D" fill="none"/>  <line id="svg_39" y2="16.75" x2="64" y1="0" x1="64" stroke-miterlimit="10" stroke="#237B3D" fill="none"/>  <line id="svg_40" y2="16.75" x2="80" y1="0" x1="80" stroke-miterlimit="10" stroke="#237B3D" fill="none"/>  <line id="svg_41" y2="16.75" x2="96" y1="0" x1="96" stroke-miterlimit="10" stroke="#237B3D" fill="none"/>  <line id="svg_42" y2="16.75" x2="144" y1="0" x1="144" stroke-miterlimit="10" stroke="#237B3D" fill="none"/>  <line id="svg_43" y2="16.75" x2="160" y1="0" x1="160" stroke-miterlimit="10" stroke="#237B3D" fill="none"/>  <line id="svg_44" y2="16.75" x2="176" y1="0" x1="176" stroke-miterlimit="10" stroke="#237B3D" fill="none"/>  <line id="svg_45" y2="16.75" x2="192" y1="0" x1="192" stroke-miterlimit="10" stroke="#237B3D" fill="none"/>  <line id="svg_46" y2="16.75" x2="208" y1="0" x1="208" stroke-miterlimit="10" stroke="#237B3D" fill="none"/>  <line id="svg_47" y2="16.75" x2="224" y1="0" x1="224" stroke-miterlimit="10" stroke="#237B3D" fill="none"/>  <line id="svg_48" y2="16.75" x2="240" y1="0" x1="240" stroke-miterlimit="10" stroke="#237B3D" fill="none"/>  <line id="svg_49" y2="16.75" x2="314" y1="0" x1="314" stroke-miterlimit="10" stroke="#237B3D" fill="none"/>  <line id="svg_50" y2="16.75" x2="256" y1="0" x1="256" stroke-miterlimit="10" stroke="#237B3D" fill="none"/>  <line id="svg_51" y2="16.75" x2="298" y1="0" x1="298" stroke-miterlimit="10" stroke="#237B3D" fill="none"/></svg>';
    }
});


 
draw2d.shape.analog.pixels = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.lcd1602",
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
	draw:0,
    // custom locator for the special design of the ResistorBridge Input area
    MyInputPortLocator : draw2d.layout.locator.Locator.extend({
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
	
	
 	MySegmentLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
           console.log(index);
	       console.log(40 + ( index * 3 ) + (Math.floor(index/6)*2));
           figure.setPosition( 37.5 + ( index * 3.1 ) + (parseInt(index/6)*2)  , 50);
        }
    }),
   
   beforeAdd : function(){
   		console.log("Adding 7Segment");
   },
   
   onDoubleClick: function(){


	
		
   		this.setVisible(0);
        this.svgNodes = this.createSet();
        this.repaint();
       	this.setVisible(1);
    },
    
     onPortValueChanged: function(relatedPort){
   		
   		//console.log("7Seg Changed "+relatedPort.getName() );
   		
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
            width = 330;
            height= 150;
        }
        
        this._super(width,height);
        //this.setCenter( 0 , 11.5 );
        this.setResizeable(false);
        this.inputLocator = new this.MyInputPortLocator();
        
 		
 		this.emulator = new hd44780();
 		//this.emulator.reset();
        //this.outputLocator = new this.MyOutputPortLocator();
     },

    getSVG: function(){
	  
		  this.draw++;
		  
		  var svg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="330px" height="150px" viewBox="0 0 330 150" enable-background="new 0 0 330 150" xml:space="preserve">';
		
		  y = 50;
		  var xMargin = 0;
		  var yMargin = 0;
		/*
		for(var i=0; i<16; i++ )
		{	
			for( var row=0; row <8; row++ )
			{
				var data = this.emulator.screenArray[((i*8)+row)];
							
				for( var bit=0; bit<5; bit++ )
				{
					xMargin = (i*3.14*5)+(bit*3.1);
					yMargin = 3 * row;
					if( this.emulator.screenArray[((i*8)+row)][bit] == 0 )
					{
		  				svg += '<rect x="'+xMargin+'px" y="'+yMargin+'px" width="2" height="2.7" fill="#709032" stroke="none" stroke-width="0" opacity="1""></rect>';
					}
					else
					{
		  				svg += '<rect x="'+xMargin+'px" y="'+yMargin+'px" width="2" height="2.7" fill="#000000" stroke="none" stroke-width="0" opacity="1""></rect>';
					}
				}
				
		  				
		  							
			}
		}
		*/
  
	  svg += '</svg>';
	  
	  //console.log("complete the calculation");
	  return svg;
    }
});

