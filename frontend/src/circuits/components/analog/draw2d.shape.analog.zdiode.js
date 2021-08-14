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

draw2d.shape.analog.zdiode = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.zdiode",
    dinput:'',
    clock:'',
    node1:'',
    node2:'',
    oldClk:'',
    rotation:'',
    ngspiceSymbol:'D',
    modelString:'',
    models:[],
    // custom locator for the special design of the ResistorBridge Input area

    
	getModelValues: function( model )
	{
		var currentValues = this.getUserData();
		
		var values = this.models[model];
		
		values['savedModel'] = model;
		values['label'] = currentValues.formData.label;
		
		return values;
	},
	setModel:function(model)
	{
		this.model = model;
	},
	onPortValueChanged: function(relatedPort){
   
	    
	    		
	    //var outputVal = this.output.getValue() != null ? this.output.getValue() : "0";

	    if( relatedPort.getName() == "clock" && this.clock.getValue() != this.oldClk )
	    {
	    	//console.log(relatedPort);
	    	
	    	if( this.clock.getValue() == "1" && this.oldClk == "0" )
	    	{
	    		
	    		if( this.dinput.getValue() == "1" )
	    		{
	    			//delay(100000010000001000000);
	    		    this.qout1.setNextNodeValue("1");
	    			this.qout2.setNextNodeValue("0");
	    		}
	    		else
	    		{
	    			//delay(100000010000001000000);
	    			this.qout1.setNextNodeValue("0");
	    			this.qout2.setNextNodeValue("1");
	    		}
	    		
	    		this.oldClk = this.clock.getValue();	
	    		
	    		this.clock.setNextNodeValue("1");
	    	}
	    	else if( this.clock.getValue() == "0" && this.oldClk == "1"  )
	    	{
	    		this.oldClk = this.clock.getValue();
	    		this.clock.setNextNodeValue("0");	
	    	}
		    
	
	
		    this.oldClk = this.clock.getValue();
	    }
    },

    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        
        width = 32;
        height= 80;
	        
	        
	    this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
    	
		this.models = {
							
							'1N4728A':{ RS:'1' , BV:'3.3' , IBV:'0.076'},
							'1N4729A':{ RS:'1' , BV:'3.6' , IBV:'0.069'},
							'1N4730A':{ RS:'1' , BV:'3.9' , IBV:'0.064'},
							'1N4731A':{ RS:'1' , BV:'4.3' , IBV:'0.058'},
							'1N4732A':{ RS:'1' , BV:'4.7' , IBV:'0.053'},
							'1N4733A':{ RS:'1' , BV:'5.1' , IBV:'0.049'},
							'1N4734A':{ RS:'1' , BV:'5.6' , IBV:'0.045'},
							'1N4735A':{ RS:'1' , BV:'6.2' , IBV:'0.041'},
							'1N4736A':{ RS:'1' , BV:'6.8' , IBV:'0.037'},
							'1N4737A':{ RS:'1' , BV:'7.5' , IBV:'0.034'},
							'1N4738A':{ RS:'1' , BV:'8.2' , IBV:'0.031'},
							'1N4739A':{ RS:'1' , BV:'9.1' , IBV:'0.028'},
							'1N4740A':{ RS:'1' , BV:'10' , IBV:'0.025'},
							'1N4741A':{ RS:'1' , BV:'11' , IBV:'0.023'},
							'1N4742A':{ RS:'1' , BV:'12' , IBV:'0.021'},
							'custom':{ RS:'1' , BV:'3.3' , IBV:'0.076'},

		};

		this.defaultValues = {label:"Zener Diode",savedModel:'1N4728A',RS:'1' , BV:'3.3' , IBV:'0.076'};

        this._super({width:width,height:height});
	   	

		this.rotation = 'v';

        this.inputLocator = new draw2d.shape.analog.zdiode.inputLocator();
        console.log("input obj",this.inputLocator);
        this.node1 = this.createPort("hybrid",this.inputLocator);
        this.node2 = this.createPort("hybrid",this.inputLocator);

	    //var labelLocator = new this.MyLabelLocator();	    
	    /*
	    this.params = {
		savedModel: {
		      "title": "Model",
		      "type": "string",
		      
		      "enum": [
		        "1N4728A",
		        "1N4729A",
		        "1N4730A",
		        "1N4731A",
		        "1N4732A",
		        "1N4733A",
		        "1N4734A",
		        "1N4735A",
		        "1N4736A",
		        "1N4737A",
		        "1N4738A",
		        "1N4739A",
		        "1N4740A",
		        "1N4741A",
		        "1N4742A",
		        "custom"
		      ]
		    },
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  },
		  
		 RS: {
		        "type": "string",
		        "title": "RS",
		      },
		
		  BV: {
		        "type": "string",
		        "title": "BV",
		      
		      },
		  IBV: {
		        "type": "string",
		        "title": "IBV",
		    
		      },
		 

		};
			
		_this = this;
		
    	this.form = [
    					{
    						"key":"savedModel",
    						"titleMap": {
									        "1N4728A":"1N4728A",
									        "custom":"Custom Zener Diode"
						      },
    						"onChange":function (evt) {
    							var model = $(evt.target).val();
    							var values = {formData:_this.getModelValues( model )};
    							
    							console.log(values);
    							

						        _this.showForm(values);	
    						}
    						
    					},
    					{
							"key":"label",	
						},
    					{
							"key":"RS",	
						},
						{
							"key":"BV",	
						},
						{
							"key":"IBV",	
						},
						{
						  "type": "submit",
						  "title": "Save Parameters"
						},
						
					];
		*/	
	       },
	showForm:function(selectedValues)
	{
		/*
		if( typeof selectedValues != 'undefined' )
		{
			
			if( typeof selectedValues['formData'] == 'undefined' ) selectedValues['formData'] = [];
			
			values = selectedValues;
		}
		else
		{			
			var values = this.updateValues();
		}

		if( circuitEditor.config.properties == 'side' )
		{
			$("#peropertiesPanel").html('<form></form>');
			
			var propObj = $("#peropertiesPanel");
			w2ui['layout'].show('right',true);
		}
		else
		{
			$('#paramsForm').html('<form></form>');
			
			var propObj = $("#paramsForm");
		}
		
		if( values.formData.savedModel != "custom")
		{
			var readonly = true;
		}
		else
		{
			var readonly = false;	
		}
		
		_this = this;

		$.each( this.params , function( index , element ){
				if( index != "label" )
				_this.params[index]["readonly"] = readonly;
		});
			
			

		$('#paramsForm').html('<form></form>');
		var thisObj = this;
		
		propObj.find("form").jsonForm({
			value: values['formData'],
			validate: true,
			schema: this.params ,
			params: {
					"fieldHtmlClass": "form-control",
				  },
			"form": this.form,
			onSubmitValid: function (values) {
			
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
				
				thisObj.setUserData(data);
				thisObj.label.setText( values.label );
				thisObj.repaint();
		
				thisObj.onParamsChanged(values);
				
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
			}, 0);
		}
		*/
		
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
		
		this.model = ".model diodeModel"+deviceIndex+" D ( RS="+values.RS+"  BV="+values.BV+" IBV="+values.IBV+" ) ";

		if( this.model.indexOf("undefined") != -1 )
		{
			return {type:'error',msg:'missing Parameters'};
		}
    
		return {type:'ngspice', msg:"D"+deviceIndex+" "+node2_name+" "+node1_name+" diodeModel"+deviceIndex};
	},
    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="32" height="80.00000000000001" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title>  <title>Layer 1</title>  <rect opacity="0" id="svg_1" height="80" width="32" y="-0.37509" x="0" fill-opacity="null" stroke-opacity="null" stroke-width="0" fill="none"/>  <line stroke="#000000" stroke-width="2" fill="none" stroke-linejoin="round" stroke-linecap="round" x1="16.5" y1="0.5" x2="16.5" y2="28.47224" id="svg_15"/>  <path stroke-width="2" fill="#ffffff" stroke="#000000" stroke-linejoin="round" stroke-linecap="round" d="m5.41632,49.59184l10.99999,-19.7l11.00001,19.7l-22,0z" id="svg_13"/>  <line stroke="#000000" stroke-width="2" fill="none" stroke-linejoin="round" stroke-linecap="round" x1="6.03728" y1="29.58158" x2="27.05351" y2="29.58158" id="svg_14"/>  <line stroke-width="2" fill="none" stroke="#000000" stroke-linejoin="round" stroke-linecap="round" x1="16.5" y1="49.79086" x2="16.5" y2="80" id="svg_16"/>  <line stroke="#000000" stroke-width="2" fill="none" stroke-linejoin="round" stroke-linecap="round" x1="2.50649" y1="26.17368" x2="5.80412" y2="29.5708" id="svg_7"/>  <line stroke="#000000" stroke-width="2" fill="none" stroke-linejoin="round" stroke-linecap="round" x1="27.02412" y1="29.517" x2="30.32176" y2="32.91411" id="svg_2"/></svg>';
    }
});

draw2d.shape.analog.zdiode.inputLocator = draw2d.layout.locator.PortLocator.extend({
	NAME : 'draw2d.shape.analog.zdiode.inputLocator',
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

draw2d.shape.analog.zdiode.labelLocator = draw2d.layout.locator.Locator.extend({
	Name : 'draw2d.shape.analog.zdiode.labelLocator',
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