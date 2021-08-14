import draw2d from 'draw2d';

draw2d.shape.analog.toggleInput = draw2d.shape.analog.digital.extend({

   NAME : "draw2d.shape.analog.toggleInput",
   output:null,
   valueLabelLocator : null,
   valueLabel : null,
   init : function()
   {
       this.value="0";
       this._super();
                   
       this.counter = 0;
       
       this.setDimension(48,32);
       this.setResizeable(false);

       this.outputLocator = new draw2d.shape.analog.toggleInput.outputLocator();

       this.output = this.createPort("output",this.outputLocator);
       
       
       this.setBackgroundColor("#ffffff");
       
        this.startTimer(200);

    	this.valueLabel =new draw2d.shape.basic.Label('0');
    	this.valueLabel.setStroke(0);
    	this.valueLabel.setFontSize(17);
    	this.valueLabel.setFontColor("#ffffff");
	    this.valueLabel.fixed = 'fixed';
	    
	    this.valueLabel.on( "dblclick" , function(e){
	    	e.parent.onDoubleClick();
	    });

        this.valueLabel.on( "click" , function(e){
            console.log("Dsad");
	    	e.parent.onClick();
	    });

    	this.add(this.valueLabel, new draw2d.layout.locator.XYRelPortLocator(25,10) );

        

		this.repaint();
   },
   afterAdd: function (canvas)
   {
       var values = this.getUserData();
	   
	   
	   if( typeof values.value == 'undefined' )
	   values.value = 0;
	   
	   this.valueLabel.setText(values.value);
       this.setBackgroundColor(window['wireColors'][values.value]);
       this.setUserData(values);



   },
     
    onClick: function(){
	    console.log("change value 1");
	   if( window['simulating'] )
	   {
           console.log("change value 2");
	       var value = this.output.getValue() == "0" ? "1" : "0";
		   
		   this.valueLabel.setText(value);
		   this.output.setValue(value);
	       this.setBackgroundColor(window['wireColors'][value]);
	   }
    }
   ,
   getSVG: function(){
            
    //var data = {name: "digital Clock", frequency: "1"};

    //this.setUserData( data );
            
    this.setBackgroundColor("#ffffff");

   	return '<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <path stroke-width="2" id="svg_1" d="m39.542,16.917c0,6.627 -5.373,12 -12,12l-13.125,0c-6.627,0 -12,-5.373 -12,-12l0,-1.833c0,-6.627 5.373,-12 12,-12l13.125,0c6.627,0 12,5.373 12,12l0,1.833z" stroke-miterlimit="10" stroke="#000000" fill="#FFFFFF"/>  <line stroke-width="2" id="svg_2" y2="16.5" x2="47.833" y1="16.5" x1="39.542" stroke-miterlimit="10" stroke="#000000" fill="none"/>  <line id="svg_3" y2="0" x2="47.833" y1="0" x1="0" stroke-miterlimit="10" fill="none" opacity="0"/>  <line id="svg_4" y2="32" x2="47.833" y1="32" x1="0" stroke-miterlimit="10" fill="none" opacity="0"/> </svg>';
   },     
   repaint : function(attributes)
   {
        if (this.repaintBlocked===true || this.shape === null){
            return;
        }

        if(typeof attributes === "undefined" ){
            attributes = {};
        }

        // redirect the backgroundColor to an internal SVG node.
        // In this case only a small part of the shape are filled with the background color
        // and not the complete rectangle/bounding box
        //
        attributes["fill"] = "transparent";
        if( this.bgColor!=null){
            this.svgNodes[0].attr({fill:"#" + this.bgColor.hex()});
        }
        
        this._super(attributes);
   }
});


draw2d.shape.analog.toggleInput.outputLocator = draw2d.layout.locator.Locator.extend({
    NAME : 'draw2d.shape.analog.toggleInput.outputLocator',
    init:function( ){
      this._super();
    },    
    relocate:function(index, figure){
        var w = figure.getParent().getWidth();
        var h = figure.getParent().getHeight();
        
        figure.setPosition(48, 16);
     
    }
});
