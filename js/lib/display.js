// Import data get functions
var data = require("./model");
var router = require('./router');
var view = require("./views")

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');

// Get underscore library
var _ = require('underscore');

function redirectToAddressBooks() {
    displayAddressBooksList();
}

// Functions that display things on the screen (views)
function displayAddressBooksList(pageNumber) {
    pageNumber = +pageNumber || 0;

    router.getAddressBooks(pageNumber).then(
        function(addressBooks) {

            $app.html(''); // Clear the #app div
            $app.append('<h2>Address Books List</h2>');

            var add = $('<h3 class="add">Add a AddressBook</h3>');
            add.on('click', function() {

                var newAb = new data.AddressBook();

                var form = new view.editForm({model:newAb, collection: addressBooks});
                form.render();
                var $overlay = form.$el;

                $app.append($overlay);
                $overlay.fadeIn(100);

                $overlay.find("input").focus();
                //$(".overlay input").on("click", function(){
                //    this.select();
                //});

                $overlay.on('click', function(evt) {
                    if (evt.target === evt.currentTarget) {
                        $overlay.fadeOut(100);
                    }
                });
            });
            $app.append(add);


            var addressBookListView = new view.AddressBookListView({
                collection: addressBooks
            });
            addressBookListView.render();
            $app.append(addressBookListView.$el);

            if (addressBooks.length === 0) {
                $app.append("<div>No more addressbooks, please return to the previous page.</div>");
            }

            var $prevButton = $('<a class="button" href="#/addressbooks/page' + (pageNumber - 1) + '">&lt; prev</a>');
            var $nextButton = $('<a class="button" href="#/addressbooks/page' + (pageNumber + 1) + '">next &gt;</a>');

            $app.append($prevButton);
            $app.append($nextButton);

            if (pageNumber === 0) {
                $prevButton.toggleClass("disabled");
            }

            if (addressBooks.length < 5) {
                $nextButton.toggleClass("disabled");
            }
        }
    )
}


function displayAddressBook(addressBookId, pageNumber) {
    pageNumber = +pageNumber || 0;

    router.getEntries(addressBookId, pageNumber).then(
        function(entries) {

            $app.html(''); // Clear the #app div

            var $backButton = $('<a href="#" class="button expand">Back to the Address Books list</a>');
            $app.append($backButton);
            $backButton.on("click", function() {
                displayAddressBooksList();
            });

            $app.append('<h2>Entries List of the Address Book ' + addressBookId + '</h2>');
            
            var EntriesView = new view.EntriesView({
                model: entries
            });
            EntriesView.render();
            $app.append(EntriesView.$el);
            
            
            
            //$app.append('<ul>');

            //console.log(entries);

            // entries.forEach(function(e) {
            //     $app.find('ul').append('<li class = "list" data-id="' + e.id + '">' + e.lastName + ' ' + e.firstName + '</li>');
            // });

            // $app.find('li').on('click', function() {
            //     var entryId = $(this).data('id');
            //     displayEntry(entryId);
            // });

            if (entries.length === 0) {
                $app.append("<div>No more entries, please return to the previous page.</div>");
            }

            var $prevButton = $('<a class="button" href="#/addressbooks/'+addressBookId+'/page' + (pageNumber - 1) + '">&lt; prev</a>');
            var $nextButton = $('<a class="button" href="#/addressbooks/'+addressBookId+'/page' + (pageNumber + 1) + '">next &gt;</a>');

            // var $prevButton = $('<a href="#" class="button">Previous Page</a>');
            // var $nextButton = $('<a href="#" class="button">Next Page</a>');

            $app.append($prevButton);
            $app.append($nextButton);

            if (pageNumber === 0) {
                $prevButton.toggleClass("disabled");
            }

            if (entries.length < 5) {
                $nextButton.toggleClass("disabled");
            }

            // if (pageNumber > 0) {
            //     $prevButton.on("click", function() {
            //         displayAddressBook(addressBookId, pageNumber - 1);
            //     });
            // }
            // else {
            //     $prevButton.toggleClass("disabled");
            // }

            // if (entries.length === 5) {
            //     $nextButton.on("click", function() {
            //         displayAddressBook(addressBookId, pageNumber + 1);
            //     });
            // }
            // else {
            //     $nextButton.toggleClass("disabled");
            // }

        }
    )
}

function displayEntry(entryId) {
    router.getEntry(entryId).then(
        function(entry) {
            
            $app.html(''); // Clear the #app div

            // // console.log(entry);

            // var $backButton = $('<a href="#" class="button expand">Back to the Entries list</a>');
            // $app.append($backButton);
            // $backButton.on("click", function() {
            //     displayAddressBook(entry.addressBookId, 0);
            // });

            // var entryTemplate = _.template( $('#entry-template').html() );
            // var entryTable = entryTemplate({entry: entry});
            
            // $app.append(entryTable);

            var myEntryView = new view.EntryView({
                model: entry
            });
            myEntryView.render();
            console.log(myEntryView.$el);
            $app.append(myEntryView.$el);
            

            // $app.find('i.fi-pencil').on("click", function() {
            //     var tr = $(this).parent().parent();
            //     //console.log(tr);
            //     tr.toggleClass("edit");
            //     tr.toggleClass("view");
            // })
        }
    )
}

// End functions that display views

module.exports = {
    displayAddressBooksList: displayAddressBooksList,
    displayAddressBook: displayAddressBook,
    displayEntry: displayEntry,
    redirectToAddressBooks: redirectToAddressBooks
};