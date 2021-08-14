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
 draw2d.shape.analog.LDR = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.LDR",
    dinput:'',
    clock:'',
    node1:'',
    node2:'',
    oldClk:'',
    rotatable:'yes',
    ngspiceSymbol:'R',
    valueField:"resistance",

    

    init:function(width, height){
            width = 32;
            height= 80;

        this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
        
        this._super({width:width,height:height});
        		
     
        this.inputLocator = new draw2d.shape.analog.LDR.inputLocator();
        
        this.node1 = this.createPort("hybrid",this.inputLocator);
        this.node2 = this.createPort("hybrid",this.inputLocator);

	    var labelLocator = new draw2d.shape.analog.LDR.labelLocator();
	    
		this.defaultValues = { label:'LDR',resistance:'400' };

	    this.params = {
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  },
		  resistance: {
		        "type": "string",
		        "title": "Resistance",
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
	
		console.log('X=' + values.resistance ) ; 
		   	   if ( values.resistance )
		   	   {
			    	if ( values.resistance <= '400' ){
			    	this.setBackgroundColor("#FFFFFF").opacity =0.0;
			    	this.repaint();
			    	}
			    	else if ( values.resistance >= '100' &&  values.R >= '400K' ){
			    	this.setBackgroundColor("#F7FAB9").opacity =0.1;
			    	this.repaint();
			    	}
			    	else if ( values.resistance > '400k' &&  values.R >= '800K' ){
			    	this.setBackgroundColor("#EDF55D").opacity =0.2;
			    	this.repaint();
			    	}
			    	else if ( values.resistance > '800k' &&  values.R >= '2M' ){
			    	this.setBackgroundColor("#EEF743").opacity =0.3;
			    	this.repaint();
			    	}
			    	else if ( values.resistance > '2M' &&  values.R >= '6M' )
			    	{
			    	this.setBackgroundColor("#F2EA0A").opacity =0.4;
			    	this.repaint();
			    	}
			    	else if ( values.resistance > '6M'  ){
			    	this.setBackgroundColor("#ffff00").opacity =0.5;
			    	}
			    }
			    else
			    {
			    	this.setBackgroundColor("#FFFFFF").opacity =0.0;
			    }

				
		var node1_name = nodes[this.node1.id];
		var node2_name = nodes[this.node2.id];

		if( typeof node1_name == 'undefined' || typeof node2_name == 'undefined' )
		{
			return {type:'error',msg:'connection error'};
		}
		
		var command = "R"+deviceIndex+" "+node1_name+" "+node2_name+" "+values.resistance;

		if( command.indexOf("undefined") != -1 )
		{
			return {type:'error',msg:'missing Parameters'};
		}
		
		return { type:'ngspice' , msg:command };
	},
	
	    repaint : function(attributes)
    {
         if (this.repaintBlocked===true || this.shape === null){
             return;
         }

         if(typeof attributes === "undefined" ){
             attributes = {};
         }

   
         attributes["fill"] = "transparent";
         if( this.bgColor!=null){
             this.svgNodes[0].attr({fill:"#" + this.bgColor.hex()});
         }
         
         this._super(attributes);
    },
    
    getSVG: function(){
    
    	 this.setBackgroundColor("#FFFFFF").opacity =0.0;

        return '<svg width="111.99999999999999" height="80.00000000000001" xmlns="http://www.w3.org/2000/svg"> <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ --> <title>Layer 1</title>  <title>Layer 1</title>  <path fill="#ffff00" stroke="black" stroke-width="0" stroke-opacity="null" d="m49.55812,17.50598l42.38133,10.15512l-13.25682,34.33996l-41.78611,-29.28815l6.13368,-10.93867z" id="svg_0"/>  <rect fill="none" stroke="black" stroke-width="0" stroke-opacity="null" fill-opacity="null" x="0" y="0" width="112" height="80" id="svg_3" opacity="0"/>  <path d="m79.74872,79.89328l0.11555,-19.87957l-6.74208,-3.31326l13.25305,-6.62652l-13.25305,-6.62653l13.25305,-6.62652l-13.25305,-6.62652l13.25305,-6.62653l-6.51097,-3.31326l0,-19.87957" stroke-width="2" stroke-linejoin="bevel" fill="none" id="svg_1" stroke="black"/>  <ellipse fill="none" stroke-opacity="null" fill-opacity="null" cx="79.74872" cy="40" id="svg_2" rx="24.46837" ry="24.8282" stroke="black"/>  <path fill="none" stroke="black" stroke-width="2" stroke-opacity="null" fill-opacity="null" opacity="0.5" d="m47.54178,13.80478" id="svg_6"/>  <path id="svg_4" d="m53.36372,21.35775" opacity="0.5" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="black" fill="#ffff00"/>  <path id="svg_5" d="m52.10835,21.35775" opacity="0.5" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="black" fill="#ffff00"/>  <path id="svg_9" d="m38.92697,35.4179l10.53463,-19.09808l-8.91313,-4.26826l-9.79189,1.25537l-19.20717,-11.1728l-5.39809,6.27685l19.70932,12.30263l4.14272,10.29404l8.92361,4.41025z" fill-opacity="null" stroke-opacity="null" stroke-width="2" stroke="black" fill="#cccccc"/>  <line stroke-linecap="null" stroke-linejoin="null" id="svg_10" y2="14.70429" x2="45.07828" y1="32.65608" x1="34.90978" fill-opacity="null" stroke-opacity="null" stroke-width="2" stroke="black" fill="none"/>  <line stroke="black" stroke-linecap="null" stroke-linejoin="null" id="svg_12" y2="8.80404" x2="5.65964" y1="0.64414" x1="10.80666" fill-opacity="null" stroke-opacity="null" stroke-width="2" fill="none"/>  <line stroke-linecap="null" stroke-linejoin="null" id="svg_13" y2="8.80404" x2="8.04485" y1="2.77827" x1="12.18757" fill-opacity="null" stroke-opacity="null" stroke-width="2" stroke="black" fill="none"/> </svg>';
    }
});

draw2d.shape.analog.LDR.inputLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.LDR.inputLocator',
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
				figure.setPosition(80, 0);
			if( index == 1 )
				figure.setPosition(80, 80);
		}
		else if( r == 90 )
		{
			if( index == 0 )
				figure.setPosition(80, 80);
			if( index == 1 )
				figure.setPosition(0, 80);
		}
		else if( r == 180 )
		{
			if( index == 0 )
				figure.setPosition(32, 80);
			if( index == 1 )
				figure.setPosition(32, 0);
		}
		else if( r == 270 )
		{
			if( index == 0 )
				figure.setPosition(0, 32);
			if( index == 1 )
				figure.setPosition(80, 32);

		}
		
	}
});

draw2d.shape.analog.LDR.labelLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.LDR.labelLocator',
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