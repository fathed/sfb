/*
 * Interactive Signal Flow Builder v2
 * written and designed by J Gibbens November 2015
 *
 * I kept this whole thing in one file for ease of use. All methods are present.
 *
 *
 * start the thing up
 *
 * Z Indexes:
 * background box = 1
 * lableTxt = 999
 * stageIcons = 5
 *
 * @type storeLinkable
 */


/*
 * get this party started - self initializing
 * @type init
 */
var _startSFB = new init();

/*
 *
 * @returns {init}
 */
function init() {
    this._projectName = null;
    this._checkLinkable = new storeLinkable();        // are we linking the stage icons or are we just moving them around
    this._storeTargets = new storeTargets();          // the list of the end targets for jsplumb
    this._storeSources = new storeSource();           // the list of the start targets for jsplumb
    this._storeStageIconID = new keepStageIconID();   // this method stores a number that is used to generate an id for the stage icons
    this._keepStageListID = new keepStageListID();    // keep track for removal of the link list items
    this._taskListNum = new keepTaskNumber();         // keep the number of task lists here so i can add ids for the final tool to hide and show the appropriate task item
    startMethods();
}
/////////////////////////////////////////////////////
function startMethods() {
    keyHandler();
    setUpDialogBoxes();
    editLabelText('label');
    editLabelText('.stageIcons');
    editLabelText('.omLinks');
    buildToolBar();
    killRightClick();
    setUpDeleteIcons();
    addItems();
    getCiscoIcons();
    getEquipmentIcons();
    getStageItemIcons();
    getStageItemConnectorIcons();
    getObjectiveMapLinlksIcons();
    addTasks();
    reloadProject();
    clickToReInit();
}
/*
 * the system checks to see if _startSFB._projectName is empty
 * if it is it forces the user to give a name
 * I will populate the _startSFB._projectName when I load a project - before this is fired off
 */
function giveProjectName() {
    $("#nameDialogBox").toggle();
    $("#nameCancelBtn").click(function () {
        $("#nameDialogBox").hide();
    });
    $("#nameSubmitBtn").click(function () {
        var theVal = $("#projectNameTxt").val();
        if (theVal != null) {
            _startSFB._projectName = theVal;
            saving();
        }
        $("#nameDialogBox").hide();
    });
}
/*
 * A generic dialog box
 * @param {type} msg
 * @returns {undefined}
 */
function msgDialog(msg) {
    $("#dialogMsbBx").show();
    $("#smgMSG").html(msg);
    $("#msgBtn").click(function () {
        $("#dialogMsbBx").hide();
    });
}
/*
 * keep the number of task lists here so i can add ids for the final tool to hide and show the appropriate task item
 * @returns {keepTaskNumber}
 */
function keepTaskNumber() {
    this.taskListNum = 0;
}
/*
 * keep track of the ide given to the link list - the id will be a reference to the array index for removal
 * @returns {keepStageListID}
 */
function keepStageListID() {
    this.currId = 0;
}
/*
 * this method stores a number that is used to generate an id for the stage icons
 * when I reload this page i will go through all the stage icons, get the count, move this number to that count
 * 
 * @returns {keepStageIconID}
 */
function keepStageIconID() {
    this.currId = 0;
}
/*
 * this method stores all the end point conenctions for jsplumb
 *
 * @returns {storeTargets}
 */
function storeTargets() {
    this.target = [];
}
/*
 * this method stores all the starting point conenctions for jsplumb
 *
 * @returns {storeSource}
 */
function storeSource() {
    this.source = [];
}
/*
 * public method to store whether or not the stage icons can be dragged to move or to link
 *
 * @returns {storeLinkable}
 */
function storeLinkable() {
    this.canLink = false;
}
/*
 * drag and drop to make connections
 *
 * @param {type} obj
 * @returns {undefined}
 */
function makeConnections(obj) {
    if (_startSFB._checkLinkable.canLink) {
        $(obj).draggable({revert: true, helper: "clone"});
    } else {
        $(obj).draggable({revert: false, helper: "none"});
    }
}
/*
 * add the links that we have connected to the link list for a visual representation
 *
 * @param {type} first
 * @param {type} second
 * @returns {undefined}
 */
function buildLinkList(first, second) {
    // $("#linksList").append('<li class="linkListItems">' + first + ' -> ' + second + '</li>');
    if (first != "") {
        var data = '<tr id="linkListItemID_';
        data += _startSFB._keepStageListID.currId;
        data += '" class="linkListItems"><td>';
        data += first;
        data += ' </td><td>&rarr;</td><td>';
        data += second;
        data += '</td></tr>';
        $("#linksList").append(data);
        _startSFB._keepStageListID.currId++;
    }
}
/*
 * make link list the droppable target
 *
 * @param {type} obj
 * @returns {undefined}
 */
function makeDroppableTarget(obj) {
    $(obj).droppable({
        drop: function (event, ui) {
            var first = ui.draggable.attr("id"),
                    second = $(this).attr("id"),
                    firstText = ui.draggable.text(),
                    secondText = $(this).text();
            _startSFB._storeSources.source.push(first);  // the one being dragged
            _startSFB._storeTargets.target.push(second); // the one being dropped on

            buildLinkList(firstText, secondText);
        }
    });
}
/*
 * add all the cisco items to the correct dialog box
 *
 * @returns {undefined}
 */
function getCiscoIcons() {
    var ciscoIcons = ["100baset-hub", "10700", "10GE_FCoE", "15200", "3174-(desktop)", "3200-mobile-access-router", "3x74-(floor)", "6700-series", "7500ars-(7513)", "ACS", "ASR-1000-Series", "AXP", "CUBE", "Ground-terminal", "MSE", "MXE", "Mediator", "NCE", "NCE-router", "Nexus-1000", "Nexus-2000", "Nexus-5000", "Nexus-7000", "RF-modem", "Service-Module", "Service-router", "Services", "Set-top-box", "Space-router", "TP-MCU", "VSD", "VSS", "access-gateway", "accesspoint", "ace", "adm", "androgenous-person", "antenna", "asic-processor", "ata", "atm-3800", "atm-fast-gigabit-etherswitch", "atm-router", "atm-switch", "atm-tag-switch-router", "avs", "bbfw", "bbfw-media", "bbsm", "branch-office", "breakout-box", "bridge", "broadband-router", "bts-10200", "cable-modem", "callmanager", "car", "carrier-routing-system", "cddi-fddi", "cdim", "cdm", "cellular-phone", "centri-firewall", "cisco-1000", "cisco-asa-5500", "cisco-ca", "cisco-file-engine", "cisco-hub", "cisco-unified-presence-server", "cisco-unityexpress", "ciscosecurity", "ciscoworks", "class-4_5-switch", "ciscoCloud", "communications-server", "contact-center", "content-engine-(cache-director)", "content-service-router", "content-service-switch-1100", "content-switch", "content-switch-module", "content-transformation-engine-(cte)", "cs-mars", "csm-s", "csu_dsu", "detector", "director-class-fibre-channel-director", "directory-server", "diskette", "distributed-director", "dot-dot", "dpt", "dslam", "dual-mode-ap", "dwdm-filter", "end-office", "fax", "fc-storage", "fddi-ring", "fdma", "fibre-channel-disk-subsystem", "fibre-channel-fabric-switch", "file-cabinet", "file-server", "fileserver", "firewall", "firewall-service-module-(fwsm)", "front-end-processor", "gatekeeper", "general-applicance", "generic-building", "generic-gateway", "generic-processor", "generic-softswitch", "gigabit-switch-atm-tag-router", "government-building", "guard", "h323", "handheld", "hootphone", "host", "hp-mini", "hub", "iad-router", "ibm-mainframe", "ibm-mini-as400", "ibm-tower", "icm", "ics", "intelliswitch-stack", "ios-firewall", "ios-slb", "ip", "ip-communicator", "ip-dsl", "ip-phone", "ip-telephony-router", "iptc", "iptv-content-manager", "iptv-server", "iscsi-router", "isdn-switch", "itp", "jbod", "key", "keys", "kiv7", "lan-to-lan", "laptop", "layer-2-remote-switch", "layer-3-switch", "lightweight-ap", "localdirector", "lock", "longreach-cpe", "mac-woman", "macintosh", "man_woman", "mas-gateway", "mau", "mcu", "mdu", "me-1100", "meetingplace", "mesh-ap", "metro-1500", "mgx-8000-multiservice-switch", "microphone", "microwebserver", "mini-vax", "mobile-access-ip-phone", "mobile-access-router", "modem", "moh-server", "mulitswitch-device", "multi-fabric-server-switch", "multilayer-remote-switch", "mux", "nac-appliance", "netflow-router", "netranger", "netsonar", "network-management", "nipr", "octel", "ons15500", "optical-amplifier", "optical-services-router", "optical-transport", "pad", "pad-x28", "page-icon", "pbx", "pbx-switch", "pc", "pc-adapter-card", "pc-man", "pc-routercard", "pc-software", "pc-video", "pda", "phone", "phone_fax", "pix-firewall", "pmc", "printer", "programmable-switch", "protocol-translator", "pxf", "radio-tower", "ratemux", "relational-database", "repeater", "route-switch-processor", "router", "router-with-silicon-switch", "router_firewall", "routerin-building", "rpsrps", "running-man", "sattelite", "sattelite-dish", "scanner", "server-switch", "server-with-router", "service-control", "simulitlayer-switch", "sip-proxy-werver", "sipr", "sitting-woman", "small-business", "small-hub", "softphone", "softswitch-pgw-mgc", "software-based-server", "speaker", "ssc", "ssl-terminator", "standard-host", "standing-man", "standing-woman", "stb", "storage-router", "storage-server", "stp", "streamer", "sun-workstation", "supercomputer", "tablet", "taclane", "tape-array", "tdm-router", "tdma", "telecommuter-house", "telecommuter-house-pc", "telecommuter-icon", "terminal", "token", "transpath", "truck", "turret", "tv", "uac", "ubr910", "umg-series", "unity-server", "universal-gateway", "university", "upc", "ups", "vault", "video-camera", "vip", "virtual-layer-switch", "virtual-switch-controller-(vsc3000)", "voice-atm-switch", "voice-commserver", "voice-router", "voice-switch", "vpn-concentrator", "vpn-gateway", "wae", "wavelength-router", "web-browser", "web-cluster", "wi-fi-tag", "wireless", "wireless-bridge", "wireless-location-appliance", "wireless-router", "wireless-transport", "wism", "wlan-controller", "workgroup-director", "workgroup-switch", "workstation", "www-server"];
    for (var i = 0; i < ciscoIcons.length; i++) {
        $("#ciscoDialog").append('<span id="cisco' + i + '" class="' + ciscoIcons[i] + ' diagramIcons"></span>');
        $("#cisco" + i).css({
            "margin": "10px",
            "cursor": "pointer"
        });
    }
}
/*
 * objectiveMapLinks
 * @returns {undefined}
 */
function getObjectiveMapLinlksIcons() {
    var ciscoIcons = ["blueCircle", "connH", "connV"];
    for (var i = 0; i < ciscoIcons.length; i++) {
        $("#objectiveMapLinksDialog").append('<span id="oml' + i + '" class="' + ciscoIcons[i] + ' objectiveMapLinks"></span>');
        $("#oml" + i).css({
            "margin": "10px",
            "cursor": "pointer"
        });
    }
}
/*
 * add all the equipment items to the correct dialog box
 *
 * @returns {undefined}
 */
function getEquipmentIcons() {
    var equipmentIcons = ["antenna", "antenna2", "ctm100", "flexMux", "panel1", "patch1", "patch2", "patch3", "radio1", "radio2", "sep", "tfoca"];
    for (var i = 0; i < equipmentIcons.length; i++) {
        $("#equipmentList").append('<span id="equipment' + i + '" class="' + equipmentIcons[i] + ' equipment"></span>');
        $("#equipment" + i).css({
            "margin": "10px",
            "cursor": "pointer"
        });
    }
}
/*
 * add all the equipment items to the correct dialog box
 *
 * @returns {undefined}
 */
function getStageItemIcons() {
    var stageItemIcons = ['cloudSmall', 'genericCircleSmall', 'genericPortLarge', 'genericPortSmall', 'multiplexer', 'triangleDown', 'triangleLeft', 'triangleRight', 'triangleUp'];
    for (var i = 0; i < stageItemIcons.length; i++) {
        $("#iconsDialog").append('<span id="stageIconItem' + i + '" class="' + stageItemIcons[i] + ' stageIconsSprites"></span>');
        $("#stageIconItem" + i).css({
            "margin": "10px",
            "cursor": "pointer"
        });
    }
}
/*
 * add all the stage icon connectors items to the correct dialog box
 *
 * @returns {undefined}
 */
function getStageItemConnectorIcons() {
    var stageConnItemIcons = ['hHump', 'hLine', 'vHump', 'vLine'];
    for (var i = 0; i < stageConnItemIcons.length; i++) {
        $("#stageItemConnDialog").append('<span id="stageIconConn' + i + '" class="' + stageConnItemIcons[i] + ' stageIconsConnectors"></span>');
        $("#stageIconConn" + i).css({
            "margin": "10px",
            "cursor": "pointer"
        });
    }
}
/*
 * a general message tool for deleting items
 *
 * @param {type} obj
 * @param {type} msg
 * @returns {undefined}
 */
function deleteMsg(obj, msg) {
    var r = confirm(msg);
    if (r == true) {
        obj.remove(); //remove the item from the stage - it will not be present when saving
        //if this is a link list item then I want to remove from the array, too
        if (obj[0].className == 'linkListItems') {
            removeLinkListArrayItem(obj);
        }
    } else {
    }
}
/*
 * @param {type} obj
 * @returns {undefined}
 */
function removeLinkListArrayItem(obj) {
    var theNumber = obj[0].id.replace('linkListItemID_', '');
    _startSFB._storeTargets.target.splice(theNumber, 1);
    _startSFB._storeSources.source.splice(theNumber, 1);
}
/*
 * generic delete item - pass reference of item you want to delete
 *
 * @param {type} obj
 * @returns {undefined}
 */
function deleteItems(obj) {
    $('body').on('mousedown', obj, function (e) {
        if (e.button == 2) {
            deleteMsg($(this), "Are you sure you want to delete this item?");
            return false;
        }
        return true;
    });
}
/*
 * set up so we can delete icons with right click - and reinitialize after reloading a project
 * @returns {undefined}
 */
function setUpDeleteIcons() {
    deleteItems('.lableTxt');
    deleteItems('.stageIcons');
    deleteItems('.ciscoOMIcons');
    deleteItems('.omLinks');
    deleteItems('.tlItem');
    deleteItems('.bgBox');
    deleteItems('.linkListItems');
    deleteItems('.stageIconsConnectorsIndivid');
}
/*
 *
 * @returns {undefined}
 */
function killRightClick() {
    //stop the right click menu (in the browser) from appearing after we clear an object
    document.oncontextmenu = RightMouseDown;
    function RightMouseDown() {
        return false;
    }
}
/*
 * make the dialog boxes draggable
 * @returns {undefined}
 */
function setUpDialogBoxes() {
    $(".dialogBoxes").draggable();
    $(".dialogBoxes").hide();
}
/*
 * i don't want the stage icons to be able to link until i am ready.
 *
 * @returns {undefined}
 */
function checkForLinking() {
    $("#linksListDialog").toggle();
    if (_startSFB._checkLinkable.canLink) {
        _startSFB._checkLinkable.canLink = false;
    } else {
        _startSFB._checkLinkable.canLink = true;
    }
    makeConnections(".stageIcons");
    makeDroppableTarget(".stageIcons");
}
/*
 * handles all key presses
 *
 * @returns {undefined}
 */
function keyHandler() {
    /*
     * Hot keys list
     *
     * control + F12 = task list
     * control + F11 = objective map
     * escape = help (prints to console)
     * control + c - make connections and show the link list
     * control + d - show the icons dialog box
     * control + e - add label
     * control + g - build html
     * control + s - save your work
     * control + b - add background box
     *
     */
    $(document).on('keydown', function (e) {
        //control + b - add background box
        if (e.ctrlKey && e.which === 66) {
            addBoxes('bgBox', '<div id="newBox" class="bgBox ui-widget-content"></div>'); // add a new background box
            e.preventDefault(); // keep what ever the keypress is supposed to do in a browser from doing it
        }
        //control + c - make connections and show the link list
        if (e.ctrlKey && e.which === 67) {
            checkForLinking();
            e.preventDefault(); // keep what ever the keypress is supposed to do in a browser from doing it
        }
        //control + d - show the icons dialog box
        if (e.ctrlKey && e.which === 68) {
            $("#iconsDialog").toggle();
            $("#stageItemConnDialog").toggle();
            e.preventDefault(); // keep what ever the keypress is supposed to do in a browser from doing it
        }
        //control + e - add label
        if (e.ctrlKey && e.which === 69) {
            addBoxes('lableTxt', '<div id="newBox"  class="lableTxt ui-widget-content"><label>Add Title</label></div>'); // add a new background box
            e.preventDefault(); // keep what ever the keypress is supposed to do in a browser from doing it
        }
        //control + g - show the links list box
        if (e.ctrlKey && e.which === 71) {
            buildHTML();
            e.preventDefault(); // keep what ever the keypress is supposed to do in a browser from doing it
        }
        //control + o - show the links list box
        if (e.ctrlKey && e.which === 79) {
            e.preventDefault(); // keep what ever the keypress is supposed to do in a browser from doing it
        }
        //control + q - name the project
        if (e.ctrlKey && e.which === 81) {
            giveProjectName();

            e.preventDefault(); // keep what ever the keypress is supposed to do in a browser from doing it
        }
        //control + s - save your work
        if (e.ctrlKey && e.which === 83) {
            saving();
            e.preventDefault(); // keep what ever the keypress is supposed to do in a browser from doing it
        }
        // F1 - help
        if (e.which === 27) {
            console.log('The Help Menu');
            console.log('control + F12 = task list');
            console.log('control + c - make connections and show the link list');
            console.log('control + d - show the icons dialog box');
            console.log('control + e - add label');
            console.log('control + g - show the links list box');
            console.log('control + s - save your work');
            e.preventDefault(); // keep what ever the keypress is supposed to do in a browser from doing it
        }
        //F2 - reload projects
        if (e.which === 113) {
            $("#projectsList").toggle();
            e.preventDefault(); // keep what ever the keypress is supposed to do in a browser from doing it
        }
        //F9
        if (e.ctrlKey && e.which === 120) {
            e.preventDefault(); // keep what ever the keypress is supposed to do in a browser from doing it
        }
        //F10
        if (e.ctrlKey && e.which === 121) {
            e.preventDefault(); // keep what ever the keypress is supposed to do in a browser from doing it
        }
        //F11 - objective map
        if (e.ctrlKey && e.which === 122) {
            $("#ciscoDialog").toggle();
            $("#objectiveMap").toggle();
            $("#objectiveMapLinksDialog").toggle();
            e.preventDefault(); // keep what ever the keypress is supposed to do in a browser from doing it
        }
        //F12 - task list
        if (e.ctrlKey && e.which === 123) {
            $("#taskListDialog").toggle();
            e.preventDefault(); // keep what ever the keypress is supposed to do in a browser from doing it
        }
    });
}
/*
 * add a new task to the list one double click
 *
 * @returns {undefined}
 */
function addTasks() {
    $("#taskListDialog").dblclick(function () {
        var theItems = '<div class="tlItem" id="tli_' + _startSFB._taskListNum.taskListNum + '"><input type="text" class="taskListStepTitle" placeholder="Enter step"><br><textarea rows="4"  class="taskListStepBody" placeholder="Enter any extra information"></textarea><br></div>';
        $("#taskListItems").append(theItems);
        $("#taskListItems").scrollTop($("#taskListItems").height());
        _startSFB._taskListNum.taskListNum++;
    });
}
/*
 * get all the html from the task list
 *
 * @returns {unresolved}
 */
function getTasks() {
    var getTasks = $("#taskListDialog").find('input'),
            getTasksArea = $("#taskListDialog").find('textarea');
    $.each(getTasks, function () {

        $(this).attr('value', $(this).val()); // make sure the value is added - its dynamics so when I save the html
    });
    $.each(getTasksArea, function () {
        var theValue = $(this).val();
        $(this).text(theValue);
    });
    var testing = $("#taskListDialog").html();
    return testing;
}
/*
 * add the individual icons
 *
 * @returns {undefined}
 */
function addItems() {
    /*
     * I have to seperate these because they are going to two different places with two different purposes
     */
    $("#iconsDialog").on('click', 'span', function () {
        var theURL = $(this).attr("class");
        $("#stageIconsContainer").append('<span id="si_' + _startSFB._storeStageIconID.currId + '" class="stageIcons ' + theURL + '"></span>');
        $(".stageIcons").draggable();
        _startSFB._storeStageIconID.currId++; // increment the _startSFB._storeStageIconID.currId  by one each time a new icon is added
    });
    $("#stageItemConnDialog").on('click', 'img', function () {
        var theURL = $(this).attr("src");
        $("#stageIconsContainer").append('<img class="stageIconsConnectorsIndivid" src=" ' + theURL + '">');
        $(".stageIconsConnectorsIndivid").draggable();
    });
    /*
     * add the cisco icons to the objective map
     */
    $("#ciscoDialog").on('click', 'span', function () {
        var theURL = $(this).attr("class");
        $("#objectiveMap").append('<span class="ciscoOMIcons ' + theURL + '"></span>');
        $(".ciscoOMIcons").draggable({containment: "parent", grid: [1, 1]});
    });
    $("#objectiveMapLinksDialog").on('click', 'span', function () {
        var theURL = $(this).attr("class");
        //console.log(theURL);
        $("#objectiveMap").append('<span class="omLinks ' + theURL + '"></span>');
        $(".omLinks").draggable({containment: "parent", grid: [1, 1]});
    });
}
/*
 * adding the new background boxes
 * trying to get some milage so I just pass the
 * div i want to build as a string
 *
 * @param {type} className
 * @param {type} div
 * @returns {undefined}
 */
function addBoxes(className, div) {
    $("#stageIconsContainer").append(div); //append the item I just sent to this funtion
    fixBGCSS(className); // fixing the css
    makeAllReziable("." + className); //make resizzable
    makeAllDraggable("." + className); //make draggable
    deleteItem("." + className); //set it up so I can delete using right click
}
/*
 * when I click on a label I want to change the text
 *
 * @param {type} obj
 * @returns {undefined}
 */
function editLabelText(obj) {
    $('body').on('dblclick', obj, function (e) {
        var label = prompt("Add a label", "");
        if (label != null) {
            $(this).html(label);
            //I am using the label name - which is the step - to build the id. I will use that to determine what gets shown first
            if (obj == ".omLinks") {
                $(this).attr('id', 'obl_' + $(this).html());
            }
            e.preventDefault();
            return false;
        }
        return true;
    });
}
/*
 * i need each new box to come in at 100x100
 * to keep this from effecting all other boxes
 * I give it an id, change the css, and remove the id
 *
 * @param {type} className
 * @returns {undefined}
 */
function fixBGCSS(className) {
    var borderType = "",
            zindex = "";
    switch (className) {
        case "bgBox":
            borderType = "1px black solid";
            zindex = 0;
            break;
        case "lableTxt":
            borderType = "1px gray dashed";
            zindex = 999;
            break;
    }
    $("#newBox").css({
        "border": borderType,
        "width": "100px",
        "height": "100px",
        "text-align": "center",
        "background-color": "#ffffff",
        "display": " flex",
        "justify-content": " center",
        "align-items": " center",
        "font-size": "10px",
        "cursor": "move",
        'padding': '5px',
        "position": "absolute", // absolute because I don't want things moving as I resize boxes
        "z-index": zindex
    });
    $("#newBox").removeAttr("id");
}
/*
 * need the background boxes to be drag and drop
 * @param {type} obj
 * @returns {undefined}
 */
function makeAllDraggable(obj) {
    $(obj).draggable().click(function () {
        $(this).draggable({disabled: false});
    }).dblclick(function () {
        $(this).draggable({disabled: true});
    });
}
/*
 * need to resize the background boxes
 * @param {type} obj
 * @returns {undefined}
 */
function makeAllReziable(obj) {
    $(obj).resizable(); // init the resizable
    $(obj).resizable('destroy'); // I have to destroy after initializing so I can reinitialize after loading saved pages
    $(obj).resizable(); // here is the re-init
}
/*
 * building the tool bar using the JQuery Widgets plugin
 * @returns {undefined}
 */
function buildToolBar() {
    $("#jqxWidget").draggable();
    // Create a jqxMenu
    $("#jqxMenu").jqxMenu({width: '380', height: '30px'});
    $("#jqxMenu").css('visibility', 'visible');
    $("#animation").on('change', function (event) {
        var value = event.args.checked;
        // enable or disable the menu's animation.
        if (!value) {
            $("#jqxMenu").jqxMenu({animationShowDuration: 0, animationHideDuration: 0, animationShowDelay: 0});
        }
        else {
            $("#jqxMenu").jqxMenu({animationShowDuration: 300, animationHideDuration: 200, animationShowDelay: 200});
        }
    });
    $("#disabled").on('change', function (event) {
        var value = event.args.checked;
        // enable or disable the menu
        if (!value) {
            $("#jqxMenu").jqxMenu({disabled: false});
        }
        else {
            $("#jqxMenu").jqxMenu({disabled: true});
        }
    });
    $("#hover").on('change', function (event) {
        var value = event.args.checked;
        // enable or disable the menu's hover effect.
        if (!value) {
            $("#jqxMenu").jqxMenu({enableHover: false});
        }
        else {
            $("#jqxMenu").jqxMenu({enableHover: true});
        }
    });
    $("#open").on('change', function (event) {
        var value = event.args.checked;
        // enable or disable the opening of the top level menu items when the user hovers them.
        if (!value) {
            $("#jqxMenu").jqxMenu({autoOpen: false});
        }
        else {
            $("#jqxMenu").jqxMenu({autoOpen: true});
        }
    });
    $("#topLevelArrows").on('change', function (event) {
        var value = event.args.checked;
        // enable or disable the opening of the top level menu items when the user hovers them.
        if (!value) {
            $("#jqxMenu").jqxMenu({showTopLevelArrows: false});
        }
        else {
            $("#jqxMenu").jqxMenu({showTopLevelArrows: true});
        }
    });
    $('#jqxMenu').on('itemclick', function (event)
    {
        var theID = event.args.id;
        switch (theID) {
            case 'openProject':
                $("#projectsList").toggle();
                break;
            case 'saveProject':
                saving();
                break;
            case 'buildProject':
                buildHTML();
                break;
            case 'nameProject':
                giveProjectName();
                break;
            case 'addBox':
                addBoxes('bgBox', '<div id="newBox" class="bgBox ui-widget-content"></div>'); // add a new background box
                break;
            case 'addLable':
                addBoxes('lableTxt', '<div id="newBox"  class="lableTxt ui-widget-content"><label>Add Title</label></div>'); // add a new background box
                break;
            case 'addIcons':
                $("#iconsDialog").toggle();
                $("#stageItemConnDialog").toggle();
                break;
            case 'makeConnections':
                checkForLinking();
                break;
            case 'openObjective':
                $("#ciscoDialog").toggle();
                $("#objectiveMap").toggle();
                $("#objectiveMapLinksDialog").toggle();
                break;
            case 'openTaskList':
                $("#taskListDialog").toggle();
                break;
        }
    });
}
/*
 * saving works like th evLab builder - saving to the database is a risky thing since our LAMP servers like to drop data
 * i am building a save file to a text file
 * it is loaded back in
 * i build the final HTML from this
 *
 * I have to build the HTML:
 * get what is on stage
 * strip out special characters
 * save to raw file
 *
 * I am also saving the total number of stage icons added to the screen
 * this way I know what number I can start on for building unique ids
 *
 * @returns {undefined}
 */
function saving() {
    if (_startSFB._projectName != null) {
        var theObjectiveMap = $("#objectiveMap").html(),
                theStageIconsContainer = $("#stageIconsContainer").html();
        $.post('./lib/php/makeDirectories.php', {projectName: _startSFB._projectName}, function () {
        }).success(function () {
            saveToRawFile('currId', _startSFB._storeStageIconID.currId, "txt");
            saveToRawFile('objectiveMap', theObjectiveMap, "txt");
            saveToRawFile('stageIcons', theStageIconsContainer, "txt");
            saveToRawFile('targets', _startSFB._storeTargets.target.join(), "txt");
            saveToRawFile('sources', _startSFB._storeSources.source.join(), "txt");
            saveToRawFile('tasks', getTasks(), "txt");
            saveToRawFile('taskListCount', _startSFB._taskListNum.taskListNum, "txt"); //so I can keep unique ids
        }).fail(function () {
            msgDialog('The project ' + _startSFB._projectName + ' was not saved.');
        });
    } else {
        msgDialog('You must name a project before you can save one.');
    }
}
/*
 * get the stage html
 *
 * @param {type} title
 * @param {type} data
 * @param {type} type
 * @returns {undefined}
 */
function saveToRawFile(title, data, type) {
    if (_startSFB._projectName != null) {
        $.post('./lib/php/saveFile.php', {projectName: _startSFB._projectName + "_raw", saveFileName: title, projectBody: data, projectFileType: type}, function () {
        }).success(function () {
            msgDialog('This project raw file was saved was saved as ' + _startSFB._projectName + "_raw");
        }).fail(function () {
            msgDialog('The project ' + _startSFB._projectName + ' was not saved.');
        });
    } else {
        msgDialog('You must name a project before you can save one.');
    }
}
/*
 * get all the projects from the projects folder
 * when I click on a project name from the list I want to load that project
 *
 * @returns {undefined}
 */
function reloadProject() {
    $.getJSON("./lib/php/getProjects.php", function (data) {
        $.each(data, function (key, val) {
            $("#projectsList").append('<div>' + val + '</div>');
        });
    }).success(function () {
        $("#projectsList").find('div').click(function () {
            $(this).parent().hide();
            //there are 6 files that need to be loaded up
            placeProjectParts($(this).text(), 'tasks', 'taskListDialog', null);
            placeProjectParts($(this).text(), 'stageIcons', 'stageIconsContainer', null);
            placeProjectParts($(this).text(), 'objectiveMap', 'objectiveMap', null); //objectiveMap
            placeProjectParts($(this).text(), 'sources', 'objectiveMap', 'source'); //objectiveMap
            placeProjectParts($(this).text(), 'targets', 'objectiveMap', 'target'); //objectiveMap
            placeProjectParts($(this).text(), 'taskListCount', null, 'taskListCount'); //load the task list items count
            placeProjectParts($(this).text(), 'currId', null, 'currID'); // get the last number used to buil dthe unique stage icon ID

        });
    });
}
/*
 * general loading method
 *
 * @param {type} projName
 * @param {type} loading
 * @param {type} loadTo
 * @param {type} sourceTar
 * @returns {undefined}
 */
function placeProjectParts(projName, loading, loadTo, sourceTar) {
    _startSFB._projectName = projName; // set the global project name
    $.get("projects/" + _startSFB._projectName + "/" + loading + ".txt", function (data) {
        //if there is nothing to load then don't show the image button
        if (data != '' && sourceTar == null) {
            $("#" + loadTo).html(data);
        } else {
            if (sourceTar == "target") {
                _startSFB._storeTargets.target = data.split(',');
                rebuildLinkList(); // since targets are the last to get loaded then we build that task list after
            } else if (sourceTar == "source") {
                _startSFB._storeSources.source = data.split(',');
            } else if (sourceTar == "currID") {
                _startSFB._storeStageIconID.currId = data;
            } else if (sourceTar == "taskListCount") {
                _startSFB._taskListNum.taskListNum = data;
            }
        }
    }).success(function () {
        reinitialize();
    });
}
/*
 * one we have the data back we can build the visual
 * representation of the links list
 *
 * @returns {undefined}
 */
function rebuildLinkList() {

    for (var i = 0; i < _startSFB._storeTargets.target.length; i++) {
        //get the item by the id number stored in target and sorce
        //make the display item the texdt from the stage item
        var theSourceName = $("#" + _startSFB._storeSources.source[i]).text(),
                theTargetName = $("#" + _startSFB._storeTargets.target[i]).text();
        buildLinkList(theSourceName, theTargetName);
    }
}
/*
 * make everything draggable and so forth ... again
 *
 * @returns {undefined}
 */
function reinitialize() {
    makeAllReziable(".bgBox");                        //make resizzable
    makeAllReziable(".lableTxt");                     //make resizzable
    ////////////
    makeAllDraggable(".lableTxt");                    //make draggable
    makeAllDraggable(".bgBox");                       //make draggable
    makeAllDraggable(".stageIcons");                  //make draggable
    makeAllDraggable(".ciscoOMIcons");                //make draggable
    makeAllDraggable(".omLinks");                     //make draggable
    makeAllDraggable(".stageIconsConnectorsIndivid"); //make draggable
}
/*
 * I have to remove things like drag handles so the final product doesn't have thme
 * here I am just runing the resizable back on
 * @returns {undefined}
 */
function clickToReInit() {
    $("body").click(function () {
        reinitialize();
    });
}
/*
 * the final step is to build the actual ISD
 * 
 * @returns {undefined}
 */
function buildHTML() {
    var html = '';
    html += '<html><head><meta charset="utf-8"></head>';
    html += '<link href="../lib/images/stageIcons.css" rel="stylesheet" type="text/css"/>';
    html += '<link href="../lib/images/diagramIcons.css" rel="stylesheet" type="text/css"/>';
    html += '<link href="../lib/images/objectiveMapLinks.css" rel="stylesheet" type="text/css"/>';
    html += '<link href="../lib/images/stageIconsConnectors.css" rel="stylesheet" type="text/css"/>';
    html += '<link href="../lib/css/main.css" rel="stylesheet" type="text/css"/>';
    html += '<body>';
    html += '<div id="container">';
    //objective map
    html += '<div id="objectiveMap" class="dragged">';
    html += '<div id="objectiveMapHeader" class="dialogClosed">Objective Map</div>';
    html += '<div id="objectiveMapBody">';
    html += $("#objectiveMap").html();
    html += '</div>';
    html += '</div>';
    //task list
    html += '<div id="taskList" class="dragged">';
    html += '<div id="taskListHeader" class="dialogClosed">Task List</div>';
    html += '<div id="taskListBody">';
    $("#taskListDialog :input").each(function () {
        $(this).attr('readonly', 'readonly');
    });
    html += getTasks();
    html += '</div>';
    html += '</div>';
    $(".bgBox").css("background-color", "");
    //main stage
    html += '<div id="stageIconsContainer">';
    $(".ui-resizable-handle").remove();
    //bgBox
    html += $("#stageIconsContainer").html();
    html += '</div>';
    html += '</div>';
    html += '<script src="../lib/jquery/jquery.js" type="text/javascript"></script>';
    html += '<script src="../lib/jquery/jquery-ui.min.js" type="text/javascript"></script>';
    html += '<script src="../lib/jsplumb/jsPlumb-2.0.4.js" type="text/javascript"></script>';
    html += '<script>';
    html += '$(".dragged").draggable({ stack: "#container div" });';
    html += '$("#taskListHeader").show().siblings().hide();';
    html += '$("#taskListBody").find("input").eq(1).css("font-size","16px");';
    html += '$(".tlItem:not(:first)").hide();';
    html += '$("#objectiveMapHeader").show().siblings().hide();';
    html += '$("#objectiveMapHeader").dblclick(function(){$("#objectiveMapBody").slideToggle("fast",function(){$("#objectiveMapHeader").toggleClass("dialogLargeOpen", 100, "easeOutSine" );';
    html += '$("#objectiveMapHeader").toggleClass("dialogClosed");});});';
    html += '$("#taskListHeader").dblclick(function(){$("#taskListBody").slideToggle("fast",function(){$("#taskListHeader").toggleClass("dialogClosed");';
    html += '$("#taskListHeader").toggleClass("dialogSmallOpen", 100, "easeOutSine" );});});';
    html += 'var sourceId_arr = ["' + _startSFB._storeSources.source.join('","') + '"];';
    html += 'var targetId_arr = ["' + _startSFB._storeTargets.target.join('","') + '"];';
    html += 'var numTasks = sourceId_arr.length;';
    html += ' function addTargets() {';
    html += ' jsPlumb.bind("ready", function() {';
    html += 'var objectiveListLinks = 1;function showObjectiveLinks(){$("#obl_"+objectiveListLinks).show();';
    html += '$("#tli_"+objectiveListLinks).show();objectiveListLinks++;}';
    html += '$(".omLinks").html("");';
    html += 'function connectPorts(start,end){showObjectiveLinks();';
    html += 'jsPlumb.connect({source:start,target:end,anchors:["Right", "Left" ],endpoint:"Blank",connector: [ "Bezier", { curviness:25 } ],paintStyle:{ lineWidth:1, strokeStyle:"green" }});} ';
    html += '$(".stageIconsConnectorsIndivid").each(function(){var theSRC = $(this).attr("src");';
    html += '$(this).attr("src", theSRC.replace("lib/images/stageIconsConnectors","../lib/images"))';
    html += '});';
    html += 'function checkSteps(){if(numTasks == 1){alert ("done");}else{ numTasks--;}};';
    html += '$("body").click(function(){$(".bgBox").css({"z-index":"0",	"cursor":"pointer"});$(".stageIcons").css({"z-index":"1", "cursor":"pointer"});});';
    for (var j = 0; j < _startSFB._storeSources.source.length; j++) {
        html += ' $("#' + _startSFB._storeTargets.target[j] + '").droppable({';
        html += 'accept: "#' + _startSFB._storeSources.source[j] + '",';
        html += 'drop: function (event, ui) {';
        html += 'var draggableId = ui.draggable.attr("id");';
        html += 'var droppableId = $(this).attr("id");';
        html += 'connectPorts(draggableId, droppableId);';
        html += 'checkSteps();';
        html += '}';
        html += '});';
    }
    html += 'var mergeArr = $.merge( sourceId_arr, targetId_arr ),uniqueArr = $.unique(mergeArr);';
    html += 'for(var i=0;i<uniqueArr.length;i++){$("#"+uniqueArr[i]).draggable({ opacity: 0.7, helper: "clone" });}';
    html += '});';
    html += '}';
    html += '</script>';
    html += '<script src="../lib/core/TARDIS.js" type="text/javascript"></script>';
    html += '</body></html>';
    if (_startSFB._projectName != null) {
        saveToRawFile('index', html, "html");
        msgDialog('The project ' + _startSFB._projectName + ' HTML was built.');
    } else {
        msgDialog('You must name a project before you can build the HTML.');
    }
}