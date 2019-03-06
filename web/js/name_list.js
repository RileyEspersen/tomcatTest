// Main Javascript File
//add item button
var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

//savechanges Button
var saveChangesBut = $('#saveChanges');
saveChangesBut.on("click", saveChanges);

function validateFunction(event) {
    // Get the field
    var firstNameField = $('#firstName').val();
    var lastNameField = $('#lastName').val();
    var phoneNumField = $('#phone').val();
    var emailField = $('#email').val();
    var birthdayField = $('#birthday').val();


    // Create the regular expression
    var firstTest = /^[a-zA-Z '-]+$/;
    var lastTest = /^[a-zA-Z '-]+$/;
    var phoneTest = /^([0-9]{3})([0-9]{3})([0-9]{4})$/;
    var emailTest = /^.{1,50}@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var birthdayTest = /^([0-9]{4})[-]([0-1])([0-9])[-]([0-3])([0-9])$/;
    //I was not sure how to get the year correct... So I guess for now you can be born in any year
    //with a four digit number eg. 9999/0000

    var isValid = true;

    // Test the regular expression to see if there is a match
    if (firstTest.test(firstNameField)) {
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");
    } else {
        isValid = false;
        $('#firstName').addClass("is-invalid");
        $('#firstName').removeClass("is-valid");
    }

    if (lastTest.test(lastNameField)) {
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");
    } else {
        isValid = false;
        $('#lastName').addClass("is-invalid");
        $('#lastName').removeClass("is-valid");
    }

    if (phoneTest.test(phoneNumField)) {
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");
    } else {
        isValid = false;
        $('#phone').addClass("is-invalid");
        $('#phone').removeClass("is-valid");
    }

    if (emailTest.test(emailField)) {
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");
    } else {
        isValid = false;
        $('#email').addClass("is-invalid");
        $('#email').removeClass("is-valid");
    }

    if (birthdayTest.test(birthdayField)) {
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-valid");
    } else {
        isValid = false;
        $('#birthday').addClass("is-invalid");
        $('#birthday').removeClass("is-valid");
    }

    if(isValid === true){
        newPerson = {"first" : firstNameField, "last" : lastNameField, "email" : emailField, "phone" : phoneNumField, "birthday" : birthdayField}
        console.log(newPerson);

        var url = "api/name_list_edit";
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(newPerson),
            success: function (dataFromServer) {
                console.log(dataFromServer);
            },
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        });
    }
}

function saveChanges(){
    validateFunction();
}

function showDialogAdd() {

    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').val("");

    $('#firstName').val("");
    $('#firstName').removeClass("is-invalid");
    $('#firstName').removeClass("is-valid");

    $('#lastName').val("");
    $('#lastName').removeClass("is-invalid");
    $('#lastName').removeClass("is-valid");

    $('#email').val("");
    $('#email').removeClass("is-invalid");
    $('#email').removeClass("is-valid");

    $('#phone').val("");
    $('#phone').removeClass("is-invalid");
    $('#phone').removeClass("is-valid");

    $('#birthday').val("");
    $('#birthday').removeClass("is-invalid");
    $('#birthday').removeClass("is-valid");

    // Show the hidden dialog
    $('#myModal').modal('show');
}

function updateTable() {

    var url = "api/name_list_get";

    $.getJSON(url, null, function(json_result) {
            // json_result is an object. You can set a breakpoint, or print
            // it to see the fields. Specifically, it is an array of objects.
            // Here we loop the array and print the first name.
                for (var i = 0; i < json_result.length; i++) {
                    var phoneNum = json_result[i].phone.substring(0,3) + '-' + json_result[i].phone.substring(3,6) + '-' + json_result[i].phone.substring(6,10);

                    console.log(json_result[i].first);
                    $('#datatable tr:last').after('<tr><td>' + json_result[i].id + '</td><td>' + json_result[i].first + '</td><td>' + json_result[i].last +
                        '</td><td>' + json_result[i].email + '</td><td>' + phoneNum + '</td><td>' + json_result[i].birthday + '</td></tr>');
                }

            console.log("Done");
        }
    );
}

// Call your code.

updateTable();