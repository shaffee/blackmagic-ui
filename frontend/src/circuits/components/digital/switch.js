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
draw2d.shape.analog.switch = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.switch",
    input:"",
	output:"",
	state:"off",
	value:"0",
    // custom locator for the special design of the Input area
    MyInputPortLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var h = figure.getParent().getHeight();
            figure.setPosition(26, 50);
        }
    }),
    
     /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        this._super(width||50,height||50);
                
        //this._super(width,height);
        //this.setCenter( 0 , 25 );
        this.setResizeable(false);
        this.inputLocator = new this.MyInputPortLocator();
        //this.outputLocator = new this.MyOutputPortLocator();

        this.input = this.createPort("hybrid", this.inputLocator); 
        //this.output = this.createPort("hybrid",this.outputLocator);
        
        //this.output.setValue('0');
    },
	
	/**
	 * @method
	 * Change the color and the internal value of the figure.
	 * Post the new value to related input ports.
	 * 
	 */
	onClick: function(){
	    this.value = this.value == "0" ? "1" : "0";
	    //this.setBackgroundColor(this.colors[this.value]);
	    
	    this.repaint();
	},
       
    getSVG: function(){
    	    	this.setBackgroundColor("#000");
    	
    	if( this.value == '0' )
		return '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><path fill="#FFFFFF" stroke="#000000" stroke-width="2" stroke-miterlimit="10" d="M9.334,36.271V16.937c0-6.627,5.373-12,12-12	h7.332c6.627,0,12,5.373,12,12v19.334"/><line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="10.418" y1="35.292" x2="41.75" y2="35.292"/><line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="25" y1="35.729" x2="25" y2="48"/><line opacity="0" fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="1" y1="0" x2="1" y2="50"/><line opacity="0" fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="49" y1="0" x2="49" y2="50"/></svg>';
		
		
		else
		return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">'+
		       '<polyline rotate(45, 10, 10) stroke-miterlimit="14.3" points="4.954788446426392,35.784969329833984 4.954788446426392,28.71969985961914 1.046627976000309,27.119665145874023 9.305914878845215,23.46563148498535 1.0012270519509912,19.702756881713867 9.305914878845215,15.993839263916016 1.046627976000309,12.397480964660645 9.305914878845215,8.691352844238281 4.954788446426392,6.748985290527344 4.954788446426392,0.0037210118025541306 " stroke="#010101" fill="none"/>'+
		       '</svg>';
		
	},

     onPortValueChanged: function(relatedPort){
	     
	     
	     if( this.input.getValue() == "1" )
	     {
	     	this.setBackgroundColor(wireColors[1]);
	     	state = 'on'
	     	this.repaint();
	     	
	     }
	     else if(  this.input.getValue() == "0")
	     {
	     	this.input.setNextNodeValue("0");
	     	this.setBackgroundColor("#000");
	     	state = 'off'
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