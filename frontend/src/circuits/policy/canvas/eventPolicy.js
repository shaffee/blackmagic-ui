import draw2d from 'draw2d';

export default draw2d.policy.canvas.CanvasPolicy.extend({
    NAME: 'MyPolicy',
    imageSrc:'',
    init: function() {
      this._super();
      
      //lert("done");
    },

    onMouseMove( canvas, x, y, shiftKey, ctrlKey ){
        
        var obj = window['selectedComponent'];

        if( obj != null && obj != '' )
        {
            //obj.style.position ="absolute";
            //obj.style.left = x + "px";
            //obj.style.top = y+"px";

	   //console.log(canvas.getAbsoluteX());
            if( !this.canvasX )
            {
                this.canvasX = canvas.getAbsoluteX();
                this.canvasY = canvas.getAbsoluteY();

                console.log(this.canvasX);
            }
            
            if( x < 20 || y < 20 )
            {
                document.getElementById('selectedImg').style.display = 'none';
            }
            else
            if( document.getElementById('selectedImg') )
            {
                ;
                var src = window.location.origin + "/assets/components/"+obj.id+".svg";

                if( this.imageSrc != src )
                {
                    this.imageSrc = src;
                    document.getElementById('selectedImg').src = src;
                }
                
                var xpos =  x + 5;
                var ypos = y + 5;

                document.getElementById('selectedImg').style.display = 'block';
                document.getElementById('selectedImg').style.left = xpos+"px";
                document.getElementById('selectedImg').style.top = ypos+"px";

                //document.getElementById('canvas').style.cursor = 'none';
                //$("#canvas").css("cursor","none");   
            }
        }
        else
        {
            document.getElementById('selectedImg').style.display = 'none';
        }
        
    },
    onMouseDown( canvas, x, y, shiftKey, ctrlKey ){
        this.canvas = canvas;
        var selected = window['selectedComponent']['id']; //window.app.$data.selectedComponent;
        var figure;

        if( selected )
        {
             var type = selected;
             console.log(selected);
             //var model = $(droppedDomNode).data("model");
             var cli = "new "+type+"();";
             console.log(cli);
            //figure = new canvas.shapes[type];

            console.log("init finished");
            console.log("new "+selected+"()");
            figure = eval("new "+selected+"()");
            
            //var p = new window[type]();

             if( typeof model != 'undefined' )
             {
                 //figure.setModel(model);	
             }
             
             
             var canBeAdded = true;
             
             canvas.getFigures().each( function(index,fig){
                 
                 if( fig.type == "analog" && ( figure.type == "digital" || figure.type == "MCU" ) )
                 {
                     //this.simulationType = "";
                     canBeAdded = false;
                     return false;
                 }
                 else if( ( figure.type == "digital" || figure.type == "MCU" ) && figure.type == 'analog' )
                 {
                     canBeAdded = false;
                     return false;	
                 }
                 
             });
             
             
             if( !canBeAdded )
             {
                 //alert("Mixing Analog with Digital is not supported yet, We are working on this");
                 //notify('Sorry','Mixing Analog with Digital is not supported yet, We are working on this','error');
                 return false;
             }
             
             console.log("add 1");
             var segments = type.split(".");
             var name = segments[segments.length-1];
             figure.setUserData({name:name});
             console.log(figure);
             console.log("add 2");
             // create a command for the undo/redo support
       
            console.log("canvas",canvas);
             console.log("figure",figure);
             //debugger;
             
             var command = new draw2d.command.CommandAdd(canvas, figure, x+5, y+5);
             canvas.getCommandStack().execute(command);
             console.log("add 3");
             /*
             this.setCurrentSelection(figure);
             figure.onClick();
     */
             if( typeof figure.setDefaultValues != 'undefined' )
             {
                 /*
                 if( this.elementsCounter.hasOwnProperty( figure.NAME ) )
                     this.elementsCounter[figure.NAME]++;
                 else
                     this.elementsCounter[figure.NAME] = 1;
         
                 figure.setDefaultValues(this.elementsCounter[figure.NAME]);
                */                 
             }
             
             if( typeof figure.afterAdd != 'undefined' )
             {
                 figure.afterAdd(this);
             }
             
             
             if( !window['shiftKey'] )
             {
                document.getElementById('selectedImg').style.display = 'none';
             }
 
        }  
    }

   });
