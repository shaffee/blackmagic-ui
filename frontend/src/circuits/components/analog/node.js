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
draw2d.shape.analog.node = draw2d.shape.basic.Label.extend({

    NAME:"draw2d.shape.analog.node",
    dinput:'',
    clock:'',
    qout1:'',
    qout2:'',
    oldClk:'',
    arrow:'',
    circle:'',
    //ngspiceSymbol:'node',
    width : 0,
    // custom locator for the special design of the ResistorBridge Input area
    MyInputPortLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            figure.setPosition(7, 31);        }
    }),
	 onClick: function()
	 {

    	if( circuitEditor.config.properties == 'side' )
    	this.showForm();
    },
    getLine:function()
    {
	    line = app.view.getBestLine( this.circle.getAbsoluteX() , this.circle.getAbsoluteY()  );
	    
	    return line;
    },
	updateValues:function()
	{
		var values = this.getUserData();
		
		console.log("data inspect");
		console.log(typeof values['formData']);
		
		
		if( typeof values['formData'] == 'undefined' )
	    {
	    	console.log("load defaults");
	    	values['formData'] = this.defaultValues;
	    	console.log(values);
	    	//this.defaultValues = '';
	    	this.setUserData(values);	
	    }
		
		return values;
	},

    /**
     * @constructor
     * Create a new instance
     */
     init:function(){

        this._super();
        
		this.installEditPolicy( new draw2d.policy.figure.AntSelectionFeedbackPolicy() );
		this.setCanSnapToHelper(false);
		this.params = {
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  },

		};
		
		this.arrow = new draw2d.shape.basic.nodeArrow(30,20);
		this.add( this.arrow , new draw2d.layout.locator.XYRelPortLocator(0,100) );
		
		this.circle = new draw2d.shape.basic.Circle(10);
		this.arrow.add( this.circle , new draw2d.layout.locator.XYRelPortLocator(-62,90) );
		this.circle.setVisible(false);
		this.circle.setBackgroundColor( "#000000" );
		
		this.defaultValues = {label:"Simulation-Node"};
    	
    },
	beforeAdd:function(canvas)
	{
		var values = this.getUserData();
		console.log("set rotation");
		console.log(this.rotationAngle);
		
		this.setRotationAngle(this.rotationAngle);
		this.reallocateLabels();
		
		if( this.NAME == "draw2d.shape.analog.node" )
		{
			console.log(this.NAME);
			console.log("roation");
			console.log(this.rotation);	
		}
		
		/*
		if( this.rotation != 'no-rotation' )
		{
			var w = this.getWidth();
			var h = this.getHeight();
	
			if( this.defaultWidth != w )
			{
				this.setDimension( h , w );
				
				this.rotation = this.defaultRotation;
				this.rotate();
			}
			
			this.reallocateLabels();
		}
		*/

		if( values.formData.label )
		{
			if( typeof this.valueField != "undefined" )
			{
				var labelText = values.formData.label + " ( "+values.formData[this.valueField]+" )";
			}
			else
			{
				var labelText = values.formData.label;	
			}
			
			this.label.setText(labelText);
		}
		
		this.repaint();
	},

	setDefaultValues:function(elementIndex)
	{
		values = [];
		values['formData'] = this.defaultValues;
		
		if( typeof this.valueField != "undefined" )
		{
			var labelText = values['formData'].label+elementIndex+ " ( "+values['formData'][this.valueField]+" )";
		}
		else
		{
			var labelText = values['formData'].label+elementIndex;
		}
		
		values['formData'].label = values['formData'].label+elementIndex;
		
		values.elementIndex = elementIndex;
		
		this.setUserData(values);
		
		console.log(labelText);
		this.setText( labelText );
		this.repaint();	
	},
    onDragEnd:function( x, y, shiftKey, ctrlKey )
    {
    	var line = this.getLine();
    	
    	if( line != null )
    	{
    		this.circle.setVisible(true);	
    	}
    	else
    	{
    		this.circle.setVisible(false);	
    	}
    },
	onFormSubmit : function()
	{

	    this.width = 10+ this.label.text.length * 12;
	    this.createSet();
		this.repaint();
		
	},
    getSVG: function(){
    

        return '<svg version="1.1" s:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="'+(this.width+2)+'px" height="30px" style="fill:black;stroke:purple;stroke-width:1" ><rect x="0" y="1" fill="#FFFFFF" stroke="#000000" width="'+this.width+'" height="18.5"/><polygon points="24,20.25 4.667,29 8.417,20.25 " style="fill:black;stroke:purple;stroke-width:1"/></svg>';
    	this.setBackgroundColor("#000000");

    },
 		showForm:function()
	{
		var values = this.getUserData();

		console.log(values);
		$('#paramsForm').html('<form></form>');
		var thisObj = this;
		
		
		
		$('#paramsForm form').jsonForm({
			value: values,
			validate: true,
			schema: this.params ,
						  
			params: {
					"fieldHtmlClass": "form-control",
				  },
			"form": [
						"*",
						{
						  "type": "help",
						  "helpvalue": "<strong>Click on <em>Save Parameters</em></strong> when you're done"
						},
						{
						  "type": "submit",
						  "title": "Save Parameters"
						}
					],
			onSubmitValid: function (values) {
				// "values" follows the schema, yeepee!
				console.log(values);

				return false;
			  },
			onSubmit: function (errors, values) {
				
			  if (errors) {
			  console.log(errors);
				$('#res').html('<p>I beg your pardon?</p>');
			  }
			  else {
			  
			   values.label = values.label.replace(/\\n/g, "\\n")
			                                        .replace(/\\'/g, "\\'")
			                                        .replace(/\\"/g, '\\"')
			                                        .replace(/\\&/g, "\\&")
			                                        .replace(/\\r/g, "\\r")
			                                        .replace(/\\t/g, "\\t")
			                                        .replace(/\\b/g, "\\b")
			                                        .replace(/\\f/g, "\\f");
			  	console.log(values);
				thisObj.setUserData(values);
				thisObj.setText( values.label );
				
				thisObj.repaint();
				
				$('#res').html('<p>Hello ' + values.name + '.' +
				  (values.age ? '<br/>You are ' + values.age + '.' : '') +
				  '</p>');
				  
				  $.magnificPopup.close();
			  }
			  
			  return false;
			}
		});
		
		
		$.magnificPopup.open({
		  items: {src: '.popup-params',type:'inline'}
		  // You may add options here, they're exactly the same as for $.fn.magnificPopup call
		  // Note that some settings that rely on click event (like disableOn or midClick) will not work here\z
		}, 0);
		
	},

	beforeAdd:function(canvas)
	{
		var values = this.getUserData();

		if( values.formData.label )
		{
			if( typeof this.valueField != "undefined" )
			{
				var labelText = values.formData.label + " ( "+values.formData[this.valueField]+" )";
			}
			else
			{
				var labelText = values.formData.label;	
			}
			
			this.label.setText(labelText);
		}
		
		this.repaint();
	},

});


/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.shape.basic.Diamond
 * A Diamond Figure.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var d1 =  new draw2d.shape.basic.Diamond();
 *     var d2 =  new draw2d.shape.basic.Diamond();
 *     
 *     canvas.addFigure(d1,10,10);
 *     canvas.addFigure(d2,100,10);
 *     
 *     d2.setBackgroundColor("#f0f000");
 *     d2.setAlpha(0.7);
 *     d2.setDimension(100,60);
 *     
 *     canvas.setCurrentSelection(d2);
 *     
 * @author Andreas Herz
 * @extends draw2d.VectorFigure
 */
draw2d.shape.basic.nodeArrow = draw2d.VectorFigure.extend({
    NAME : "draw2d.shape.basic.nodeArrow",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     */
    init: function( width, height) {
      this._super(width, height);
    
      this.setBackgroundColor("#000000");
      this.setColor("#1B1B1B");
    },

    /**
     * @inheritdoc
     **/
    repaint : function(attributes)
    {
        if(this.repaintBlocked===true || this.shape===null){
            return this;
        } 
        
        attributes= attributes || {};
        
        var box = this.getBoundingBox();
	        var path = ["M",box.x, " ", box.y];         // Go to the top center..
        path.push("L", box.x+box.w, " ", box.y);   // ...bottom center...
        path.push("L", box.x-17, " ", box.y+box.h+3);          // ...left middle...
        path.push("L", box.x, " ", box.y);          // ...left middle...

        attributes.path = path.join("");

        this._super(attributes);
        
        return this;
    },


    /**
     * @method
     * Called by the framework. Don't call them manually.
     * 
     * @private
     **/
    createShapeElement:function()
    {
      // create dummy line
      return this.canvas.paper.path("M0 0L1 1");
    }
    
});