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
draw2d.shape.analog.terminal = draw2d.shape.basic.Rectangle.extend({

    NAME:"draw2d.shape.analog.terminal",
   tinput:'',
   clock:'',
   qout1:'',
   qout2:'',
   oldClk:'',
    // custom locator for the special design of the ResistorBridge Input area
    MyInputPortLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
            
            if( index == 0 )
            figure.setPosition(0, 0);
        }
    }),
    // custom locator for the special design of the ResistorBridge Input area
    MyLabelLocator : draw2d.layout.locator.Locator.extend({
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
    }),
    // custom locator for the special design of the ResistorBridge Input area
    MyOutputPortLocator : draw2d.layout.locator.Locator.extend({
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
    }),


    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 1;
            height= 1;
        }
        
        this._super({width:1,height:1});
        //this.setResizeable(false);
        this.inputLocator = new this.MyInputPortLocator();
        this.outputLocator = new this.MyOutputPortLocator();
        
        this.tinput = this.createPort("hybrid",this.inputLocator);
        this.tinput.name = "terminal";
        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
    },

});
