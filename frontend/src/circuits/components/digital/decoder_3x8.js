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
draw2d.shape.analog.decoder_3x8 = draw2d.shape.analog.digital.extend({

    NAME:"draw2d.shape.analog.decoder_3x8",
    s0:'0',
    s1:'0',
    
    q0:'',
    q1:'',
    q2:'',
    q3:'',
    
    en:'',
    
    
    // custom locator for the special design of the ResistorBridge Input area
    MyInputPortLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            
            if( index < 2 )
            	figure.setPosition(0, index*16+16);
            else
	            figure.setPosition(0, index*16+32);
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
			//index = index - 3;
            figure.setPosition(w, index*16+16);
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

            if( index == 0 )
            	figure.setPosition(15, 5);
			
			if( index == 1 )
				figure.setPosition(15, 22);
            
            if( index == 2 )
            	figure.setPosition(15, h-28);
            
            if( index == 3 )
            	figure.setPosition(w-33, 5);
            
            if( index == 4 )
            	figure.setPosition(w-33, 21);
			
			if( index == 5 )
				figure.setPosition(w-33, 37);
			
			if( index == 6 )
				figure.setPosition(w-33, 53);

        }
    }),
    
	onPortValueChanged: function(relatedPort){

	    console.log(relatedPort.getName());
	    
	    if( relatedPort.getName() == "input0" || relatedPort.getName() == "input1" || relatedPort.getName() == "input2" )
	    {
	    	this.q0.setValue("0");
	    	this.q1.setValue("0");
	    	this.q2.setValue("0");
	    	this.q3.setValue("0");
	    	
	    	
	    	if( this.en.getValue() == "0" ) return; // the decoder is disabled
	    	
	    	
	    	var val = this.s1.getValue()+this.s0.getValue();
	    	
	    	console.log(relatedPort.getName());
	    
		    if( val == "00" )
		    {
		    	this.q0.setValue("1");
		    }
		    else if( val == "01" )
		    {
		    	this.q1.setValue("1");
		    }
		    else if( val == "10" )
		    {
		    	this.q2.setValue("1");
		    }
		    else if( val == "11" )
		    {
		    	this.q3.setValue("1");
		    }
	    }
	
    },

    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 108;
            height= 80;
        }
        
        this._super(width,height);
        //this.setResizeable(false);
        this.inputLocator = new this.MyInputPortLocator();
        this.outputLocator = new this.MyOutputPortLocator();
        
        this.s0 = this.createPort("input",this.inputLocator);
        this.s1 = this.createPort("input",this.inputLocator);
        this.en = this.createPort("input",this.inputLocator);

        this.q0 = this.createPort("output",this.outputLocator);
        this.q1 = this.createPort("output",this.outputLocator);
        this.q2 = this.createPort("output",this.outputLocator);
        this.q3 = this.createPort("output",this.outputLocator);
	    
	    /*
	    this.oldClk = "0";
	    this.qout2.setValue("1");
	    this.qout1.setValue("0");
	    this.dinput.setValue("0");
	    */
	    var labelLocator = new this.MyLabelLocator();
	    this.add( new draw2d.shape.basic.componentLabel("S0") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("S1") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("EN") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("Q0") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("Q1") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("Q2") , labelLocator );
	    this.add( new draw2d.shape.basic.componentLabel("Q3") , labelLocator );

        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
    },
    

    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="108px" height="80px" viewBox="1 -2.5 108 80" enable-background="new 1 -2.5 108 80" xml:space="preserve"><line fill="none" stroke="#010202" stroke-width="2" x1="12.455" y1="16" x2="1" y2="16"/><line fill="none" stroke="#010202" stroke-width="2" x1="12.455" y1="64" x2="1" y2="64"/><line fill="none" stroke="#010202" stroke-width="2" x1="109" y1="32" x2="97.544" y2="32"/><rect x="12.98" y="-2.5" fill="none" stroke="#010202" stroke-width="2" width="84.04" height="80"/><line fill="none" stroke="#010202" stroke-width="2" x1="109" y1="16" x2="97.544" y2="16"/><line fill="none" stroke="#010202" stroke-width="2" x1="109" y1="64" x2="97.544" y2="64"/><line fill="none" stroke="#010202" stroke-width="2" x1="12.455" y1="32" x2="1" y2="32"/><line fill="none" stroke="#010202" stroke-width="2" x1="109" y1="48" x2="97.544" y2="48"/></svg>';
    }
});