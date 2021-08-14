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
 draw2d.shape.analog.orGate3 = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.orGate3",
    input1:"",
    input2:"",
    input3:"",
	output:"",
	oldValue1:"n",
	oldValue2:"n",
	oldValue3:"n",
	operation:"+",


     onPortValueChanged: function(relatedPort){
   
	   	var input1Val = this.input1.getValue();
	    var input2Val = this.input2.getValue();
	    var input3Val = this.input3.getValue();

	    
	    if( input1Val == this.oldValue1 && input2Val == this.oldValue2 && input3Val == this.oldValue3 )
	    {
	    	return ;
	    }
		
		this.oldValue1 = input1Val;
		this.oldValue2 = input2Val;
		this.oldValue3 = input3Val;
		
    	if( input1Val == "1" || input2Val == "1" || input3Val == "1" )
    	{
    		this.output.setValue("1");
    	}
    	else if( input1Val == "0" && input2Val == "0"  && input3Val == "0" )
       	{
    		this.output.setValue("0");
    	}
    	
    },

    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 90;
            height= 64;
        }
        this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
    	
        this._super(width,height);
        this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.orGate3.inputLocator();
        this.outputLocator = new draw2d.shape.analog.orGate3.outputLocator();
        
        this.input1 = this.createPort("input",this.inputLocator);
        this.input1.delayed = 'yes';

        this.input2 = this.createPort("input",this.inputLocator);
        this.input2.delayed = 'yes';
        
        this.input3 = this.createPort("input",this.inputLocator);
        this.input3.delayed = 'yes';

        this.output = this.createPort("output",this.outputLocator);
        

    },
    

    getSVG: function(){
    	 this.setBackgroundColor(null);
         return '<svg width="90" height="64" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title>  <title>Layer 1</title>  <line id="svg_2" y2="16.5" x2="0.5" y1="16.5" x1="16.5" stroke-width="2" stroke="#030404" fill="none"/>  <line id="svg_3" y2="32.5" x2="90.5" y1="32.5" x1="79.926" stroke-width="2" stroke="#030404" fill="none"/>  <line id="svg_4" y2="48.5" x2="0.5" y1="48.5" x1="16" stroke-width="2" stroke="#030404" fill="none"/>  <path id="svg_5" d="m8.139,0.8568l27.181,0c18.594,1.44 35.53,12.958 44.806,31.514c-9.276,18.552 -26.212,31.046 -44.806,32.486l-27.181,0c13.52,-19.198 13.52,-44.801 0,-64z" stroke-width="2" stroke="#030404" fill="#FFFFFF"/>  <line id="svg_1" y2="32.5" x2="0.5" y1="32.5" x1="16" stroke-width="2" stroke="#030404" fill="none"/> </svg>';
    }
});

draw2d.shape.analog.orGate3.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.orGate3.inputLocator',
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
        figure.setPosition(0, 32);
    }
});

draw2d.shape.analog.orGate3.outputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.orGate3.outputLocator',
    init:function( ){
      this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        
        figure.setPosition(w, 32);
    }
});