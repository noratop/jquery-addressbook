// Add foundation dynamic functionality on page
$(document).foundation();

// Import display
var display = require("./lib/display");

// Start the app by displaying all the addressbooks
display.displayAddressBooksList(0);