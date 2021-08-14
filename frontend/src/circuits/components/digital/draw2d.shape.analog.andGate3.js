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
 
 draw2d.shape.analog.andGate3 = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.andGate3",
    input1:"",
    input2:"",
    input3:"",
    oldValue1:"n",
    oldValue2:"n",
    oldValue3:"n",
	output:"",
	inputPorts:[],
	operation:".",

     onPortValueChanged: function(relatedPort){
   
	    var input1Val = this.input1.getValue();
	    var input2Val = this.input2.getValue();
	    var input3Val = this.input3.getValue();

	    if( input1Val == this.oldValue1 && input2Val == this.oldValue2 && input3Val == this.oldValue3)
	    {
	    	return ;
	    }
		
		this.oldValue1 = input1Val;
		this.oldValue2 = input2Val;
		this.oldValue3 = input3Val;
		
    	if( input1Val == "1" && input2Val == "1" && input3Val == "1" )
    	{
    		this.output.setValue("1");
    	}
    	else if( input1Val == "0" || input2Val == "0" || input3Val == "0")
       	{
    		this.output.setValue("0");
    	}
    },
    
   
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 90;
            height= 64;
        }
        this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
        
        this._super(width,height);
        this.setCenter( 0 , 11.5 );
        this.setResizeable(false);

        this.inputLocator = new draw2d.shape.analog.andGate3.inputLocator();
        this.outputLocator = new draw2d.shape.analog.andGate3.outLocator();
        
        this.input1 = this.createPort("input",this.inputLocator);
        this.input1.delayed = 'yes';
        
        this.input2 = this.createPort("input",this.inputLocator);
        this.input2.delayed = 'yes';
        
        this.input3 = this.createPort("input",this.inputLocator);
        this.input3.delayed = 'yes';
        
        this.output = this.createPort("output",this.outputLocator);
        
        this.input1.setValue("0");
        this.input2.setValue("0");
        this.input3.setValue("0");
        

    },
    getSVG: function(){
    	 this.setBackgroundColor(null);
         return '<svg width="89.99999999999999" height="64" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title>   <title>Layer 1</title>  <line id="svg_1" y2="16.5" x2="0.5" y1="16.5" x1="11.478" stroke-width="2" stroke="#030404" fill="none"/>  <path id="svg_2" d="m11.099,-0.01343l35.453,0.026c18.403,-0.077 33.378,14.529 33.45,32.021c0.073,17.489 -14.704,31.903 -33.105,31.98l0,0l-35.759,-0.028l-0.039,-63.999z" stroke="#030404" fill="#FFFFFF" stroke-width="2"/>  <line id="svg_4" y2="48.5" x2="0.5" y1="48.5" x1="11.478" stroke-width="2" stroke="#030404" fill="none"/>  <line stroke-linecap="null" stroke-linejoin="null" id="svg_5" y2="32.5" x2="90.5" y1="32.5" x1="79.91819" fill-opacity="null" stroke-opacity="null" stroke-width="2" stroke="#010101" fill="none"/>  <line id="svg_3" y2="32.5" x2="0.5" y1="32.5" x1="11.478" stroke-width="2" stroke="#030404" fill="none"/> </svg>';
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.andGate3.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.andGate3.inputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        
        if( index == 0 )
        figure.setPosition(1, 16);
        if( index == 1 )
        figure.setPosition(1, 48);
        if( index == 2 )
        figure.setPosition(1, 32);
        if( index == 3 )
        figure.setPosition(w-1, 32);
    }
});


// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.andGate3.outLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.andGate3.outLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        
        figure.setPosition(w-1, 32);
    }
});

