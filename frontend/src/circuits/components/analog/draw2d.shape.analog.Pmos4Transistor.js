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
 draw2d.shape.analog.Pmos4Transistor = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.Pmos4Transistor",
    Drain:'',
    Source:'',
    Gate:'',
    Bulk:'',
    rotatable:'yes',
    model:'',
    ngspiceSymbol:'Q',

    
	onPortValueChanged: function(relatedPort){
   
	    
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
            height= 64;
	        
	    this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
        
	   	this.defaultValues = { label:"Pmos" };

        this._super(width,height);
        
        

        
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.Pmos4Transistor.inputLocator();
        
        this.Drain = this.createPort("hybrid",this.inputLocator);
        this.Source = this.createPort("hybrid",this.inputLocator);
        this.Gate = this.createPort("hybrid",this.inputLocator);
        this.Bulk = this.createPort("hybrid",this.inputLocator);

	    var labelLocator = new draw2d.shape.analog.Pmos4Transistor.labelLocator();
	    
	    this.params = {
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  }

		};

		
	       	
    	this.defaultRotation = 'v';
	    this.defaultWidth = '32';
	    this.rotation = 'v';
	    
	     },
    
	ngSpiceCommand: function(nodes,deviceIndex)
	{
		var data = this.getUserData();
		var values = data['formData'];
				
		var Source = nodes[this.Source.id];
		var Gate = nodes[this.Gate.id];
		var Drain = nodes[this.Drain.id];
		var Bulk = nodes[this.Bulk.id];

		if( typeof Source == 'undefined' || typeof Gate == 'undefined' || typeof Drain == 'undefined' || typeof Bulk == 'undefined' )
		{
			return 'connection error';	
		}
		
		this.model = ".model NmostModel"+deviceIndex+" PMOS";
		
		
		if( this.model.indexOf("undefined") != -1 )
		{
			return {type:'error',msg:'missing Parameters'};
		}
		        
		return {type:'ngspice',msg:"Mp"+deviceIndex+" "+Drain+" "+Gate+" "+Source+" "+Bulk+" NmostModel"+deviceIndex};

	},
    getSVG: function(){
    
    	
        return '<svg width="34" height="64" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title>  <title>Layer 1</title>  <rect opacity="0" id="svg_2" height="64" width="34" y="0" x="0" fill-opacity="0.75" stroke-opacity="null" stroke-width="0" stroke="#000000" fill="none"/>  <path d="m10.34153,3.04311l0,57.91378" id="path2189" stroke-width="2" fill-rule="evenodd" fill-opacity="0.75" fill="none" stroke="#000000"/>  <line fill="none" stroke-width="2" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0.75" x1="10" y1="32.5" x2="0.0625" y2="32.5" id="svg_7" stroke="#000000"/>  <line fill="none" stroke-width="2" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0.75" x1="32.5" y1="0.03472" x2="32.5" y2="9.12896" id="svg_9" stroke="#000000"/>  <line fill="none" stroke-width="2" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0.75" x1="32.5" y1="54.90254" x2="32.5" y2="63.99677" stroke="#000000" id="svg_13"/>  <line fill="none" stroke-width="2" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0.75" x1="33.4782" y1="55.90222" x2="15.8666" y2="55.90222" id="svg_3" stroke="#000000"/>  <path d="m16,50.30344l0,10.80541" id="svg_4" stroke-width="2" fill-rule="evenodd" fill-opacity="0.75" fill="none" stroke="#000000"/>  <line fill="none" stroke-width="2" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0.75" x1="32.79437" y1="8.186" x2="16.01856" y2="8.186" id="svg_5" stroke="#000000"/>  <path d="m16,2.89115l0,10.80541" id="svg_6" stroke-width="2" fill-rule="evenodd" fill-opacity="0.75" fill="none" stroke="#000000"/>  <path d="m16,26.59729l0,10.80541" id="svg_8" stroke-width="2" fill-rule="evenodd" fill-opacity="0.75" fill="none" stroke="#000000"/>  <line fill="none" stroke-width="2" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0.75" x1="27.87212" y1="32.5" x2="16.64628" y2="32.5" id="svg_19" stroke="#000000"/>  <path stroke="#000000" fill="#0a0505" stroke-width="2" stroke-opacity="null" d="m32.56233,32.86354l-5.18704,-4.72219l0.1235,8.59813l5.06354,-3.87594z" id="svg_12"/> </svg>';
    }
});


    // custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.Pmos4Transistor.inputLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.Pmos4Transistor.inputLocator',
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
	            	figure.setPosition(32, 0); // Drain
	            if( index == 1 )
	            	figure.setPosition(32, 64); //Source
	            if( index == 2 )
	            	figure.setPosition(0, 32); //Gate
	            if( index == 3 )
	            	figure.setPosition(32, 32); //Bulk
            }
            else if( r == 90 )
            {
	            if( index == 0 )
	            	figure.setPosition(64, 32); //Drain
	            if( index == 1 )
	            	figure.setPosition(0, 32); // Source 
	            if( index == 2 )
	            	figure.setPosition(32, 0); //Gate
	            if( index == 3 )
	            	figure.setPosition(32, 32); //Bulk
            }
            else if( r == 180 )
            {
	            if( index == 0 )
	            	figure.setPosition(0, 64); // Drain
	            if( index == 1 )
	            	figure.setPosition(0, 0); // Source
	            if( index == 2 )
	            	figure.setPosition(32, 32); //Gate
	            if( index == 3 )
	            	figure.setPosition(0, 32); //Bulk
            }
            else if( r == 270 )
            {
	            if( index == 0 )
	            	figure.setPosition(0, 0); // Drain
	            if( index == 1 )
	            	figure.setPosition(64, 0); // Source
	            if( index == 2 )
	            	figure.setPosition(32, 32); //Gate
	            if( index == 3 )
	            	figure.setPosition(32, 0); //Bulk
            }
            
        }
    }),

    draw2d.shape.analog.Pmos4Transistor.labelLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.Pmos4Transistor.labelLocator',
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