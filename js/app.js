// Add foundation dynamic functionality on page
$(document).foundation();

// Import display
var display = require("./lib/display");

var Backbone = require('backbone');

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'redirectToAddressBooks',
        'addressbooks(/page:pageNum)': 'showAddressBooks',
        'addressbooks/:id(/page:pageNum)': 'showAddressBook',
        'entry/:id': 'showEntry'
    },
    
    redirectToAddressBooks: display.redirectToAddressBooks,
    showAddressBooks: display.displayAddressBooksList,
    showAddressBook: display.displayAddressBook,
    showEntry: display.displayEntry
});

var myRouter = new AppRouter();
Backbone.history.start();