
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBWyrfmsUfEDHPqVsp9RO4KPLhJwOq5Rvg",
    authDomain: "new-train-schedul.firebaseapp.com",
    databaseURL: "https://new-train-schedul.firebaseio.com",
    projectId: "new-train-schedul",
    storageBucket: "new-train-schedul.appspot.com",
    messagingSenderId: "535786579217",
    appId: "1:535786579217:web:313a7555611c44cca218b0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

console.log("Hello World!");

$("#submitButton").click(function () {
    event.preventDefault();
    console.log("Submit button has been clicked!");

    // Input data capture variables
    var trainName = $("#nameValue").val().trim();
    var destination = $("#destinationValue").val().trim();
    var firstTime = $("#firstTimeValue").val().trim();
    var frequency = $("#frequencyValue").val().trim();

    // Capture all data and push to database
    var nextTrain = {
        dbname: trainName,
        dbdestination: destination,
        dbfirstTime: firstTime,
        dbfrequency: frequency,
    };

    console.log("Values that have been captured initially: " + nextTrain);

    database.ref().push(nextTrain);

    // Clear boxes after submission
    $("#nameValue").val("");
    $("#destinationValue").val("");
    $("#firstTimeValue").val("");
    $("#frequencyValue").val("");

});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().dbname);
    console.log(childSnapshot.val().dbdestination);
    console.log(childSnapshot.val().dbfirstTime);
    console.log(childSnapshot.val().dbfrequency);

    // Store in a new variable
    var newName = childSnapshot.val().dbname;
    var newDestination = childSnapshot.val().dbdestination;
    var newFirstTime = childSnapshot.val().dbfirstTime;
    var newFrequency = childSnapshot.val().dbfrequency;

    console.log("First Arrival: " + newFirstTime);
    console.log("Frequency: " + newFrequency);

    // The only thing that's left is to capture and do the train math via Moment.js, but my brain is broken at this hour of night and I can't quite handle it right now.

    var momentNewfirsttime = moment(newFirstTime).format("HH:mm");
    console.log("Moment-Converted First Train Time: " + momentNewfirsttime);

    var currentTime = moment().format("HH:mm");
    console.log("Moment-Converted Current Time: " + currentTime);

    // This is the section that adds the table row that we want. Can't get Moment.js to format the entry at this time.

    var newTablerow = $("<tr>").append(
        $("<td>").text(newName),
        $("<td>").text(newDestination),
        $("<td>").text(newFrequency),
        $("<td>").text("Next Arrival Time"),
        $("<td>").text("Some number of minutes away"),
        $("<button id='emptybutton'>").text("Clear"),

    )

    $(".table").append(newTablerow);



});

// Click handler for the empty button - can't actually get it to clear but I think it would look something like this!
$("#emptybutton").click(function () {
    event.preventDefault();
    console.log("Clear button clicked!");
    // Not actually sure how to clear the table data, haha!
});
