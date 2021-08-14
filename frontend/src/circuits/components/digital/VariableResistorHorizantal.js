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
draw2d.shape.analog.VariableResistorHorizantal = draw2d.SVGFigure.extend({

    NAME:"draw2d.shape.analog.VariableResistorHorizantal",
    
    // custom locator for the special design of the Input area
    MyInputPortLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
            figure.setPosition(w, h/2+2);
        }
    }),
    
    // custom locator for the special design of the Output area
    MyOutputPortLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var h = figure.getParent().getHeight();
            figure.setPosition(0, h/2+2);
        }
    }),

    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 49;
            height= 24;
        }
        
        this._super(width,height);
        this.setCenter( 0 , 14 );
        this.inputLocator = new this.MyInputPortLocator();
        this.outputLocator = new this.MyOutputPortLocator();

        this.createPort("hybrid", this.inputLocator); 
        this.createPort("hybrid",this.outputLocator);
    },

       
    getSVG: function(){
    	this.setBackgroundColor("#000");
         return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">'+
         		'<path fill="#010202" d="M-82.189-560.658l6,6l2-8"/>'+

				'<path fill="none" stroke="#010202" stroke-width="2" d="M-111.189-549.658h12l2,4l4-8l4,8l4-8l4,8l4-8l2,4h12"/>'+
				'<path fill="none" stroke="#010202" stroke-width="2" d="M-96.189-540.658l19-19"/>'+
				'</svg>';
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