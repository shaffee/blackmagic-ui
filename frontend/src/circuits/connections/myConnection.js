import draw2d from 'draw2d';

/**
 * @class MyConnection
 * 
 * A simple Connection with a label wehich sticks in the middle of the connection..
 *
 * @author Andreas Herz
 * @extend draw2d.Connection
 */
draw2d.MyConnection = draw2d.Connection.extend({
	NAME:"draw2d.MyConnection",
    dashes:'',
    i:0,
    offset:1000,
    direction:0,
    highlight:'no',
    showVoltage : false,
    probIndex : 0,
    init:function()
    {
	  this.dashes = ["- ","-"];
      this.i = 0;
	  //console.log("dsad");
      this._super({'stroke-linecap':'square'});
	  
		this.params = {
		  name: {
			type: 'string',
			title: 'name',
		  },
		  showVoltage: {
			type: 'boolean',
			title: '',
			required: false,
			inlinetitle: 'ttt',
		  }
		  
		};
	
	this.labelLocator = new draw2d.layout.locator.ParallelMidpointLocator();
	
	this.label = new draw2d.shape.basic.Label({
          text:"",
          color:"#000000",
          fontColor:"#0d0d0d",
          bgColor:"none"
    });
	 console.log("connection event");
	this.on("change:value",function(e){
		console.log("wire changed");
	});
	this.add(this.label, this.labelLocator);
	this.label.setVisible(false);

	       // Alternatively you register for this event with:
	 this.on("contextmenu", this.showMenu );
	 
	 
    },
    afterAdd : function()
    {
	  this.addProbLabel();

    },
	updateValues:function()
	{
		var values = this.getUserData();
		
		if( values == null ) return [];
		
		if( typeof values['formData'] == 'undefined' )
	    {
	    	//console.log("load defaults");
	    	values['formData'] = {label:''};
	    	//console.log(values);
	    	//this.defaultValues = '';
	    	this.setUserData(values);	
	    }
		
		return values;
	},
	showForm:function()
	{
		var values = this.updateValues();
		
		console.log(values);
		var thisObj = this;
		
		if( typeof values['formData'] == 'undefined' )
		{
			values['formData'] = [];
		}
		
		/* vuejs
		var form	=	propertiesPanel.attachForm([
														{type: "settings", position: "label-right"},
														{checked: values['formData']['showVoltage'] ,type: "btn2state", name: "showVoltage", value: "1", label: "Enable Prob.", list:[
															{type: "settings", position: "label-left"},
															{value:values['formData']['name'],type: "input", name: 'name', label: 'Prob Label'},
														]},

													]);
													
		
		form.attachEvent("onChange", function(name, value, state){
				if( name == "showVoltage" )
				{
					values['formData'] = {};
					if( state == true )
					{
		            	values['formData'].showVoltage = true;
						thisObj.label.setText(values['formData']['name']);
						thisObj.setUserData(values);
		            	thisObj.addProbLabel();
					}
					else
					{
						delete probs[thisObj.id];
						values['formData'][name] = false;
						thisObj.label.setText('');
						thisObj.setUserData(values);
	
					}
					
					thisObj.repaint();
				}
		});

		form.attachEvent("onKeyup", function(inp, ev, name){
			
			console.log($(inp).val());
		    values['formData'][name] = $(inp).val();
		    
		    console.log(values['formData']);
			thisObj.setUserData(values);
			thisObj.label.setText( $(inp).val() );
			thisObj.repaint();
		});
		
		propertiesPanel.expand();
		*/
	
		
	},
	addProbLabel : function(){
		
		//console.log(this);
		if( this.userData != null && typeof this.userData.formData != 'undefined' && this.userData.formData.showVoltage == true )
		{
			console.log("showing label");
			this.label.setText(this.userData.formData.name || "Prob");
			
			/*
			this.label = new draw2d.shape.basic.Label({
		          text: this.userData.formData.name || "Prob",
		          color:"#000000",
		          fontColor:"#0d0d0d",
		          bgColor:"none"
		    });
		  	*/
		  	
		  	this.label.setStroke(0);
		  	
		  	this.label.setVisible(true);
	  		
	        //probs[this.id] = this.id;
		}
	},
    /**
     * @method
     * called by the framework if the figure should show the contextmenu.</br>
     * The strategy to show the context menu depends on the plattform. Either loooong press or
     * right click with the mouse.
     * 
     * @param {Number} x the x-coordinate to show the menu
     * @param {Number} y the y-coordinate to show the menu
     * @since 1.1.0
     */
     onClick:function()
     {
		 //vuejs
	    //if( circuitEditor.config.properties == 'side' && !simulating )
    	//	this.showForm();
     },
    onTimer:function()
    {
    	//console.log("sleected dash "+this.dashes[this.i]);

    	var attributes = {};
    	
    	attributes['stroke-dashoffset'] = this.offset;
    	this.offset += this.direction;
		this.repaint(attributes);

		//console.log("Connection");
		//console.log(this.direction);
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
							 enable_prob:{
								 label : 'Enable Prob',
								 type : 'toggle',
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
    showMenu:function(emitter,event){
    	
    	var values = event.figure.getUserData();
    	
    	if( values == null ) values = {};
    	var menuItems;

		if( values.formData.showVoltage == true )
		{
			menuItems = {
                "hide":    {name: "Hide voltage in simulation", icon: "hide"},
                "sep1":   "---------",
                "delete": {name: "Delete", icon: "delete"},
		         };
		}
		else
		{
			menuItems = {
	                "show":    {name: "Show voltage in simulation", icon: "show"},
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
               switch(key)
               {
	               case "show":
	               		probs[event.figure.id] = event.figure.id;
	               		values.formData.showVoltage = true;	
	               		event.figure.setUserData(values);

	               		event.figure.addProbLabel();
	               		event.figure.label.setVisible(true);

	                   	break;
	               case "hide":
	               		values.formData.showVoltage = false;	               		
	               		delete probs[event.figure.id];
	               		event.figure.setUserData(values);

	               		event.figure.label.setVisible(false);
	                   	break;
	               case "delete":
	                   // without undo/redo support
	              	   //     event.figure.getCanvas().removeFigure(this);
	                   
	                   // with undo/redo support
	                   var cmd = new draw2d.command.CommandDelete(this);
	                   event.figure.getCanvas().getCommandStack().execute(cmd);
	               default:
	                   break;
               }
            
            },this),
            x:event.x,
            y:event.y,
            items:menuItems
        });
		*/
   }
    
});