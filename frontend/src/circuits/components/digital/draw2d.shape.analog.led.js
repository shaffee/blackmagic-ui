import draw2d from 'draw2d';
/**
Library is under GPL License (GPL)

Copyright (c) 2012 Andreas Herz

**/



/**
 * @class draw2d.shape.analog.ResistorVertical
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var figure =  new draw2d.shape.analog.ResistorVertical();
 *     canvas.add(figure,10,10);
 *     
 *     
 * @extends draw2d.SVGFigure
 */
 draw2d.shape.analog.led = draw2d.shape.analog.digital.extend({


    NAME:"draw2d.shape.analog.led",
    input:"",
	output:"",

     /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        this._super(width||32,height||48);
                
        this._super({width:width,height:height});
        //this.setCenter( 0 , 25 );
        this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.led.inputLocator();
        //this.outputLocator = new this.MyOutputPortLocator();

        this.input = this.createPort("hybrid", this.inputLocator); 
        //this.output = this.createPort("hybrid",this.outputLocator);
        
        //this.output.setValue('0');
    },

       
    getSVG: function(){
    	    	this.setBackgroundColor("#000");
    	
		return '<svg width="32" height="48" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <path stroke="#000000" id="svg_1" d="m0.65627,34.63607l0,-19.334c0,-6.627 5.26517,-12 11.75916,-12l7.18485,0c6.494,0 11.75916,5.373 11.75916,12l0,19.334" stroke-miterlimit="10" stroke-width="2" fill="#FFFFFF"/>  <line stroke="#000000" id="svg_2" y2="33.65707" x2="31.06004" y1="33.65707" x1="0.98569" stroke-miterlimit="10" stroke-width="2" fill="none"/>  <line id="svg_3" y2="48" x2="16.5" y1="34.09407" x1="16.5" stroke-miterlimit="10" stroke-width="2" stroke="#000000" fill="none"/>  <rect id="svg_6" height="48" width="32" y="0" x="0" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#000000" fill="none"/> </svg>';
	},

     onPortValueChanged: function(relatedPort){
	     
	     //console.log("Dsada");
	     if( this.input.getValue() == "1" )
	     {
            //console.log(window['wireColors'][1]);
	     	this.setBackgroundColor(window['wireColors'][1]);
	     	this.repaint();
	     	
	     }
	     else if(  this.input.getValue() == "0")
	     {
	     	this.setBackgroundColor("#000");
	     	this.repaint();
	     }

    },
    
    
    repaint : function(attributes)
    {
         if (this.repaintBlocked===true || this.shape === null){
             return;
         }

         if(typeof attributes === "undefined" ){
             attributes = {};
         }

         // redirect the backgroundColor to an internal SVG node.
         // In this case only a small part of the shape are filled with the background color
         // and not the complete rectangle/bounding box
         //
         attributes["fill"] = "transparent";
         if( this.bgColor!=null){
             this.svgNodes[0].attr({fill:"#" + this.bgColor.hex()});
         }
         
         this._super(attributes);
    }
});

// custom locator for the special design of the Input area
draw2d.shape.analog.led.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.led.inputLocator',
    init:function( ){
        this._super();
    },    
    relocate:function(index, figure){
        var h = figure.getParent().getHeight();
        figure.setPosition(16, 48);
    }
});
