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
draw2d.shape.basic.Label.voltLabel = draw2d.shape.basic.Label.extend({

	NAME : "draw2d.shape.basic.Label.voltLabel",
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
        
        if(typeof text === "string"){
    		this.text = text;
    	}
    	else{
    		this.text = "";
    	}
    	// for performance reasons
        //
        this.cachedWidth  = null;
        this.cachedHeight = null;
        this.cachedMinWidth  = null;
        this.cachedMinHeight = null;
        
        // appearance of the shape
        //
        this.fontSize = 12;
        this.fontColor = new draw2d.util.Color("#080808");
        this.fontFamily = null;
        this.padding = 4;
        
        this.outlineStroke = 0;
        this.outlineColor = new draw2d.util.Color(null);
        
        this.bold = false;
        
        this._super();
        
        // set some good defaults
        //
        this.setStroke(1);
        this.setDimension(1,1);
        this.setResizeable(false);
        
        // behavior of the shape
        //
        this.editor = null;
        
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },
    
  
    setText:function( text )
    {
      //this.clearCache();
      this.text = text;
      
      this.repaint();
      // Update the resize handles if the user change the position of the element via an API call.
      //
      
    },
    
    /**
     * @method
     * Trigger the repaint of the element and transport all style properties to the visual representation.<br>
     * Called by the framework.
     * 
     * @template
     **/
    repaint: function(attributes)
    {
        if(this.repaintBlocked===true || this.shape===null){
            return;
        }

        // style the label
        var lattr = this.calculateTextAttr();
        lattr.text = this.text;        
        this.svgNodes.attr(lattr);
        // set of the x/y must be done AFTER the font-size and bold has been set.
        // Reason: the getHeight method needs the font-size for calculation because
        //         it redirects the calculation to the SVG element.
        this.svgNodes.attr({x:this.padding,y: this.getHeight()/2});

        this._super(attributes);
    },
    
});



