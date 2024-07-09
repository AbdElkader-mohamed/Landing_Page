// Function to copy the current page's URL to the clipboard
function copyCurrentPageURL() {
  // Get the current page's URL
  var currentPageURL = window.location.href;

  // Create a temporary input element to copy the URL
  var tempInput = document.createElement("input");
  tempInput.value = currentPageURL;

  // Append the input element to the document
  document.body.appendChild(tempInput);

  // Select the input element's value
  tempInput.select();

  // Copy the selected text to the clipboard
  document.execCommand("copy");

  // Remove the temporary input element
  document.body.removeChild(tempInput);

  // Show the Bootstrap toast using jQuery
  $("#copyToast").toast("show");

  // Hide the toast after 5 seconds
  setTimeout(function () {
    $("#copyToast").toast("hide");
  }, 3000);
}

export { copyCurrentPageURL };
