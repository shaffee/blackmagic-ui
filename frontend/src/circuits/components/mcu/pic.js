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
 *     canvas.addFigure(figure,10,10);
 *     
 *     
 * @extends draw2d.SVGFigure
 */
draw2d.shape.mcu.pic = draw2d.shape.mcu.extend({

    NAME:"draw2d.shape.mcu.pic",
    params:null,
    // custom locator for the special design of the ResistorBridge Input area
   label:null,
   labelLocator:null,
   pins:null,
   pinsCount:0,
   

    onPortValueChanged: function(relatedPort){
   		//console.log(relatedPort);
    },
    
    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        this._super();
        
		//this.pinsCount = 10;

    },
    
	onContextMenu:function(x,y){
	     $.contextMenu({
	         selector: 'body', 
	         events:
	         {  
	             hide:function(){ $.contextMenu( 'destroy' ); }
	         },
	         callback: $.proxy(function(key, options) 
	         {
	            switch(key){
	            case "editparams":
	                this.showForm();
	                break;
	            case "delete":
	                // without undo/redo support
	           		//this.getCanvas().removeFigure(this);
	                // with undo/redo support
	                var cmd = new draw2d.command.CommandDelete(this);
	                this.getCanvas().getCommandStack().execute(cmd);
	            default:
	                break;
	            }
	         
	         },this),
	         x:x,
	         y:y,
	         items: 
	         {
	             "editparams":    {name: "Edit Parameters", icon: "edit"},
	             "sep1":   "---------",
	             "delete": {name: "Delete", icon: "delete"},
	         }
	     });
	},
	/**
	 * @method
	 * Called by the framework. Don't call them manually.
	 * 
	 * @private
	 **/
	createShapeElement:function()
	{
	  // create dummy line
	  return this.canvas.paper.path("M0 0L1 1");
	}
});