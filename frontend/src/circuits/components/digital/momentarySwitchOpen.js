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
draw2d.shape.analog.momentarySwitchOpen = draw2d.SVGFigure.extend({

    NAME:"draw2d.shape.analog.momentarySwitchOpen",
    
    // custom locator for the special design of the Input area
    MyInputPortLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
            figure.setPosition(w, 12);
        }
    }),
    
    // custom locator for the special design of the Output area
    MyOutputPortLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            figure.setPosition(0, 12);
        }
    }),

    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 49;
            height= 25;
        }
        
        this._super(width,height);
        this.inputLocator = new this.MyInputPortLocator();
        this.outputLocator = new this.MyOutputPortLocator();

        this.createPort("hybrid", this.inputLocator); 
        this.createPort("hybrid",this.outputLocator);
    },

       
    getSVG: function(){
         return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">'+
				'<path fill="#FFFFFF" stroke="#010202" stroke-width="2" d="M-111.189-1966.658h12"/>'+
				'<path fill="#FFFFFF" stroke="#010202" stroke-width="2" d="M-63.189-1966.658h-12"/>'+
				'<circle fill="#FFFFFF" stroke="#010202" stroke-width="2" cx="-99.189" cy="-1966.658" r="3"/>'+
				'<circle fill="#FFFFFF" stroke="#010202" stroke-width="2" cx="-75.189" cy="-1966.658" r="3"/>'+
				'<path fill="#FFFFFF" stroke="#010202" stroke-width="2" d="M-103.189-1976.658h32"/>'+
				'<path fill="#FFFFFF" stroke="#010202" stroke-width="2" d="M-87.189-1976.658v-10"/>'+
				'</svg>';
    }
});