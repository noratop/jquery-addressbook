//var $ = require("jquery");
$(document).foundation();

var Backbone = require('backbone');

// Add foundation dynamic functionality on page

// Import display
var display = require("./lib/display");

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