//#1
// Create a function to add a row to the table
function myUpdateFunction(event) {
    var fieldValue = $('#myTextField').val();
    $("#tableName tbody").append("<tr><td>"+fieldValue+"</td></tr>");
    console.log("hello");
}
 //Attach an the function to a button click
var formButton1 = $('#button1');
formButton1.on("click", myUpdateFunction);


//#2
function jsonFunction(event) {

    // Set a field in the object to the value in this form field
    var field1 = $('#field1').val();
    var field2 = $('#field2').val();
    var field3 = parseInt(field1) + parseInt(field2);

    // Build the JSON string based on that object's fields
    $('#field3').val(field3);

    // Set a field to the JSON result so we can see it.
}
// Attach an action to a button click
var formButton2 = $('#button2');
formButton2.on("click", jsonFunction);

//#3
// -- How to hide an item based on a button click

// Create a function to hide an item
function hideFunction(event) {
    if($("#paragraphToHide").is(":visible"))
    {
        $("#paragraphToHide").hide(500);
    }
    else{
        $("#paragraphToHide").show(500);
    }
}

// Attach an action to a button click
var formButton3 = $('#button3');
formButton3.on("click", hideFunction);

//#4
//regex
// -- How to validate an item
// Function to validate
function validateFunction(event) {
    // Get the field
    var v1 = $('#validateMe').val();

    // Create the regular expression
    var reg = /^[0-9]{3}[-]?[0-9]{3}[-]?[0-9]{4}$/;

    // Test the regular expression to see if there is a match
    if (reg.test(v1)) {
        console.log("Ok");
    } else {
        console.log("Bad");
    }}

// Attach an action to a button click
var formButton4 = $('#button4');
formButton4.on("click", validateFunction);

//#5
// Create function to JSON'ify
function jsonFunction2(event) {

    var1 = document.getElementById("firstName").value;
    var2 = document.getElementById("lastName").value;
    var3 = document.getElementById("email").value;

    // Create an empty object
    var objectForm = {firstName : var1, lastName : var2, email : var3};

    // Build the JSON string based on that object's fields
    var jsonForm = JSON.stringify(objectForm);

    // Set a field to the JSON result so we can see it.

    console.log(jsonForm);
}

// Attach an action to a button click
var formButton5 = $('#button5');
formButton5.on("click", jsonFunction2);

