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
 draw2d.shape.analog.seg7h = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.seg7h",
    
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
            width = 50;
            height= 9;
        }
        
        this._super(width,height);
        this.setResizeable(false);
    },
    

    getSVG: function(){
    	 //this.setBackgroundColor("#b70000");
         return '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="48px" height="9px" viewBox="0 0 48 9" enable-background="new 0 0 48 9" xml:space="preserve"><polygon fill="#b70000" points="43.557,0 48,4.501 43.557,9 4.445,9 0,4.501 4.445,0 "/></svg>';
    }
});