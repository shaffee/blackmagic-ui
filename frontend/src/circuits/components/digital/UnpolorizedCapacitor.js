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
draw2d.shape.analog.UnpolorizedCapacitor = draw2d.SVGFigure.extend({

    NAME:"draw2d.shape.analog.UnpolorizedCapacitor",
    
    // custom locator for the special design of the Input area
    MyInputPortLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
            figure.setPosition(w, h/2);
        }
    }),
    
    // custom locator for the special design of the Output area
    MyOutputPortLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var h = figure.getParent().getHeight();
            figure.setPosition(0, h/2);
        }
    }),

    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 49;
            height= 17;
        }
        
        this._super(width,height);
        this.inputLocator = new this.MyInputPortLocator();
        this.outputLocator = new this.MyOutputPortLocator();

        this.createPort("hybrid", this.inputLocator); 
        this.createPort("hybrid",this.outputLocator);
    },

       
    getSVG: function(){
         return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">'+
				'<path fill="none" stroke="#010202" stroke-width="2" d="M-111.189-694.658h21"/>'+
				'<path fill="none" stroke="#010202" stroke-width="2" d="M-90.189-702.658v16"/>'+
				'<path fill="none" stroke="#010202" stroke-width="2" d="M-84.189-702.658v16"/>'+
				'<path fill="none" stroke="#010202" stroke-width="2" d="M-84.189-694.658h21"/>'+
				'</svg>';
    }
});