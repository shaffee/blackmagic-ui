import draw2d from 'draw2d';

/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.policy.canvas.BoundingboxSelectionPolicy
 * 
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.SelectionPolicy
 */
 
 draw2d.policy.canvas.CircuitsCloudSelectionPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend({

    NAME : "draw2d.policy.canvas.CircuitsCloudSelectionPolicy",
    
    /**
     * @constructor 
     * Creates a new Router object
     */
    init: function( attr, setter, getter)
    {
        this._super( attr, setter, getter);
    },
    /**
     * @method
     * Called by the framework of the Policy should show a resize handle for the given shape
     * 
     * @param {Boolean} isPrimarySelection
     */
    onSelect: function(canvas, figure, isPrimarySelection){
        
        window['properties'].next( figure.id );
        
        //figure.setGlow(true);
		figure.setCssClass("object-blue");
    	
    	var selectionSize = canvas.getSelection().getSize();

    	if( selectionSize == 1 )
    	{
			canvas.uninstallEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy( ));
			canvas.uninstallEditPolicy(new draw2d.policy.canvas.SnapToGridEditPolicy(16));
			canvas.installEditPolicy( new draw2d.policy.canvas.ShowGridEditPolicy(16) );

            canvas.getFigures().each(function(i,figure){
                figure.canSnapToHelper = false;
            });

			canvas.getAllPorts().each(function(i,figure){
                figure.setVisible(true);
            });
    	}
    	
    	
        this.moved(canvas, figure);

        //.unselect();

        //.unselect();
        if( window['simulating'] )
        {
            setTimeout(function(){
                figure.onClick();
    
                try
                {
                    window['canvas'].getSelection().getPrimary().unselect();
                }
                catch(e)
                {
    
                }
            },50);    
        }
        

   },
   onDragStart: function( canvas, figure, x, y, shiftKey, ctrlKey ){
       if( window['simulating'] )
        return false;
   },
   onDragEnd: function( canvas, figure, x, y, shiftKey, ctrlKey )
   {
        figure.shape.attr({cursor:"default"});
        figure.isMoving = false;
        figure.setAlpha(figure.originalAlpha);
	        
	    /*
	
		//canvas.uninstallEditPolicy(new draw2d.policy.canvas.ShowGridEditPolicy());
		canvas.installEditPolicy(new draw2d.policy.canvas.SnapToGridEditPolicy(16));

		figure.canSnapToHelper = true;

	    newPos = canvas.snapToHelper(figure, figure.getPosition() );
	    
	    figure.setPosition(newPos);
		figure.canSnapToHelper = false;
		*/

		//canvas.uninstallEditPolicy(new draw2d.policy.canvas.SnapToGridEditPolicy(16));
		//canvas.installEditPolicy(new draw2d.policy.canvas.ShowGridEditPolicy(16));

   },
   
   /**
    * @method
    * 
    * @param {draw2d.Figure} figure the unselected figure
    */
   onUnselect: function(canvas, figure ){

        window['properties'].next( "" );


		this._super(canvas, figure);
		figure.setCssClass("object-black");

    	var selectionSize = canvas.getSelection().getSize();
	    //console.log(selectionSize);
    	if( selectionSize <= 1 )
    	{
			canvas.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy());
			canvas.installEditPolicy(new draw2d.policy.canvas.SnapToGridEditPolicy(16));
            canvas.getFigures().each(function(i,figure){
                figure.canSnapToHelper = true;
            });
    	}
   },
   
}); 

