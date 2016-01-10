var model = require('./model');

function getAddressBooks(pageNumber) {
    var skipNb = pageNumber * 5;

    var filter = {"order": "name ASC", "limit": 5, "skip": skipNb};

    var addressBooklist = new model.AddressBookCollection();
    return addressBooklist.fetch({data: {filter: JSON.stringify(filter)}}).then(
        function() {
            return addressBooklist;
        }
    );
}



function getEntries(addressBookId, pageNumber) {
    var skipNb = pageNumber * 5;
    var filter = {order: "lastName ASC", limit: 5, skip: skipNb};
    var entriesList = new model.EntryCollection(null,{addressBookId:addressBookId});

    return entriesList.fetch({data:{filter:JSON.stringify(filter)}}).then(
        function() {
            return entriesList;
        }
    );
}




function getEntry(entryId) {

    var entry = new model.Entry({id: entryId});
    return entry.fetch({data: {filter: Entry.includeFilter}}).then(
        function() {
            return entry;
        }
    );
}


function addAddressBook(name){
    var newAB = new model.AddressBook({name:name});
    return newAB.save();
}






// End data retrieval functions


module.exports = {
    getAddressBooks: getAddressBooks,
    getEntries: getEntries,
    getEntry: getEntry,
    addAddressBook:addAddressBook
};