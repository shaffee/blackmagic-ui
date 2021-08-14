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
draw2d.shape.analog.voltMeter = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.voltMeter",
    node1:'',
    node2:'',
	voltValue:0.00,
	voltLabel:null,
    // custom locator for the special design of the ResistorBridge Input area
    MyInputPortLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
     
	    	if( index == 0 )
	        	figure.setPosition(112, 32);
	        if( index == 1 )
	        	figure.setPosition(0, 32);

        }
    }),
	/*
    // custom locator for the special design of the ResistorBridge Input area
    MyOutputPortLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();

            if( index == 2 )
            figure.setPosition(w, 16);
            if( index == 3 )
            figure.setPosition(w, 80);
        }
    }),
    */
    // custom locator for the special design of the ResistorBridge Input area
    MyLabelLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();

            if( index == 1 )
            figure.setPosition(15, 5);
            if( index == 2 )
            figure.setPosition(w-32, 5);
            if( index == 3 )
            figure.setPosition(w-30, h-26);
            if( index == 4 )
            figure.setPosition(15, h-28);
        }
    }),
    
	onPortValueChanged: function(relatedPort){
   
	    
	    var node1Value = this.node1.getValue() ? this.node1.getValue() : 0 ;
	    var node2Value = this.node2.getValue() ? this.node2.getValue() : 0 ;
	    	    
	    console.log( node1Value + " <=> " + node2Value );
	    if( node1Value > node2Value )
	    {
	    	var str = (Math.round( (node1Value-node2Value) * 1000 ) / 1000) + " V";
	    }
	    else
	    {
	    	var str = (Math.round( (node2Value-node1Value) * 1000 ) / 1000)+" V";
	    }
	   	
	   	this.voltLabel.setText( str );

    },

    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        width = 112;
        height= 48;
	    
	    this.rotation = 'no-rotation';
	   	this.defaultValues = { label:'Volt Meter '};

        this._super(width,height);
        //this.setResizeable(false);
        this.inputLocator = new this.MyInputPortLocator();
        
        this.node1 = this.createPort("hybrid",this.inputLocator);
        this.node2 = this.createPort("hybrid",this.inputLocator);

	    var labelLocator = new this.MyLabelLocator();
	    		
		
		this.voltLabel = new draw2d.shape.basic.Label({text:'0.000'});
		//console.log(this.voltLabel);
    	this.voltLabel.setStroke(0);
    	this.voltLabel.setFontFamily("Courier");
    	this.voltLabel.setFontSize("20");
    	this.add(this.voltLabel, new draw2d.layout.locator.CenterLocator(this) );
	    this.voltLabel.setText("0.000 V");


	    this.params = {
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  }
		  /*
		  ,
		  labelPosition: {
		    "type": "string",
		    "title": "Label Position",
		    "enum": [ "Left", "Top", "Right", "Bottom" , "Inside" ]
		  }
		  */
		};


	    //this.addFigure( new draw2d.shape.basic.componentLabel("D") , labelLocator );
	    //this.addFigure( new draw2d.shape.basic.componentLabel("Q") , labelLocator );
	    //this.addFigure( new draw2d.shape.basic.componentLabel("Q") , labelLocator );
	    //this.addFigure( new draw2d.shape.basic.componentLabel("CLK") , labelLocator );

        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
    },

	
    getSVG: function(){
    
    	//this.setBackgroundColor(null);

        return '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="112px" height="48px" viewBox="0 0 96 48" enable-background="new 0 0 96 48" xml:space="preserve"><rect fill="#FFFFFF" stroke="#000000" stroke-miterlimit="10" width="96" height="48"/></svg>';
    }
});