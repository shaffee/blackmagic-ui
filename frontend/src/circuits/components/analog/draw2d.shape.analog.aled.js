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

 draw2d.shape.analog.aled = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.aled",
    dinput:'',
    clock:'',
    node1:'',
    node2:'',
    oldClk:'',
    rotation:'',
    ngspiceSymbol:'D',
    modelString:'',
    oldval:'',
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
			var oldval = this.node1.getValue() ;
   	   		var data = this.getUserData();
			var values = data['formData'];
	 
	    if ( this.node1.getValue() >= values.N ) {
	    	if ( values.N == '1.2' ){
	    	this.setBackgroundColor("#B8B4B5");
	    	this.repaint();
	    	}
	    	else if ( values.N == '1.8' ){
	    	this.setBackgroundColor("#F7022F");
	    	this.repaint();
	    	}
	    	else if ( values.N == '2.0' ){
	    	this.setBackgroundColor("#F7CA02");
	    	this.repaint();
	    	}
	    	else if ( values.N == '2.2' ){
	    	this.setBackgroundColor("#EDED45");
	    	this.repaint();
	    	}
	    	else if ( values.N == '3.5' ){
	    	this.setBackgroundColor("#10B361");
	    	this.repaint();
	    	}
	    	else if ( values.N == '3.6' ){
	    	this.setBackgroundColor("#3336F2");
	    	this.repaint();
	    	}
	    }
	    else if(  this.node1.getValue() < values.N ){
	    this.setBackgroundColor(null);
	    	this.repaint();
	    }
	    		
	    if( relatedPort.getName() == "clock" && this.clock.getValue() != this.oldClk )
	    {
		    	    	
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
		this.models = {
							
							'Infra-Red':{ IS:'1a' , RS:'3.3' , N:'1.2'},
							'Red':{ IS:'1a' , RS:'3.3' , N:'1.8'},
							'Amder':{ IS:'1a' , RS:'3.3' , N:'2.0'},
							'Yellow':{ IS:'1a' , RS:'3.3' , N:'2.2'},
							'Green':{ IS:'1a' , RS:'3.3' , N:'3.5'},
							'Blue':{ IS:'1a' , RS:'3.3' , N:'3.6'},
		};
		
		this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
    	
		this.defaultValues = {label:"LED",savedModel:'Red', IS:'1a', RS:'3.3', N:'1.8'};

        this._super({width:width,height:height});
	   	

		this.rotation = 'v';

        this.inputLocator = new this.MyInputPortLocator();
        
        this.node2 = this.createPort("hybrid",this.inputLocator);
        this.node1 = this.createPort("hybrid",this.inputLocator);

	    var labelLocator = new this.MyLabelLocator();	    
	    
	    this.params = {
		savedModel: {
		      "title": "Model",
		      "type": "string",
		      
		      "enum": [
		           "Infra-Red",
		     	   "Red",
		     		"Amder",
		        	"Yellow",
		       		 "Green",
		      		"Blue"
		      ]
		    },
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  },
		
		  IS: {
		        "type": "string",
		        "title": "IS",
		      
		      },
		  RS: {
		        "type": "string",
		        "title": "RS",
		      
		      },
		   N: {
		        "type": "string",
		        "title": "N",
		      
		      },
		 		 

		};
			
		var _this = this;
		
    	this.form = [
    					{
    						"key":"savedModel",
    						"titleMap": {
									        "Infra-Red":"Infra-Red",
									        "Blue":"Blue"
						      },
    						"onChange":function (evt) {
    							/* vuejs
								var model = $(evt.target).val();
    							var values = {formData:_this.getModelValues( model )};
    							
    							console.log(values);
    							

						        _this.showForm(values);	
								*/
    						}
    						
    					},
    					{
							"key":"label",	
						},
						{
							"key":"IS",	
						},
						{
							"key":"RS",	
						},
						{
							"key":"N",	
						},
    					{
						  "type": "submit",
						  "title": "Save Parameters"
						},
						
					];
					
	       },
	showForm:function(selectedValues)
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

		/* vuejs
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
		*/
		var readonly;
		if( values.formData.savedModel != "custom")
		{
			readonly = true;
		}
		else
		{
			readonly = false;	
		}
		
		var _this = this;

		/* vuejs
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
		
		this.model = ".model diodeModel"+deviceIndex+" D (IS="+values.IS+ "N="+values.N+" RS="+values.RS+" ) ";

		if( this.model.indexOf("undefined") != -1 )
		{
			return {type:'error',msg:'missing Parameters'};
		}
    
		return {type:'ngspice', msg:"D"+deviceIndex+" "+node1_name+" "+node2_name+" diodeModel"+deviceIndex};
	},
    getSVG: function(){
    
    	this.setBackgroundColor(null);
    	
		return '<svg width="32" height="80" xmlns="http://www.w3.org/2000/svg"> <title>Layer 1</title>  <title>Layer 1</title>  <path stroke="#000000" stroke-width="2" fill="none" stroke-opacity="null" d="m3.13385,54.77365l12.86616,-26.06746l12.86616,26.06746l-25.73233,0l0.00001,0z" id="svg_4"/>  <rect x="0" y="0" fill="none" stroke="#000000" stroke-width="0" stroke-opacity="null" fill-opacity="null" width="32" height="80" id="svg_6"/>  <path fill="none" stroke-width="0" stroke-miterlimit="10" d="m8.74049,53.91651l0,-8.48418c0,-2.90807 2.4572,-5.26586 5.48787,-5.26586l3.3531,0c3.03068,0 5.48787,2.35779 5.48787,5.26586l0,8.48418" id="svg_1" stroke="#000000"/>  <line stroke="#000000" fill="none" stroke-width="2" stroke-miterlimit="10" x1="16" y1="54.75" x2="16" y2="80" id="svg_3"/>  <line y1="0" stroke="#000000" fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="16" x2="16" y2="27.86948" id="svg_5" stroke-linejoin="null" stroke-linecap="null"/>  <line stroke="#000000" fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="null" x1="1.96642" y1="27.8923" x2="30.16139" y2="27.8923" id="svg_7" stroke-linejoin="null" stroke-linecap="null"/>  <path id="svg_9" d="m4.43737,32.62485l-2.50009,2.06221l-0.74999,-3.24998l3.25009,1.18777l-0.00001,0z" stroke-opacity="null" stroke-width="0" stroke="#000000" fill="#000000"/>  <line stroke-linecap="null" stroke-linejoin="null" id="svg_10" y2="36.62482" x2="5.81236" y1="32.99984" x1="2.68739" stroke-opacity="null" stroke="#000000" fill="none"/>  <path stroke="#000000" id="svg_11" d="m3.40603,36.71847l-2.50009,2.06221l-0.75,-3.24998l3.25009,1.18777z" stroke-opacity="null" stroke-width="0" fill="#000000"/>  <line stroke-linecap="null" stroke-linejoin="null" id="svg_12" y2="40.59344" x2="4.65603" y1="36.96847" x1="1.53105" stroke-opacity="null" stroke="#000000" fill="none"/> </svg>';
    },
    
    repaint : function(attributes)
    {
         if (this.repaintBlocked===true || this.shape === null){
             return;
         }

         if(typeof attributes === "undefined" ){
             attributes = {};
         }

   
         attributes["fill"] = "transparent";
         if( this.bgColor!=null){
             this.svgNodes[0].attr({fill:"#" + this.bgColor.hex()});
         }
         
         this._super(attributes);
    }

});

draw2d.shape.analog.aled.inputLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.aled.inputLocator',
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
}),

draw2d.shape.analog.aled.labelLocator = draw2d.layout.locator.Locator.extend({
	NAME : 'draw2d.shape.analog.aled.labelLocator',
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