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

 draw2d.shape.analog.diode = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.diode",
    dinput:'',
    clock:'',
    node1:'',
    node2:'',
    oldClk:'',
    rotation:'',
    ngspiceSymbol:'C',
    modelString:'',
    models:[],

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

		this.models = {
							//'1N4148':{is:'222pA', n:'1.65' , m:'0.333' , cj0:'4pF' , rs:'68.6ohms' , bv:'75V' , ibv:'1uA' , tt:'5.76e-09'},
							//'1N4001':{is:'76.9pA', n:'1.45' , m:'0.333' , cj0:'39.8pF' , rs:'0.042ohms' , bv:'50V' , ibv:'5uA' , tt:'4.32e-06'},
							'ideal':{is:'2.682n', n:'0.001' , m:'.3333' , cj0:'4p' , rs:'0' , bv:'100' , ibv:'100u' , tt:'11.54n'},
							'1N4148':{is:'2.682n', n:'1.836' , m:'.3333' , cj0:'4p' , rs:'.5664' , bv:'100' , ibv:'100u' , tt:'11.54n'},
							'1N4001':{is:'14.11n', n:'1.984' , m:'.44' , cj0:'25.89p' , rs:'33.89m' , bv:'75' , ibv:'10u' , tt:'5.7u'},
							'1N4002':{is:'14.11E-9', n:'1.984' , m:'.2762' , cj0:'51.17E-12' , rs:'33.89E-3' , bv:'100.1' , ibv:'10' , tt:'4.761E-6'},
							'1N4003':{is:'14.11n', n:'1.984' , m:'.44' , cj0:'25.89p' , rs:'33.89m' , bv:'300' , ibv:'10u' , tt:'5.7u'},
							'1N4004':{is:'14.11n', n:'1.984' , m:'.44' , cj0:'25.89p' , rs:'33.89m' , bv:'600' , ibv:'10u' , tt:'5.7u'},
							'custom':{is:'2.682n', n:'0.001' , m:'.3333' , cj0:'4p' , rs:'0' , bv:'100' , ibv:'100u' , tt:'11.54n'},

		};

		this.defaultValues = {label:"Diode",savedModel:'ideal',is:'2.682n', n:'0.001' , m:'.3333' , cj0:'4p' , rs:'0' , bv:'100' , ibv:'100u' , tt:'11.54n'};

        this._super({width:width,height:height});
	   	

		this.rotation = 'v';

        //this.setResizeable(false);
        this.inputLocator = new draw2d.shape.analog.diode.inputLocator();
        
        this.node1 = this.createPort("hybrid",this.inputLocator);
        this.node2 = this.createPort("hybrid",this.inputLocator);

	    var labelLocator = new draw2d.shape.analog.diode.labelLocator();
		
		//this.modelString = 'D ( Temp= 26.85 is=76.9pA  N=1.45 M=0.333 Cj0=39.8pF Rs=0.042ohms bv=50V +Ibv=5uA Tt=4.32e-06) '; 
	    
	    
	    this.params = {
		savedModel: {
		      "title": "Model",
		      "type": "string",
		      
		      "enum": [
		        "ideal",
		        "1N4148",
		        "1N4001",
		        "1N4002",
		        "1N4003",
		        "1N4004",
		        "custom"
		      ]
		    },
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  },
		  is: {
			type: 'string',
			title: 'IS',
			required: true
		  },
		  n: {
		        "type": "string",
		        "title": "N",
		        //"format": "color"
		      },
		  m: {
		        "type": "string",
		        "title": "M",
		        //"format": "color"
		      },
		  cj0: {
		        "type": "string",
		        "title": "CJ0",
		        //"format": "color"
		      },
		  rs: {
		        "type": "string",
		        "title": "RS",
		        //"format": "color"
		      },
		  bv: {
		        "type": "string",
		        "title": "BV",
		        //"format": "color"
		      },
		  ibv: {
		        "type": "string",
		        "title": "IBV",
		        //"format": "color"
		      },
		  tt: {
		        "type": "string",
		        "title": "TT",
		        //"format": "color"
		      }

		};
			
		var _this = this;
		
		/*
    	this.form = [
    					{
    						"key":"savedModel",
    						"titleMap": {
									        "ideal":"Ideal Diode",
									        "custom":"Custom Diode"
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
							"key":"is",	
						},
						{
							"key":"n",	
						},
						{
							"key":"m",	
						},
						{
							"key":"cj0",	
						},
						{
							"key":"rs",	
						},
						{
							"key":"bv",	
						},
						{
							"key":"ibv",	
						},
						{
							"key":"tt",	
						},
						{
						  "type": "submit",
						  "title": "Save Parameters"
						},
						
					];
					*/
	    //this.addFigure( new draw2d.shape.basic.componentLabel("D") , labelLocator );
	    //this.addFigure( new draw2d.shape.basic.componentLabel("Q") , labelLocator );
	    //this.addFigure( new draw2d.shape.basic.componentLabel("Q") , labelLocator );
	    //this.addFigure( new draw2d.shape.basic.componentLabel("CLK") , labelLocator );

        /*
        this.createPort("hybrid",this.inputLocator);
        
        this.createPort("hybrid",this.outputLocator);
        this.createPort("hybrid",this.outputLocator);
    	*/
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

		/*
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

		/*
		$.each( this.params , function( index , element ){
				if( index != "label" )
				_this.params[index]["readonly"] = readonly;
		});
			
			
		console.log(values);
		$('#paramsForm').html('<form></form>');
		var thisObj = this;
		
		console.log("hello");
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
				
				thisObj.setUserData(data);
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
		
		this.model = ".model diodeModel"+deviceIndex+" D ( is="+values.is+"  N="+values.n+" M="+values.m+" Cj0="+values.cj0+" Rs="+values.rs+" bv="+values.bv+" Ibv="+values.ibv+" Tt="+values.tt+") ";

		if( this.model.indexOf("undefined") != -1 )
		{
			return {type:'error',msg:'missing Parameters'};
		}
        //QXXXXXXX nc nb ne <ns> mname <area=val> <areac=val> <areab=val> 
        // + <m=val > <off > <ic=vbe , vce> <temp=val > <dtemp=val >				
        
		return {type:'ngspice', msg:"D"+deviceIndex+" "+node2_name+" "+node1_name+" diodeModel"+deviceIndex};
	},
    getSVG: function(){
    
    	this.setBackgroundColor(null);

        return '<svg width="32" height="80" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <rect fill="none" stroke-width="0" stroke-opacity="null" fill-opacity="null" x="0" y="0" width="32" height="80" id="svg_1" opacity="0"/>  <line id="svg_15" y2="28.47224" x2="16.5" y1="0.5" x1="16.5" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="2" stroke="#000000"/>  <path id="svg_13" d="m5.41632,49.59184l10.99999,-19.7l11.00001,19.7l-22,0z" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" fill="#ffffff" stroke-width="2"/>  <line id="svg_14" y2="29.58158" x2="27.05351" y1="29.58158" x1="6.03728" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="2" stroke="#000000"/>  <line id="svg_16" y2="80" x2="16.5" y1="49.79086" x1="16.5" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" fill="none" stroke-width="2"/> </svg>';
    }
});


    // custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.diode.inputLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.diode.inputLocator',
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
	        
	        console.log("rotation");
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

	// custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.diode.labelLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.diode.labelLocator',
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