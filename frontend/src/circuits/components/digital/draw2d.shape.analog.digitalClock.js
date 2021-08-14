
import draw2d from 'draw2d';

draw2d.shape.analog.digitalClock = draw2d.shape.analog.digital.extend({

    NAME : "draw2d.shape.analog.digitalClock",
    calls : 0,
    frequency : 1,
    init : function()
    {
        this.value="0";
        this.colors={};
        this.colors['1']="#00f000";
        this.colors['0']="#f00000";
        

        this._super();
                    
        this.counter = 0;
        
        this.setDimension(48,32);
        this.setResizeable(false);

        this.outputLocator = new draw2d.shape.analog.digitalClock.outputLocator();

        this.output = this.createPort("output",this.outputLocator);
        this.defaultValues = {label:'Digital Clock', frequency:'1' };
        this.setBackgroundColor(this.colors[this.value]);
        
         //this.startTimer(200);
         
         this.params = {
           label: {
         	type: 'string',
         	title: 'name',
         	required: true
           },
           frequency: {
           	type: 'number',
           	title: 'Frequency [Hz]',
           	required: true
           }
           
         };
		
		 
    },
    onContextMenu:function(x,y){

		/*
		console.log("x position");
		console.log(x);
		
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
    
	onParamsChanged:function(values)
	{
		//this.startTimer((1/values.formData.frequency)*1000);
		
		if( typeof values.formData != 'undefined')
			{
			this.frequency = values.formData.frequency;
			console.log(values);
			console.log(this.frequency);
			}
	},
	
	timer10msTick: function()
	{
		//console.log( this.calls + "%(" +  this.callsPerSecond +"/"+this.frequency+"/2) == 0" );
		let data = this.getUserData();
		console.log(data);
		
		this.frequency = data['frequency'] || 1;

		if( this.calls%(this.callsPerSecond/2/this.frequency) == 0 )
		{
            var value = this.output.getValue() == "0" ? "1" : "0";
			
			this.output.setValue(value);
		}
		
		this.calls+=1; // each call is 0.5 of T
	},
   getSVG: function(){
            
    //var data = {name: "digital Clock", frequency: "1"};

    //this.setUserData( data );
            
   	this.setBackgroundColor(null);
   	
   	return '<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <path stroke-width="2" id="svg_1" d="m39.542,16.917c0,6.627 -5.373,12 -12,12l-13.125,0c-6.627,0 -12,-5.373 -12,-12l0,-1.833c0,-6.627 5.373,-12 12,-12l13.125,0c6.627,0 12,5.373 12,12l0,1.833z" stroke-miterlimit="10" stroke="#000000" fill="#FFFFFF"/>  <line stroke-width="2" id="svg_2" y2="16.5" x2="47.833" y1="16.5" x1="39.542" stroke-miterlimit="10" stroke="#000000" fill="none"/>  <polyline stroke-width="2" id="svg_3" points="3.123,21.085 7.438,21.085 7.453,10.703 16.859,10.703  16.844,21.085 25.938,21.085 25.917,10.703 35.125,10.703 35.125,21.085 38.837,21.085 " stroke-miterlimit="10" stroke="#000000" fill="none"/>  <line id="svg_4" y2="0" x2="47.833" y1="0" x1="0" stroke-miterlimit="10" fill="none" opacity="0"/>  <line id="svg_5" y2="32" x2="47.833" y1="32" x1="0" stroke-miterlimit="10" fill="none" opacity="0"/> </svg>';
   }, 
   setProperties:function(properties){
	   console.log("setting properties",properties);

		let values = [];
		if( properties != null )
		{
			for (var key in properties) {
				values[key] = properties[key].value;
			};

			console.log("saving data",values);

			this.setUserData(values);
		}
   },
   getProperties:function(){

		let properties =  {
							frequency:{
								label : 'Frequency',
								type : 'text',
								value : '',
							},

							label:{
								label : 'Label',
								type : 'text',
								value : '',
							}
		}

		let values = this.getUserData();

		for (var key in values) {
			if( typeof properties[key] != 'undefined' )
			properties[key].value = values[key];
		};

		console.log(properties);

		return properties;
   },
	showForm:function()
	{
		var data = this.updateValues();
		var thisObj = this;
		
		var values = thisObj.getUserData();

		
		if( typeof values['formData'] == 'undefined' )
		{
			values['formData'] = [];
		}
		
		/* vuejs
		var form	=	propertiesPanel.attachForm([
														{value:values['formData']['label'],type: "input", name: 'label', label: 'Label' , placeholder: ""},
														{value:values['formData']['frequency'],type: "input", name: 'frequency', label: 'Frequency' , placeholder: ""},
													]);
													
		
		form.attachEvent("onKeyup", function(inp, ev, name){
		    
		    values['formData'][name] = $(inp).val();
			thisObj.setUserData(values);

			if( name == 'label' )
			{
				thisObj.label.setText( $(inp).val() );
				thisObj.repaint();
			}
		});
		
		propertiesPanel.expand();
		*/		
	},

});


draw2d.shape.analog.digitalClock.outputLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.digitalClock.outputLocator',
	init:function( ){
	  this._super();
	},    
	relocate:function(index, figure){
		var w = figure.getParent().getWidth();
		var h = figure.getParent().getHeight();
		
		figure.setPosition(48, 16);
	}
});
