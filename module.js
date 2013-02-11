if (typeof (cto_hozwe) == "undefined" || !cto_hozwe) var cto_hozwe = {};
else if (cto_hozwe && typeof(cto_hozwe) != "object")
    throw new Error("cto_hozwe is not an Object type");

cto_hozwe.EVENTS = {
    NAME: "Event handling module",
    VERSION: 1.0,
    
    addEventHandler: function(oNode, sEvt, fnHandler, bCapture) {
        if (typeof (oNode.attachEvent) != "undefined")
            oNode.attachEvent("on" + sEvt, fnHandler);
        else
            oNode.addEventListener(sEvt, fnHandler, bCapture);
    },

    removeEventHandler: function(oNode, sEvt, fnHandler, bCapture) {
        if (typeof (oNode.detachEvent) != "undefined")
            oNode.detachEvent("on" + sEvt, fnHandler);
        else
            oNode.removeEventListener(sEvt, fnHandler, bCapture);
    },

    getEventTarget: function(evt) {
        if (typeof(window.event.srcElement) != "undefined") return window.event.srcElement;
        else return evt.target;
    },

    stopEvent: function(evt) {
        if (typeof(window.event.cancelBubble) != "undefined") window.event.cancelBubble=true;
        else evt.stopPropagation();
    },
    
    preventDefault: function(evt) {
        if (typeof(window.event.returnValue) != "undefined") window.event.returnValue=false;
        else evt.preventDefault();
    }
}
=======
if (typeof (cto_hozwe) == "undefined" || !cto_hozwe) var cto_hozwe = {};
else if (cto_hozwe && typeof(cto_hozwe) != "object")
    throw new Error("cto_hozwe is not an Object type");

cto_hozwe.EVENTS = {
    NAME: "Event handling module",
    VERSION: 1.0,
    
    addEventHandler: function(oNode, sEvt, fnHandler, bCapture) {
        if (typeof (oNode.attachEvent) != "undefined")
            oNode.attachEvent("on" + sEvt, fnHandler);
        else
            oNode.addEventListener(sEvt, fnHandler, bCapture);
    },

    removeEventHandler: function(oNode, sEvt, fnHandler, bCapture) {
        if (typeof (oNode.detachEvent) != "undefined")
            oNode.detachEvent("on" + sEvt, fnHandler);
        else
            oNode.removeEventListener(sEvt, fnHandler, bCapture);
    },

    getEventTarget: function(evt) {
        if (typeof(window.event.srcElement) != "undefined") return window.event.srcElement;
        else return evt.target;
    },

    stopEvent: function(evt) {
        if (typeof(window.event.cancelBubble) != "undefined") window.event.cancelBubble=true;
        else evt.stopPropagation();
    },
    
    preventDefault: function(evt) {
        if (typeof(window.event.returnValue) != "undefined") window.event.returnValue=false;
        else evt.preventDefault();
    }
}
