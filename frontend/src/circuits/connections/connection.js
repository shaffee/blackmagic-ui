import draw2d from 'draw2d';

draw2d.Configuration.factory.createConnection=function(sourcePort, targetPort){

    var c =  new draw2d.MyConnection();
    
    if( targetPort.name == "terminal" && sourcePort.name == "terminal" )
    {
            var line = sourcePort.getConnections().get(0);
            var cmd  = new draw2d.command.CommandAddVertex(line , line.getVertices().getSize(), sourcePort.getAbsoluteX() , sourcePort.getAbsoluteY() );
            targetPort.getCanvas().getCommandStack().execute(cmd);
            
            
            sourcePort.parent.setX( targetPort.parent.getX() );
            sourcePort.parent.setY( targetPort.parent.getY() );
            
            window['canvas'].remove( targetPort.parent );
            return "undefined";
    }
    else
    if( targetPort.name == "terminal" || sourcePort.name == "terminal" )
    {
        c.setRouter(new draw2d.layout.connection.VertexRouter());
    }
    else
    {
        //console.log("set connection router");
        c.setRouter(new draw2d.layout.connection.circuitsCloudRouter());
    }
    
    c.setRouter(new draw2d.layout.connection.circuitsCloudRouter());

     //c.installEditPolicy(new CircuitsConnectionSelectionFeedbackPolicy());

    c.setStroke(2);
    return c;
};
