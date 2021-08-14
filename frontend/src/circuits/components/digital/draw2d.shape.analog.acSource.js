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
draw2d.shape.analog.acSource = draw2d.SVGFigure.extend({

    NAME:"draw2d.shape.analog.acSource",
    
    // custom locator for the special design of the Input area
    MyInputPortLocator : draw2d.layout.locator.PortLocator.extend({
        Name : 'draw2d.shape.analog.acSource.MyInputPortLocator',
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
            figure.setPosition(w+5, 23);
        }
    }),
    
    // custom locator for the special design of the Output area
    MyOutputPortLocator : draw2d.layout.locator.PortLocator.extend({
        Name : 'draw2d.shape.analog.acSource.MyOutputPortLocator',
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            figure.setPosition(-5, 23);
        }
    }),

    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        alert(1);
        if(typeof width === "undefined"){
            width = 52;
            height= 45;
        }
        
        this._super(width,height);
        this.inputLocator = new this.MyInputPortLocator();
        this.outputLocator = new this.MyOutputPortLocator();

        this.createPort("hybrid", this.inputLocator); 
        this.createPort("hybrid",this.outputLocator);
    },

       
    getSVG: function(){
         return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">'+
				'<circle fill="#FFFFFF" stroke="#010202" stroke-width="4" cx="-87.189" cy="-1734.658" r="20"/>'+
				'<path fill="none" stroke="#010202" stroke-width="2" d="M-111.189-1734.658h4"/>'+
				'<path fill="none" stroke="#010202" stroke-width="2" d="M-63.189-1734.658h-4"/>'+
				'<path fill="none" stroke="#010202" stroke-width="2" d="M-101.189-1734.658c2.139-3.866,7.007-5.267,10.873-3.127 c1.315,0.728,2.398,1.812,3.127,3.127c2.139,3.866,7.007,5.266,10.873,3.127c1.315-0.728,2.398-1.812,3.127-3.127"/>'+
				'</svg>';
    }
});