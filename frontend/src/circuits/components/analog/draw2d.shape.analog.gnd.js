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
 draw2d.shape.analog.gnd = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.gnd",
    dinput:'',
    clock:'',
    qout1:'',
    qout2:'',
    oldClk:'',
    ngspiceSymbol:'GND',
    

    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        if(typeof width === "undefined"){
            width = 32;
            height= 32;
        }
        
        this._super(width,height);
        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.gnd.inputLocator();
		
		this.defaultValues = { label:'GND'};


        this.dinput = this.createPort("hybrid",this.inputLocator);
	    this.dinput.setName("gnd");
	    
	    var labelLocator = new draw2d.shape.analog.gnd.labelLocator();

    },
    

    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_1" y2="23.17148" x2="32" y1="23.17148" x1="0" stroke-width="2" fill="none"/>  <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_2" y2="27.42633" x2="27.40202" y1="27.42633" x1="4.59798" stroke-width="2" fill="none"/>  <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_3" y2="32" x2="22" y1="32" x1="10.01948" stroke-width="2" fill="none"/>  <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_4" y2="0.5" x2="16.5" y1="23.0294" x1="16.5" fill-opacity="null" stroke-opacity="null" stroke-width="2" fill="none"/> </svg>';
    }
});


    // custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.gnd.inputLocator = draw2d.layout.locator.Locator.extend({
        NAME : 'draw2d.shape.analog.gnd.inputLocator',
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            figure.setPosition(16, 0);        }
    });
    // custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.gnd.labelLocator = draw2d.layout.locator.Locator.extend({
        NAME : 'draw2d.shape.analog.gnd.labelLocator',
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
