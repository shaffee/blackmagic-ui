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
 draw2d.shape.analog.dFlipflop = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.dFlipflop",
    dinput:'',
    clock:'',
    qout1:'',
    qout2:'',
    oldClk:'',
    lastUpdate:0,
    qOld:'',
	tt : 1,

    
	timer10msTick: function(){
		var values;
		var data = this.getUserData();
	    	values = data['formData'];
	    	if( typeof values != 'undefined')
	    		{	
		    		if( values.clock_s === "Falling" )
		    			this.tt = 0;
		    		else 
		    			this.tt= 1;
		    		
		    		//console.log(this.clock.getValue() + "	" + this.tt + "		" + values.clock_s);		    	 

		    	 }

    	if( parseInt(this.clock.getValue()) == this.tt && parseInt(this.oldClk) != this.tt)
    	{
    		
    		if( this.dinput.getValue() == "1" )
    		{
   	 			this.qout1.setValue("1");
				this.qout2.setValue("0");
    		}
    		else
    		{
   	 				this.qout1.setValue("0");
    			this.qout2.setValue("1");
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
            width = 112;
            height= 96;
        }
        
        this._super({width:width,height:height});
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.dFlipflop.inputLocator();
        this.outputLocator = new draw2d.shape.analog.dFlipflop.outputLocator();
        
        this.dinput = this.createPort("input",this.inputLocator);
        //this.dinput.setName("delayed");
        this.dinput.delayed = 'yes';
        
        this.clock = this.createPort("input",this.inputLocator);
        this.clock.setName("clock");
        
        this.qout1 = this.createPort("output",this.outputLocator);
        this.qout2 = this.createPort("output",this.outputLocator);
	    
	    this.oldClk = "0";
	    this.qout2.setValue("1");
	    this.qout1.setValue("0");
	    this.dinput.setValue("0");
	    
	    var labelLocator = new draw2d.shape.analog.dFlipflop.labelLocator();
	    
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
		
	    this.add( new draw2d.shape.basic.componentLabel("D") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("Q") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("Q") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("CLK") , labelLocator );
	    
	    

        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
    },
    

    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="112" height="96" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title>   <title>Layer 1</title>  <line fill="none" stroke-width="2" x1="13.38298" y1="16.5" x2="0" y2="16.5" id="svg_1" stroke="#030404"/>  <line fill="none" stroke-width="2" x1="13.46181" y1="80.5" x2="0" y2="80.5" id="svg_2" stroke="#030404"/>  <rect x="14.10508" fill="#ffffff" stroke="#030404" stroke-width="2" width="84.04" height="96" id="svg_3" y="0"/>  <polyline fill="none" stroke-width="2" points="13.861530408263206,73.19715118408203 21.36784754693508,80.7034683227539 14.368099316954613,87.705078125 " id="svg_5" stroke="#030303"/>  <line fill="none" stroke-width="2" x1="112" y1="16.5" x2="97.79545" y2="16.5" id="svg_9" stroke="#030404"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="112" y1="80.5" x2="98" y2="80.5" id="svg_10"/>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_6" y="21" x="18.24997" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="null" fill="#000000">D</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_7" y="21.18748" x="81.87426" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="null" fill="#000000">Q</text>  <text style="cursor: move;" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_8" y="85.68753" x="81.99933" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="null" fill="#000000">Q</text>  <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_11" y="84.31253" x="23.87497" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#030303" fill="#000000">CLK</text>  <line fill="none" stroke="#030404" stroke-opacity="null" fill-opacity="null" x1="81.01608" y1="73.57707" x2="93.27429" y2="73.57707" id="svg_13" stroke-linejoin="null" stroke-linecap="null"/> </svg>';
    },
    
    reset: function(){
		    this.oldClk = "0";
		    this.qout2.setValue("1");
		    this.qout1.setValue("0");
		    this.dinput.setValue("0");

    		//console.log("NEW _ RESETING FLIP FLOP");
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.dFlipflop.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.dFlipflop.inputLocator',
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
draw2d.shape.analog.dFlipflop.outputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.dFlipflop.outputLocator',
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
draw2d.shape.analog.dFlipflop.labelLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.dFlipflop.labelLocator',
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