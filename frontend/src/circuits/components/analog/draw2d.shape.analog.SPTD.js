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
draw2d.shape.analog.SPTD = draw2d.shape.analog.base.extend({

    NAME:"draw2d.shape.analog.SPTD",
    GND:'',
    Source:'',
    NC:'',
    X:'',
    NO:'',
    rotatable:'yes',
    model:'',
    c1:'',
    c2:'',
       ngspiceSymbol:'Q',

    
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
   		
   	   		var data = this.getUserData();
			var values = data['formData'];
		
   		 console.log('X=' + this.Source.getValue() ) ; 
	     if ( this.Source.getValue() >= values.OV ) {
	    	this.c1="ffffff";
	    	this.c2="000000";
			this.repaint();
	    	}
	     else {	
	     	this.c1="000000";
	    	this.c2="ffffff";
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
            height= 64;
	        
	    this.developerName = "AHMED EBRAHIM";
    	this.developerFile = "";
    	
    	this.models = {
							
							'3.3volt':{ OV:'3.3'},
							'5volt':{ OV:'5'},
							'12volt':{ OV:'12' },
							'custom':{ OV:'5'},

		};
        
		this.defaultValues = {label:"Relay",savedModel:'5volt',OV:'5'};

        this._super(width,height);
        
        this.inputLocator = new this.MyInputPortLocator();
        
        this.GND = this.createPort("hybrid",this.inputLocator);
        this.Source = this.createPort("hybrid",this.inputLocator);
        this.NO = this.createPort("hybrid",this.inputLocator);
        this.X = this.createPort("hybrid",this.inputLocator);
        this.NC = this.createPort("hybrid",this.inputLocator);

	    var labelLocator = new this.MyLabelLocator();
	    
	 	
	       	
    	this.defaultRotation = 'v';
	    this.defaultWidth = '32';
	    this.rotation = 'v';
	    
		/*
	    this.params = {
		savedModel: {
		      "title": "Model",
		      "type": "string",
		      
		      "enum": [
		        "3.3volt",
		        "5volt",
		        "12volt",
		   		 "custom"
		      ]
		    },
		  label: {
			type: 'string',
			title: 'Label',
			required: true
		  },
		  
		 OV: {
		        "type": "string",
		        "title": "operating voltage",
		      },
			 

		};
			
		var _this = this;
		
    	this.form = [
    					{
    						"key":"savedModel",
    						"titleMap": {
									        "3.3volt":"3.3volt",
									        "custom":"Custom operating voltage "
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
							"key":"OV",	
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
		
		var NO = nodes[this.NO.id];	
		var GND = nodes[this.GND.id];
		var NC = nodes[this.NC.id];
		var X = nodes[this.X.id];
		var Source = nodes[this.Source.id];

		if( typeof NO == 'undefined' || typeof GND == 'undefined' || typeof NC == 'undefined' || typeof X == 'undefined' )
		{
			return 'connection error';	
		}
		
		
		this.model = ".model switchopen SW vt ="+values.OV+"vh = 0 ron = 1 roff = 1g \n\r"
		 + ".model swclosed SW vt ="+values.OV+" vh = 0 ron = 1g roff = 1 \n\r ";
		
		 
		var circuit = {};
		
	   	circuit.name = "SPDT";
	   	
		this.subcircuit = 	".SUBCKT SPDT N1 N2  NCOMMON  NC1  NO1 \n\r"
							+"S1 NC1 NCOMMON N1 N2 swclosed on \n\r"
							+"S2 NCOMMON NO1 N1 N2 switchopen off \n\r"
							+".ENDS\n\r";

						  
		console.log(this.subcircuit);
        
		return {type:'ngspice',msg:"XRelay "+Source+" "+GND+" "+X+" "+NC+" "+NO+" "+circuit.name};

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
             this.svgNodes[1].attr({fill:"#" + this.c1});
             this.svgNodes[2].attr({fill:"#" + this.c2});
         }
         
         this._super(attributes);
    },

    getSVG: function(){
    
    	
        return '<svg width="95.99999999999999" height="95.99999999999999" xmlns="http://www.w3.org/2000/svg"> <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ --> <title>Layer 1</title>  <rect fill="#ffffff" stroke-width="2" stroke-opacity="null" x="11.31229" width="68.68771" height="96" id="svg_24" stroke="#000000" y="0.15489"/>  <path fill="#000000" stroke-width="0" stroke-opacity="null" d="m71.19517,44.97501l-1.50253,0.89581l-7.51981,-12.77637l1.12797,-0.38329l7.89436,12.26385l0.00001,0z" id="svg_4" stroke="#000000"/>  <path stroke="#000000" id="svg_3" d="m68.68,49.47014l-6.20127,11.02972l1.55032,0.85313l5.32922,-10.54221l-0.67827,-1.34063l0,-0.00001z" stroke-opacity="null" stroke-width="0" fill="#000000"/>  <path fill="#fff" stroke="#000" stroke-width="1.5" opacity="0.96" d="m45.7159,9.54905" id="svg_1"/>  <metadata id="svg_9">image/svg+xml</metadata>  <path stroke="#000000" d="m14.97971,16.92945l0.4855,-0.42761c0,0 22.65772,0 22.65772,7.99733c0,7.99735 -22.65772,7.99735 -22.65772,7.99735c-1.96751,0 22.65772,0 22.65772,7.99735c0,7.99733 -22.65772,7.99733 -22.65772,7.99733c-1.96753,0 22.65772,-0.1882 22.65772,7.99735c0,8.18553 -22.65772,7.99733 -22.65772,7.99733c-3.60712,-0.1882 22.65772,0 22.65772,7.99735c0,7.99733 -22.65772,7.99733 -22.65772,7.99733l0.08197,-0.4459" id="svg_7" stroke-width="2" fill-rule="evenodd" fill-opacity="0.75" fill="none"/>  <line fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="0.75" x1="43.11856" y1="12.0857" x2="43.11856" y2="86.39463" id="svg_12" stroke-linejoin="null" stroke-linecap="null" stroke="#000000"/>  <path fill="#fff" stroke="#000" stroke-width="1.5" opacity="0.96" d="m64.81399,9.54905" id="svg_18"/>  <line fill="none" stroke="#000000" stroke-width="2" stroke-opacity="null" fill-opacity="0.75" x1="16.5" y1="16.5" x2="0" y2="16.5" id="svg_25" stroke-linejoin="null" stroke-linecap="null"/>  <line fill="none" stroke="#000000" stroke-width="2" stroke-opacity="null" fill-opacity="0.75" x1="16.5" y1="80.5" x2="0" y2="80.5" id="svg_27" stroke-linejoin="null" stroke-linecap="null"/>  <line fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="0.75" x1="60.03382" y1="16.5" x2="96" y2="16.5" id="svg_28" stroke-linejoin="null" stroke-linecap="null" stroke="#000000"/>  <line fill="none" stroke-width="2" stroke-opacity="null" fill-opacity="0.75" x1="60" y1="80.5" x2="96" y2="80.5" id="svg_29" stroke-linejoin="null" stroke-linecap="null" stroke="#000000"/>  <line fill="none" stroke="#000000" stroke-width="2" stroke-opacity="null" fill-opacity="0.75" x1="61.02142" y1="16.30101" x2="61.02142" y2="29.49605" id="svg_30" stroke-linejoin="null" stroke-linecap="null"/>  <line fill="none" stroke="#000000" stroke-width="2" stroke-opacity="null" fill-opacity="0.75" x1="61.02142" y1="66.65052" x2="61.02142" y2="79.84556" id="svg_31" stroke-linejoin="null" stroke-linecap="null"/>  <ellipse fill="#000000" stroke="#000000" stroke-width="2" stroke-opacity="null" cx="61.10823" cy="64.30666" id="svg_33" rx="3.38557" ry="2.86471"/>  <ellipse fill="#000000" stroke="#000000" stroke-width="2" stroke-opacity="null" cx="60.93461" cy="29.23563" id="svg_32" rx="3.38557" ry="2.86471"/>  <line fill="none" stroke="#000000" stroke-width="2" stroke-opacity="null" fill-opacity="0.75" x1="75" y1="48" x2="96" y2="48" id="svg_34" stroke-linejoin="null" stroke-linecap="null"/>  <ellipse fill="#000000" stroke="#000000" stroke-width="2" stroke-opacity="null" cx="72.91432" cy="48.33371" id="svg_35" rx="3.38557" ry="2.86471"/> </svg>';
    }
  });

      // custom locator for the special design of the ResistorBridge Input area
	  draw2d.shape.analog.SPTD.inputLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.SPTD.inputLocator',
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
	            	figure.setPosition(0, 80); 
	            if( index == 1 )
	            	figure.setPosition(0, 16); 
	            if( index == 2 )
	            	figure.setPosition(96, 80); 
	            if( index == 3 )
	            	figure.setPosition(96, 48); 
	            if( index == 4 )
	            	figure.setPosition(96, 16); 
            }
            else if( r == 90 )
            {
	            if( index == 0 )
	            	figure.setPosition(16, 0); 
	            if( index == 1 )
	            	figure.setPosition(80, 0);  
	            if( index == 2 )
	            	figure.setPosition(16, 96); 
	            if( index == 3 )
	            	figure.setPosition(48, 96);
	          	if( index == 4 )
	            	figure.setPosition(80, 96); 
            }
            else if( r == 180 )
            {
	            if( index == 0 )
	            	figure.setPosition(96, 80); 
	            if( index == 1 )
	            	figure.setPosition(96, 16); 
	            if( index == 2 )
	            	figure.setPosition(0, 16); 
	            if( index == 3 )
	            	figure.setPosition(0, 48); 
	            if( index == 4 )
	            	figure.setPosition(0, 80); 
            }
            else if( r == 270 )
            {
	            if( index == 0 )
	            	figure.setPosition(80, 96); 
	            if( index == 1 )
	            	figure.setPosition(16, 96); 
	            if( index == 2 )
	            	figure.setPosition(80, 0); 
	            if( index == 3 )
	            	figure.setPosition(48, 0); 
	            if( index == 4 )
	            	figure.setPosition(16, 0); 
            }
            
        }
    });

    draw2d.shape.analog.SPTD.labelLocator = draw2d.layout.locator.Locator.extend({
		NAME : 'draw2d.shape.analog.SPTD.labelLocator',
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