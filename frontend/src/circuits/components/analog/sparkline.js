draw2d.shape.analog.sparkline = draw2d.shape.diagram.Sparkline.extend({

    NAME : "draw2d.shape.analog.sparkline",
    type:"analog",
    input:null,
    bottomLabel:'',
    coordsData:[],
    
    init : function()
    {
        this._super();
        this.maxValues = 500;
        
        this.setBackgroundColor("#37a6d3");
        this.setRadius(5);
        this.createPort("input");
        this.startTimer(1);
        this.onTimer();
        this.setDimension(300,100);
        
    	this.installEditPolicy( new draw2d.policy.figure.AntSelectionFeedbackPolicy() );

    	this.bottomLabel =new draw2d.shape.basic.Label({text:''});
    	this.bottomLabel.setStroke(0);

    	this.add(this.bottomLabel, new draw2d.layout.locator.BottomLocator(this));

	    //alert(this.type);
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
        
        //console.log(value);
        this.data.push(value);
        if(this.data.length>this.maxValues)
            this.data.shift();
        
        this.setData(this.data);
        
        var min = this.min;
        var max = this.max;
	    
	    this.bottomLabel.setText("Min "+min+" - Max "+max);
	    
    },
	onDoubleClick: function(){
		
		
	},
    /**
     * 
     * @param attributes
     */
    repaint: function(attributes){
       
        if(this.repaintBlocked===true || this.shape===null){
            return;
        }
        
        attributes= attributes || {};

        attributes.fill= "90-#37a5da:5-#2192c8:95";
        //console.log(attributes.fill);
        var padding = this.padding;
        var width = this.getWidth()- 2*+this.padding;
        var height= this.getHeight()- 2*+this.padding;
        var length= this.data.length;
        var min = this.min;
        var max = this.max;
        var toCoords = function(value, idx) {
            var step =1;
            // avoid divisionByZero
            if(length>1){
                step = (width/ (length-1));
            }

            return {
                y:  -((value-min)/(max-min) * height) + height+padding,
                x: padding+idx*step
            };
        };

        if(this.svgNodes!==null && (typeof this.cache.pathString ==="undefined")){
        	//console.log("re draw");
            var prev_pt=null;
            $.each(this.data, $.proxy(function(idx, item) {
            	
            	if( idx%12 == 0 )
            	{
	                var pt = toCoords(item, idx);
	                
	                if(prev_pt===null) {
	                    this.cache.pathString = [ "M", pt.x, pt.y].join(" ");
	                }
	                else{
	                    this.cache.pathString = [ this.cache.pathString,"L", pt.x, pt.y].join(" ");
	                }
	                prev_pt = pt;
                }
            },this));
	        
	        //console.log(this.cache.pathString);
            this.svgNodes.attr({path:this.cache.pathString, stroke: "#f1f3ff"});
            
        }
        this._super(attributes);
    }
});