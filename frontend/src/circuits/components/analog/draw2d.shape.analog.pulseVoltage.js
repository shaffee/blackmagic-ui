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
 draw2d.shape.analog.pulseVoltage = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.pulseVoltage",
    dinput:'',
    clock:'',
    node1:'',
    node2:'',
	ngspiceSymbol:'V',
	simulations : ['dc_bias','ac_analysis','transient_response'],


	onPortValueChanged: function(relatedPort){
	
	    //var outputVal = this.output.getValue() != null ? this.output.getValue() : "0";

	    if( relatedPort.getName() == "clock" && this.clock.getValue() != this.oldClk )
	    {
	    	//console.log(relatedPort);
	    	
	    	if( this.clock.getValue() == "1" && this.oldClk == "0" )
	    	{
	    		
	    		if( this.dinput.getValue() == "1" )
	    		{
	    			//delay(100000010000001000000);
	    		    this.qout1.setNextNodeValue("1");
	    			this.qout2.setNextNodeValue("0");
	    		}
	    		else
	    		{
	    			//delay(100000010000001000000);
	    			this.qout1.setNextNodeValue("0");
	    			this.qout2.setNextNodeValue("1");
	    		}
	    		
	    		this.oldClk = this.clock.getValue();	
	    		
	    		this.clock.setNextNodeValue("1");
	    	}
	    	else if( this.clock.getValue() == "0" && this.oldClk == "1"  )
	    	{
	    		this.oldClk = this.clock.getValue();
	    		this.clock.setNextNodeValue("0");	
	    	}
		    
	
	
		    this.oldClk = this.clock.getValue();
	    }
    },

    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        width = 32;
        height= 80;
        this.defaultRotation = 'v';
	    this.defaultWidth = '32';
	    this.rotation = 'v';
	    
        this._super({width:width,height:height});
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.pulseVoltage.inputLocator();
        
        this.node1 = this.createPort("hybrid",this.inputLocator);
        this.node2 = this.createPort("hybrid",this.inputLocator);

	    var labelLocator = new draw2d.shape.analog.pulseVoltage.labelLocator();

	   	this.defaultValues = { label:'Pulse',V1:0 , V2:5, TD:0 , TR:0, TF:0, PW:"300ns", PER:"600ns" };

	    console.log("dddddddddddddddddddddddddddddd");
		console.log(this.getUserData());
		
	    this.params = {
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  },
		  V1: {
		        "type": "string",
		        "title": "Initial Volt",
		        //"format": "color"
		      },
		  V2: {
		        "type": "number",
		        "title": "Pulsed Volt",
		        //"format": "color"
		      },
		  TD: {
		        "type": "string",
		        "title": "Delay Time", //[example: 1S , 10NS , 1US ]
		        "append": "Second"
		        //"format": "color"
		      },
		  TR: {
		        "type": "string",
		        "title": "Rise Time", //[example: 1S , 10NS , 1US ]
		        //"format": "color"
		      },
		  TF: {
		        "type": "string",
		        "title": "Fall Time", //[example: 1S , 10NS , 1US ]
		        //"format": "color"
		      },
		  PW: {
		        "type": "string",
		        "title": "Pulse Width", //[example: 1S , 10NS , 1US ]
		        //"format": "color"
		      },
		  PER: {
		        "type": "string",
		        "title": "Period", //[example: 1S , 10NS , 1US ]
		        //"format": "color"
		      }
		      
		};
		
		this.formSettings = {
								"V1":
							    {
							      "append": "today",
							    }
							};
		
		this.onParamsChanged = function (evt){
			console.log("tt");	
		}
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

		//PULSE(V1 V2 TD TR TF PW PER)
		if( typeof node1_name == 'undefined' || typeof node2_name == 'undefined' )
		{
			return {type:'error',msg:'connection error'};
		}
		
		var command = "V"+deviceIndex+" "+node1_name+" "+node2_name+" PULSE( "+values.V1+" "+values.V2+" "+values.TD+" "+values.TR+" "+values.TF+" "+values.PW+" "+values.PER+" )";

		if( command.indexOf("undefined") != -1 )
		{
			return {type:'error',msg:'missing Parameters'};
		}
		
		return { type:'ngspice' , msg:command };
	},
	
    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="32" height="80" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <ellipse fill="#ffffff" stroke="#000000" stroke-width="2" stroke-opacity="null" cx="16" cy="40" id="svg_3" rx="16" ry="16"/>  <line fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="16.5" y1="0.5" x2="16.5" y2="23.52877" id="svg_9" stroke-linejoin="round" stroke-linecap="round" stroke="#000000"/>  <line fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="16.5" y1="56.63662" x2="16.5" y2="80" id="svg_10" stroke-linejoin="round" stroke-linecap="round" stroke="#000000"/>  <line id="svg_1" y2="42.76106" x2="6.62534" y1="42.76106" x1="0.875" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" fill="none" stroke-width="2"/>  <line id="svg_2" y2="34.43354" x2="6.625" y1="42.76106" x1="6.625" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" fill="none" stroke-width="2"/>  <line id="svg_6" y2="34.4305" x2="13.77637" y1="34.4305" x1="6.81792" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="2" stroke="#000000"/>  <line id="svg_7" y2="42.76951" x2="13.8125" y1="34.44856" x1="13.8125" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" fill="none" stroke-width="2"/>  <line id="svg_8" y2="42.76106" x2="31.50011" y1="42.76106" x1="13.8125" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" fill="none" stroke-width="2"/> </svg>';
    }
});

    // custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.pulseVoltage.inputLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.pulseVoltage.inputLocator',
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
    }),
    
    // custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.pulseVoltage.labelLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.pulseVoltage.labelLocator',
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
    