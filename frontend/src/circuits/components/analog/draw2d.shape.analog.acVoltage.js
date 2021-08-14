import draw2d from 'draw2d';
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
 draw2d.shape.analog.acVoltage = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.acVoltage",
    dinput:'',
    clock:'',
    node1:'',
    node2:'',
	ngspiceSymbol:'V',
	simulations : ['dc_bias','ac_analysis','transient_response'],
    // custom locator for the special design of the ResistorBridge Input area
    
	onPortValueChanged: function(relatedPort){

    },

    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        width = 32;
        height= 80;
        this.defaultRotation = 'v';
	    this.rotation = 'v';
	    
        this._super({width:width,height:height});
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.acVoltage.inputLocator();
        
        this.node1 = this.createPort("hybrid",this.inputLocator);
        this.node2 = this.createPort("hybrid",this.inputLocator);

	    var labelLocator = new draw2d.shape.analog.acVoltage.labelLocator();
	    
		this.defaultValues = { label:'V',voltage:'5v',frequency:'1000000' };

	    this.params = {
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  },
		  voltage: {
		        "type": "string",
		        "title": "Volt",
		        //"format": "color"
		      },
		  frequency: {
		        "type": "number",
		        "title": "Frequency [Hz]",
		        //"format": "color"
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
    
	ngSpiceCommand: function(nodes,deviceIndex)
	{
		var data = this.getUserData();
		var values = data['formData'];
		
		var node1_name = nodes[this.node1.id];
		var node2_name = nodes[this.node2.id];

		var command = "V"+deviceIndex+" "+node1_name+" "+node2_name+" AC ( "+values.voltage+" 0 ) sin(0 "+values.voltage+" "+values.frequency+")";
		
		
		//var command = "V"+deviceIndex+" "+node1_name+" "+node2_name+" AC ( 1V 0 ) SINE ( 1.0 1.0 1Khz 0.0S 0.0 )";

		if( typeof node1_name == 'undefined' || typeof node2_name == 'undefined' )
		{
			return {type:'error',msg:'connection error'};
		}
		
		if( command.indexOf("undefined") != -1 )
		{
			return {type:'error',msg:'missing Parameters'};
		}
		
		
		return { type:'ngspice' , msg:command };		
	},
	
    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="32" height="80" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <line stroke-linecap="round" stroke-linejoin="round" id="svg_3" y2="23" x2="16.5" y1="0.5" x1="16.5" fill-opacity="null" stroke-opacity="null" stroke-width="2" stroke="#000000" fill="none"/>  <line stroke="#000000" stroke-linecap="round" stroke-linejoin="round" id="svg_4" y2="80" x2="16.5" y1="56.02291" x1="16.5" fill-opacity="null" stroke-opacity="null" stroke-width="2" fill="none"/>  <ellipse fill="#ffffff" stroke="#000000" stroke-width="2" stroke-opacity="null" cx="16" cy="40" id="svg_1" rx="16" ry="16"/>  <path fill="none" stroke="#000000" stroke-width="2" opacity="0.5" d="m5.84527,41.46892c5.1093,-4.98156 6.2589,-5.36476 10.85726,-0.3832c4.59836,4.98156 7.66395,-1.27732 8.94128,-2.93784" id="svg_6"/> </svg>';
    }
});


draw2d.shape.analog.acVoltage.inputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.acVoltage.inputLocator',
    init:function( ){
      this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        var r = figure.getParent().rotationAngle;

        if( r == 0 )
        {
            if( index == 0 )
                figure.setPosition(16, 0);
            if( index == 1 )
                figure.setPosition(16, 80);
        }
        else if( r == 90 )
        {
            if( index == 0 )
                figure.setPosition(80, 16);
            if( index == 1 )
                figure.setPosition(0, 16);
        }
        else if( r == 180 )
        {
            if( index == 0 )
                figure.setPosition(16, 80);
            if( index == 1 )
                figure.setPosition(16, 0);
        }
        else if( r == 270 )
        {
            if( index == 0 )
                figure.setPosition(0, 16);
            if( index == 1 )
                figure.setPosition(80, 16);

        }
    }
});

// custom locator for the special design of the ResistorBridge Input area
draw2d.shape.analog.acVoltage.labelLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.acVoltage.labelLocator',
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
});