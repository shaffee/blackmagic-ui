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
 draw2d.shape.analog.npnTransistor = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.npnTransistor",
    collector:'',
    emitter:'',
    base:'',
    rotatable:'yes',
    model:'',
    ngspiceSymbol:'Q',
    modelString:'',
    models:[],

    
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
            width = 34;
            height= 64;

	   	this.defaultValues = { label:"NPN" };
        
        this._super({width:width,height:height});
        
        
		this.models = {
							//'1N4148':{is:'222pA', n:'1.65' , m:'0.333' , cj0:'4pF' , rs:'68.6ohms' , bv:'75V' , ibv:'1uA' , tt:'5.76e-09'},
							//'1N4001':{is:'76.9pA', n:'1.45' , m:'0.333' , cj0:'39.8pF' , rs:'0.042ohms' , bv:'50V' , ibv:'5uA' , tt:'4.32e-06'},
							'ideal':{is:'1E-14', vaf:"100" , bf:"200", ikf:"0.3" , xtb:"1.5" , br:"3" , cjc:"8E-12", cje:"25E-12" , tr:"100E-9" , tf:"400E-12" , itf:"1" , vtf:"2" , xtf:"3" , rb:"10" , rc:"0.3", re:"0.2"},
							'2N2222':{is:'1E-14', vaf:"100" , bf:"200", ikf:"0.3" , xtb:"1.5" , br:"3" , cjc:"8E-12", cje:"25E-12" , tr:"100E-9" , tf:"400E-12" , itf:"1" , vtf:"2" , xtf:"3" , rb:"10" , rc:"0.3", re:"0.2"},
		};
        
        //this.setResizeable(false);
        this.inputLocator = new this.MyInputPortLocator();
        
        this.collector = this.createPort("hybrid",this.inputLocator);
        this.emitter = this.createPort("hybrid",this.inputLocator);
        this.base = this.createPort("hybrid",this.inputLocator);

	    var labelLocator = new this.MyLabelLocator();
	    
	    this.params = {
		savedModel: {
		      "title": "Model",
		      "type": "string",
		      
		      "enum": [
		        "ideal",
		        "2N2222",
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
		  vaf: {
		        "type": "string",
		        "title": "VAF",
		        //"format": "color"
		      },
		  bf: {
		        "type": "string",
		        "title": "BF",
		        //"format": "color"
		      },
		  ikf: {
		        "type": "string",
		        "title": "IKF",
		        //"format": "color"
		      },
		  xtb: {
		        "type": "string",
		        "title": "XTB",
		        //"format": "color"
		      },
		  br: {
		        "type": "string",
		        "title": "BR",
		        //"format": "color"
		      },
		  cjc: {
		        "type": "string",
		        "title": "CJC",
		        //"format": "color"
		      },
		  cje: {
		        "type": "string",
		        "title": "CJE",
		        //"format": "color"
		      },
		  tr: {
		        "type": "string",
		        "title": "TR",
		        //"format": "color"
		      },
		  tf: {
		        "type": "string",
		        "title": "TF",
		        //"format": "color"
		      },
		  itf: {
		        "type": "string",
		        "title": "ITF",
		        //"format": "color"
		      },
		  vtf: {
		        "type": "string",
		        "title": "VTF",
		        //"format": "color"
		      },
		  xtf: {
		        "type": "string",
		        "title": "XTF",
		        //"format": "color"
		      },
		  rb: {
		        "type": "string",
		        "title": "RB",
		        //"format": "color"
		      },
		  rc: {
		        "type": "string",
		        "title": "RC",
		        //"format": "color"
		      },
		  re: {
		        "type": "string",
		        "title": "RE",
		        //"format": "color"
		      }

		};
	
		var _this = this;
		
		/*
    	this.form = [
    					{
    						"key":"savedModel",
    						"titleMap": {
									        "ideal":"Ideal Model",
									        "custom":"Custom Model"
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
							"key":"vaf",	
						},
						{
							"key":"bf",	
						},
						{
							"key":"ikf",	
						},
						{
							"key":"xtb",	
						},
						{
							"key":"br",	
						},
						{
							"key":"cjc",	
						},
						{
							"key":"cje",	
						},
						{
							"key":"tr",	
						},
						{
							"key":"tf",	
						},
						{
							"key":"itf",	
						},
						{
							"key":"vtf",	
						},
						{
							"key":"xtf",	
						},
						{
							"key":"rb",	
						},
						{
							"key":"rc",	
						},{
							"key":"re",	
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
    	
    	this.defaultRotation = 'v';
	    this.defaultWidth = '32';
	    this.rotation = 'v';


	   	//this.setBackgroundColor("#000");
	   	//this.repaint();

    },
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
		var readonly;

		if( values.formData.savedModel != "custom")
		{
			readonly = true;
		}
		else
		{
			readonly= false;	
		}
		
		var _this = this;
		console.log("testing");
		console.log(this.params);
		
		/* vuejs
		$.each( this.params , function( index , element ){
				if( index != "label" )
				_this.params[index]["readonly"] = readonly;
		});
			
			
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
				
		var collector = nodes[this.collector.id];
		var base = nodes[this.base.id];
		var emitter = nodes[this.emitter.id];

		if( typeof collector == 'undefined' || typeof base == 'undefined' | typeof emitter == 'undefined' )
		{
			return 'connection error';	
		}
		console.log(values);
		if( values.savedModel == 'ideal' )
			this.model = ".model bjtModel"+deviceIndex+" npn bf=50";
		else
			this.model = ".model bjtModel"+deviceIndex+" NPN IS="+values.is+" VAF="+values.vaf+" BF="+values.bf+" IKF="+values.ikf+" XTB="+values.xtb+" BR="+values.br+" CJC="+values.cjc+" CJE="+values.cje+" TR="+values.tr+" TF="+values.tf+" ITF="+values.itf+" VTF="+values.vtf+" XTF="+values.xtf+" RB="+values.rb+" RC="+values.rc+" RE="+values.re;
		
		console.log(this.model);
		if( this.model.indexOf("undefined") != -1 )
		{
			return {type:'error',msg:'missing Parameters'};
		}
        //QXXXXXXX nc nb ne <ns> mname <area=val> <areac=val> <areab=val> 
        // + <m=val > <off > <ic=vbe , vce> <temp=val > <dtemp=val >				
        
		return {type:'ngspice', msg:"Q"+deviceIndex+" "+collector+" "+base+" "+emitter+" bjtModel"+deviceIndex};
	}
	
	/*,
	ngSpiceCommand: function(nodes,deviceIndex)
	{
		var data = this.getUserData();
		values = data['formData'];
				
		var collector = nodes[this.collector.id];
		var base = nodes[this.base.id];
		var emitter = nodes[this.emitter.id];

		if( typeof collector == 'undefined' || typeof base == 'undefined' | typeof emitter == 'undefined' )
		{
			return 'connection error';	
		}
		
		this.model = ".model bjtModel"+deviceIndex+" npn bf=50";
		
		if( this.model.indexOf("undefined") != -1 )
		{
			return {type:'error',msg:'missing Parameters'};
		}
		
        //QXXXXXXX nc nb ne <ns> mname <area=val> <areac=val> <areab=val> 
        // + <m=val > <off > <ic=vbe , vce> <temp=val > <dtemp=val >				
        
		return {type:'ngspice',msg:"Q"+deviceIndex+" "+collector+" "+base+" "+emitter+" bjtModel"+deviceIndex};
	},
	*/
	
	,
    getSVG: function(){
    
    	//this.setBackgroundColor("#000000");

        return '<svg width="34" height="64" xmlns="http://www.w3.org/2000/svg">   <title>Layer 1</title>  <rect opacity="0" id="svg_2" height="64" width="34" y="0" x="0" fill-opacity="0.75" stroke-opacity="null" stroke-width="0" stroke="#000000" fill="none"/>  <path d="m10.34153,17.78347l0,28.43306" id="path2189" stroke-width="2" fill-rule="evenodd" fill-opacity="0.75" fill="none" stroke="#000000"/>  <path stroke="#000000" d="m10.46653,22.56899l22.39049,-14.22314" id="path2191" stroke-width="2" fill-rule="evenodd" fill-opacity="0.75" fill="none"/>  <path stroke="#000000" d="m10.46653,41.74812l22.42174,13.95881" id="path2196" stroke-width="2" fill-rule="evenodd" fill-opacity="0.75" fill="none"/>  <line fill="none" stroke-width="2" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0.75" x1="10" y1="32.5" x2="0.0625" y2="32.5" id="svg_7" stroke="#000000"/>  <line fill="none" stroke-width="2" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0.75" x1="32.5" y1="0.03472" x2="32.5" y2="9.12896" id="svg_9" stroke="#000000"/>  <line fill="none" stroke-width="2" stroke-linejoin="null" stroke-linecap="null" fill-opacity="0.75" x1="32.5" y1="54.90254" x2="32.5" y2="63.99677" stroke="#000000" id="svg_13"/>  <path stroke="#000000" d="m22.05082,46.62743l1.44918,3.12131l-3.4,-0.11147l1.95082,-3.00984z" id="svg_1" stroke-linecap="null" stroke-linejoin="null" stroke-width="5" fill="#000000"/> </svg>';
    }
});


    // custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.npnTransistor.inputLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.npnTransistor.inputLocator',
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
	            	figure.setPosition(32, 0); //collector
	            if( index == 1 )
	            	figure.setPosition(32, 64); // emitter
	            if( index == 2 )
	            	figure.setPosition(0, 32); //base
            }
            else if( r == 90 )
            {
	            if( index == 0 )
	            	figure.setPosition(64, 32); //collector
	            if( index == 1 )
	            	figure.setPosition(0, 32); // emitter
	            if( index == 2 )
	            	figure.setPosition(32, 0); //base
            }
            else if( r == 180 )
            {
	            if( index == 0 )
	            	figure.setPosition(0, 64); //collector
	            if( index == 1 )
	            	figure.setPosition(0, 0); // emitter
	            if( index == 2 )
	            	figure.setPosition(32, 32); //base
            }
            else if( r == 270 )
            {
	            if( index == 0 )
	            	figure.setPosition(0, 0); //collector
	            if( index == 1 )
	            	figure.setPosition(64, 0); // emitter
	            if( index == 2 )
	            	figure.setPosition(32, 32); //base
            }
                        
        }
    });
    // custom locator for the special design of the ResistorBridge Input area
    draw2d.shape.analog.npnTransistor.labelLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.npnTransistor.labelLocator',
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