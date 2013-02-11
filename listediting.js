var gTheList; // global variable to hold the UL object
var gOldContent = "";
var TEXTNODE = 3;

function initListEditor() {
    gTheList = document.getElementById("theList");

    // add the click handler to handle item clicks on LI tags
    // We add the click handler to the UL list itself. We'll figure out
    // later on in the event handler which LI tag was actually clicked on.
    // This saves us from having to add click handlers to EVERY LI tag in the list!
    com_joemarini.EVENTS.addEventHandler(gTheList, "click", itemClick);
    com_joemarini.EVENTS.addEventHandler(document.getElementById('btnAdd'), "click", function() { addNewItem(); }, false);
}

// The user clicked on the UL. Now figure out which LI tag was clicked.
function itemClick(evt) {
    var oTarget = com_joemarini.EVENTS.getEventTarget(evt);

    // if the event target was a text node, figure out its parent LI tag
    if (oTarget.nodeType == TEXTNODE) // "3" means text node. 
        oTarget = getParentTagByName("li", oTarget);

    // on the other hand, if the user clicked directly on the LI, then use it
    if (oTarget && oTarget.nodeName.toLowerCase() == "li") {
        // are we already editing another LI item? If so,
        // remove the current editing controls and move them to the item that was clicked.
        var curEditItem = document.getElementById("itemText");
        if (curEditItem) {
            var oLItag = getParentTagByName("li", curEditItem);
            oLItag.innerHTML = gOldContent;
        }
        gOldContent = oTarget.firstChild.data; // save aside old value of the LI in case the user cancels!
        editListItem(oTarget);
    }
}

// given a tag, look up the LI that is its parent
function getParentTagByName(strTag, oNode) {
    var oParent = oNode.parentNode;

    while (oParent) {
        if (oParent.nodeName.toLowerCase() == strTag)
            return oParent;
        oParent = oParent.parentNode;
    }
    return null;
}

// This function adds a new default item to the UL in the document.
function addNewItem() {
    // create a new LI tag and some text to go with it.
    var oLINode = document.createElement("li");
    var oLIText = document.createTextNode("New Item");
    // Add the text to the LI tag
    oLINode.appendChild(oLIText);
    // Add the finished LI tag to the UL
    gTheList.appendChild(oLINode);
}

// Create the editing controls and display them to the user, positioned inside
// the LI tag that we want to edit.
function editListItem(oLIItem) {
    // get the text content from the LI tag. We use this to set the value
    // of the TextEdit item in a moment.
    var sTextContent = oLIItem.firstChild.data;

    // create the text field for editing the content of the LI tag.
    var oTextField = document.createElement("input");
    oTextField.setAttribute("id", "itemText");
    oTextField.setAttribute("type", "text");
    // now set the initial value to the current content of the LI tag.
    oTextField.setAttribute("value", sTextContent);

    // here's a trick: we're going to temporarily replace the current LI tag with our
    // text box so that it appears like the editing UI is positioned over 
    // the LI tag.
    // replace the text content of the LI with the textfield
    oLIItem.replaceChild(oTextField, oLIItem.firstChild);

    // Now add the Change, Cancel, and Delete Buttons
    var oBtnOK = document.createElement("input");
    oBtnOK.setAttribute("type", "button");
    oBtnOK.setAttribute("value", "  Change  ");
    oBtnOK.className = "formButton";
    com_joemarini.EVENTS.addEventHandler(oBtnOK, "click", commitEdit);

    var oBtnCancel = document.createElement("input");
    oBtnCancel.setAttribute("type", "button");
    oBtnCancel.setAttribute("value", "  Cancel  ");
    oBtnCancel.className = "formButton";
    com_joemarini.EVENTS.addEventHandler(oBtnCancel, "click", cancelEdit);

    var oBtnDEL = document.createElement("input");
    oBtnDEL.setAttribute("type", "button");
    oBtnDEL.setAttribute("value", "  Delete  ");
    oBtnDEL.className = "formButton";
    com_joemarini.EVENTS.addEventHandler(oBtnDEL, "click", deleteItem);

    // add these buttons to the new, temporary list item
    oLIItem.appendChild(oBtnOK);
    oLIItem.appendChild(oBtnCancel);
    oLIItem.appendChild(oBtnDEL);
}

function commitEdit(evt) {
    // get the value from the text field
    var oTextField = document.getElementById("itemText");
    // we have to actually refer to the value property here;
    // doing a getAttribute() call has no effect in Netscape 6
    var sTextContent = oTextField.value;

    // set the innerHTML of the LI to the text.
    // this has the dual purpose of changing the LI's text content and 
    // removing the editing controls at the same time, since the new 
    // HTML code we're inserting does not contain them.
    oTextField.parentNode.innerHTML = sTextContent;
}

// Called when the user clicks the Delete button when editing a list item
function deleteItem(evt) {
    // get the text field object that we're using to edit this list item
    var oTextField = document.getElementById("itemText");
    // Since we've inserted the editing UI directly into the LI tag, then 
    // the parent node of the text box is the LI tag itself. We just need 
    // to use  the parentNode property of the text box to get the LI, then
    // pass that to the removeChild() function on the UL list itself.
    gTheList.removeChild(oTextField.parentNode);
}

// Called when the user clicks the Cancel button when editing a list item
function cancelEdit(evt) {
    var oTextField = document.getElementById("itemText");
    oTextField.parentNode.innerHTML = gOldContent;
}

com_joemarini.EVENTS.addEventHandler(window, "load", function() { initListEditor(); }, false);
