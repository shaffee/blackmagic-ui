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
draw2d.shape.analog.digital = draw2d.SVGFigure.extend({

    NAME:"draw2d.shape.analog.digital",
    params:null,
    // custom locator for the special design of the ResistorBridge Input area
    label:null,
    labelLocator:null,
    defaultWidth:'',
    defaultRotation:'',
    onDoubleClick: function(){
    	
    } ,
    setCenter: function()
	{
	
	},
   /**
     * @constructor
     * Create a new instance
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init:function(attr){
        this._super($.extend({width:90,height:64,stroke:0},attr));
    
    	this.installEditPolicy( new draw2d.policy.figure.AntSelectionFeedbackPolicy() );

        
        this.params = {
          label: {
        	type: 'string',
        	title: 'name',
        	required: true
          }
          
        };
        
    	this.label =new draw2d.shape.basic.Label({text:'', x:40, y:10});
    	this.label.setStroke(0);

    	this.labelLocator = new draw2d.layout.locator.TopLocator(this);

    	this.add(this.label, this.labelLocator);
    	console.log("parent");

    },
	beforeAdd:function(canvas)
	{
		var values = this.getUserData();
		
		var w = this.getWidth();
		var h = this.getHeight();

		if( this.defaultWidth != w )
		{
			this.setDimension( h , w );

			this.rotation = this.defaultRotation;
			this.rotate();
		}
		
		if( values.label )
		this.label.setText(values.label);
		
		this.repaint();
	},
	onContextMenu:function(x,y){
		 
		 
		 if( this.rotation != "" )
		 {
			 var menuItems = {
		             "editparams":    {name: "Edit Parameters", icon: "edit"},
		             "rotate":    {name: "Rotate", icon: "rotate"},
		             "sep1":   "---------",
		             "delete": {name: "Delete", icon: "delete"},
		         };
		 }
		 else
		 {
			 var menuItems = {
		             "editparams":    {name: "Edit Parameters", icon: "edit"},
		             "sep1":   "---------",
		             "delete": {name: "Delete", icon: "delete"},
		         };
		 }
	         
	     $.contextMenu({
	         selector: 'body', 
	         events:
	         {  
	             hide:function(){ $.contextMenu( 'destroy' ); }
	         },
	         callback: $.proxy(function(key, options) 
	         {
	            switch(key){
	            case "editparams":
	                this.showForm();
	                break;
	            
	            case 'rotate':
	            	this.rotate();
	            	break;
	            case "delete":
	                // without undo/redo support
	           		//this.getCanvas().removeFigure(this);
	                // with undo/redo support
	                var cmd = new draw2d.command.CommandDelete(this);
	                this.getCanvas().getCommandStack().execute(cmd);
	            default:
	                break;
	            }
	         
	         },this),
	         x:x,
	         y:y,
	         items: menuItems
	         
	     });
	},
	rotate:function()
	{

	    if( this.rotation == 'v' )
    	{
	    	this.setRotationAngle( 90 );
	    	this.rotation = 'h';
	    	
    	}
    	else
    	{
	    	this.setRotationAngle( 0 );
	    	this.rotation = 'v';
    	}	
    	
    	this.setDimension(this.getHeight(),this.getWidth());

	},
	
	//By Shaffee Mayoof
	onParamsChanged:function(values)
	{
		
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
						  "helpvalue": "<strong>Click on <em>Submit</em></strong> when you're done"
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
				thisObj.setUserData(values);
				thisObj.label.setText( values.label );
				thisObj.repaint();
				//console.log(thisObj.labelLocator);
				//thisObj.labelLocator = new draw2d.layout.locator.CenterLocator(thisObj);
				//loc.setParent(thisObj);
				//thisObj.label.setPosition(100,100);
				
				thisObj.onParamsChanged(values);
				console.log(values);
				//this.parent().parent().parent().setUserData(values);
				
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
});