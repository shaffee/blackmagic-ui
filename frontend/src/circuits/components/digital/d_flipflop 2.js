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
 *     canvas.add(figure,10,10);
 *     
 *     
 * @extends draw2d.SVGFigure
 */
draw2d.shape.analog.dFlipflop = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.dFlipflop",
    dinput:'',
    clock:'',
    qout1:'',
    qout2:'',
    oldClk:'',
    
    // custom locator for the special design of the ResistorBridge Input area
    MyInputPortLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
            
            if( index == 0 )
            figure.setPosition(0, 16);
            if( index == 1 )
            figure.setPosition(0, 80);
        }
    }),

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
   
	    
	    		
	    //var outputVal = this.output.getValue() != null ? this.output.getValue() : "0";

	    if( relatedPort.getName() == "clock" && this.clock.getValue() != this.oldClk )
	    {
	    	//console.log(relatedPort);
	    	
	    	if( this.clock.getValue() == "1" && this.oldClk == "0" )
	    	{
	    		
	    		if( this.dinput.getValue() == "1" )
	    		{
	    			delay(100000010000001000000);
	    		    this.qout1.setNextNodeValue("1");
	    			this.qout2.setNextNodeValue("0");
	    		}
	    		else
	    		{
	    			delay(100000010000001000000);
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
        if(typeof width === "undefined"){
            width = 110;
            height= 96;
        }
        
        this._super(width,height);
        //this.setResizeable(false);
        this.inputLocator = new this.MyInputPortLocator();
        this.outputLocator = new this.MyOutputPortLocator();
        
        this.dinput = this.createPort("hybrid",this.inputLocator);
        this.clock = this.createPort("hybrid",this.inputLocator);
        this.clock.setName("clock");
        
        this.qout1 = this.createPort("hybrid",this.outputLocator);
        this.qout2 = this.createPort("hybrid",this.outputLocator);
	    
	    this.oldClk = "0";
	    this.qout2.setValue("1");
	    this.qout1.setValue("0");
	    this.dinput.setValue("0");
	    
	    var labelLocator = new this.MyLabelLocator();
	    this.add( new draw2d.shape.basic.componentLabel("D") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("Q") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("Q") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("CLK") , labelLocator );

        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
    },
    

    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 	 width="110px" height="96px" viewBox="0 0 110 96" enable-background="new 0 0 110 96" xml:space="preserve"> <line fill="none" stroke="#030404" stroke-width="2" x1="12" y1="16" x2="0" y2="16"/> <line fill="none" stroke="#030404" stroke-width="2" x1="12.456" y1="80" x2="0" y2="80"/> <rect x="12.98" fill="none" stroke="#030404" stroke-width="2" width="84.04" height="96"/> <line fill="none" stroke="#030303" x1="84.327" y1="74.148" x2="92.337" y2="74.148"/> <polyline fill="none" stroke="#030303" stroke-width="2" points="12.98,76.148 16.966,80.134 13.249,83.852 "/> 	<path fill="#010101" d="M92.158,88.104c-0.211,0.056-0.433,0.097-0.665,0.123c-0.232,0.027-0.464,0.041-0.693,0.041 		c-0.652,0-1.184-0.185-1.592-0.551c-0.408-0.367-0.632-0.892-0.67-1.57c-0.052,0-0.101,0-0.146,0c-0.047,0-0.088,0-0.123,0 		c-0.59,0-1.122-0.101-1.598-0.302c-0.475-0.201-0.879-0.495-1.215-0.882c-0.337-0.388-0.595-0.863-0.773-1.431 		c-0.18-0.566-0.27-1.207-0.27-1.922c0-0.733,0.09-1.379,0.271-1.934c0.181-0.555,0.439-1.031,0.775-1.43 		c0.336-0.387,0.741-0.682,1.217-0.883c0.475-0.201,1.005-0.302,1.591-0.302c0.594,0,1.129,0.104,1.604,0.312 		c0.477,0.207,0.879,0.498,1.207,0.873c0.332,0.383,0.59,0.856,0.773,1.424c0.183,0.566,0.275,1.213,0.275,1.939 		c0,1.129-0.222,2.061-0.662,2.795c-0.441,0.733-1.045,1.231-1.812,1.494c0.021,0.219,0.058,0.414,0.114,0.588 		c0.056,0.174,0.13,0.312,0.22,0.414c0.104,0.12,0.233,0.209,0.384,0.266c0.151,0.058,0.356,0.086,0.618,0.086 		c0.156,0,0.341-0.024,0.552-0.073s0.362-0.093,0.457-0.132h0.159V88.104z M90.921,81.613c0-0.578-0.062-1.091-0.188-1.535 		c-0.126-0.445-0.301-0.814-0.527-1.107c-0.229-0.301-0.509-0.525-0.834-0.677c-0.326-0.151-0.693-0.226-1.1-0.226 		c-0.422,0-0.79,0.072-1.104,0.219c-0.314,0.147-0.594,0.375-0.836,0.684c-0.229,0.297-0.406,0.67-0.529,1.119 		s-0.186,0.957-0.186,1.523c0,1.145,0.24,2.021,0.721,2.631c0.481,0.609,1.125,0.914,1.935,0.914s1.452-0.306,1.931-0.914 		C90.684,83.635,90.921,82.757,90.921,81.613z"/>  	<path fill="#010101" d="M92.158,22.438c-0.211,0.055-0.433,0.096-0.665,0.123s-0.464,0.041-0.693,0.041 		c-0.652,0-1.184-0.184-1.592-0.551c-0.408-0.367-0.632-0.891-0.67-1.57c-0.052,0-0.101,0-0.146,0c-0.047,0-0.088,0-0.123,0 		c-0.59,0-1.122-0.101-1.598-0.302c-0.475-0.201-0.879-0.495-1.215-0.882c-0.337-0.387-0.595-0.863-0.773-1.43 		c-0.18-0.567-0.27-1.207-0.27-1.922c0-0.734,0.09-1.379,0.271-1.934c0.181-0.555,0.439-1.031,0.775-1.43 		c0.336-0.387,0.741-0.681,1.217-0.882c0.475-0.201,1.005-0.302,1.591-0.302c0.594,0,1.129,0.104,1.604,0.311 		c0.477,0.207,0.879,0.498,1.207,0.873c0.332,0.383,0.59,0.857,0.773,1.424c0.183,0.567,0.275,1.213,0.275,1.939 		c0,1.129-0.222,2.061-0.662,2.795c-0.441,0.734-1.045,1.232-1.812,1.494c0.021,0.219,0.058,0.415,0.114,0.589 		c0.056,0.174,0.13,0.312,0.22,0.413c0.104,0.121,0.233,0.21,0.384,0.267c0.151,0.057,0.356,0.085,0.618,0.085 		c0.156,0,0.341-0.024,0.552-0.073c0.211-0.049,0.362-0.093,0.457-0.132h0.159V22.438z M90.921,15.945 		c0-0.578-0.062-1.09-0.188-1.535c-0.126-0.445-0.301-0.814-0.527-1.107c-0.229-0.301-0.509-0.526-0.834-0.677 		c-0.326-0.151-0.693-0.226-1.099-0.226c-0.422,0-0.79,0.073-1.104,0.22c-0.313,0.147-0.593,0.374-0.834,0.683 		c-0.23,0.297-0.408,0.67-0.531,1.119c-0.122,0.449-0.184,0.957-0.184,1.523c0,1.145,0.239,2.021,0.721,2.631 		c0.48,0.61,1.125,0.914,1.934,0.914s1.452-0.305,1.932-0.914C90.685,17.967,90.921,17.09,90.921,15.945z"/> 	<path fill="#010101" d="M23.763,16.008c0,0.797-0.161,1.516-0.483,2.156c-0.322,0.64-0.755,1.141-1.298,1.5 		c-0.441,0.277-0.89,0.463-1.345,0.557c-0.455,0.094-1.036,0.141-1.743,0.141h-2.01v-8.725h1.986c0.82,0,1.464,0.062,1.931,0.185 		c0.467,0.123,0.864,0.292,1.192,0.507c0.562,0.371,0.998,0.864,1.307,1.479C23.609,14.423,23.763,15.157,23.763,16.008z 		 M22.556,15.991c0-0.672-0.111-1.245-0.334-1.72c-0.223-0.475-0.553-0.845-0.99-1.11c-0.309-0.188-0.639-0.322-0.99-0.404 		c-0.351-0.082-0.789-0.123-1.312-0.123h-0.885v6.732h0.885c0.516,0,0.967-0.041,1.354-0.123c0.387-0.082,0.74-0.234,1.061-0.457 		c0.402-0.273,0.705-0.638,0.908-1.093S22.556,16.671,22.556,15.991z"/>  <line fill="none" stroke="#030404" stroke-width="2" x1="110" y1="16" x2="97.544" y2="16"/> <line fill="none" stroke="#030404" stroke-width="2" x1="110" y1="80" x2="97.544" y2="80"/> </svg>';
    }
});