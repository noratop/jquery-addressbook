// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Import Backbone
var Backbone = require('backbone');


// Data retrieval functions
var AddressBookModel = Backbone.Model.extend({
    
});

// Backbone collection of addressbooks
var AddressBookCollection = Backbone.Collection.extend({
    model: AddressBookModel,
    url: API_URL + '/AddressBooks/'
});

function getAddressBooks(pageNumber) {
    var skipNb = pageNumber * 5;
    // var filter = '?filter={"order": "name ASC", "limit": 5, "skip": ' + skipNb + '}';
    // return $.getJSON(API_URL + '/AddressBooks' + filter);
    
    var filter = {"order": "name ASC", "limit": 5, "skip": skipNb};

    var addressBooklist = new AddressBookCollection();
    return addressBooklist.fetch({data: {filter: JSON.stringify(filter)}}).then(
        function() {
            return addressBooklist;
        }
    );
}



//Backbone collection of addressbooks
var Entry = Backbone.Model.extend({

});

var EntriesCollection = Backbone.Collection.extend({
    model: Entry,
    initialize: function(models, options) {
        this.addressBookId = options.addressBookId;
    },
    url: function(){return API_URL + '/AddressBooks/' + this.addressBookId + '/entries';}
});

// function getAddressBookEntries(id) {
//     return $.getJSON(API_URL + '/AddressBooks/' + id);
// }

function getEntries(addressBookId, pageNumber) {
    var skipNb = pageNumber * 5;
    var filter = {order: "lastName ASC", limit: 5, skip: skipNb};
    var entriesList = new EntriesCollection(null,{addressBookId:addressBookId});
    
    return entriesList.fetch({data:{filter:JSON.stringify(filter)}}).then(
        function() {
            return entriesList;
        }
    );
    // return $.getJSON(API_URL + '/AddressBooks/' + addressBookId + '/entries' + filter);
}


// Backbone model for an entry
var EntryModel = Backbone.Model.extend({
    urlRoot: API_URL + '/Entries',
    getFullName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }
});

EntryModel.includeFilter = JSON.stringify({
    include: ['addresses','emails','phones']
});

function getEntry(entryId) {
    
    var entry = new EntryModel({id: entryId});
    return entry.fetch({data: {filter: EntryModel.includeFilter}}).then(
        function() {
            return entry;
        }
    );
    
    // var filter = '?filter={"include":["addresses","phones","emails"]}';
    // return $.getJSON(API_URL + '/Entries/' + entryId + filter);
}









// End data retrieval functions


module.exports = {
    getAddressBooks: getAddressBooks,
    //getAddressBookEntries: getAddressBookEntries,
    getEntries: getEntries,
    getEntry: getEntry,
};