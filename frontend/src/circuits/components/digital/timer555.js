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
draw2d.shape.analog.timer555 = draw2d.shape.analog.ic.extend({

    NAME:"draw2d.shape.analog.timer555",
    params:null,
    // custom locator for the special design of the ResistorBridge Input area
   label:null,
   labelLocator:null,
   pins:null,
   pinsCount:0,
   
    onDoubleClick: function(){    	
    	this.showForm();
    },
    onPortValueChanged: function(relatedPort){
   		console.log("template function");
    },
    
    /**
     * @constructor
     * Create a new instance
     */
    init:function(width, height){
        
		this.pinsCount = 8;
        this._super();
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
	//By Shaffee Mayoof
	onParamsChanged:function(values)
	{
		
	},
	showForm:function()
	{
		var values = this.getUserData();
		console.log(values);
		$('#paramsForm').html('<form></form>');
		var thisObj = this;
		
		
		
		$('#paramsForm form').jsonForm({
			value: values,
			validate: true,
			schema: this.params ,
						  
			params: {
					"fieldHtmlClass": "form-control",
				  },
			"form": [
						"*",
						{
						  "type": "help",
						  "helpvalue": "<strong>Click on <em>Submit</em></strong> when you're done"
						},
						{
						  "type": "submit",
						  "title": "Save Parameters"
						}
					],
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
				thisObj.setUserData(values);
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
		
		
		$.magnificPopup.open({
		  items: {src: '.popup-params',type:'inline'}
		  // You may add options here, they're exactly the same as for $.fn.magnificPopup call
		  // Note that some settings that rely on click event (like disableOn or midClick) will not work here\z
		}, 0);
		
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
		
		
		for(var i=0; i < this.pinsCount/2; i++)
		{
			//console.log("Port Line");
			path.push("M", box.x, " ", box.y+(i*16)+10);    // ...draw line to the right middle
			path.push("L", box.x+10, " ", box.y+(i*16)+10);    // ...draw line to the right middle
			
		}
		
		for(var i=0; i < this.pinsCount/2; i++)
		{
			//console.log("Port Line");
			path.push("M", box.x+box.w-margin, " ", box.y+(i*16)+10);    // ...draw line to the right middle
			path.push("L", box.x+box.w, " ", box.y+(i*16)+10);    // ...draw line to the right middle
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