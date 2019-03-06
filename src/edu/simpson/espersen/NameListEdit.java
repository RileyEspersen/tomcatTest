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

@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet {

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

        // Output the string we got as a request, just as a check
        out.println(requestString);

        // Great! Now we want to use GSON to parse the object, and pop it into our business object. Field
        // names have to match. That's the magic.
        Gson gson = new Gson();



        System.out.println(requestString);

        Person fromJson = gson.fromJson(requestString, Person.class);


        PersonDAO.addPerson(fromJson);


        // Make sure our field was set.
        System.out.println("Object test: First: "+ fromJson.getFirst() + " Last: " + fromJson.getLast() + " Phone: " +
                fromJson.getPhone() + " Email: " + fromJson.getEmail() + " Birthday: " + fromJson.getBirthday());


    }
}
