package edu.simpson.espersen;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import com.google.gson.Gson;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet {

    private Pattern firstValidationPattern;
    private Pattern lastValidationPattern;
    private Pattern phoneValidationPattern;
    private Pattern emailValidationPattern;
    private Pattern birthdayValidationPattern;

    public NameListEdit() {
        // --- Compile and set up all the regular expression patterns here ---
        firstValidationPattern = Pattern.compile("^[a-zA-Z '-]+$");
        lastValidationPattern = Pattern.compile("^[a-zA-Z '-]+$");
        phoneValidationPattern = Pattern.compile("^([0-9]{3})([0-9]{3})([0-9]{4})$");
        emailValidationPattern = Pattern.compile("^.{1,50}@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$");
        birthdayValidationPattern = Pattern.compile("^([0-9]{4})[-]([0-1])([0-9])[-]([0-3])([0-9])$");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Just confirm we are calling the servlet we think we are
        out.println("JSON Post");

        // Open the request for reading. Read in each line, put it into a string.
        // Yes, I think there should be an easier way.
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        //check
        out.println(requestString);

        Gson gson = new Gson();

        System.out.println(requestString);

        Person fromJson = gson.fromJson(requestString, Person.class);

        // Just print the data out to confirm we got it.
        System.out.println("first = '" + fromJson.getFirst() + "'" + " last = '" + fromJson.getLast() + "'" + " phone = '"
                + fromJson.getPhone() + "'" + " email = '" + fromJson.getEmail() + "'" + " birthday = '" + fromJson.getBirthday() +"'");

        boolean statusCheck = true;

        Matcher firstCheck = firstValidationPattern.matcher(fromJson.getFirst());
        Matcher lastCheck = lastValidationPattern.matcher(fromJson.getLast());
        Matcher phoneCheck = phoneValidationPattern.matcher(fromJson.getPhone());
        Matcher emailCheck = emailValidationPattern.matcher(fromJson.getEmail());
        Matcher birthdayCheck = birthdayValidationPattern.matcher(fromJson.getBirthday());

        if (firstCheck.find( )) {
            System.out.println("first: Passed validation");
        } else {
            System.out.println("first: Did not pass validation");
            statusCheck = false;
        }

        if (lastCheck.find( )) {
            System.out.println("last: Passed validation");
        } else {
            System.out.println("last: Did not pass validation");
            statusCheck = false;
        }

        if (phoneCheck.find( )) {
            System.out.println("phone: Passed validation");
        } else {
            System.out.println("phone: Did not pass validation");
            statusCheck = false;
        }

        if (emailCheck.find( )) {
            System.out.println("email: Passed validation");
        } else {
            System.out.println("email: Did not pass validation");
            statusCheck = false;
        }

        if (birthdayCheck.find( )) {
            System.out.println("birthday: Passed validation");
        } else {
            System.out.println("birthday: Did not pass validation");
            statusCheck = false;
        }

        if(statusCheck == true) {
            PersonDAO.addPerson(fromJson);
        }
        else{
            System.out.println("something failed backend validation");
        }

        // Make sure our field was set.
        System.out.println("Object test: First: "+ fromJson.getFirst() + " Last: " + fromJson.getLast() + " Phone: " +
                fromJson.getPhone() + " Email: " + fromJson.getEmail() + " Birthday: " + fromJson.getBirthday());
    }
}
