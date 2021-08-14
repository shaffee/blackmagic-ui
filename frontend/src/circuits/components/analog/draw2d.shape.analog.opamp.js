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
 draw2d.shape.analog.opamp = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.opamp",
    nonInvertingInput:'',
    invertingInput:'',
    output:'',
    rotatable:'yes',
    model:'',
    ngspiceSymbol:'Q',
    subcircuit:'',
    // custom locator for the special design of the ResistorBridge Input area

    
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
            width = 128;
            height= 96;

        //alert("OpAmp is experemental and still under development");
        
        this._super(width,height);
        
        

        
        //this.setResizeable(false);
        this.inputLocator = new this.MyInputPortLocator();
        
        this.nonInvertingInput = this.createPort("hybrid",this.inputLocator);
        this.invertingInput = this.createPort("hybrid",this.inputLocator);
        this.output = this.createPort("hybrid",this.inputLocator);

	    var labelLocator = new this.MyLabelLocator();
	    
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
    	
    	this.defaultRotation = 'v';
	    this.defaultWidth = '32';
	    this.rotation = 'v';
	    
	   	//this.setBackgroundColor("#000");
	   	//this.repaint();

    },
    
	ngSpiceCommand: function(nodes,deviceIndex)
	{

		
		var data = this.getUserData();
		var values = data['formData'];
				
		var nonInverting = nodes[this.nonInvertingInput.id];
		var inverting = nodes[this.invertingInput.id];
		var output = nodes[this.output.id];

		if( typeof nonInverting == 'undefined' || typeof inverting == 'undefined' | typeof output == 'undefined' )
		{
			return 'connection error';	
		}

		
		//var circuit = jQuery.getJSON(siteUrl+"/components/index.php?type=opamps&component=opamp-ni&index=2");
		//alert(circuit);
		var circuit = {};
		//alert(circuit);
		/*
		$.ajax({
			        type: "GET",
			        url: siteUrl+"/components/index.php?type=opamps&component=opampni&index=2",
			        async: false,
			        dataType:'json',
			        success : function(data) {
				            circuit = data;
				            alert(circuit);
				        }
	   		 });
	   	*/
	   	//console.log(circuit);
	   	circuit.name = "opampni2";
	   	
		this.subcircuit = 	".SUBCKT opampni2 1   2   3\n\r"
							+"RIN	1	2	10MEG\n\r"
							+"EGAIN	3 0	1 2	101\n\r"
							+"RP1	3	4	10\n\r"
							
							+"RP2	3	4	10\n\r"
							+"RP3	3	4	10\n\r"
							+"RP4	3	4	10\n\r"
							+"CP1	4	0	1p\n\r"

							+"EBUFFER	5 0	4 0	1\n\r"
							+"ROUT	5	3	10\n\r"
							+".ENDS\n\r";

						  
		console.log(this.subcircuit);
        //QXXXXXXX nc nb ne <ns> mname <area=val> <areac=val> <areab=val> 
        // + <m=val > <off > <ic=vbe , vce> <temp=val > <dtemp=val >				
        
		return {type:'ngspice',msg:"XOP "+nonInverting+" "+inverting+" "+output+" "+circuit.name};
	},
    getSVG: function(){
    
    	//this.setBackgroundColor("#000000");

        return '<svg width="128" height="96.00000000000001" xmlns="http://www.w3.org/2000/svg"> <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->   <title>Layer 1</title>  <rect fill="none" stroke="#000" stroke-width="0" stroke-opacity="null" fill-opacity="null" width="128" height="96" id="svg_9" opacity="0"/>  <line fill="none" stroke="#000" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="16.375" y1="16.5" x2="0.125" y2="16.5" id="svg_6" stroke-linejoin="null" stroke-linecap="null"/>  <line fill="none" stroke="#000" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="111.0625" y1="48.5" x2="128" y2="48.5" id="svg_8" stroke-linejoin="null" stroke-linecap="null"/>  <line fill="none" stroke="#000" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="16" y1="80.5" x2="0" y2="80.5" id="svg_10" stroke-linejoin="null" stroke-linecap="null"/>  <path fill="#ffffff" stroke-width="2" stroke-opacity="null" d="m17.275,1.8425l95.21875,46.4375l-95.21875,46.43749l0,-92.87499z" id="svg_13" stroke="#000"/>  <line fill="none" stroke="#000" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="25.4375" y1="75.8125" x2="25.4375" y2="84.82031" id="svg_17" stroke-linejoin="null" stroke-linecap="null" transform="rotate(90 25.43749999999999,80.31640625000001) "/>  <line fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="21.0625" y1="16.3125" x2="30.07472" y2="16.3125" id="svg_22" stroke-linejoin="null" stroke-linecap="null" stroke="#000"/>  <line fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="25.4375" y1="11.9375" x2="25.4375" y2="20.57031" id="svg_18" stroke-linejoin="null" stroke-linecap="null" stroke="#000"/> </svg>';
    }
});

draw2d.shape.analog.opamp.inputLocator = draw2d.layout.locator.Locator.extend({
	NAME : "draw2d.shape.analog.opamp.inputLocator",
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
				figure.setPosition(0, 16); //collector
			if( index == 1 )
				figure.setPosition(0, 80); // emitter
			if( index == 2 )
				figure.setPosition(128, 48); //base
		}
		else if( r == 90 )
		{
			if( index == 0 )
				figure.setPosition(80, 0); //collector
			if( index == 1 )
				figure.setPosition(16, 0); // emitter
			if( index == 2 )
				figure.setPosition(48, 128); //base
		}
		else if( r == 180 )
		{
			if( index == 0 )
				figure.setPosition(128, 80); //collector
			if( index == 1 )
				figure.setPosition(128, 16); // emitter
			if( index == 2 )
				figure.setPosition(0, 48); //base
		}
		else if( r == 270 )
		{
			if( index == 0 )
				figure.setPosition(16, 128); //collector
			if( index == 1 )
				figure.setPosition(80, 128); // emitter
			if( index == 2 )
				figure.setPosition(48, 0); //base
		}
					
	}
});

draw2d.shape.analog.opamp.labelLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.opamp.labelLocator',
	init:function( ){
	  this._super();
	},    
	relocate:function(index, figure){
		var w = figure.getParent().getWidth();
		var h = figure.getParent().getHeight();

		if( index == 1 )
		figure.setPosition(50, 5);
		if( index == 2 )
		figure.setPosition(w-32, 5);
		if( index == 3 )
		figure.setPosition(w-30, h-26);
		if( index == 4 )
		figure.setPosition(500, h-28);
	}
});