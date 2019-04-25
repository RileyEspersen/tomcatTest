

// This calls our back-end Java program that sets our session info
function login() {

    var url = "api/login_servlet";

    // Grab data from the HTML form

    var username = $("#loginID").val();

    // Create a JSON request based on that data
    var dataToServer = {loginID : username};

    // Post
    $.post(url, dataToServer, function (dataFromServer) {
        // We are done. Write a message to our console
        console.log("Logging you in!");
        console.log(dataFromServer);
        // Clear the form
        $("#loginID").val("");
        $("#sessionValue").val("");

        if(dataFromServer.trim() == "null"){
            $('#loginTag').show();
        }
        else{
            $('#loginTag').hide();
        }
        getLogin();
    });

}

// This gets session info from our back-end servlet.
function getLogin() {

    var url = "api/get_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("calling getLoginServlet");
        console.log(dataFromServer);
        // Update the HTML with our result

        if(dataFromServer.trim() != "null") {
            $('#logoutTag').show();
            console.log("You are now Logged in!");
            $('#getSessionResult').html("You are logged in as " + dataFromServer);
            $('#loginTag').hide();
        }
        else{
            $('#logoutTag').hide();
            $('#getLogin').html("Go");
            console.log("You are logged out");
        }
    });
}

// This method calls the servlet that invalidates our session
function logoutButton() {

    var url = "api/logout_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        $('#loginTag').show();


        $("#getSessionResult").html("");
    });
    getLogin();
}

// Hook the functions above to our buttons
button = $('#getLogin');
button.on("click", getLogin);

button = $('#login');
button.on("click", login);
button.on("click", getLogin);

button = $('#logout');
button.on("click", logoutButton);
button.on("click", getLogin);

getLogin();