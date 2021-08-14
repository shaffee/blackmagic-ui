import draw2d from 'draw2d';

export default{
    init: function init(){

        this.loadSession();
        this.autoSave();
    },
    autoSave:function(){
        console.log("saving");
        this.saveSession();
        setTimeout( function(){
            this.autoSave();
        }.bind(this) , 10000 );
    },
    deleteSelected:function(){
        window['canvas'].getCommandStack().startTransaction();
			
        var node = window['canvas'].getSelection().getAll().each( function( indx ,figure ){
          
          var command= new draw2d.command.CommandDelete( figure);
          window['canvas'].getCommandStack().execute(command);
        });
        
        window['canvas'].getCommandStack().commitTransaction();
        
    },
    stop:function()
    {
        window['simulating'] = 0;
    },
    clear:function()
    {
        localStorage.setItem('circuit', '');
        window['canvas'].clear();
    },
    saveSession:function(){
        var writer = new draw2d.io.json.Writer();
        var text = '';
        var res;
        


        writer.marshal(window['canvas'], function(jsonResult){
            text = JSON.stringify(jsonResult,null,2);
        });

        localStorage.setItem('circuit', text);
    },
    loadSession:function(){
        var json = localStorage.getItem('circuit');
 
        if(json == '' || json == null)
         return 0;
         
        if (typeof json === "string" && json.length > 20) {
             json = JSON.parse(json);
         }
         else
         {
             return 0;
         }
   
        // var circuit_obj = JSON.stringify(json,null,2);
        var reader = new draw2d.io.json.Reader();

         console.log(json);
              //console.log(circuit_obj);
        reader.unmarshal(window['canvas'], json );
         
     },
    loadSession2:function(){
       var json = localStorage.getItem('circuit');

       if(json == '' || json == null)
        return 0;
        
        console.log("json",json);
       if (typeof json === "string") {
            json = JSON.parse(json);
        }
  
       json.forEach(function (element) {
        try {

          var o = eval("new "+element.type+"()");
          var source = null;
          var target = null;

          
          for (var i in element) {
              console.log("iii",i);
            var val = element[i];
            if (i === "source") {
              var node = window['canvas'].getFigure(val.node);
              if (node === null) {
                throw "Source figure with id '" + val.node + "' not found";
              }
              source = node.getPort(val.port);
              if (source === null) {
                throw "Unable to find source port '" + val.port + "' at figure '" + val.node + "' to unmarschal '" + element.type + "'";
              }
            } else if (i === "target") {
              node = window['canvas'].getFigure(val.node);
              if (node === null) {
                throw "Target figure with id '" + val.node + "' not found";
              }
              target = node.getPort(val.port);
              if (target === null) {
                throw "Unable to find target port '" + val.port + "' at figure '" + val.node + "' to unmarschal '" + element.type + "'";
              }
            }
          }
          
          if (source !== null && target !== null) {
              console.log("no change");
            // don't change the order or the source/target set.
            // TARGET must always be the second one because some applications needs the "source"
            // port in the "connect" event of the target.
            o.setSource(source);
            o.setTarget(target);
          }
          
          o.setPersistentAttributes(element);
          
          console.log(o);
          //var command = new draw2d.command.CommandAdd(window['canvas'], o, element.x, element.y);
          //window['canvas'].getCommandStack().execute(command);
  
          window['canvas'].add(o);
          window['canvas'].add(o);
        } catch (exc) {
          //debug.error(element, "Unable to instantiate figure type '" + element.type + "' with id '" + element.id + "' during unmarshal by " + _this.NAME + ". Skipping figure..");
          //debug.error(exc);
          //debug.warn(element);
          console.log("errora",exc);
        }
      });
       //circuit = circuit.replace("draw2d.","window['draw2dobj'].");
       //window['draw2dobj']
      /*
       var circuit_obj = JSON.stringify(circuit,null,2);

  console.log(circuit);
       //console.log(circuit_obj);
       reader.unmarshal(window['canvas'], circuit );
       
       //console.log("loaded");
       */
    },
    openCircuit:function(obj){
        var reader = new draw2d.io.json.Reader();
        reader.unmarshal(window['canvas'], obj);
    },
    getJson:function(){

        var writer = new draw2d.io.json.Writer();
        var text = '';        

        writer.marshal(window['canvas'], function(jsonResult){
            text = JSON.stringify(jsonResult,null,2);
        });

        return text;
    },
    getSVG:function(){

        let writer = new draw2d.io.svg.Writer();
        var svg = '';
        writer.marshal(window['canvas'], function(jsonResult){
            svg = jsonResult;
        });

        return svg;
    },
    getPNG:function(){
        var xCoords = [];
        var yCoords = [];
        window['canvas'].getFigures().each(function(i,f){
        var b = f.getBoundingBox();
        xCoords.push(b.x, b.x+b.w);
        yCoords.push(b.y, b.y+b.h);
        });
        var minX   = Math.min.apply(Math, xCoords) - 60;
        var minY   = Math.min.apply(Math, yCoords)- 60;
        var width  = Math.max.apply(Math, xCoords)-minX + 60;
        var height = Math.max.apply(Math, yCoords)-minY + 60;
        let png = '';
        let writer = new draw2d.io.png.Writer();
        writer.marshal(window['canvas'],function(pngResults){
          png = pngResults;
          
        }, new draw2d.geo.Rectangle(minX,minY,width,height));

        return png;
    },
    saveCircuit:function (){
			
			console.log(this);
			
			// called to resolve problem , but
			//https://groups.google.com/forum/#!topic/draw2d-touch/PhwpEyohrWs
			window['canvas'].getFigures().each( function(index,figure){
		
				figure.setPersistPorts(false);
			});
			/*********/
			
			//console.log("saving");
			var currentOpertation = 'saving';
			
			this.stop();

      		var writer = new draw2d.io.json.Writer();
      		var text = '';
      		var res;
      		
      		writer.marshal(window['canvas'], function(jsonResult){
      			text = JSON.stringify(jsonResult,null,2);
      		});
      		
			var xCoords = [];
			var yCoords = [];
			window['canvas'].getFigures().each(function(i,f){
			var b = f.getBoundingBox();
			xCoords.push(b.x, b.x+b.w);
			yCoords.push(b.y, b.y+b.h);
			});
			var minX   = Math.min.apply(Math, xCoords) - 60;
			var minY   = Math.min.apply(Math, yCoords)- 60;
			var width  = Math.max.apply(Math, xCoords)-minX + 60;
			var height = Math.max.apply(Math, yCoords)-minY + 60;
			

			
      		//var title = $("#documentTitle").html();
      		var id = 0; //$("#documentId").html();
      		
      		writer = new draw2d.io.svg.Writer();
      		
          	var svg = '';
          	var png = '';

			writer.marshal(window['canvas'], function(jsonResult){
				svg = jsonResult;
				
				//console.log(svg);
			});
			console.log(text);
			writer = new draw2d.io.png.Writer();
			writer.marshal(window['canvas'],function(pngResults){
		      png = pngResults;
		      
		    }, new draw2d.geo.Rectangle(minX,minY,width,height));
						
            /*
			var formData = $("#form").serializeArray();
			if( formData.length > 0 )
			{
				var data = {
				'title':formData[0].value,
				'tags':formData[1].value,
				'description':formData[2].value,
				'image':png,
				'content':text,
				'editor':'4.2b001',
				svg: svg
				}
			}
			else
            */
			{
				var data = {
				'image':png,
				'content':text,
				'editor':'4.2b001',
				svg: svg
				}
			}

            if( this.saveType == 'fork' )
			{
				//data.title = $('#documentTitle').html();
				//data.saveType = 'fork';
				//data.sharingKey = $("#sharingKey").html();
				//id = '';
			}
			
			var parentObj = this;
			if( this.saveType == 'pdf' || this.saveType == 'print')
			{
                /*
				$.post(baseUrl+"/circuit/exportPDF/"+id, {svg: svg} , function(data) {
				 
				 data = jQuery.parseJSON( data );
				 
				 if( typeof data.status != 'undefined' && data.status == 'success' )
				 {
				 	if( parentObj.saveType == 'print' )
				 	{
						window.open( data.url );
				 	}
				 	else
				 	{
				 		var url = baseUrl+"/circuit/downloadPDF/"+id+"/"+data.file
				 		window.open( url );
				 	}
				 	
				 	this.saveType = 'save';
			     }
				 
				 unblockBody();
				 
				});
				*/
				
			}
			else
			{
                /*
                axios
                .post('http://localhost/circuits-cloud/circuit/save/'+id+"" , data )
                .then(function (response) {
                        console.log(response);
                  });
            
                */
				/*
				$.post(baseUrl+"/circuit/save/"+id, data , function(data) {
					
						
						unblockBody(); 
						$('.panel').unblock(); 
						commands( this , data );
						
						var title = $('#documentTitle').html();
						var id 	= $('#documentId').html();
						
						if( this.saveType == 'fork' )
						{
							$(window).unbind('beforeunload');
							window.location.href = baseUrl+"/circuit/editor/"+id+"/"+version;
						}
						
						$("#createSimulation").attr( 'href' , $("#createSimulation").data('link')+'/'+id+'/'+version );
						
						window.history.pushState("string", "Circuits-Cloud - "+title, baseUrl+"/circuit/editor/"+id+'/'+version);
						
						$.magnificPopup.close();
						var currentOpertation = '';
						
						if( typeof callAfterSave == 'function' )
					  	{
					  		callAfterSave();
					  		
					  		callAfterSave = 0;
					  	}
				});
                */
			}
			/*
      		$.post("{site.url}/circuit/save/"+id, { content: text.toString() , image: png , svg: svg} , function(data) {
					  unblockBody(); 
      				  commands( this , data );
      				 
      				  
      				});
      		*/
      		
      		window['canvas'].installEditPolicy( window['canvas'].policy );
      		
      		
      		//showSVG(window['canvas']);
	},
    simulate: function ()
    {
        /*
        $.each( w2ui['layout'].get("main").tabs.tabs , function( index , tab ){
            
            if(tab.id != 'editor')
            {
                    w2ui['layout'].get("main").tabs.hide(tab.id);
            }
        });
        
        
        w2ui['layout'].get("main").tabs.click('editor');
        
        w2ui['layout'].hide("left");
        w2ui['layout'].hide('right',true);
        $(".draw2d_InputPort").css("visibility","hidden");
        $(".draw2d_OutputPort").css("visibility","hidden");
        $(".draw2d_HybridPort").css("visibility","hidden");
        */
        
        //OnlyPolicy = new draw2d.policy.canvas.ReadOnlySelectionPolicy();
        //window['canvas'].installEditPolicy(readOnlyPolicy);

        //console.log("Simulation #"+id);
        
        window['simulating'] = 1;
        //("#chartSimulation").show();
        //$("#errorsDiv").hide();

        var simulationType = 'digital';

        if( simulationType == "analog" )
        {
            simulationType = 'analog';
        
            //$("#stopButton").show();
            //$("#runButton").hide();
            //simulateAnalog(id);
            return false;
        }
        else if( simulationType == "digital" )
        {						
            //$("#stopButton").show();
            //$("#runButton").hide();
            
            simulationType = 'digital';
            this.simulateDigital();
            return false;
        }
        
    },

    simulateDigital: function ()
    {
        var probs = [];
        var probsControllers = [];

        window['canvas'].getFigures().each( function(index,figure){
            
            if( typeof figure.emulator != 'undefined' && figure.emulator  )
            {
                //showEmulatorDebugger = true;
                
                var mcu = figure;
            }
            
            if( figure.NAME == "draw2d.shape.node.outTerminal" )
            {
                figure.updateAssociatedPorts(window['canvas']);
            }
            
            if(Object.prototype.hasOwnProperty.call( window['canvas'].elementsCounter , figure.NAME ) )
                window['canvas'].elementsCounter[figure.NAME]++;
            else
                window['canvas'].elementsCounter[figure.NAME] = 1;
        });


        window['canvas'].getFigures().each( function(index,figure){
            
            if( figure.NAME == "draw2d.shape.analog.digitalClock" || figure.NAME == "draw2d.shape.analog.toggleInput" )
            {
                try
                {
                    figure.output.setValue("0"); 
                }
                catch( e )
                {
                    console.log("error",e);
                }
                
                figure.onParamsChanged( figure.getUserData() );
            }
            

        });
        
        var frequencies = [];
        
        window['canvas'].getFigures().each( function(index,figure){
            
            if( figure.NAME == "draw2d.shape.analog.digitalClock" || figure.NAME == "draw2d.shape.analog.toggleInput" )
            {
                try
                {
                    figure.output.setValue("1"); 
                    figure.onClick();
                }
                catch( e )
                {
                        console.log(e);
                }
                
                figure.onParamsChanged( figure.getUserData() );
            }
            

        });

        window['canvas'].getFigures().each( function(index,figure){
            
            if( typeof figure.run != 'undefined' )
            {
                figure.run();	
            }
            
            if( typeof figure.calls != 'undefined' )
            {
                figure.calls = 0;
            }
            
            if( typeof figure.frequency != 'undefined' )
            {
                frequencies.push(figure.frequency);	
            }
        });
        
        
        for(var i=120;i>10;i--)
        {
            var modulus = 0;
            
            for( var s=0; s<frequencies.length; s++ )
            {
                //freuqncy multiplied by 2 because in each T we have to go high and low in one cycle.
                modulus += (i/(frequencies[s]*2))-Math.floor(i/(frequencies[s]*2));
            }
            
            if( !modulus )
            {
                break;	
            }
        }
        
        for( var time=1000; time<2000; time++ )
        {
            var executeFrequencies = time/i;
            
            if( Number.isInteger(executeFrequencies) )
            break;
        }
        

        window['canvas'].getFigures().each( function(index,figure){
            
            if( typeof figure.frequency != 'undefined' )
            {
                figure.callsPerSecond = i;
            }
        });
        
        console.log(i);
        console.log("clock");
        console.log(executeFrequencies);
        //var simulationClock = ( i

        window['canvas'].getLines().each(function(i,line){
            line.removeCssClass("object-black");
            line.removeCssClass("object-blue");
        });
        
        var totalCalls = 0;
        var callsPerSecond = i;
        
        
        function myTimeoutFunction()
        {
                window['canvas'].getFigures().each( function(index,figure){
                    
                        if( typeof figure.timer10msTick != 'undefined' )
                        figure.timer10msTick();
                });
                
                window['canvas'].getLines().each(function(i,line){

                    if( window['simulating'] == 1 )
                    {
                        var outPort = line.getSource();
                        var inPort  = line.getTarget();

                        //console.log("output",outPort);
                        //console.log("inPort",inPort);

                        var outputValue;

                        if( typeof inPort.direction != 'undefined' && inPort.direction == 'out' )
                        {
                            outputValue = inPort.getValue();
                            outPort.setValue(outputValue);
                        }
                        else 
                        {
                            outputValue = outPort.getValue();
                            inPort.setValue(outputValue);
                        }

                        //console.log(outputValue);

                        var color = parseInt(outputValue)?"#C21B7A":"#0078F2";

                        line.setColor(color);
                    }
                });
                
                
            
                
            if( window['simulating'] == 1 )
            {
                    
                    for( i=0; i<probsControllers.length; i++ )
                    {
                        probsControllers[i]();	
                        //console.log("calling prob",probsControllers[i]);
                    }

                    /*
                    var seconds = ++totalCalls/callsPerSecond;
                    
                    milli = Math.floor( (seconds - Math.floor(seconds)) * 1000 );
                    
                    if( milli == 0 )
                    milli = "000";
                    else if( milli <= 10 ) 
                        milli *= 100;
                    else if( milli <= 100 )
                        milli *= 10;
                    
                    if( milli == 1000 ) milli = "000";
                    
                    seconds = Math.floor(seconds);

                    $("#simulationTiming").html("<h4><b>"+seconds+"</b> s "+milli+" ms</h4>");
                    */

                
                setTimeout(myTimeoutFunction, executeFrequencies);
            }
        }
        
        myTimeoutFunction();

        /*
        //updating the terminals
        showEmulatorDebugger = false;
        mcu = null;
        
        window['canvas'].getFigures().each( function(index,figure){
            
            if( typeof figure.emulator != 'undefined' && figure.emulator  )
            {
                showEmulatorDebugger = true;
                
                mcu = figure;
            }
            
            if( figure.NAME == "draw2d.shape.node.outTerminal" )
            {
                figure.updateAssociatedPorts(window['canvas']);
            }
            
            if( window['canvas'].elementsCounter.hasOwnProperty( figure.NAME ) )
                window['canvas'].elementsCounter[figure.NAME]++;
            else
                window['canvas'].elementsCounter[figure.NAME] = 1;
        });
    
        if( showEmulatorDebugger == true )
        {
            $("#peropertiesPanel").html( "<div style='margin:20px;font-size:40px;text-align:center;' id='mcuTime'></div><div id='slider' style='margin:0 10px'></div><br/><br/><div id='debugger-containter'>"+$("#emulatorDebugData").html()+"</div>" );
            
            w2ui['layout'].show('right');
            
            $("#emulatorDebugData").html('');
                
                var data = mcu.getUserData();
                
                if( typeof data.formData.speed == 'undefined' || !data.formData.speed )
                data.formData.speed = 4;
                
                var cyclesPerSecond = (data.formData.speed/4)*1000000;
                var passedCycles = 0;
                var cyclesPerCall = 50000;
                
                setTimeout( function(){
                        unblockBody();
                        var callInterval = (1/(cyclesPerSecond/cyclesPerCall)) * 1000;
                        mcuExecuter = setInterval(function(){
                            var command = {"type":"steps","cycles":(cyclesPerCall+"")};
                            
                            passedCycles += cyclesPerCall;
                            
                            seconds = passedCycles/cyclesPerSecond;
                            
                            milli = Math.floor( (seconds - Math.floor(seconds)) * 1000 );
                            
                            if( milli == 0 )
                            milli = "000";
                            else if( milli <= 10 ) 
                                milli *= 100;
                            else if( milli <= 100 )
                                milli *= 10;
                            
                            if( milli == 1000 ) milli = "000";
                            
                            seconds = Math.floor(seconds);
    
                            $("#mcuTime").html("<b>"+seconds+"</b> s "+milli+" ms");
                            mcuNacl.postMessage( command );
                        
                        }, callInterval);
                }, 2000 );
        }

        window['canvas'].getFigures().each( function(index,figure){
            
            if( figure.NAME == "draw2d.shape.analog.digitalClock" || figure.NAME == "draw2d.shape.analog.toggleInput" )
            {
                try
                {
                    figure.output.setValue("0"); 
                }
                catch( e )
                {
                    
                }
                
                figure.onParamsChanged( figure.getUserData() );
            }
            

        });
        
        frequencies = [];
        
        window['canvas'].getFigures().each( function(index,figure){
            
            if( typeof figure.run != 'undefined' )
            {
                figure.run();	
            }
            
            if( typeof figure.calls != 'undefined' )
            {
                figure.calls = 0;
            }
            
            if( typeof figure.frequency != 'undefined' )
            {
                frequencies.push(figure.frequency);	
            }
        });
        
        
        for(i=120;i>10;i--)
        {
            var modulus = 0;
            
            for( s=0; s<frequencies.length; s++ )
            {
                //freuqncy multiplied by 2 because in each T we have to go high and low in one cycle.
                modulus += (i/(frequencies[s]*2))-Math.floor(i/(frequencies[s]*2));
            }
            
            if( !modulus )
            {
                break;	
            }
        }
        
        for( time=1000; time<2000; time++ )
        {
            executeFrequencies = time/i;
            
            if( Number.isInteger(executeFrequencies) )
            break;
        }
        

        window['canvas'].getFigures().each( function(index,figure){
            
            if( typeof figure.frequency != 'undefined' )
            {
                figure.callsPerSecond = i;
            }
        });
        
        console.log(i);
        console.log("clock");
        console.log(executeFrequencies);
        //var simulationClock = ( i

        window['canvas'].getLines().each(function(i,line){
            line.removeCssClass("object-black");
            line.removeCssClass("object-blue");
        });
        
        var totalCalls = 0;
        var callsPerSecond = i;
        
        
        function myTimeoutFunction()
        {
                window['canvas'].getFigures().each( function(index,figure){
                    
                        if( typeof figure.timer10msTick != 'undefined' )
                        figure.timer10msTick();
                });
                
                window['canvas'].getLines().each(function(i,line){

                    if( simulating == 1 )
                    {
                        var outPort = line.getSource();
                        var inPort  = line.getTarget();

                        if( typeof inPort.direction != 'undefined' && inPort.direction == 'out' )
                        {
                            var outputValue = inPort.getValue();
                            outPort.setValue(outputValue);
                        }
                        else 
                        {
                            var outputValue = outPort.getValue();
                            inPort.setValue(outputValue);
                        }

                        var color = parseInt(outputValue)?"#C21B7A":"#0078F2";

                        line.setColor(color);
                    }
                });
                
                
            
                
            if( simulating == 1 )
            {
                    for( i=0; i<probsControllers.length; i++ )
                    {
                        probsControllers[i]();	
                    }

                    var seconds = ++totalCalls/callsPerSecond;
                    
                    milli = Math.floor( (seconds - Math.floor(seconds)) * 1000 );
                    
                    if( milli == 0 )
                    milli = "000";
                    else if( milli <= 10 ) 
                        milli *= 100;
                    else if( milli <= 100 )
                        milli *= 10;
                    
                    if( milli == 1000 ) milli = "000";
                    
                    seconds = Math.floor(seconds);

                    $("#simulationTiming").html("<h4><b>"+seconds+"</b> s "+milli+" ms</h4>");


                
                setTimeout(myTimeoutFunction, executeFrequencies);
            }
        }
        
        myTimeoutFunction();
        
        
        if( !showEmulatorDebugger )
        {
            setTimeout(function () {
                unblockBody();
            }, 200);
        }

        var probLines = new Array();
        var totalProbs = 0;
        
        console.log(probs);
        console.log("probs");
        
        w2ui['layout'].hide('bottom',true);
        for(var prop in probs) {
            if (probs.hasOwnProperty(prop)) {
                w2ui['layout'].show('bottom',true);
                break;
            }
        }			

        
        
        var x = [];
        
        $("#probs").html('');
        $("#probs").prepend("<div id='simulationTiming' style='text-align:right;padding:0 20px;'></div>");
        */

        var totalProbs = 0;
        var probLines = new Array();
        var x = [];

        window['canvas'].getLines().each(function(i,line){

            var values = line.getUserData();

            if( values['enable_prob'] )
            probs.push(line.id);
        });

        console.log("probs",probs);
        $("#drawing").html('');

        $.each( probs, function( index , value ){
            
            //console.log(totalProbs);
            totalProbs++;
            
            var line = window['canvas'].getLine(value);
            var data = line.getUserData();

            probLines.push(line);
            
            var elementId = 'prob-'+value;
            
            var label = data['label'];
            $("#drawing").append('<div class="prob-container"><div  id="'+elementId+'"></div></div>');
            var w = $("#drawing").width();// - $(".prob-label").first(0).width();
            var h = 60;
            var y = null;
            var intervalTime = 2;
            var data = d3.range(900).map(function(n){
                return 0;
            });
            
            var index = probLines.length-1;

            var shift = function()
            {
                //console.log("called");
                if( window['simulating'] == 0   )
                    return 0;
                    
                    //console.log("target port value",probLines[index].targetPort.value);
                var val = parseInt(probLines[index].targetPort.value)*30+3;

                if( val != 0 && val != 33 ) val = 1;
                
                data.push(val);
                
                
                    vis
                    .selectAll("path")
                    .attr("d", path)
                    .transition()
                    .duration( intervalTime )
                    
                    data.shift();
            };
            
            probsControllers.push(shift);
            
            x[index] = d3.scaleLinear().domain([0, data.length - 1]).range([0, w]);
            y = d3.scaleLinear().domain([0, 50]).range([h, 0]);

            x[index].range([0, w]);

            d3.select(window).on('resize', function() {
                // update width

                    
                var ind = 0;
                $.each( probs, function( index , value ){
                    var elementId = 'prob-'+value;
                    
                    var svgWidth = $("#drawing").width();
                    width = svgWidth;

                    d3.select("#"+elementId).select("svg").attr("width", svgWidth);

                    // reset x range
                    x[ind++].range([0, width]);
                    
                    d3.select("#"+elementId).select("svg").select("text")
                    .attr("dx", function(d, i) {
                        return width + 20;
                    })
                    .attr("dy", 20)
                    .attr('stroke','#000000');
                });

                // do the actual resize...
            }); 

            var vis  = d3.select("#"+elementId).append("svg:svg").attr("width", w).attr("height", h).append("svg:g").attr("width", w);
            
            //testa.vis = vis;
            d3.select("#"+elementId).select("svg").select("g")
            .append("text")
            .attr("dx", function(d, i) {
                return w - 10;
            })
            .attr("dy", 15)
            .attr("text-anchor","end")
            .attr("font-family","Tahoma")
            .attr("font-size", "15px")
            .attr("letter-spacing","2px")
            .attr('fill','#000000')
            .attr("stroke","#000000")
            .attr("stroke-width","0")
            .text(label);
            
            
            var path = d3.line().x(function(d, i) {
                
                return x[index](i);
            }).y(function(d, i) {
                return y(d);
                
            });
            //.interpolate("step-before");
            
            vis.selectAll("path")
                .data([data])
                .enter()
                .append("svg:path")
                .attr("d", path)
                .attr('stroke', '#000000')
                .attr('stroke-width', 1)
                .attr('fill', 'none');				
            shift();
            
        });
        
        /*

        bottomPanel.setHeight(totalProbs * 42) ;
        
        ///w2ui['layout'].show('bottom',true);
        $("#chart").hide();

        

        $("#saveShot").off("click");
        saveShot = function (){
            
            $('#simulationResults').block({ message: "Generating Screenshot" });
            
            var imagesData = [];
            
            var  width = $("#probs").width();
            $("#probs .prob-container").each( function(key , obj){
                
                var $container = $(obj).find('svg');
                content = $container.html().trim();

                $('body').append('<canvas id="svg-canvas" width="'+width+'" height="50px" style="display:none"></canvas>');
                canvas = document.getElementById('svg-canvas');

                canvg(canvas, content , {offsetX:0.5,offsetY:0.5});
                //console.log(canvas.toDataURL('image/png'));
                // Change img be SVG representation
                imagesData.push(canvas.toDataURL('image/png',1));

            });

            var id 	= $('#documentId').html();
            var title = $("#shotTitle").html();


            $.ajax({
                type: "POST",
                url: siteUrl + "/circuit/saveDigitalSimulationChart/"+id,
                data: {images:imagesData, 'editor':'4.1b001' , 'cid' : id , 'title' : title },
                success: function(data){ 
                    commands( '' , data );
                    //$('.sideways a[href="#simulationsScreenShots"]').tab('show');
                    w2ui['layout'].get('main').tabs.click('simulations');
                    $(".simulationsScreenShots .new-shot").animate({ backgroundColor: "white" }, 2000 );
                    $('#simulationResults').unblock();
                } ,
                dataType: 'text'
            });
            

        }

        $("#digitalStopButton").show();
        $("#digitalRunButton").hide();
        */
    }
    
    
};