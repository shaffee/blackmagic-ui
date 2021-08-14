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
 draw2d.shape.analog.pnpTransistor = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.pnpTransistor",
    collector:'',
    emitter:'',
    base:'',
    rotatable:'yes',
    model:'',
    ngspiceSymbol:'Q',

    
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
            height= 64;

        
	   	this.defaultValues = { label:"PNP" };

        this._super(width,height);
        
        

        
        //this.setResizeable(false);
        this.inputLocator = new this.MyInputPortLocator();
        
        this.collector = this.createPort("hybrid",this.inputLocator);
        this.emitter = this.createPort("hybrid",this.inputLocator);
        this.base = this.createPort("hybrid",this.inputLocator);

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
				
		var collector = nodes[this.collector.id];
		var base = nodes[this.base.id];
		var emitter = nodes[this.emitter.id];

		if( typeof collector == 'undefined' || typeof base == 'undefined' | typeof emitter == 'undefined' )
		{
			return 'connection error';	
		}
		
		this.model = ".model bjtModel"+deviceIndex+" pnp bf=50";
		
		
		if( this.model.indexOf("undefined") != -1 )
		{
			return {type:'error',msg:'missing Parameters'};
		}
		        
		return {type:'ngspice',msg:"Q"+deviceIndex+" "+collector+" "+base+" "+emitter+" bjtModel"+deviceIndex};

	},
    getSVG: function(){
    
    	//this.setBackgroundColor("#000000");

        return '<svg width="34" height="64" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <rect fill="none" stroke="#000000" stroke-width="0" stroke-opacity="null" fill-opacity="0.75" x="0" y="0" width="34" height="64" id="svg_2" opacity="0"/>  <path stroke="#000000" fill="none" fill-opacity="0.75" fill-rule="evenodd" stroke-width="2" id="path2189" d="m10.34153,17.78347l0,28.43306"/>  <path fill="none" fill-opacity="0.75" fill-rule="evenodd" stroke-width="2" id="path2191" d="m10.46653,22.56899l22.39049,-14.22314" stroke="#000000"/>  <path fill="none" fill-opacity="0.75" fill-rule="evenodd" stroke-width="2" id="path2196" d="m10.46653,41.74812l22.42174,13.95881" stroke="#000000"/>  <line stroke="#000000" id="svg_7" y2="32.5" x2="0.0625" y1="32.5" x1="10" fill-opacity="0.75" stroke-linecap="null" stroke-linejoin="null" stroke-width="2" fill="none"/>  <line stroke="#000000" id="svg_9" y2="9.12896" x2="32.5" y1="0.03472" x1="32.5" fill-opacity="0.75" stroke-linecap="null" stroke-linejoin="null" stroke-width="2" fill="none"/>  <line id="svg_13" stroke="#000000" y2="63.99677" x2="32.5" y1="54.90254" x1="32.5" fill-opacity="0.75" stroke-linecap="null" stroke-linejoin="null" stroke-width="2" fill="none"/>  <path transform="rotate(-4.148828983306885 24.205059051513647,13.378034591674789) " fill="#000000" stroke-width="5" stroke-linejoin="null" stroke-linecap="null" id="svg_1" d="m24.45588,11.81738l1.44918,3.12131l-3.4,-0.11147l1.95082,-3.00984z" stroke="#000000"/> </svg>';
    }
});


    // custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.pnpTransistor.inputLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.pnpTransistor.inputLocator',
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
	            	figure.setPosition(32, 0); //collector
	            if( index == 1 )
	            	figure.setPosition(32, 64); // emitter
	            if( index == 2 )
	            	figure.setPosition(0, 32); //base
            }
            else if( r == 90 )
            {
	            if( index == 0 )
	            	figure.setPosition(64, 32); //collector
	            if( index == 1 )
	            	figure.setPosition(0, 32); // emitter
	            if( index == 2 )
	            	figure.setPosition(32, 0); //base
            }
            else if( r == 180 )
            {
	            if( index == 0 )
	            	figure.setPosition(0, 64); //collector
	            if( index == 1 )
	            	figure.setPosition(0, 0); // emitter
	            if( index == 2 )
	            	figure.setPosition(32, 32); //base
            }
            else if( r == 270 )
            {
	            if( index == 0 )
	            	figure.setPosition(0, 0); //collector
	            if( index == 1 )
	            	figure.setPosition(64, 0); // emitter
	            if( index == 2 )
	            	figure.setPosition(32, 32); //base
            }
            
        }
    });

	// custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.pnpTransistor.labelLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.pnpTransistor.labelLocator',
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