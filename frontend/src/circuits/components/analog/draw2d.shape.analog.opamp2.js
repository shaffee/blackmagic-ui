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
 draw2d.shape.analog.opamp2 = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.opamp2",
    nonInvertingInput:'',
    invertingInput:'',
    refPlus:'',
    refMinus:'',
    output:'',
    rotatable:'yes',
    model:'',
    ngspiceSymbol:'Q',
    subcircuit:'',

    
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
        this.refMinus = this.createPort("hybrid",this.inputLocator);
        this.refPlus = this.createPort("hybrid",this.inputLocator);

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
		var refMinus = nodes[this.refMinus.id];
		var refPlus = nodes[this.refPlus.id];
		
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
	   	circuit.name = "opampni22";
	   	
		this.subcircuit = "";
	   	this.subcircuit += ".model NPN NPN \n\r";
	   	this.subcircuit	+= ".model PNP PNP\n\r";
		this.subcircuit += ".SUBCKT opampni22	   Vin+        Vin-        Vs+        Vs-        Vout\n\r";
		this.subcircuit += "\n\r";
		this.subcircuit += "Q1 N001 Vin+ N006 0 NPN\n\r";
		this.subcircuit += "Q3 N010 N008 N006 0 PNP\n\r";
		this.subcircuit += "Q7 Vs+ N010 N015 0 NPN\n\r";
		this.subcircuit += "Q5 N010 N015 N017 0 NPN\n\r";
		this.subcircuit += "R1 N017 Vs- 1K\n\r";
		this.subcircuit += "Q8 N001 N001 Vs+ 0 PNP\n\r";
		this.subcircuit += "Q2 N001 Vin- N007 0 NPN\n\r";
		this.subcircuit += "Q4 N009 N008 N007 0 PNP\n\r";
		this.subcircuit += "Q9 N008 N001 Vs+ 0 PNP\n\r";
		this.subcircuit += "Q6 N009 N015 N020 0 NPN\n\r";
		this.subcircuit += "R N015 Vs- 50K\n\r";
		this.subcircuit += "R2 N020 Vs- 1K\n\r";
		this.subcircuit += "Q10 N008 N012 N019 0 NPN\n\r";
		this.subcircuit += "Q11 N012 N012 Vs- 0 NPN\n\r";
		this.subcircuit += "R3 N019 Vs- 5K\n\r";
		this.subcircuit += "R4 N002 N012 39K\n\r";
		this.subcircuit += "Q12 N002 N002 Vs+ 0 PNP\n\r";
		this.subcircuit += "Q13 N003 N002 Vs+ 0 PNP\n\r";
		this.subcircuit += "C1 N003 N009 30p\n\r";
		this.subcircuit += "R5 N003 N005 4.5K\n\r";
		this.subcircuit += "R6 N005 N013 7.5K\n\r";
		this.subcircuit += "Q16 N003 N005 N014 0 NPN\n\r";
		this.subcircuit += "Q15 N013 N009 N016 0 NPN\n\r";
		this.subcircuit += "Q19 N014 N016 N018 0 NPN\n\r";
		this.subcircuit += "R7 N016 Vs- 50K\n\r";
		this.subcircuit += "R8 N018 Vs- 50\n\r";
		this.subcircuit += "Q22 N009 N018 Vs- 0 NPN\n\r";
		this.subcircuit += "Q14 Vs+ N003 N004 0 NPN\n\r";
		this.subcircuit += "Q17 N003 N004 Vout 0 NPN\n\r";
		this.subcircuit += "Q20 Vs- N014 N011 0 PNP\n\r";
		this.subcircuit += "R9 N004 Vout 25\n\r";
		this.subcircuit += "R10 Vout N011 50\n\r";
		this.subcircuit += "\n\r";
		this.subcircuit += "\n\r";
		this.subcircuit += ".ends\n\r";

		console.log(this.subcircuit);
        //QXXXXXXX nc nb ne <ns> mname <area=val> <areac=val> <areab=val> 
        // + <m=val > <off > <ic=vbe , vce> <temp=val > <dtemp=val >				
        
		return {type:'ngspice',msg:"XOP "+nonInverting+" "+inverting+" "+ refPlus + " " + refMinus + " " + output+" "+circuit.name};
	},
    getSVG: function(){
    
    	//this.setBackgroundColor("#000000");

        return '<svg width="128" height="96.00000000000001" xmlns="http://www.w3.org/2000/svg"> <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ --> <title>Layer 1</title> <title>Layer 1</title>  <rect fill="none" stroke="#000" stroke-width="0" stroke-opacity="null" fill-opacity="null" width="128" height="96" id="svg_9" opacity="0" y="0" x="0"/>  <line fill="none" stroke="#000" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="16.375" y1="16.5" x2="0.125" y2="16.5" id="svg_6" stroke-linejoin="null" stroke-linecap="null"/>  <line fill="none" stroke="#000" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="111.0625" y1="48.5" x2="128" y2="48.5" id="svg_8" stroke-linejoin="null" stroke-linecap="null"/>  <line fill="none" stroke="#000" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="16.375" y1="81" x2="0.125" y2="81" id="svg_10" stroke-linejoin="null" stroke-linecap="null"/>  <path fill="#ffffff" stroke-width="2" stroke-opacity="null" d="m17.43504,1.8425l95.21875,46.4375l-95.21875,46.43749l0,-92.87499z" id="svg_13" stroke="#000"/>  <line fill="none" stroke="#000" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="25.4375" y1="72.47915" x2="25.4375" y2="81.48696" id="svg_17" stroke-linejoin="null" stroke-linecap="null" transform="rotate(90 25.43749999999999,76.98306274414064) "/>  <line fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="21.0625" y1="16.3125" x2="30.07472" y2="16.3125" id="svg_22" stroke-linejoin="null" stroke-linecap="null" stroke="#000"/>  <line fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="25.4375" y1="11.9375" x2="25.4375" y2="20.57031" id="svg_18" stroke-linejoin="null" stroke-linecap="null" stroke="#000"/>  <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_1" y2="0.5" x2="64.5" y1="25" x1="64.5" stroke-width="2" fill="none"/>  <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_2" y2="72.00033" x2="64.5" y1="96.5" x1="64.5" stroke-width="2" fill="none"/>  <line stroke-width="2" fill="none" stroke-opacity="null" fill-opacity="null" x1="61.07233" y1="64.3243" x2="70.08455" y2="64.3243" id="svg_3" stroke-linejoin="null" stroke-linecap="null" stroke="#000"/>  <line stroke-width="2" fill="none" stroke-opacity="null" fill-opacity="null" x1="59.47194" y1="33.91682" x2="68.48416" y2="33.91682" id="svg_4" stroke-linejoin="null" stroke-linecap="null" stroke="#000"/>  <line stroke-width="2" fill="none" stroke-opacity="null" fill-opacity="null" x1="63.84694" y1="29.54182" x2="63.84694" y2="38.17463" id="svg_7" stroke-linejoin="null" stroke-linecap="null" stroke="#000"/></svg>';
    }
});

    // custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.opamp2.inputLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.opamp2.inputLocator',
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
	            	figure.setPosition(0, 16);
	            if( index == 1 )
	            	figure.setPosition(0, 80); 
	            if( index == 2 )
	            	figure.setPosition(128, 48); 
	            if( index == 3 ) //refMinus
	            	figure.setPosition(64, 96); 
	            if( index == 4 ) //refPlus
	            	figure.setPosition(64, 0); 
            }
            else if( r == 90 )
            {
	            if( index == 0 )
	            	figure.setPosition(80, 0); 
	            if( index == 1 )
	            	figure.setPosition(16, 0); 
	            if( index == 2 )
	            	figure.setPosition(48, 128); 
	            if( index == 3 ) //refMinus
	            	figure.setPosition(0, 64); 
	            if( index == 4 ) //refPlus
	            	figure.setPosition(96, 64); 
            }
            else if( r == 180 )
            {
	            if( index == 0 )
	            	figure.setPosition(128, 80); 
	            if( index == 1 )
	            	figure.setPosition(128, 16); 
	            if( index == 2 )
	            	figure.setPosition(0, 48); 
	            if( index == 3 ) //refMinus
	            	figure.setPosition(64, 0); 
	            if( index == 4 ) //refPlus
	            	figure.setPosition(64, 96); 
            }
            else if( r == 270 )
            {
	            if( index == 0 )
	            	figure.setPosition(16, 128); 
	            if( index == 1 )
	            	figure.setPosition(80, 128); 
	            if( index == 2 )
	            	figure.setPosition(48, 0); 
	            if( index == 3 ) //refMinus
	            	figure.setPosition(96, 64); 
	            if( index == 4 ) //refPlus
	            	figure.setPosition(0, 64); 

            }
                        
        }
    });

    draw2d.shape.analog.opamp2.labelLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.opamp2.labelLocator',
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