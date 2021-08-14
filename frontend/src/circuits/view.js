import draw2d from 'draw2d';

window['wireColors'] = [];
window['simulating'] = 0;

import mypolicy from '../circuits/policy/canvas/eventPolicy';
import '../circuits/connections/myConnection.js';
import '../circuits/policy/canvas/CircuitsCloudSelectionPolicy';
import '../circuits/components/digital/digital.js';
import './components/basic/draw2d.shape.basic.componentLabel';
import './components/digital/draw2d.shape.analog.andGate2.js';
import './components/digital/draw2d.shape.analog.count4bit.js';
import './components/digital/draw2d.shape.analog.seg4bit';
import './components/digital/draw2d.shape.analog.digitalClock';
import './components/digital/draw2d.shape.analog.dFlipflop';
import './components/digital/draw2d.shape.analog.seg7h';
import './components/digital/draw2d.shape.analog.seg7v';
import './components/digital/draw2d.shape.analog.seg7';
import './components/digital/draw2d.shape.analog.decoder_2x4.js';
import './components/digital/draw2d.shape.analog.andGate3.js';
import './components/digital/draw2d.shape.analog.BCDC.js';
import './components/digital/draw2d.shape.analog.comp.js';
import './components/digital/draw2d.shape.analog.dFlipflop2.js';
import './components/digital/draw2d.shape.analog.encoder_4x2.js';
import './components/digital/draw2d.shape.analog.fulladder.js';
import './components/digital/draw2d.shape.analog.fullsub.js';
import './components/digital/draw2d.shape.analog.halfadder';
import './components/digital/draw2d.shape.analog.halfsub';
import './components/digital/draw2d.shape.analog.inverter';
import './components/digital/draw2d.shape.analog.jkFlipflop';
import './components/digital/draw2d.shape.analog.jkFlipflop2';
import './components/digital/draw2d.shape.analog.led';
import './components/digital/draw2d.shape.analog.mux2';
import './components/digital/draw2d.shape.analog.mux4';
import './components/digital/draw2d.shape.analog.nandGate2';
import './components/digital/draw2d.shape.analog.nandGate3';
import './components/digital/draw2d.shape.analog.norGate2';
import './components/digital/draw2d.shape.analog.norGate3';
import './components/digital/draw2d.shape.analog.orGate2';
import './components/digital/draw2d.shape.analog.orGate3';
import './components/digital/draw2d.shape.analog.ROM';
import './components/digital/draw2d.shape.analog.srFlipflop';
import './components/digital/draw2d.shape.analog.tFlipflop';
import './components/digital/draw2d.shape.analog.toggleInput';
import './components/digital/draw2d.shape.analog.xnorGate2';
import './components/digital/draw2d.shape.analog.xorGate2';
import './components/digital/draw2d.shape.analog.xnorGate3';
import './components/digital/draw2d.shape.analog.xorGate3';

import './components/analog/draw2d.shape.analog.base';
import './components/analog/draw2d.shape.analog.acCurrent';
import './components/analog/draw2d.shape.analog.acVoltage';
import './components/analog/draw2d.shape.analog.aled';
import './components/analog/draw2d.shape.analog.capacitor';
import './components/analog/draw2d.shape.analog.dcCurrent';
import './components/analog/draw2d.shape.analog.dcVoltage';
import './components/analog/draw2d.shape.analog.diode';
import './components/analog/draw2d.shape.analog.gnd';
import './components/analog/draw2d.shape.analog.inductor';
import './components/analog/draw2d.shape.analog.LDR';
import './components/analog/draw2d.shape.analog.Nmos4Transistor';
import './components/analog/draw2d.shape.analog.npnTransistor';
import './components/analog/draw2d.shape.analog.opamp2';
import './components/analog/draw2d.shape.analog.Pmos4Transistor';
import './components/analog/draw2d.shape.analog.pnpTransistor';
import './components/analog/draw2d.shape.analog.pulseVoltage';
import './components/analog/draw2d.shape.analog.resistorV';
import './components/analog/draw2d.shape.analog.SPTD';
import './components/analog/draw2d.shape.analog.vvd';
import './components/analog/draw2d.shape.analog.zdiode';

import '../circuits/policy/canvas/CircuitsConnectionSelectionFeedbackPolicy';
import '../circuits/policy/canvas/draw2d.layout.connection.circuitsCloudRouter';

window['draw2dobj'] = draw2d;
import '../circuits/eval.js';

export default draw2d.Canvas.extend({
    strict: true,
	policy:null,
	elementsCounter:{},
    defaultRouterClassName:"draw2d.layout.connection.ManhattanConnectionRouter",
    defaultRouter:'',

    shapes:{
        "draw2d.shape.analog.andGate2":draw2d.shape.analog.andGate2,
        "draw2d.shape.analog.count4bit":draw2d.shape.analog.count4bit,
        "draw2d.shape.analog.seg4bit":draw2d.shape.analog.seg4bit,
        "draw2d.shape.analog.digitalClock":draw2d.shape.analog.digitalClock,
        "draw2d.shape.analog.seg7":draw2d.shape.analog.seg7,
        "draw2d.shape.analog.dFlipflop":draw2d.shape.analog.dFlipflop,
        "draw2d.shape.basic.componentLabel":draw2d.shape.basic.componentLabel,
        "draw2d.shape.analog.decoder_2x4":draw2d.shape.analog.decoder_2x4,
        "draw2d.shape.analog.comp":draw2d.shape.analog.comp,
        "draw2d.shape.analog.andGate3":draw2d.shape.analog.andGate3,
        "draw2d.shape.analog.BCDC":draw2d.shape.analog.BCDC,
        "draw2d.shape.analog.dFlipflop2":draw2d.shape.analog.dFlipflop2,
        "draw2d.shape.analog.encoder_4x2":draw2d.shape.analog.encoder_4x2,
        'draw2d.shape.analog.fulladder':draw2d.shape.analog.fulladder,
        'draw2d.shape.analog.fullsub':draw2d.shape.analog.fullsub,
        'draw2d.shape.analog.halfadder':draw2d.shape.analog.halfadder,
        'draw2d.shape.analog.halfsub':draw2d.shape.analog.halfsub,
        'draw2d.shape.analog.inverter':draw2d.shape.analog.inverter,
        'draw2d.shape.analog.jkFlipflop':draw2d.shape.analog.jkFlipflop,
        'draw2d.shape.analog.jkFlipflop2':draw2d.shape.analog.jkFlipflop2,
        'draw2d.shape.analog.led':draw2d.shape.analog.led,
        'draw2d.shape.analog.mux2':draw2d.shape.analog.mux2,
        'draw2d.shape.analog.mux4':draw2d.shape.analog.mux4,
        'draw2d.shape.analog.nandGate2':draw2d.shape.analog.nandGate2,
        'draw2d.shape.analog.nandGate3':draw2d.shape.analog.nandGate3,
        'draw2d.shape.analog.norGate2':draw2d.shape.analog.norGate2,
        'draw2d.shape.analog.norGate3':draw2d.shape.analog.norGate3,
        'draw2d.shape.analog.orGate2':draw2d.shape.analog.orGate2,
        'draw2d.shape.analog.orGate3':draw2d.shape.analog.orGate3,
        'draw2d.shape.analog.ROM':draw2d.shape.analog.ROM,
        'draw2d.shape.analog.srFlipflop':draw2d.shape.analog.srFlipflop,
        'draw2d.shape.analog.tFlipflop':draw2d.shape.analog.tFlipflop,
        'draw2d.shape.analog.toggleInput':draw2d.shape.analog.toggleInput,
        'draw2d.shape.analog.xnorGate2':draw2d.shape.analog.xnorGate2,
        'draw2d.shape.analog.xorGate2':draw2d.shape.analog.xorGate2,
        'draw2d.shape.analog.xnorGate3':draw2d.shape.analog.xnorGate3,
        'draw2d.shape.analog.xorGate3':draw2d.shape.analog.xorGate3,


        'draw2d.shape.analog.acCurrent':draw2d.shape.analog.acCurrent,
        'draw2d.shape.analog.acVoltage':draw2d.shape.analog.acVoltage,
        'draw2d.shape.analog.aled':draw2d.shape.analog.aled,
        'draw2d.shape.analog.capacitor':draw2d.shape.analog.capacitor,
        'draw2d.shape.analog.dcCurrent':draw2d.shape.analog.dcCurrent,
        'draw2d.shape.analog.dcVoltage':draw2d.shape.analog.dcVoltage,
        'draw2d.shape.analog.diode':draw2d.shape.analog.diode,
        'draw2d.shape.analog.gnd':draw2d.shape.analog.gnd,
        'draw2d.shape.analog.inductor':draw2d.shape.analog.inductor,
        'draw2d.shape.analog.LDR':draw2d.shape.analog.LDR,
        'draw2d.shape.analog.Nmos4Transistor':draw2d.shape.analog.Nmos4Transistor,
        'draw2d.shape.analog.npnTransistor':draw2d.shape.analog.npnTransistor,
        'draw2d.shape.analog.opamp':draw2d.shape.analog.opamp,
        'draw2d.shape.analog.opamp2':draw2d.shape.analog.opamp2,
        'draw2d.shape.analog.Pmos4Transistor':draw2d.shape.analog.Pmos4Transistor,
        'draw2d.shape.analog.pnpTransistor':draw2d.shape.analog.pnpTransistor,
        'draw2d.shape.analog.pulseVoltage':draw2d.shape.analog.pulseVoltage,
        'draw2d.shape.analog.resistorV':draw2d.shape.analog.resistorV,
        'draw2d.shape.analog.SPTD':draw2d.shape.analog.SPTD,
        'draw2d.shape.analog.vvd':draw2d.shape.analog.vvd,
        'draw2d.shape.analog.zdiode':draw2d.shape.analog.zdiode,

    },

	init:function(id)
    {
        this.defaultRouter = new draw2d.layout.connection.ManhattanConnectionRouter();
		this._super(id);
		
		this.setScrollArea("#"+id);
		
		this.currentDropConnection = null;
		
		draw2d.policy.canvas.SnapToGridEditPolicy.GRID_COLOR = "#eeeeee";
		this.policy = new draw2d.policy.canvas.SnapToGridEditPolicy(16);
		
		//canvas.installEditPolicy(new draw2d.policy.canvas.ShowDotEditPolicy());
           
        var policy = new mypolicy();
        this.installEditPolicy(policy); 
           
		
        this.installEditPolicy(this.policy);

        this.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy());

        this.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
            createConnection: this.createConnection
        }));

        
        //var figure1 = new draw2d.shape.node.Fulcrum();
        this.on("select", function(canvas, event){

            //shaffee
            event;

            var selectionSize = canvas.getSelection().getSize();
            
            if( selectionSize == 0 )
            {
                canvas.getAllPorts().each(function(i,figure){
                    figure.setVisible(false);

                    if( typeof figure.label != 'undefined' )
                    {
                        figure.getParent().remove(figure.label);
                    }
                });	
                
                //$("#statusBar").html(""); // print the equation

            }

            if( selectionSize <= 1 )
            {
                canvas.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy( ));
                canvas.installEditPolicy(new draw2d.policy.canvas.SnapToGridEditPolicy(16));
                canvas.getFigures().each(function(i,figure){
                    figure.canSnapToHelper = true;
                });
            }
            else
            {
                canvas.getAllPorts().each(function(i,figure){
                    figure.setVisible(false);
                });	
            }
        });


        //this.installEditPolicy( new draw2d.policy.canvas.SnapToGeometryEditPolicy());
	},
	setDefaultRouterClassName: function(  defaultRouterClassName){
	    this.defaultRouterClassName=  defaultRouterClassName;
        this.defaultRouter = eval("new "+defaultRouterClassName+"()");
	},
    createConnection: function(){

        var conn =  new draw2d.MyConnection();
        conn.setRouter(new draw2d.layout.connection.circuitsCloudRouter());
	    return conn;

        /*
	    var conn = new draw2d.MyConnection();
	    conn.setRouter(this.defaultRouter);
	    conn.setOutlineStroke(1);
	    conn.setOutlineColor("#303030");
	    conn.setStroke(3);
	    conn.setRadius(5);
	    conn.setColor('#00A8F0');
	    return conn;
        */
	},

    onDragEnter:function(node)
    {
        console.log("33#");
    },

    /**
     * @method
     * Called if the DragDrop object is moving around.<br>
     * <br>
     * Graphiti use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     * 
     * @param {HTMLElement} droppedDomNode The dragged DOM element.
     * @param {Number} x the x coordinate of the drag
     * @param {Number} y the y coordinate of the drag
     * 
     * @template
     **/
    onDrag:function(droppedDomNode, x, y )
    {
        console.log("1");
    },
    
    /**
     * @method
     * Called if the user drop the droppedDomNode onto the canvas.<br>
     * <br>
     * Draw2D use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     * 
     * @param {HTMLElement} droppedDomNode The dropped DOM element.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @private
     **/
    onDrop:function(droppedDomNode, x, y)
    {
        /*
        var type = $(droppedDomNode).data("shape");
        
        var model = $(droppedDomNode).data("model");
        
        var figure = eval("new "+type+"();");

        if( typeof model != 'undefined' )
	    {
	    	//console.log("set model");
	    	//console.log(model);
	    	figure.setModel(model);	
	    }
	    
	    
	    var canBeAdded = true;
	    
	    this.getFigures().each( function(index,fig){
    		
    		if( fig.type == "analog" && ( figure.type == "digital" || figure.type == "MCU" ) )
    		{
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
    		notify('Sorry','Mixing Analog with Digital is not supported yet, We are working on this','error');
    		return false;
    	}
    	
        var segments = type.split(".");
        var name = segments[segments.length-1];
        figure.setUserData({name:name});
        
        // create a command for the undo/redo support
        var command = new draw2d.command.CommandAdd(this, figure, x, y);
        this.getCommandStack().execute(command);
        
        this.setCurrentSelection(figure);
        figure.onClick();

        if( typeof figure.setDefaultValues != 'undefined' )
        {
	        if( this.elementsCounter.hasOwnProperty( figure.NAME ) )
	        	this.elementsCounter[figure.NAME]++;
	        else
	        	this.elementsCounter[figure.NAME] = 1;
	
	        figure.setDefaultValues(this.elementsCounter[figure.NAME]);
	        
	        //console.log(this.elementsCounter);
        }
        
        if( typeof figure.afterAdd != 'undefined' )
        {
	        figure.afterAdd(this);
        }
        */
    }
});

