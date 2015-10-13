// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Data retrieval functions
function getAddressBooks(pageNumber) {
    var skipNb = pageNumber * 5;
    var filter = '?filter={"order": "name ASC", "limit": 5, "skip": ' + skipNb + '}';
    return $.getJSON(API_URL + '/AddressBooks' + filter);
}

function getAddressBook(id) {
    return $.getJSON(API_URL + '/AddressBooks/' + id);
}

function getEntries(addressBookId, pageNumber) {
    var skipNb = pageNumber * 5;
    var filter = '?filter={"order": "lastName ASC", "limit": 5, "skip": ' + skipNb + '}';
    return $.getJSON(API_URL + '/AddressBooks/' + addressBookId + '/entries' + filter);
}

function getEntry(entryId) {
    var filter = '?filter={"include":["addresses","phones","emails"]}';
    return $.getJSON(API_URL + '/Entries/' + entryId + filter);
}
// End data retrieval functions