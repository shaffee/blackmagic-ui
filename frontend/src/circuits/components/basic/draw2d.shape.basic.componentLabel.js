import draw2d from 'draw2d';
/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.shape.basic.Label
 * Implements a simple text label.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var shape =  new draw2d.shape.basic.Label("This is a simple label");
 *          
 *     canvas.addFigure(shape,40,10);
 *     
 * @author Andreas Herz
 * 
 * @extends draw2d.SetFigure
 */
draw2d.shape.basic.componentLabel= draw2d.shape.basic.Label.extend({

	NAME : "draw2d.shape.basic.componentLabel",
    FONT_FALLBACK:  {
      'Georgia'            :'Georgia, serif',
      'Palatino Linotype'  :'"Palatino Linotype", "Book Antiqua", Palatino, serif',
      'Times New Roman'    :'"Times New Roman", Times, serif',
      'Arial'              :'Arial, Helvetica, sans-serif',
      'Arial Black'        :'"Arial Black", Gadget, sans-serif',   
      'Comic Sans MS'      :'"Comic Sans MS", cursive, sans-serif',    
      'Impact'             :'Impact, Charcoal, sans-serif',
      'Lucida Sans Unicode':'"Lucida Sans Unicode", "Lucida Grande", sans-serif',  
      'Tahoma, Geneva'     :'Tahoma, Geneva, sans-seri',
      'Trebuchet MS'       :'"Trebuchet MS", Helvetica, sans-serif',
      'Verdana'            :'Verdana, Geneva, sans-serif',
      'Courier New'        :'"Courier New", Courier, monospace',
      'Lucida Console'     :'"Lucida Console", Monaco, monospace'},
      

    /**
     * @constructor
     * Creates a new text element.
     * 
     * @param {String} [text] the text to display
     */
    init : function(text)
    {
        this._super(text);
        
        this.setStroke(0);
        this.setBold(2);
    },

});



