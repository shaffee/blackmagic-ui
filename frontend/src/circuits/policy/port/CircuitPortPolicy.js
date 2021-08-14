/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.policy.port.ElasticStrapFeedbackPolicy
 * 
 * A draw2d.policy.SelectionFeedbackPolicy that is sensitive to the canvas selection. Subclasses will typically 
 * decorate the {@link draw2d.Figure figure} with things like selection handles and/or focus feedback.
 * <br>
 * If you want to change the handle visibility for a figure, then you should use SelectionFeedbackPolicy to do that.
 * 
 * @author Andreas Herz
 * @extends draw2d.policy.figure.DragDropEditPolicy
 */
draw2d.policy.port.CircuitPortPolicy = draw2d.policy.port.PortFeedbackPolicy.extend({

    NAME : "draw2d.policy.port.CircuitPortPolicy",
    ox:0,
    oy:0,
    direction : -1,
    /**
     * @constructor 
     * Creates a new Router object
     */
    init: function(){
        this._super();
        this.connectionLine = null;
                
    },
    
    /**
     * @method
     * Called by the framework if the related shape has init a drag&drop
     * operation
     * 
     * @param {draw2d.Canvas} canvas The host canvas
     * @param {draw2d.Figure} figure The related figure
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onDragStart: function(canvas, figure, x, y, shiftKey, ctrlKey)
    {
        this.connectionLine = new draw2d.shape.basic.Line();
        this.connectionLine.setCanvas(canvas);
        this.connectionLine.getShapeElement();
        
        this.onDrag(canvas, figure);
    },
    
    
    /**
     * @method
     * Called by the framework during drag a figure.
     * 
     * @param {draw2d.Canvas} canvas The host canvas
     * @param {draw2d.Figure} figure The related figure
     */
    onDrag: function(canvas, figure){
        var x1 = figure.ox+figure.getParent().getAbsoluteX();
        var y1 = figure.oy+figure.getParent().getAbsoluteY();
        
	    if( this.ox == 0 && this.oy == 0 )
	    {
	    	this.ox = figure.getAbsoluteX();
        	this.oy = figure.getAbsoluteY();	
	    }
	    
        if( this.direction == -1 )
        {
        	var xdiff = Math.abs(this.ox - figure.getAbsoluteX());	
        	var ydiff = Math.abs(this.oy - figure.getAbsoluteY());	
	        
	        console.log(xdiff);
	        console.log(ydiff);
	        if( xdiff-ydiff > 10 )
	        {
    			figure.installEditPolicy( new draw2d.policy.figure.HorizontalEditPolicy() );
    			figure.setY( this.oy - figure.parent.getY() );
				this.direction = 0;
	        }
	        else if( ydiff-xdiff > 10 )
	        {
    			figure.installEditPolicy( new draw2d.policy.figure.VerticalEditPolicy() );
    			figure.setX( this.ox - figure.parent.getX() );
    			this.direction = 1;
	        }

        }


        this.connectionLine.setStartPoint(x1,y1);
        this.connectionLine.setEndPoint(figure.getAbsoluteX(),figure.getAbsoluteY());
    },
    
    /**
     * @method
     * Called by the framework if the drag drop operation ends.
     * 
     * @param {draw2d.Canvas} canvas The host canvas
     * @param {draw2d.Figure} figure The related figure
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onDragEnd: function(canvas, figure, x, y, shiftKey, ctrlKey){
        this.connectionLine.setCanvas(null);
        this.connectionLine = null;
        
		figure.uninstallEditPolicy( new draw2d.policy.figure.VerticalEditPolicy() );
		figure.uninstallEditPolicy( new draw2d.policy.figure.HorizontalEditPolicy() );
		this.direction = -1;
		this.ox = 0;
		this.oy = 0;
    },
    
    onHoverEnter: function(canvas, draggedFigure, hoverFiger){
    	this.connectionLine.setGlow(true);
    	hoverFiger.setGlow(true);
    },
    
    onHoverLeave: function(canvas, draggedFigure, hoverFiger){
    	hoverFiger.setGlow(false);
    	this.connectionLine.setGlow(false);
    }

        
});
