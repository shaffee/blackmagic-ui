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
 draw2d.shape.analog.seg7v = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.seg7v",
    
   onDoubleClick: function(){

    },
    
     onPortValueChanged: function(relatedPort){
   
    },


    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 9;
            height= 40;
        }
        
        this._super(width,height);
        this.setResizeable(false);
    },
    

    getSVG: function(){
    	 //this.setBackgroundColor("#000000");
	         return '<svg version="1.1" x="0px" y="0px"	 width="9px" height="40px" viewBox="0 0 9 40" enable-background="new 0 0 9 40"><polygon fill="#b70000" points="9,35.556 4.5,40 0,35.556 0,4.445 4.5,0 9,4.445 "/></svg>';
    }
});