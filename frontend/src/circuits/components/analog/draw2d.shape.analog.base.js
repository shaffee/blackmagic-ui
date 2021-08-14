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

 draw2d.shape.analog.base = draw2d.SVGFigure.extend({

    NAME:"draw2d.shape.analog.base",
    params:null,
    // custom locator for the special design of the ResistorBridge Input area
    label:null,
    labelLocator:null,
    defaultWidth:'',
    defaultRotation:'',
    formSettings:'',
    defaultValues:'',
    type:'analog',
    form:[],
    elementIndex:0,

	onDoubleClick: function()
	 {
		 /* vuejs
    	if( circuitEditor.config.properties == 'side' && !simulating )
    	this.showForm();
		*/
    },

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
        this._super();
    
    	this.installEditPolicy( new draw2d.policy.canvas.CircuitsCloudSelectionPolicy() );

        
        this.params = {
          label: {
        	type: 'string',
        	title: 'name'
          }
          
        };
        
    	this.label =new draw2d.shape.basic.Label({text:''});
    	this.label.setStroke(0);

    	this.labelLocator = new draw2d.layout.locator.TopLocator(this);

    	this.add(this.label, this.labelLocator);
    	
    	this.form = [
						"*"
					];
					

		this.reallocateLabels();
		this.tooltip = null;
    },
	beforeAdd:function(canvas)
	{
		var values = this.getUserData();

		this.setRotationAngle(this.rotationAngle);
		this.reallocateLabels();


		if( values.formData.label )
		{
			var labelText;
			if( typeof this.valueField != "undefined" )
			{
				labelText = values.formData.label + " ( "+values.formData[this.valueField]+" )";
			}
			else
			{
				labelText = values.formData.label;	
			}
			
			this.label.setText(labelText);
		}
		
		this.repaint();
	},
	reallocateLabels:function()
	{
		
		if( this.rotationAngle == 0 || this.rotationAngle == 180 || this.rotationAngle == 360 )
    	{
			var _this = this;
			this.children.each(function(i,e){
				
				e.figure.setRotationAngle( 270 );
				
				e.locator = new draw2d.layout.locator.LeftLocator(_this);
				e.locator.relocate(i, e.figure);
			});
    	}
    	else
    	{
			_this = this;
			this.children.each(function(i,e){
				e.figure.setRotationAngle( 0 );
				e.locator = new draw2d.layout.locator.TopLocator(_this);
				e.locator.relocate(i, e.figure);
			});
    	}	
	},
	onMouseEnter : function()
	{
		if( window['simulating'] == 0 )
		return 0;
		
		var ports = this.getPorts();
		
		var node1Value = ports.get(0).getValue() ? ports.get(0).getValue() : 0 ;
	    var node2Value = ports.get(1).getValue() ? ports.get(1).getValue() : 0 ;
	    
	    var pol =  (Math.round( (node1Value-node2Value) * 1000 ) / 1000);
	    
	    /*
	    var str = pol + " V";
	    

		if( typeof this.voltageLabel == 'undefined' )
		{
			if( this.rotationAngle == 0 || this.rotationAngle == 180 || this.rotationAngle == 360 )
			{
	    		this.voltageLocator = new draw2d.layout.locator.RightLocator(this);
	    		this.arrowLocator = new draw2d.layout.locator.LeftLocator(this);

			}
			else
			{
	    		this.voltageLocator = new draw2d.layout.locator.BottomLocator(this);
	    		this.arrowLocator = new draw2d.layout.locator.TopLocator(this);
			}

	    	this.arrowShape =new draw2d.shape.basic.Label({text:'>>>'});
	    	this.voltageLabel =new draw2d.shape.basic.Label({text:'test'});
	    	this.label.setStroke(0);
	
	    	this.add(this.voltageLabel, this.voltageLocator);
	    	///this.add(this.arrowShape,this.arrowLocator);
		}
    	this.voltageLabel.setText(str);

		*/

		
		//this.arrowShape.setRotationAngle( 90 );
		//this.add( this.arrowShape , this.arrowLocator );
		

		
		if( ports.get(0).getX() != ports.get(1).getX() )
		{
			if(Math.abs(ports.get(0).getX()-ports.get(1).getX()) > 1)
			{
				if( pol < 0 )
				{
					//this.arrowShape.setRotationAngle(0);
					ports.get(1).currentDirection = "out";
					ports.get(0).currentDirection = "in";
				}
				else
				{
					//this.arrowShape.setRotationAngle(180);
					ports.get(1).currentDirection = "in";
					ports.get(0).currentDirection = "out";
				}

			}
			else // if( ports.get(1).getX() > ports.get(0).getX() )
			{
				if( pol < 0 )
				{
					//this.arrowShape.setRotationAngle(180);
					ports.get(1).currentDirection = "in";
					ports.get(0).currentDirection = "out";
				}
				else
				{
					//this.arrowShape.setRotationAngle(0);	
					ports.get(1).currentDirection = "out";
					ports.get(0).currentDirection = "in";
				}
			}
		}
		else
		{
			if(Math.abs(ports.get(0).getY()-ports.get(1).getY()) > 1)
			{
				if( pol < 0 )
				{
					//this.arrowShape.setRotationAngle(90);
					ports.get(1).currentDirection = "out";
					ports.get(0).currentDirection = "in";
				}
				else
				{
					//this.arrowShape.setRotationAngle(270);
					ports.get(1).currentDirection = "in";
					ports.get(0).currentDirection = "out";
				}

			}
			else // if( ports.get(1).getY() > ports.get(0).getY() )
			{
				if( pol < 0 )
				{
					//this.arrowShape.setRotationAngle(270);
					ports.get(1).currentDirection = "in";
					ports.get(0).currentDirection = "out";
				}
				else
				{
					//this.arrowShape.setRotationAngle(90);
					ports.get(1).currentDirection = "out";
					ports.get(0).currentDirection = "in";	
				}
			}
		}

		ports.get(1).getConnections().each( function( index , conn ){
			
			if( conn.targetPort.id == ports.get(1).id )
			{
				if( ports.get(1).currentDirection == "in" )
				{
					conn.currentDirection = "target to source";	
				}
				else
				{
					conn.currentDirection = "source to target";	
				}
			}
			else
			{
				if( ports.get(1).currentDirection == "in" )
				{
					conn.currentDirection = "source to target";	
				}
				else
				{
					conn.currentDirection = "target to source";	
				}
			}
			
		});

		ports.get(0).getConnections().each( function( index , conn ){
			
			if( conn.targetPort.id == ports.get(0).id )
			{
				if( ports.get(0).currentDirection == "in" )
				{
					conn.currentDirection = "target to source";	
				}
				else
				{
					conn.currentDirection = "source to target";	
				}
			}
			else
			{
				if( ports.get(0).currentDirection == "in" )
				{
					conn.currentDirection = "source to target";	
				}
				else
				{
					conn.currentDirection = "target to source";	
				}
			}
			
		});
		//this.add(this.arrowShape,this.arrowLocator);
		//this.reallocateLabels();
		
		/*
		var ports = this.getPorts();
		
		var node1Value = ports.get(0).getValue() ? ports.get(0).getValue() : 0 ;
	    var node2Value = ports.get(1).getValue() ? ports.get(1).getValue() : 0 ;
	    	    
	    console.log( node1Value + " <=> " + node2Value );
	    if( node1Value > node2Value )
	    {
	    	var str = (Math.round( (node1Value-node2Value) * 1000 ) / 1000) + " V";
	    }
	    else
	    {
	    	var str = (Math.round( (node2Value-node1Value) * 1000 ) / 1000)+" V";
	    }
	   	
	   	$("#voltageRow").html( str );
	   	*/


	},
	onMouseLeave : function()
	{
        //this.hideTooltip();
        
        //if( this.voltageLabel )
        //this.remove(this.voltageLabel);
	},
    
	onContextMenu:function(x,y){
		 
		var menuItems;
		 if( this.rotation != "no-rotation" )
		 {
			 menuItems = {
		             "editparams":    {name: "Edit Parameters", icon: "edit"},
		             "Rotate_cw":    {name: "Rotate [CW]", icon: "rotate_cw"},
		             "Rotate_ccw":    {name: "Rotate [CCW]", icon: "rotate_ccw"},
		             "sep1":   "---------",
		             "delete": {name: "Delete", icon: "delete"},
		         };
		 }
		 else
		 {
			 menuItems = {
		             "editparams":    {name: "Edit Parameters", icon: "edit"},
		             "sep1":   "---------",
		             "delete": {name: "Delete", icon: "delete"},
		         };
		 }
		
		 /* vuejs
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
	            
	            case 'Rotate_cw':
	            	this.rotate(90);
	            	break;
	            case 'Rotate_ccw':
	            	this.rotate(-90);
	            	break;
	            case "delete":
	                // without undo/redo support
	           		//this.getCanvas().remove(this);
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
		 */
	},
	rotate:function(angel)
	{
		
		var r = this.rotationAngle;
		var newAngel = (r+angel)%360;
		
		if( newAngel < 0 )
		newAngel = 360 + newAngel;
		
		console.log(newAngel);
	    this.setRotationAngle( newAngel );
	    
	    this.label.setRotationAngle(newAngel);
	    
    	this.reallocateLabels();
    	this.setDimension(this.getHeight(),this.getWidth());

	},
	
	//By Shaffee Mayoof
	onParamsChanged:function(values)
	{
		
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
	setDefaultValues:function(elementIndex)
	{
		var values = [];
		var labelText;
		values['formData'] = this.defaultValues;
		
		if( typeof this.valueField != "undefined" )
		{
			labelText = values['formData'].label+elementIndex+ " ( "+values['formData'][this.valueField]+" )";
		}
		else
		{
			labelText = values['formData'].label+elementIndex;
		}
		
		values['formData'].label = values['formData'].label+elementIndex;
		
		values.elementIndex = elementIndex;
		
		this.setUserData(values);
		
		console.log(labelText);
		this.label.setText( labelText );
		this.repaint();	
	},
	onFormSubmit : function()
	{
		
	},
	showForm:function(selectedValues)
	{
		
		if( typeof selectedValues != 'undefined' )
		{
			console.log(typeof selectedValues['formData']);
			
			if( typeof selectedValues['formData'] == 'undefined' ) selectedValues['formData'] = [];
			
			values = selectedValues;
		}
		else
		{
			console.log(this.defaultValues);
			
			var values = this.updateValues();
		}
		
		//$("#paramsForm").hide();
		/* vuejs
		if( circuitEditor.config.properties == 'side' )
		{
			$("#peropertiesPanel").html( $("#editProperties").html() );
			
			loadHelp(this.NAME);
			var propObj = $("#peropertiesPanel");
			
			w2ui['layout'].show('right',true);

		}
		else
		{
			$('#paramsForm').html('<form></form>');
			
			var propObj = $("#paramsForm");
		}

		
		var thisObj = this;
		
		_this = this;
		
		propObj.find("form").jsonForm({
			value: values['formData'],
			validate: true,
			schema: this.params ,
			params: {
					"fieldHtmlClass": "form-control",
				  },
			"form": this.form,
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
			  	
			  	data = thisObj.getUserData();
			    data.saved = 'saved';
				data['formData'] = values;
				
				if( typeof _this.valueField != "undefined" )
				{
					var labelText = values.label + " ( "+values[_this.valueField]+" )";
				}
				else
				{
					var labelText = values.label;
				}
				
				thisObj.setUserData(data);
				thisObj.label.setText( labelText );
				thisObj.repaint();
				
				thisObj.onFormSubmit();
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
		
		
		if( circuitEditor.config.properties == 'side' )
		{

		}
		else
		{
			$.magnificPopup.open({
			  items: {src: '.popup-params',type:'inline'}
			  // You may add options here, they're exactly the same as for $.fn.magnificPopup call
			  // Note that some settings that rely on click event (like disableOn or midClick) will not work here\z
			}, 0);
		}

		*/
	},
	
});