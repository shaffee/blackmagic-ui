/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.shape.node.Fulcrum
 * 
 * A horizontal bus shape with a special kind of port handling. The hole figure is a hybrid port.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     canvas.add( new draw2d.shape.node.Fulcrum(),50,10);
 *     canvas.add( new draw2d.shape.node.Fulcrum(),80,100);
 *     canvas.add( new draw2d.shape.node.Fulcrum(),150,50);
 *     
 * @extends draw2d.shape.node.Hub
 */
draw2d.shape.analog.wireConnection = draw2d.shape.node.Hub.extend({

    NAME : "draw2d.shape.analog.wireConnection",
   
	/**
	 * 
	 */
	init : function()
    {
        this._super(40,40);

        
        this.port.setConnectionAnchor(new draw2d.layout.anchor.ConnectionAnchor(this.port));
        this.port.setVisible(true);
        this.port.hitTest = this.port._orig_hitTest;
        
        this.setConnectionDirStrategy(0);
        this.setColor(null);
        this.setRadius(10);
        this.setBackgroundColor(null);
        this.setStroke(0);
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
   },
   
   /**
     * @inheritdoc
     * 
     * @param attributes
     */
    repaint:function(attributes)
    {
        if(this.repaintBlocked===true || this.shape===null){
            return;
        }
    
        if(typeof attributes === "undefined"){
            attributes = {};
        }
        
        // set some good defaults if the parent didn't
        if(typeof attributes.fill ==="undefined"){
            attributes.fill=this.bgColor.hash();
        }
        
       this._super(attributes);
    },
    
    //By shaffee Mayoof
    onPortValueChanged: function(relatedPort){
       		
       		
       		lines = relatedPort.getParent().getConnections();
 			
 			
       		var l= lines.getSize()-1;
       		//console.log(l);
       		
       		for( ; l >= 0; l-- )
       		{
       			if( relatedPort.value == "1" )
       			{
       				color = "#0dbf22";
       			}
       			else if( relatedPort.value == "0" )
       			{
       				color = "#e73131";
       			}
       			
       			lines.get(l).setColor(color);
       			
       			
       			//console.log(lines.get(l).sourcePort.getParent.cssClass);
       			//draw2d_shape_analog_wireConnection
       			
       			
       			console.log("Ports List");
       			console.log(lines.get(l).targetPort.getParent().cssClass);
       			console.log(lines.get(l).targetPort.getParent());
       			console.log(lines.get(l).sourcePort.getParent().cssClass);
       			console.log(lines.get(l).sourcePort.getParent());
				console.log(lines.get(l).sourcePort);
				
       			console.log(lines.get(l).targetPort.id +"=="+ relatedPort.id);
       			
       			
       			try {
       				 lines.get(l).sourcetPort.setValue(relatedPort.value);
       				 lines.get(l).targetPort.setValue(relatedPort.value);
       			}
       			catch (error) {
       				
       			}
       			
       			if( lines.get(l).sourcePort.getParent().cssClass != "draw2d_shape_analog_wireConnection" )
       			{
       				var parent = lines.get(l).sourcePort.getParent();
       				
       				
       				for (index = 0; index < parent.inputPorts.size; ++index) {
       					var port = parent.inputPorts.get(index);
       					
       					if( port == lines.get(l).sourcePort )
       					{
	       				    port.setValue(relatedPort.value);
       				    }
       				}
       				
       				/*
       				console.log("SOURCE PORT");
       				console.log(lines.get(l).sourcePort);
       				
       				console.log("SET AND GATE VALUE");
       				lines.get(l).sourcePort.getParent().input1.setValue(relatedPort.value);
       				
       				console.log(lines.get(l).sourcePort.getParent().input1);
       				try{
       					
       					lines.get(l).sourcetPort.setValue(relatedPort.value);
       					lines.get(l).targetPort.setValue(relatedPort.value);
       				}catch (error) {
       					
       				}
       				*/
       			}
       			
       			if( lines.get(l).targetPort.id == relatedPort.id )
       			{
       				if(lines.get(l).sourcetPort)
       				{
       					lines.get(l).sourcetPort.setValue(relatedPort.value);
       					//console.log(lines.get(l).sourcePort.getParent().cssClass);
       					
       				}
       				
       			}
       			else
       			{
       				if(lines.get(l).targetPort)
       				{
	       				lines.get(l).targetPort.setValue(relatedPort.value);
	       				console.log("test");
	       				//console.log(lines.get(l).targetPort.getParent().cssClass);
       				}
       				
       		
       				
       				/*
       				alert(relatedPort.value);
       				console.log('Line');
       				console.log(lines.get(l));
       				lines.get(l).setColor("#be0000");
       				lines.get(l).targetPort.setValue(1);
       				lines.get(l).targetPort.setName("Node #"+l);
       				lines.get(l).targetPort.setBackgroundColor("#be0000");
       				*/       				
       			}
       			      			
       		}
       		
       		//this.repaint();
       		
       		
    	    //var outputVal = this.output.getValue() != null ? this.output.getValue() : "0";
    	    /*
        	if( this.input1.getValue() == "1" && this.input2.getValue() == "1" && ( this.output.getValue()=="0" || this.output.getValue() == null ))
        	{
    
        		//this.output.setValue("1");	
        		this.output.setNextNodeValue("1");
        		this.output.setColor("#0dbf22");
        	}
        	else if( (this.input1.getValue() == "0" || this.input2.getValue() == "0" ) && ( this.output.getValue()=="1" || this.output.getValue() == null ) )
           	{
    
        		//this.output.setValue("0");	
        		this.output.setNextNodeValue("0");
        		this.output.setColor("#e73131");
        	}*/
        },
    
});
