draw2d.shape.analog.timeLine = draw2d.shape.diagram.Sparkline.extend({

    NAME : "draw2d.shape.analog.timeLine",
    type:"digital",
    input:null,
    
    init : function()
    {
        this._super();
        this.maxValues = 200;
        
        this.setBackgroundColor("#FF765E");
        this.setRadius(5);
        this.createPort("input");
        this.startTimer(1);
        this.onTimer();
        this.setDimension(200,64);
    	
    	this.installEditPolicy( new draw2d.policy.figure.AntSelectionFeedbackPolicy() );

		//this.input = this.createPort("hybrid", this.inputLocator);
    },

	MyInputPortLocator : draw2d.layout.locator.Locator.extend({
	    init:function( ){
	      this._super();
	    },    
	    relocate:function(index, figure){
	        var h = figure.getParent().getHeight();
	        figure.setPosition(0, 32);
	    }
	}),
    /**
     * @method
     * Called if the value of any port has been changed
     * 
     * @param {draw2d.Port} relatedPort
     * @template
     */
    onPortValueChanged: function(relatedPort){
        // call the timer manually. In this case we are safe and we
        // didn'T lost any data...
        //this.onTimer();
        
        var port = this.getInputPort(0);
        var value=port.getValue();
        this.data.push(value=="1"?5:0);
        if(this.data.length>this.maxValues)
            this.data.shift();
        this.setData(this.data);
    },
    
    /**
     * @method
     * 
     * Update the chart with the current value of the input port.
     * 
     */
    onTimer:function(){
         var port = this.getInputPort(0);
         var value=port.getValue();
         this.data.push(value=="1"?5:0);
         if(this.data.length>this.maxValues)
             this.data.shift();
         this.setData(this.data);
  
    }

});