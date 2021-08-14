import draw2d from 'draw2d'

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
draw2d.shape.analog.digital = draw2d.SVGFigure.extend({

    NAME:"draw2d.shape.analog.digital",
    params:null,
    // custom locator for the special design of the ResistorBridge Input area
    label:null,
    labelLocator:null,
    defaultWidth:'',
    type:'digital',
    defaultRotation:'',
	simulations : ['digital'],
	finaleq:'',
	char_eq:'ZYXWVUTSRQPONMLKJIHGFEDCBA',
	char_i:0,
	allFigures:[],
	findEq: function()
	{
		/*----------	Created By Wael Dawood ---------
							25/08/2016
		----------------------------------------------*/
					
		this.loopback = false;
		
		if(typeof this.operation!='undefined')		// if the selected figure is a gate get the EQ;
			{
				this.char_eq='ZYXWVUTSRQPONMLKJIHGFEDCBA'; // reset char 
				this.finalEqs='';// reset eq
				this.char_i=0;//reset i's
				this.newEq(this);
				this.finalEq = `<div class="input-group" style="width:40%">
    <input type="text" class="form-control"
        value="`+this.finalEq+`" placeholder="Some path" id="copy-input">
    <span class="input-group-btn">
      <button class="btn btn-default" type="button" id="copy-button"
          data-toggle="tooltip" data-placement="button"
          title="Copy to Clipboard">
        Copy
      </button>
    </span>
  </div>`;
				
			}
		else
			{
				this.finalEq ='';
			}
		
		/*
		$("#statusBar").html(this.finalEq ); // print the equation
		
		  $('#copy-button').bind('click', function() {
		    var input = document.querySelector('#copy-input');
		    input.setSelectionRange(0, input.value.length + 1);
		    try {
		      var success = document.execCommand('copy');
		      if (success) {
		        $('#copy-button').trigger('copied', ['Copied!']);
		      } else {
		        $('#copy-button').trigger('copied', ['Copy with Ctrl-c']);
		      }
		    } catch (err) {
		      $('#copy-button').trigger('copied', ['Copy with Ctrl-c']);
		    }
		  });
		*/

		/*						Simplify equations						
		var inputs = [ "A", "B","C","D","E","F","G","H","I","J"];
		this.finalEq = this.finalEq + " , Simplify = "+ qm.simplify(inputs, this.finalEq );
		*/
	},
	onClick:function(){
		console.log("clicked");
	},
	newEq: function(getSrc)
	{
		var _this = this;
		
		if( typeof this.allFigures[getSrc.id] != 'undefined' || this.loopback == true )
		{
			this.finalEq = "This circuit not supported yet";
			this.loopback = true;
			return 0;
		}
		

		this.allFigures[getSrc.id] = 1;
		
		var equation = [];
		equation.length=0;
		
		//		loop on all ports connected to the selected gate				
		getSrc.getPorts(0).data.forEach(function(Src,index)
		{
			if(Src.cssClass == "draw2d_InputPort")	//	choose only inputs		
			{
				if(typeof Src.getConnections().get(0) != 'undefined' )
				{
					if(typeof Src.getConnections().get(0).getSource()!= 'undefined')// if there is a connection to that gate
					{	
							if(typeof Src.getConnections().get(0).getSource().getParent().operation!='undefined')
							{
								var myEquation = _this.newEq( Src.getConnections().get(0).getSource().getParent() ) ;
								var id = getSrc.id;
							}
							else
							{
								if(_this.char_eq.length>0)
								{
									
									Src.portName = _this.char_eq[_this.char_eq.length-1];		//chose last character in the array
									_this.char_eq = _this.char_eq.substring(0, _this.char_eq.length - 1);// remove last char from the array;
								}
								else
								{
									_this.char_i++;
									Src.portName = 'i' +_this.char_i;
								}
								
							}
						

					}
				}
				else	// no gate connected to the input port
				{
					if(_this.char_eq.length>0)
					{
						
						Src.portName = _this.char_eq[_this.char_eq.length-1];		//chose last character in the array
						_this.char_eq = _this.char_eq.substring(0, _this.char_eq.length - 1);// remove last char from the array;
					}
					else
					{
						_this.char_i++;
						Src.portName = 'i' +_this.char_i;
					}
				}

				
			}	
		});
		
		
		getSrc.getPorts(0).data.forEach(function(Src,index)
		{
			if(_this.loopback == true )
						{
							return 0;
						}

			if(Src.cssClass == "draw2d_InputPort")
			{
				if( typeof Src.equation != 'undefined' && typeof Src.getConnections().get(0) != 'undefined' && typeof Src.getConnections().get(0).getSource()!= 'undefined' )
				{
					equation.push(Src.equation);
				}
				else
				{
					equation.push(Src.portName);
					
					if( typeof Src.label != 'undefined' )
					{
		    			getSrc.remove(Src.label);
					}
					
					Src.label = new draw2d.shape.basic.Label({text:Src.portName});
	    			Src.label.setStroke(0);
	    			getSrc.add(Src.label,new draw2d.layout.locator.Locator());
		    		Src.label.setPosition({x:Src.x+20,y:Src.y-10});
				}
				

			}	
			
		});
		
		
		
				//						equation					
		var finalEq ;
		
		if(getSrc.operation=="*") // inverter
		{
			finalEq = "("+equation.join("") + "*)";
		}
		else
		{
			finalEq = "("+equation.join(" "+getSrc.operation+" ") + ")";
		}
		
		
		if(typeof getSrc.output.getConnections().get(0) != 'undefined' )
		{
			getSrc.output.getConnections().data.forEach(function(conn,index)
			{
				conn.getTarget().equation = finalEq;
			});
		}

		
		if( this.loopback == false )
		this.finalEq = finalEq;
		
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

		var values = this.getUserData();

    	this.label =new draw2d.shape.basic.Label({text:'', x:40, y:10});
    	this.label.setStroke(0);

    	this.labelLocator = new draw2d.layout.locator.TopLocator(this);

    	this.add(this.label, this.labelLocator);
    	
    	this.developerName = "Shaffee Mayoof";
    	this.developerFile = "shaffee";
    	
    	
    	this.defaultValues = {'label':''};

    	
    },
	beforeAdd:function(canvas)
	{
		var values = this.getUserData();
		//console.log("set rotation");
		//console.log(this.rotationAngle);
		
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
		
	},
	reallocateLabels:function()
	{
		
		if( this.rotationAngle == 0 || this.rotationAngle == 180 || this.rotationAngle == 360 )
    	{
    		var _this = this;
			this.children.each(function(i,e){
				
				if( e.figure.fixed != "fixed" )
				{
					e.figure.setRotationAngle( 0 );
					e.locator = new draw2d.layout.locator.TopLocator(_this);
					e.locator.relocate(i, e.figure);
				}
			});
			
    	}
    	else
    	{

			_this = this;
			this.children.each(function(i,e){
				if( e.figure.fixed != "fixed" )
				{
					e.figure.setRotationAngle( 270 );
					
					e.locator = new draw2d.layout.locator.LeftLocator(_this);
					e.locator.relocate(i, e.figure);
				}
			});
    	}	
	},
	onContextMenu:function(x,y){
		
		console.log("x position");
		console.log(x);
		/*
		var myMenu;
		myMenu = new dhtmlXMenuObject();	
		myMenu.renderAsContextMenu();
		
		myMenu.loadStruct([{id: "editparams", text: "Edit Parameters",icon: "edit"},{id: "rotate", text: "Rotate", icon: "rotate"},{id: "delete", text: "Delete", icon: "delete"}]);
		myMenu.setIconsPath(siteUrl+'/js/'+version+'/images/');

				
		
		myMenu.showContextMenu( app.view.getAbsoluteX()+x , app.view.getAbsoluteY()+y );
		
		thisObj = this;
		myMenu.attachEvent( 'onClick' , function(id,zoneId,cas){
			
			if( id == 'editparams' )
			{
				thisObj.showForm();
			}
			else if( id == 'rotate' )
			{
				thisObj.rotate();
			}
			else if( id == 'delete' )
			{
                var cmd = new draw2d.command.CommandDelete(thisObj);
                thisObj.getCanvas().getCommandStack().execute(cmd);
			}
		});
		*/
		

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
	onSelect(){
		alert(1);
	},
	updateValues:function()
	{
		var values = this.getUserData();

		
		if( typeof values['formData'] == 'undefined' )
	    {
	    	values['formData'] = this.defaultValues;

	    	this.setUserData(values);
	    }
		
		return values;
	},
	showForm:function()
	{
		console.log("show form");
		/*
		var data = this.updateValues();
		var thisObj = this;
		
		var values = thisObj.getUserData();

		
		if( typeof values['formData'] == 'undefined' )
		{
			values['formData'] = [];
		}
		
		var form	=	propertiesPanel.attachForm([
														{value:values['formData']['label'],type: "input", name: 'label', label: '' , placeholder: "Please enter your email"},
													]);
													
		
		form.attachEvent("onKeyup", function(inp, ev, name){
		    values['formData'][name] = $(inp).val();
			thisObj.setUserData(values);
			thisObj.label.setText( $(inp).val() );
			thisObj.repaint();
		});
		
		propertiesPanel.expand();
		*/
		
	},
});