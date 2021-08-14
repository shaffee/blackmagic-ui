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
 draw2d.shape.analog.jkFlipflop = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.jkFlipflop",
    jinput:'',
    kinput:'',
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
	    		var j = this.jinput.getValue();
	    		var k = this.kinput.getValue();
				var q = this.qout1.getValue();
				
				
				var _this = this;
				
				//Reset j == 0 , k == 1 
	    		if( j == "0" && k == "1" && q == "1" )
	    		{
   	 				this.qout1.setValue("0");
					this.qout2.setValue("1");
	    		}
	    		//Set j == 1 , k == 0
	    		else if( j == "1" && k == "0" && q == "0" )
	    		{
   	 				this.qout1.setValue("1");
					this.qout2.setValue("0");
	    		}
	    		//Toggle , k == 1 , k == 1
	    		else if( j == "1" && k == "1" )
	    		{
	    			if( q == 1 )
	    			{
	   	 				this.qout1.setValue("0");
						this.qout2.setValue("1");
	    			}
	    			else
	    			{
	   	 				this.qout1.setValue("1");
						this.qout2.setValue("0");
	    			}
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
        this.inputLocator = new draw2d.shape.analog.jkFlipflop.inputLocator();
        this.outputLocator = new draw2d.shape.analog.jkFlipflop.outputLocator();
        
        this.jinput = this.createPort("input",this.inputLocator);
        this.clock  = this.createPort("input",this.inputLocator);
		    this.kinput = this.createPort("input",this.inputLocator);
        
        this.jinput.delayed = 'yes';
        this.kinput.delayed = 'yes';
        
        this.clock.setName("clock");
        
        this.qout1 = this.createPort("output",this.outputLocator);
        this.qout2 = this.createPort("output",this.outputLocator);
	    
	    this.oldClk = "0";
	    this.qout2.setValue("1");
	    this.qout1.setValue("0");
	    this.jinput.setValue("0");
	    this.kinput.setValue("0");

	    var labelLocator = new draw2d.shape.analog.jkFlipflop.labelLocator();
	    
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
    /*
		this.defaultValues = { label:' ',clock_s:'1' };
	    this.addFigure( new draw2d.shape.basic.componentLabel("J") , labelLocator );
	    this.addFigure( new draw2d.shape.basic.componentLabel("Q") , labelLocator );
	    this.addFigure( new draw2d.shape.basic.componentLabel("Q") , labelLocator );
	    this.addFigure( new draw2d.shape.basic.componentLabel("CLK") , labelLocator );
	    this.addFigure( new draw2d.shape.basic.componentLabel("K") , labelLocator );
    */
        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
    },
    

    getSVG: function(){
    
    	this.setBackgroundColor(null);

         return '<svg width="112" height="96" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title> <title>Layer 1</title>  <rect fill="none" stroke-width="0" x="0" y="0" width="112" height="96" id="svg_8" opacity="0"/>  <line fill="none" stroke-width="2" x1="13.62818" y1="16.5" x2="0" y2="16.5" id="svg_1" stroke="#030404"/>  <line fill="none" stroke-width="2" x1="13.5832" y1="48.5" x2="0" y2="48.5" id="svg_2" stroke="#030404"/>  <rect y="0.73804" x="12.95611" fill="#ffffff" stroke-width="2" width="84.04" height="94.50003" id="svg_3" stroke="#030404"/>  <polyline fill="none" stroke-width="2" points="12.731250450015068,40.18120574951172 21.35130850970745,48.80126190185547 13.312985107302666,56.84175491333008 " id="svg_4" stroke="#030303"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="112" y1="16.5" x2="97.544" y2="16.5" id="svg_5"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="112" y1="80.5" x2="97.544" y2="80.5" id="svg_6"/>  <line fill="none" stroke-width="2" x1="13.87867" y1="80.5" x2="0" y2="80.5" id="svg_7" stroke="#030404"/>  <text fill="#070000" stroke="null" stroke-width="0" stroke-opacity="null" x="18.87423" y="22.38403" id="svg_11" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">J</text>  <text fill="#070000" stroke="null" stroke-width="0" stroke-opacity="null" x="17.62234" y="86.08455" id="svg_9" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">K</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_10" y="52.38916" x="25.40127" stroke-width="0" stroke="#000" fill="#070000">CLK</text>  <text fill="#070000" stroke="null" stroke-width="0" stroke-opacity="null" x="79.55138" y="22.38691" id="svg_12" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">Q</text>  <text fill="#070000" stroke="null" stroke-width="0" stroke-opacity="null" x="80.05228" y="84.0831" id="svg_13" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">Q</text>  <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_14" y2="71.6321" x2="91.22446" y1="71.6321" x1="79.41991" fill="none" stroke="#000"/></svg>';
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.jkFlipflop.inputLocator = draw2d.layout.locator.Locator.extend({
  NAME : 'draw2d.shape.analog.jkFlipflop.inputLocator',
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
draw2d.shape.analog.jkFlipflop.outputLocator = draw2d.layout.locator.Locator.extend({
  NAME : 'draw2d.shape.analog.jkFlipflop.outputLocator',
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
draw2d.shape.analog.jkFlipflop.labelLocator = draw2d.layout.locator.Locator.extend({
  NAME : 'draw2d.shape.analog.jkFlipflop.labelLocator',
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