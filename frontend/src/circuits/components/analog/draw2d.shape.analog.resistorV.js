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
draw2d.shape.analog.resistorV = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.resistorV",
    dinput:'',
    clock:'',
    node1:'',
    node2:'',
    oldClk:'',
    rotatable:'yes',
    ngspiceSymbol:'R',
    valueField:"resistance",

    
	onPortValueChanged: function(relatedPort){
   
    },

    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
            width = 32;
            height= 80;

        
        
        this._super({width:width,height:height});
        
        

        
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.resistorV.inputLocator();
        
        this.node1 = this.createPort("hybrid",this.inputLocator);
        this.node2 = this.createPort("hybrid",this.inputLocator);

	    var labelLocator = new draw2d.shape.analog.resistorV.labelLocator();
	    
		this.defaultValues = { label:'R',resistance:'1k' };

	    this.params = {
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  },
		  resistance: {
		        "type": "string",
		        "title": "Resistance",
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
    	
    	this.defaultRotation = 'v';
	    this.defaultWidth = '32';
	    this.rotation = 'v';
    },
    
	ngSpiceCommand: function(nodes,deviceIndex)
	{
		var data = this.getUserData();
		var values = data['formData'];
				
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
    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="32" height="80" xmlns="http://www.w3.org/2000/svg"> <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->   <title>Layer 1</title>  <rect opacity="0" id="svg_3" height="80" width="32" y="0" x="-0.000002" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="black" fill="none"/>  <path stroke="black" id="svg_1" fill="none" stroke-linejoin="bevel" stroke-width="2" d="m16.5,79.893284l0,-19.879571l-6.742077,-3.313262l13.253047,-6.626523l-13.253047,-6.626524l13.253047,-6.626523l-13.253047,-6.626525l13.253047,-6.626523l-6.51097,-3.313262l0,-19.879571"/> </svg>';
    }
});

    // custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.resistorV.inputLocator = draw2d.layout.locator.Locator.extend({
        NAME : 'draw2d.shape.analog.resistorV.inputLocator',
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
    draw2d.shape.analog.resistorV.labelLocator = draw2d.layout.locator.Locator.extend({
        NAME : 'draw2d.shape.analog.resistorV.labelLocator',
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