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
 draw2d.shape.analog.tFlipflop = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.tFlipflop",
   tinput:'',
   clock:'',
   qout1:'',
   qout2:'',
   oldClk:'',
   tt: 1,

    
	timer10msTick: function(){
		
		var data = this.getUserData();
	    	var values = data['formData'];
	    	if( typeof values != 'undefined')
	    		{	
		    		if( values.clock_s === "Falling" )
		    			this.tt = 0;
		    		else 
		    			this.tt= 1;
		    		
		    	 }

    	if( parseInt(this.clock.getValue()) == this.tt && parseInt(this.oldClk) != this.tt)	    	{
	    		//console.log("q: "+this.qout1);
	    		if( this.tinput.getValue() == "1" )
	    		{
	    			
	    			var nextQ = this.qout1.getValue() == "1" ? "0" : "1";
	    			var nextQnot = this.qout1.getValue() == "1" ? "1" : "0";
	    			
   	 				this.qout1.setValue(nextQ);
    				this.qout2.setValue(nextQnot);
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
        this.setCenter( 0 , 11.5 );
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.tFlipflop.inputLocator();
        this.outputLocator = new draw2d.shape.analog.tFlipflop.outputLocator();
        
        this.tinput = this.createPort("input",this.inputLocator);
        this.tinput.delayed='yes';
        
        this.clock = this.createPort("input",this.inputLocator);
        this.clock.setName("clock");
        
        this.qout1 = this.createPort("output",this.outputLocator);
        this.qout2 = this.createPort("output",this.outputLocator);
        
        this.oldClk = "0";
        this.qout2.setValue("1");
        this.qout1.setValue("0");
        this.tinput.setValue("0");
        
        
        var labelLocator = new draw2d.shape.analog.tFlipflop.labelLocator();
        
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
        this.addFigure( new draw2d.shape.basic.componentLabel("T") , labelLocator );
        this.addFigure( new draw2d.shape.basic.componentLabel("Q") , labelLocator );
        this.addFigure( new draw2d.shape.basic.componentLabel("Q") , labelLocator );
        this.addFigure( new draw2d.shape.basic.componentLabel("CLK") , labelLocator );
        */
        
    },
    

    getSVG: function(){
       	 this.setBackgroundColor(null);
         return '<svg width="112" height="96" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title>  <title>Layer 1</title>  <rect id="svg_11" height="96" width="112" y="0" x="0" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#030404" fill="none"/>  <line stroke="#030404" id="svg_1" y2="16.5" x2="0" y1="16.5" x1="13.38121" stroke-width="2" fill="none"/>  <line stroke="#030404" id="svg_2" y2="80.5" x2="0" y1="80.5" x1="13.08382" stroke-width="2" fill="none"/>  <rect stroke="#030404" y="0.25113" id="svg_3" height="94.86992" width="84.04" stroke-width="2" fill="#ffffff" x="13.16383"/>  <polyline stroke="#030303" id="svg_5" points="13.108974054455757,74.86866760253906 18.601750925183296,80.36144256591797 13.479660585522652,85.48490142822266 " stroke-width="2" fill="none"/>  <line id="svg_8" y2="16.5" x2="98" y1="16.5" x1="112" stroke-width="2" stroke="#030404" fill="none"/>  <line id="svg_9" y2="80.5" x2="97.544" y1="80.5" x1="112" stroke-width="2" stroke="#030404" fill="none"/>  <text fill="#000000" stroke="#030303" stroke-width="0" stroke-opacity="null" fill-opacity="null" x="18.00104" y="22.81319" id="svg_4" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">T</text>  <text fill="#000000" stroke="#030303" stroke-width="0" stroke-opacity="null" fill-opacity="null" x="80.12434" y="22.68819" id="svg_6" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">Q</text>  <text fill="#000000" stroke="#030303" stroke-width="0" stroke-opacity="null" fill-opacity="null" x="79.24936" y="84" id="svg_7" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">Q</text>  <line fill="none" stroke-opacity="null" fill-opacity="null" x1="78.12437" y1="72.56186" x2="90.38903" y2="72.56186" id="svg_10" stroke-linejoin="null" stroke-linecap="null" stroke="#030404"/>  <text fill="#000000" stroke="#030404" stroke-width="0" stroke-opacity="null" fill-opacity="null" x="21.62594" y="83.68653" id="svg_12" font-size="12" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">CLK</text> </svg>';
    }
});


    // custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.tFlipflop.inputLocator = draw2d.layout.locator.Locator.extend({
      NAME : 'draw2d.shape.analog.tFlipflop.inputLocator',
      init:function( ){
        this._super();
      },    
      relocate:function(index, figure){
          var w = figure.getParent().getWidth();
          var h = figure.getParent().getHeight();
          
          if( index == 0 )
          figure.setPosition(0, 16);
          if( index == 1 )
          figure.setPosition(0, 80);
      }
  });
  // custom locator for the special design of the ResistorBridge Input area
  draw2d.shape.analog.tFlipflop.labelLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.tFlipflop.labelLocator',
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
          figure.setPosition(15, h-28);
      }
  });

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.tFlipflop.outputLocator = draw2d.layout.locator.Locator.extend({
  NAME : 'draw2d.shape.analog.tFlipflop.outputLocator',
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
