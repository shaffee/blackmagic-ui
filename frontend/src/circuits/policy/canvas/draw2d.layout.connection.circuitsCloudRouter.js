import draw2d from 'draw2d';

draw2d.layout.connection.circuitsCloudRouter = draw2d.layout.connection.ManhattanConnectionRouter.extend({
    NAME : "draw2d.layout.connection.circuitsCloudRouter",
    routedByUserInteraction:false,
	/**
	 * @constructor 
	 * Creates a new Router object.
	 * 
	 */
    init: function()
    {
        this._super();
    },
    
    onInstall: function(conn)
    {
        conn.installEditPolicy(new draw2d.CircuitsConnectionSelectionFeedbackPolicy());
    },
    
 
});
