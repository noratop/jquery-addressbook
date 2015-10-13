// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Import Backbone
var Backbone = require('backbone');

// Data retrieval functions
function getAddressBooks(pageNumber) {
    var skipNb = pageNumber * 5;
    var filter = '?filter={"order": "name ASC", "limit": 5, "skip": ' + skipNb + '}';
    return $.getJSON(API_URL + '/AddressBooks' + filter);
}

function getAddressBookEntries(id) {
    return $.getJSON(API_URL + '/AddressBooks/' + id);
}

function getEntries(addressBookId, pageNumber) {
    var skipNb = pageNumber * 5;
    var filter = '?filter={"order": "lastName ASC", "limit": 5, "skip": ' + skipNb + '}';
    return $.getJSON(API_URL + '/AddressBooks/' + addressBookId + '/entries' + filter);
}





// Backbone model for entry
var EntryModel = Backbone.Model.extend({
    urlRoot: API_URL + '/Entries',
    getFullName: function() {
        return this.get('lastName') + ' ' + this.get('firstName');
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
    getAddressBookEntries: getAddressBookEntries,
    getEntries: getEntries,
    getEntry: getEntry
};