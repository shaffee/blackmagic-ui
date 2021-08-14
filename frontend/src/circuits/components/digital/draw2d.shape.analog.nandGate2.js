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
 draw2d.shape.analog.nandGate2 = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.nandGate2",
    input1:"",
    input2:"",
    oldInput1:"",
    oldInput2:"",
	output:"",
	operation:"NAND",


    onDoubleClick: function(){
    },
    
     onPortValueChanged: function(relatedPort){
   

	    //var outputVal = this.output.getValue() != null ? this.output.getValue() : "0";
	    if( this.oldInput1 == this.input1.getValue() && this.oldInput2 == this.input2.getValue() )
	    {

	    	this.oldInput1 = this.input1.getValue();
	    	this.oldInput2 = this.input2.getValue();

	    }
	    else
	    {
	    	this.oldInput1 = this.input1.getValue();
	    	this.oldInput2 = this.input2.getValue();
	  
	    	if( this.input1.getValue() == "1" && this.input2.getValue() == "1" && ( this.output.getValue()=="1" || this.output.getValue() == null ))
	    	{
	    		this.output.setValue("0");
	    	}
	    	else if( (this.input1.getValue() == "0" || this.input2.getValue() == "0" ) && ( this.output.getValue()=="0" || this.output.getValue() == null ) )
	       	{
	    		this.output.setValue("1");
	    	}
	    	

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
        
        this._super({width:width,height:height});

        this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.nandGate2.inputLocator();
        this.outputLocator = new draw2d.shape.analog.nandGate2.outputLocator();
        
        this.input1 = this.createPort("input",this.inputLocator);
        this.input1.delayed = 'yes';
        
        this.input2 = this.createPort("input",this.inputLocator);
        this.input1.delayed = 'yes';
        this.output = this.createPort("output",this.outputLocator);
        
        this.input1.setValue("0");
        this.input2.setValue("0");
        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
    },
    

    getSVG: function(){
         this.setBackgroundColor(null);
         
         return '<svg width="90" height="64" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <rect id="svg_8" height="64" width="90" y="0" x="0" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#010101" fill="none"/>  <line id="svg_1" y2="16.5" x2="0.5" y1="16.5" x1="11.478" stroke-width="2" stroke="#030404" fill="none"/>  <path stroke="#030404" id="svg_2" d="m11.099,0.61963l32.71005,0.02549c16.9792,-0.07548 30.7956,14.24097 30.86203,31.38621c0.06735,17.1423 -13.56638,31.27056 -30.54372,31.34604l0,0l-32.99238,-0.02745l-0.03599,-62.73029z" stroke-width="2" fill="#FFFFFF"/>  <line id="svg_4" y2="48.5" x2="0.5" y1="48.5" x1="11.478" stroke-width="2" stroke="#030404" fill="none"/>  <line stroke-linecap="null" stroke-linejoin="null" id="svg_6" y2="32.5" x2="89.74245" y1="32.5" x1="77.30295" fill-opacity="null" stroke-opacity="null" stroke-width="2" stroke="#010101" fill="none"/>  <circle stroke="#010101" id="svg_5" r="5" cy="32.63364" cx="80.99053" stroke-width="2" fill="#FFFFFF"/> </svg>';
         
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.nandGate2.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.nandGate2.inputLocator',
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
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.nandGate2.outputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.nandGate2.outputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        
        figure.setPosition(w, 32 );
    }
});