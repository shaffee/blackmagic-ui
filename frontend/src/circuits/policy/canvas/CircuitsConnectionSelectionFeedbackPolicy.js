import draw2d from 'draw2d';

draw2d.CircuitsConnectionSelectionFeedbackPolicy = draw2d.policy.line.OrthogonalSelectionFeedbackPolicy.extend({

    NAME : "draw2d.CircuitsConnectionSelectionFeedbackPolicy",

    /**
     * @constructor 
     * Creates a new Router object
     */
    init: function(){
        this._super();
        
        // The ResizeHandle for the Policy. This is inline to avoid that a user want to use them without
        // the right installed policy.
        //
    },
    

    /**
     * @method
     * 
     * @template
     * @param {draw2d.Connection} connection the selected figure
     * @param {Boolean} isPrimarySelection
     */
    onSelect: function(canvas, connection, isPrimarySelection){
        console.log(connection.id);
        
        window['properties'].next( connection.id );

	    connection.setCssClass("object-blue");


	    if(  canvas.getSelection().getSize() > 1 )
	    {
	    	return 0;
	    }
	    
	    
    	this._super(canvas, connection, isPrimarySelection);
    	
    	var points = connection.getVertices();
    	var i=1;
    	for( ; i<(points.getSize()-1); i++){
    		var handle = new this.ResizeHandle(connection, i);
            connection.selectionHandles.add( handle);         
            handle.setDraggable(connection.isResizeable());
            handle.show(canvas);
        }
    	
        this.moved(canvas, connection);
    },

    onUnselect: function(canvas, figure )
	{
        window['properties'].next( "" );

    	figure.setCssClass("object-black");

        figure.selectionHandles.each(function(i,e){
            e.hide();
        });
        figure.selectionHandles = new draw2d.util.ArrayList();
    },


});
