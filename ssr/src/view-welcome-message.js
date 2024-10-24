export default (req, res) => {
    res.send(`
<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
  <meta charset="utf-8">
  <title>SSR Server</title>
  <script>
    // Function to handle form submission
    function submitForm(event) {
      event.preventDefault(); // Prevent the default form submission behavior

      var xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest
      xhr.open("POST", "/", true); // Configure it to send a POST request to "/"

      // Use this line if your server expects plain text
      xhr.setRequestHeader("Content-Type", "text/plain");

      // Or use this line if your server expects JSON
      // xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function() {
        if (xhr.status === 200) {
          // If request is successful, display the response below the form
          document.getElementById("response").innerHTML = xhr.responseText;
          attachShadowRoots(document.getElementById("response"));
        } else {
          // Handle error
          document.getElementById("response").innerHTML = "Error: " + xhr.status;
        }
      };

      // Get the value from the textarea
      var htmlContent = document.getElementById("htmlContent").value;

      // Send the request with the textarea content
      // Use this line if sending as plain text
      xhr.send(htmlContent);

      // Or use this line if sending as JSON
      // xhr.send(JSON.stringify({ html: htmlContent }));
    }

    // Attach the submitForm function to the form's submit event
    window.onload = function() {
      document.getElementById("myForm").addEventListener("submit", submitForm);
    };

    function attachShadowRoots(root) {
      root.querySelectorAll("template[shadowrootmode]").forEach(template => {
        const mode = template.getAttribute("shadowrootmode");
        const shadowRoot = template.parentNode.attachShadow({ mode });
        shadowRoot.appendChild(template.content);
        template.remove();
        attachShadowRoots(shadowRoot);
      });
    }
  </script>
</head>
<body>
    <p>Hello traveler! I'm an SSR server. POST me some HTML containing lit components, and I'll try to hydrate them for you.</p>
    <p>You can try it right here:</p>
    <form id="myForm">
      <textarea id="htmlContent" name="html" rows="10" cols="80"></textarea>
      <button type="submit">Submit</button>
    </form>
    <div id="response"></div> <!-- Area to display the response -->
</body>
</html>
  `);
};
