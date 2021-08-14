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
var mcuNacl = 0;
var mcuObject = null;

draw2d.shape.mcu = draw2d.shape.basic.Rectangle.extend({

    NAME:"draw2d.shape.mcu",
    params:null,
    // custom locator for the special design of the ResistorBridge Input area
   label:null,
   labelLocator:null,
   pins:null,
   pinsCount:0,
   type:'MCU',
   diagramFile : '',
   intervalReference : null,
   fn : null,
   asm : {},
   prevLine:0,
   mcuModule : null,
   emulator : true,
   max:0,
   handleMessage: null,
   portSpacing:32,
   datasheet:'',
   diagramFile:'',
   speeds: ["4"],
   layout : "original",
   prevValues : {},
   pinsPositions : {},
    onDoubleClick: function(){    	
    	$("#mcuName").html("PIC");
    	
    	app.mcuLayout(this.id);
    	
    	if( this.diagramFile != "" )
    	{
    		$("#mcuLayout #diagram").html( "<img width=\"100%\" src=\""+siteUrl+"/myapp/diagrams/pic/"+this.diagramFile+"\" />" );
    	}
    },
	updateValues:function()
	{
		var values = this.getUserData();
		
		//console.log("data inspect");
		//console.log(typeof values['formData']);
		
		
		if( typeof values['formData'] == 'undefined' )
	    {
	    	//console.log("load defaults");
	    	values['formData'] = this.defaultValues;
	    	//console.log(values);
	    	//this.defaultValues = '';
	    	this.setUserData(values);	
	    }
		
		return values;
	},
	run : function()
    {
			this.disassemble(1);
			
			return 0;
    },
    setPinValue: function( pin , val )
    {
	    //var map = { 12:7 , 11:6 , 10:5 , 9:4 , 8:3 , 7:2 , 6:1 , 5:0 };

   		//var pin = map[relatedPort.getName()];
   		pin = pin+"";
   		var command = {"type":"setPin","pin":pin,"value":val};
   		//console.log(command);
   		
   		
   		if( mcuNacl != 0 )
   		mcuNacl.postMessage( command );

    },
    stopMcu : function()
    {
		if( typeof editor != 'undefined' )
		{
			try
			{			
				editor.setOption("readOnly", false);
				cpu.PC = 0;
			}
			catch(err)
			{
				
			}
		}
		
    	//clearInterval( this.intervalReference );
    	
    	mcuNacl.postMessage("stop");
    },
    disassemble : function(start)
    {
 			var values = this.getUserData();
    		var thiso = this;

        	$.ajax({
			  dataType: "json",
			  url: siteUrl+'/compiler/disassemble',
			  method:"post",
			  data:{hex:values['hex']},
			  success: function(data)
			  {
			  		var length = Object.keys(data).pop();
			  		
			  		var i =0;
					var editorContent = "";
					

			  		for( i=1; i<=length; i++ ) 
			  		{
			  			editorContent += "\n\r";
			  		}

					if( typeof assemblyEditor != 'undefined' )
					assemblyEditor.setValue(editorContent);


				  	$.each( data, function( key, val ) {

				  		if( mcuNacl != 0 )
				  		{
				  			//console.log("Sending assembly line");
				  			//console.log(val);
				  			mcuNacl.postMessage(val);
				  		}
				  		
  						var instruction = val.instruction + " " + val.op1 + "," + val.op2;
	  					
	  					if(  typeof assemblyEditor != 'undefined' )
				  		assemblyEditor.replaceRange( instruction , {line:key,ch:0} );
					});	
					
					
					if( start ) mcuNacl.postMessage("start");
					
					app.view.getFigures().each( function(index,figure){
				
						if( figure.cssClass == "draw2d_shape_analog_toggleInput" )
						{
							figure.afterAdd();
						}
					});
			  }
			});	
    },
    setPortValue : function( data )
    {
    	//console.log(data);
    	data.value = parseInt(data.value, 10).toString(2);
    	data.value = data.value.length >= 8 ? data.value : new Array( 8 - data.value.length + 1).join("0") + data.value;
	    data.value = data.value.split("").reverse().join("");
	    
    	data.mask = parseInt(data.mask, 10).toString(2);

    	data.mask = data.mask.length >= 8 ? data.mask : new Array( 8 - data.mask.length + 1).join("0") + data.mask;
        

		        
        if( String.fromCharCode(data.port) == "E" )
        {
        	var map = this.maps['porte'];
        }
        else if( String.fromCharCode(data.port) == "D" )
        {
        	var map = this.maps['portd'];
        }
        else if( String.fromCharCode(data.port) == "C" )
        {
        	var map = this.maps['portc'];
        }
        else if( String.fromCharCode(data.port) == "B" )
        {
        	var map = this.maps['portb'];
        }
        else if( String.fromCharCode(data.port) == "A" )
        {
        	var map = this.maps['porta'];
        }
		
		//console.log(map);
		
		if( typeof map == 'undefined' )
		{
			//console.log("Map not defined");
			return 0;	
		}
		
    	var ports = this.getPorts();
	    var _this = this; 
	    
	    $.each( map , function( index, value ) {

    		if( data.mask[index] == "0" || data.mask == "0" )
    		{
    			//console.log("setting port value");
    			//console.log(data.value[index]);
	    		_this.getPort("pin"+map[index]).setValue(data.value[index]);
	    		
	    		_this.getPort("pin"+map[index]).direction = "out";
    		}
    		else
    		{
	    		_this.getPort("pin"+map[index]).direction = "in";
    		}
   		});
   		
    },
    leftPortsLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },
        relocate:function(index, figure){
            var w = figure.parent.getWidth();
            var h = figure.parent.getHeight();
            
            figure.setPosition(0.5, figure.parent.portSpacing*index);
        }
    }),
    rightPortsLocator : draw2d.layout.locator.Locator.extend({
        init:function( ){
          this._super();
        },
        relocate:function(index, figure){
            var w = figure.parent.getWidth();
            var h = figure.parent.getHeight();
	        //console.log("index : "+index);
			index = (this.parent.pinsCount/2)-(index-this.parent.pinsCount/2)-1;
			
            figure.setPosition(w, figure.parent.portSpacing*index);
        }
    }),
    onPortValueChanged: function(relatedPort){
   		//console.log(relatedPort);
    },
    
    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        this._super();
        
        
        
        this.addCssClass("chip-ic");
        
		//this.pinsCount = 10;

        this.setBackgroundColor("#333333");
        //this.setColor(this.DEFAULT_COLOR.darker());

		//values = this.getUserData();
		//this.portName = values.label;
		
		this.label =new draw2d.shape.basic.Label('TIMER 555');
		this.label.setStroke(0);
		this.label.setRotationAngle(90);
		this.label.setFontSize(20);
        this.label.addCssClass("chip-label");
        this.label.setFontColor("#f2f2f2");

		this.labelLocator = new draw2d.layout.locator.CenterLocator(this);

		this.addFigure(this.label, this.labelLocator);

        this.setStroke(2);
        
        this.params = {
          label: {
        	type: 'string',
        	title: 'Label',
        	
          },
          speed: {
		      "title": "Speed",
		      "type": "string",
		      
		      "enum": this.speeds
		    }
		  ,compiler: {
		      "title": "Compiler",
		      "type": "string",
		      
		      "enum": ["mikroc-compiler","xc-compiler" /*, "Assembly" */]
		    }
        };

        leftLocator = new this.leftPortsLocator();
        leftLocator.parent = this;
        
        rightLocator = new this.rightPortsLocator();
        rightLocator.parent = this;
        
        var _this = this;
        height = 0;
        
        if( this.layout == "original" )
        {
	        for(var i=0; i < this.pinsCount/2; i++)
	        {
		 		var label = new draw2d.shape.basic.Label({text:"A"});
				label.setStroke(0);
				label.setFontSize(12);
		        label.addCssClass("chip-label");
		        label.setFontColor("#ffffff");

				this.add(label,new draw2d.layout.locator.Locator( ));

				label.setPosition({x:10,y:(i*this.portSpacing)});
				var temp = this.createPort("hybrid",leftLocator);

				var pin = "pin"+(i+1);
				temp.setName(pin); 
				
				if( (i*this.portSpacing) > height ) ;	
	        }

	        for(var i2=0; i2 < this.pinsCount/2; i2++)
	        {
				var temp = this.createPort("hybrid",rightLocator);  
				var pin = "pin"+(i2+(this.pinsCount/2+1));

				temp.setName(pin);      	
	        }
	        
	        
	        height = Math.max(i,i2)*this.portSpacing;
        }
        else if ( this.layout == "vertical" )
        {
	        var i = 1;
			$.each( _this.pinsPositions.right, function( key, value )
			{
				 
				 $.each( value, function( key2, value2 )
				 {

				 		var label =new draw2d.shape.basic.Label({text:(key+ "" + key2)});
						label.setStroke(0);
						label.setFontSize(12);
				        label.setFontColor("#ffffff");
								
						_this.add(label,new draw2d.layout.locator.Locator( ));
						
						label.setPosition({x:115,y:(i*_this.portSpacing)-12});
						var temp = _this.createPort("hybrid",new draw2d.layout.locator.XYAbsPortLocator( 150, i*_this.portSpacing ));
						
						var pin = "pin"+value2;
						temp.setName(pin); 	
												
						i++;
				 });
				 
				 i+=2;
				 
			});	
			
			i--;
			
			i2 = 1
			$.each( _this.pinsPositions.left, function( key, value )
			{
				 $.each( value, function( key2, value2 )
				 {
						
				 		var label =new draw2d.shape.basic.Label({text:(key+ "" + key2)});
						label.setStroke(0);
						label.setFontSize(12);
				        label.setFontColor("#ffffff");
								
						_this.add(label,new draw2d.layout.locator.Locator( ));
						
						label.setPosition({x:15,y:(i2*_this.portSpacing)-12});
						var temp = _this.createPort("hybrid",new draw2d.layout.locator.XYAbsPortLocator( 0, i2*_this.portSpacing ));
						var pin = "pin"+value2;
						temp.setName(pin); 	
						i2++;
				 });
				 
				 i2+=2;
			});	
			i2--;
			
	        height = Math.max(i,i2)*this.portSpacing;

        }
        
        this.setDimension(150, height);

        this.installEditPolicy( new draw2d.policy.figure.AntSelectionFeedbackPolicy() );
        sss = _this = this;
	    $("#runButton button").prop("disabled",true);     

		$.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()); 
		
		if(!$.browser.chrome){
			
			//alert("MCU Emulation not supported only in chrome browsers");
			
			$('#runButton button').popover('show');		
		}


		var moduleDidLoad = function () {
		  console.log("MCU Loaded");
		  
		  $("#runButton button").prop("disabled",false);
	      mcuNacl = _this.mcuModule = document.getElementById('nacl_module');
	      	
	      	
	      	var setPins = {type:"setMcu",pins:""+sss.pinsCount};
	      	mcuNacl.postMessage(setPins);
	      	
	        $("#start").click(function(){
  				mcuNacl.postMessage("start");
		  	});
		  	
		  	$("#stop").click(function(){
		  		mcuNacl.postMessage("stop");
		  		mcuNacl.postMessage("step");
		  	});
		  	
		  	$("#step").click(function(){
		  		mcuNacl.postMessage("step");
		  	});
		  	
		  	$("#steps").click(function(){
		  		mcuNacl.postMessage("steps");
		  	});
	      
	    }
	    
	    mcuObject = this;
	    
	    this.handleMessage = function (message_event) {
	    	
	      //console.log(message_event);
	      //console.log(message_event.data);
	      if( message_event.data.cmd == "port" )
	      {
	      	//console.log("port changed");
	      	//console.log(message_event.data);
	      	
	      	sss.setPortValue({value:message_event.data.value,mask:message_event.data.mask,port:message_event.data.port});

	      }
	      else if( message_event.data.type == 'instruction' )
		  {
		  		//console.log(message_event.data);
		  		
			  	if( parseInt(message_event.data.PC) > parseInt(mcuObject.max) ) mcuObject.max = message_event.data.PC;
			  	
		  		var instruction = message_event.data.instruction + " " + message_event.data.op1 + "," + message_event.data.op2;
		  		mcuObject.asm[message_event.data.PC] = instruction;
		  		
		  }
		  else if( message_event.data.type == 'debug' )
		  {
		  		//console.log(message_event.data);
		  		$("#W-dec").html( message_event.data.W );
		  		$("#W-binary").html( pad( parseInt(message_event.data.W, 10).toString(2) , 8 ) );

		  		$("#cpu-cycles").html( message_event.data.cycles );

		  		$("#status-dec").html( message_event.data.STATUS );
		  		$("#status-binary").html( pad( parseInt(message_event.data.STATUS, 10).toString(2) , 8 ) );
		  		
		  		$("#C").html( message_event.data.C );
		  		//console.log(parseInt(prevLine));
		  		
		  		if( typeof assemblyEditor != 'undefined' )
		  		{
					assemblyEditor.addLineClass( parseInt(message_event.data.PC), '' , 'selectedLine' );
					assemblyEditor.removeLineClass( parseInt(mcuObject.prevLine) , '' , 'selectedLine' );
		  		}
		  		
				mcuObject.prevLine = message_event.data.PC;
				
				$("#mcuRAM").html('<table class="table table-bordered table-condensed table-striped">');
				jQuery.each( message_event.data.RAM , function( index , val ){
					
					if( typeof val != 'undefined' )
					$("#mcuRAM>table").append("<tr><td width='50px'>"+index+"</td><td>"+val+"</td><td>"+pad( parseInt(val, 10).toString(2) , 8 )+"</td></tr>");
					
				});
				
				$("#ram").append("</table>");
				
				//console.log(message_event.data);
		  }
	      else
	      {
	      		//console.log(message_event.data);
	      }
	    }

        //Loading the nacl module
        var listener = document.getElementById('listener');
        listener.addEventListener('load', moduleDidLoad, true);
        listener.addEventListener('message', this.handleMessage, true);
	    //listener.addEventListener('error', handleError, true);
	    //listener.addEventListener('crash', handleCrash, true);
    	    	
	    var moduleEl = document.createElement('embed');
	    moduleEl.setAttribute('name', 'mcu-module');
	    moduleEl.setAttribute('id', 'nacl_module');
	    moduleEl.setAttribute('width', 0);
	    moduleEl.setAttribute('height', 0);
	    moduleEl.setAttribute('src', siteUrl+'/js/'+version+'/pic-emulator.nmf');
    	
    	moduleEl.setAttribute('type', "application/x-pnacl");
		
		listener.appendChild(moduleEl);

    },
    
    afterAdd : function(canvas)
    {
    	this.disassemble(0);
    },
	beforeAdd:function(canvas)
	{
		var values = this.getUserData();

		
		if( values.formData.label != '' )
		{
			console.log('changing value');
			if( typeof this.valueField != "undefined" )
			{
				var labelText = values.formData.label + " ( "+values.formData[this.valueField]+" )";
			}
			else
			{
				var labelText = values.formData.label;
				
				console.log(labelText);
			}
			
			this.label.setText(labelText);
		}
		
		this.repaint();
		this.onParamsChanged(values);

	},
	onContextMenu:function(x,y){
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
	         items: 
	         {
	             "editparams":    {name: "Edit Parameters", icon: "edit"},
	             "sep1":   "---------",
	             "delete": {name: "Delete", icon: "delete"},
	         }
	     });
	},
	
	showForm:function()
	{
		
		if( typeof selectedValues != 'undefined' )
		{			
			if( typeof selectedValues['formData'] == 'undefined' ) selectedValues['formData'] = [];
			
			values = selectedValues;
		}
		else
		{			
			var values = this.updateValues();
		}
		
		var values = this.getUserData();

		$('#paramsForm').html('<form></form>');
		var thisObj = this;
				
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
		
		propObj.find("form").jsonForm({
			
			value: values['formData'],
			validate: true,
			schema: this.params ,
			autoSubmit : true,		  
			params: {
					"fieldHtmlClass": "form-control",
					
				  },
			"form": [
						{
							"key":"label",	
							"onKeyUp": function(){ console.log("test"); },
							readonly : true,
						},

						{
						  "key": "speed",
						},
						{
						  "key": "compiler",
						  "titleMap": {
					        "xc-compiler": "MPLAB XC Compiler",
					        "mikroc-compiler": "Mikroc Compiler",
					      },
					      
						  "onChange": function (evt) {
					        var value = $(evt.target).val();
					        
					        
					        var p = $('#peropertiesPanel [name="compiler"]').parent();
					        
					        if( value == 'xc-compiler' )
					        {
					        	var img = publicUrl + '/images/xc-compiler.png';
					        	
					        	$('#peropertiesPanel [name="speed"]').attr("disabled","disabled");
					        }
					        else //MicroC Compiler //default compiler
					        {
					        	var img = publicUrl + '/images/mikroc-compiler.png';
					        }
					        
					        if( p.find("img").length == 0 )
					        {
					        	p.append("<img src='"+img+"' />");	
					        }
					        else
					        {
					        	console.log(img);
					        	p.find("img").first().attr("src",img);
					        }
					        
					      },
					      "onInsert": function (evt) {

					        var p = $('#peropertiesPanel [name="compiler"]').parent();
					        
					        if( values['formData']['compiler'] == 'xc-compiler' )
					        {
					        	var img = publicUrl + '/images/xc-compiler.png';
					        	$('#peropertiesPanel [name="speed"]').attr("disabled","disabled");
					        }
					        else //MicroC Compiler //default compiler
					        {
					        	var img = publicUrl + '/images/mikroc-compiler.png';
					        }
					        
					        if( p.find("img").length == 0 )
					        {
					        	p.append("<img src='"+img+"' />");	
					        }
					        else
					        {
					        	console.log(img);
					        	p.find("img").first().attr("src",img);
					        }
					        
					      }
						},
						
						
					],
			onSubmitValid: function (values) {
				// "values" follows the schema, yeepee!
				
				
				
				return false;
			  },
			
			onSubmit: function (errors, values) {
				
			  if (errors)
			  {
				$('#res').html('<p>I beg your pardon?</p>');
			  }
			  else
			  {
			  	
			  	data = thisObj.getUserData();
			    data.saved = 'saved';
				data['formData'] = values;
				
				thisObj.setUserData(data);

				thisObj.label.setText( data['formData'].label );
				thisObj.repaint();

				
				//thisObj.onParamsChanged(values);

				
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
		
	},
	onClick: function()
	 {
	 	$("#componentProperties").html("<form></form>");
    	
    	if( circuitEditor.config.properties == 'side' && !simulating )
    	this.showForm();
    	
    	
    	if( this.diagramFile != '' )
    	$("#componentProperties").append("<hr> <img width='100%' src='"+publicUrl+"/diagrams/"+this.diagramFile+"' />");
	    
	    
	    if( this.datasheet != '' )
    	$("#componentProperties").append('<hr><div class="text-center"> <a href="'+siteUrl+"/datasheets/"+this.datasheet+'" class="btn btn-default btn-lg" target="_blank"><span class="icon icon-file-pdf"></span> Datasheet</a></div>');


    },
    repaint : function(attributes)
    {
        if(this.repaintBlocked===true || this.shape===null){
            return this;
        } 
        
        if (typeof attributes === "undefined") {
            attributes = {};
        }
        
        var box = this.getBoundingBox();
        var margin = 10;
        
        var path = ["M",box.x+margin," ",box.y];         // Go to the top center..
        path.push("L", box.x+box.w-margin, " ", box.y);    // ...draw line to the right middle
        path.push("L", box.x+box.w-margin, " ", box.y+box.h);    // ...draw line to the right middle
        path.push("L", box.x+margin, " ", box.y+box.h);    // ...draw line to the right middle
        path.push("L", box.x+margin, " ", box.y);    // ...draw line to the right middle
		//console.log(this.pinsCount);
		
		var _this = this;
		
		if( this.layout == "original" )
		{
			
			
			for(var i=0; i < this.pinsCount/2; i++)
			{
				//console.log("Port Line");
				path.push("M", box.x, " ", box.y+(i*this.portSpacing)+0.5);    // ...draw line to the right middle
				path.push("L", box.x+10, " ", box.y+(i*this.portSpacing)+0.5);    // ...draw line to the right middle
				
			}
			
			for(var i=0; i < this.pinsCount/2; i++)
			{
				//console.log("Port Line");
				path.push("M", box.x+box.w-margin, " ", box.y+(i*this.portSpacing)+0.5);    // ...draw line to the right middle
				path.push("L", box.x+box.w, " ", box.y+(i*this.portSpacing)+0.5);    // ...draw line to the right middle
			}
		}
		else if( this.layout == "vertical" )
		{
		
			var i = 1;
			$.each( _this.pinsPositions.right, function( key, value )
			{
				 $.each( value, function( key2, value2 )
				 {


						path.push("M", box.x+box.w-margin, " ", box.y+(i*_this.portSpacing)+0.5);    // ...draw line to the right middle
						path.push("L", box.x+box.w, " ", box.y+(i*_this.portSpacing)+0.5);    // ...draw line to the right middle
						
						i++;
				 });
				 
				 i++;i++;
				 
			});	
			
			i = 1
			$.each( _this.pinsPositions.left, function( key, value )
			{
				 $.each( value, function( key2, value2 )
				 {
						path.push("M", box.x, " ", box.y+(i*_this.portSpacing)+0.5);    // ...draw line to the right middle
						path.push("L", box.x+10, " ", box.y+(i*_this.portSpacing)+0.5);    // ...draw line to the right middle
						
						i++;
				 });
				 
				 i++;i++;
				 
			});	
		}

        /*
        path.push("L", box.x+box.w/2, " ", box.y+ box.h);   // ...bottom center...
        path.push("L", box.x, " ", box.y+box.h/2);          // ...left middle...
        path.push("L", box.x+box.w/2, " ", box.y);          // and close the path
        */
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