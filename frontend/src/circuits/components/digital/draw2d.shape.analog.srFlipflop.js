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
 draw2d.shape.analog.srFlipflop = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.srFlipflop",
    sinput:'',
    rinput:'',
    clock:'',
    qout1:'',
    qout2:'',
    oldClk:'',
  	tt : 1,  

    
timer10msTick: function(){
		
		var data = this.getUserData();
	    	var values = data['formData'];
	    	if( typeof values != 'undefined')
	    		{	
		    		if( values.clock_s === "Falling" )
		    			this.tt = 0;
		    		else 
		    			this.tt= 1;
		    		
		    		console.log(this.clock.getValue() + "	" + this.tt + "		" + values.clock_s);		    	 

		    	 }

    	if( parseInt(this.clock.getValue()) == this.tt && parseInt(this.oldClk) != this.tt)
    	{	    	
	    		var s = this.sinput.getValue();
	    		var r = this.rinput.getValue();
				var q = this.qout1.getValue();
				
				var _this = this;
				
				//Set s == 1 , r == 0
	    		if( s == "1" && r == "0" )
	    		{
   	 				this.qout1.setValue("1");
					this.qout2.setValue("0");
	    		}
	    		//Rest s == 0 , r == 1
	    		else if( s == "0" && r == "1" )
	    		{
   	 				this.qout1.setValue("0");
					this.qout2.setValue("1");
	    		}
	    		//invalid , s == 1 , r == 1
	    		else if( s == "1" && r == "1" )
	    		{
	 
   	 				this.qout1.setValue("0");
					this.qout2.setValue("0");

	    		}
	    		
	    	this.oldClk = this.clock.getValue();	
    		
    	}


	    this.oldClk = this.clock.getValue();
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
        this.inputLocator = new draw2d.shape.analog.srFlipflop.inputLocator();
        this.outputLocator = new draw2d.shape.analog.srFlipflop.outputLocator();
        
        this.sinput = this.createPort("input",this.inputLocator);
        this.clock  = this.createPort("input",this.inputLocator);
		this.rinput = this.createPort("input",this.inputLocator);
        
        this.sinput.delayed = 'yes';
        this.rinput.delayed = 'yes';
        
        this.clock.setName("clock");
        
        this.qout1 = this.createPort("output",this.outputLocator);
        this.qout2 = this.createPort("output",this.outputLocator);
	    
	    this.oldClk = "0";
	    this.qout2.setValue("1");
	    this.qout1.setValue("0");
	    this.sinput.setValue("0");
	    this.rinput.setValue("0");

	    var labelLocator = new draw2d.shape.analog.srFlipflop.labelLocator();
	    
	    this.params = {
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  },
		  clock_s: {
		      "title": "Clock",
		      "type": "string",
		      
		      "enum": [
		        "Rising",
		        "Falling"
		      ]
		    }

		};
		
		this.defaultValues = { label:' ',clock_s:'1' };
		
      /*
	    this.addFigure( new draw2d.shape.basic.componentLabel("S") , labelLocator );
	    this.addFigure( new draw2d.shape.basic.componentLabel("Q") , labelLocator );
	    this.addFigure( new draw2d.shape.basic.componentLabel("Q'") , labelLocator );
	    this.addFigure( new draw2d.shape.basic.componentLabel("CLK") , labelLocator );
	    this.addFigure( new draw2d.shape.basic.componentLabel("R") , labelLocator );
      */

    },
    

    getSVG: function(){
    
    	this.setBackgroundColor(null);

		return '<svg width="112" height="96" xmlns="http://www.w3.org/2000/svg">  <title>Layer 1</title>  <rect opacity="0" id="svg_8" height="96" width="112" y="0" x="0" stroke-width="0" fill="none"/>  <line stroke="#030404" id="svg_1" y2="16.5" x2="0" y1="16.5" x1="13.62818" stroke-width="2" fill="none"/>  <line stroke="#030404" id="svg_2" y2="48.5" x2="0" y1="48.5" x1="13.5832" stroke-width="2" fill="none"/>  <rect stroke="#030404" id="svg_3" height="94.50003" width="84.04" stroke-width="2" fill="#ffffff" x="12.95611" y="0.73804"/>  <polyline stroke="#030303" id="svg_4" points="12.731250450015068,40.18120574951172 21.35130850970745,48.80126190185547 13.312985107302666,56.84175491333008 " stroke-width="2" fill="none"/>  <line id="svg_5" y2="16.5" x2="97.544" y1="16.5" x1="112" stroke-width="2" stroke="#030404" fill="none"/>  <line id="svg_6" y2="80.5" x2="97.544" y1="80.5" x1="112" stroke-width="2" stroke="#030404" fill="none"/>  <line stroke="#030404" id="svg_7" y2="80.5" x2="0" y1="80.5" x1="13.87867" stroke-width="2" fill="none"/>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_11" y="22" x="18.87423" stroke-opacity="null" stroke-width="0" stroke="null" fill="#070000">S</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_9" y="86.08455" x="17.62234" stroke-opacity="null" stroke-width="0" stroke="null" fill="#070000">R</text>  <text fill="#070000" stroke="#000" stroke-width="0" x="25.40127" y="52.38916" id="svg_10" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">CLK</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_12" y="22.38691" x="79.55138" stroke-opacity="null" stroke-width="0" stroke="null" fill="#070000">Q</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_13" y="84.0831" x="80.05228" stroke-opacity="null" stroke-width="0" stroke="null" fill="#070000">Q</text>  <line stroke="#000" fill="none" x1="79.05685" y1="71.93359" x2="90.8614" y2="71.93359" id="svg_14" stroke-linejoin="undefined" stroke-linecap="undefined"/> </svg>'; 
		
		  }
});

    // custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.srFlipflop.inputLocator = draw2d.layout.locator.Locator.extend({
      NAME : 'draw2d.shape.analog.srFlipflop.inputLocator',
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
  });

  // custom locator for the special design of the ResistorBridge Input area
  draw2d.shape.analog.srFlipflop.outputLocator = draw2d.layout.locator.Locator.extend({
      NAME : 'draw2d.shape.analog.srFlipflop.outputLocator',
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
  // custom locator for the special design of the ResistorBridge Input area
  draw2d.shape.analog.srFlipflop.labelLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.srFlipflop.labelLocator',
      init:function( ){
        this._super();
      },    
      relocate:function(index, figure){
          var w = figure.getParent().getWidth();
          var h = figure.getParent().getHeight();

          if( index == 1 )
          figure.setPosition(15, 5);
          if( index == 2 )
          figure.setPosition(w-32, 5);
          if( index == 3 )
          figure.setPosition(w-30, h-26);
          if( index == 4 )
          figure.setPosition(15, 37);
    if( index == 5 )
    figure.setPosition(15, h-28);
      }
  });