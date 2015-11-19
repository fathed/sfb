/*!
 * ISD (Interactive Signal Flow Diagram) v 1.3
 * written by J Gibbens
 * The Interactive Signal Flow Diagram is built to use JQuery 1.9+ & JPlumb (both acceptable versions included in this build)
 * http://jsplumbtoolkit.com/demo/home/jquery.html
 * http://jquery.com/
 * Date: 2013-16-12
 */



/********************************************************************************************************************
 
 DO NOT ALTER BELOW THIS LINE
 
 Most of the data used by this tool is passed by the main page. The main page is constructed by the ISD Builder
 
 ********************************************************************************************************************/


var taskCount = numTasks - 1, //so I can alter the objective tasks and show them completed
        incorrect = 0, //only allow three incorrect consecutive choices then restart the signal flow
        sic = 0, // increment trhought the source start points
        tic = 0; // increment through the target end points

function init() {
    //hide all helper panels
    $('#bdyCopy').hide();
    $('#faqCopy').hide();
    $('#mapImage').hide();
    addTargets();//add the targets to the stage - this funtion is build with the signal flow and can be found on the index page
    $("#redline").toggleClass('bg_color_clear bg_color_green'); //start all initialized paths in the objective map
}


//init jplumb and pass properties for each target/anchor
jsPlumb.bind("ready", function () {
    init();
});

//a bunch of greens to help tell what line is what - randomly placed color to help differentiate the connected lines - not used by default
var greenArr = ["#7CFC00", "#8BA870", "#629632", "#7F8778", "#93DB70", "#4CBB17", "#49E20E", "#55AE3A", "#3B5E2B", "#84BE6A", "#4DBD33", "#8CDD81", "#3D8B37", "#63AB62", "#5DFC0A", "#4AC948", "#32CD32", "#00FF00", "#00CD00", "#33FF33", "#4BB74C", "#00FF33", "#00a7bb"];
$("#mainBdy").draggable(); // make the signal flow diagram draggable
var arrPlcment = 0.7;//arrow placement on the drag line
//set defaults for jplumb
jsPlumb.importDefaults({
    ConnectionOverlays: [
        ["Arrow", {location: arrPlcment, foldback: 0.2}],
        ["Label", {
                location: 0.1,
                id: "label",
                cssClass: "aLabel"
            }]
    ]
});
/// build each target 
function buildAnchor(source, target, fillColor, img) {
    //initial paramters for the jsplumb connectors and lines
    var image = String(img),
            ////////////////////////--------------------->			
            endpointOptions = {
                maxConnections: -1,
                isSource: source,
                isTarget: target,
                endpoint: ["Image", {src: image}],
                connector: "StateMachine",
                connectorStyle: {lineWidth: 1, strokeStyle: '#ff0000'},
                paintStyle: {fillStyle: fillColor, setDragAllowedWhenFull: true},
                ConnectionsDetachable: true
            };
    return endpointOptions;
}
/*I built this function to cut down on the amount of code needed to build the map - now I just need the object that will be the anchor and the image I am attaching to that anchor*/
function buildMap(obj, img) {
    jsPlumb.addEndpoint(obj, {anchor: "Center"}, buildAnchor(true, true, "#ffbb00", "images/" + img));
}
// turn the arrows from red to green
function setGreenLine(e) {
    jsPlumb.select({source: e}).setPaintStyle({strokeStyle: greenArr[0], lineWidth: 1});
    //	jsPlumb.select({source:e}).setPaintStyle({ strokeStyle:greenArr[Math.floor(Math.random()*greenArr.length)], lineWidth:1 });
}
//show steps and answers in objective list
function showSteps(e) {
    $(e).show();
}

///hide blue circles in objective map
jsPlumb.bind("jsPlumbConnection", function (info) {

    if (info.sourceId == sourceId_arr[sic] && info.targetId == targetId_arr[tic]) {

        var t = sic + 1; //add one to the sic
        var t2 = sic + 2; // add two to the sic

        showSteps('div.answer' + t);
        showSteps('li.answer' + t2);

        var blue = /blueCirc/; // regex for the objective map

        //if an internal connection is being made then show the appropriate icon
        if (blue.test(redlines[sic])) {
            $("#" + redlines[sic]).show();
        } else {
            $("#" + redlines[sic]).toggleClass('bg_color_clear bg_color_green');
        }

        //$(".step"+taskCount).addClass("completedTask"); // cross out the task you just completed
        $(".step" + taskCount).toggleClass('step' + taskCount + ' completedTask');
        taskCount--;

        //completing the tasks
        if (targetId_arr.length == t) {
            $("#redLine13").toggleClass('bg_color_clear bg_color_green');
            report("Good job you completed the signalflow.");
        }

        setGreenLine(info.sourceId); //set the green line on the signal flow diagram

        sic++;
        tic++;
        objMapStart++;
        incorrect = 0; //if a correct answer is chosen then reset the incorrect count. This means that a user will need to get 3 consecutive incorrect answers rater than 3 total incorrect answers.

    } else {
        incorrect++;
        if (incorrect == 3) {
            report("You have made three (3) incorrect choices - I'm sorry but you have to start over");
            location.reload();//reload the page
        } else {
        }
        jsPlumb.hide(info.targetId);
    }
});


//this function is for simple testing. prints to a div on the stage - not used by default
function printer(e) {
    $("#report").append(e + "<br>");
}

//pop up dialog to report any messages to the user
function report(e) {
    alert(e);
}