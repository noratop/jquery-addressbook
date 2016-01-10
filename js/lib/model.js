var API_URL = "https://loopback-addressbook.herokuapp.com/api";
var Backbone = require('backbone');


//Models
var AddressBook = Backbone.Model.extend({
    url: API_URL + '/AddressBooks/'
});
var AddressBookCollection = Backbone.Collection.extend({
    model: AddressBook,
    url: API_URL + '/AddressBooks/'
});



var Entry = Backbone.Model.extend({
    urlRoot: API_URL + '/Entries',
    getFullName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }
});

Entry.includeFilter = JSON.stringify({
    include: ['addresses','emails','phones']
});

var EntryCollection = Backbone.Collection.extend({
    model: Entry,
    initialize: function(models, options) {
        this.addressBookId = options.addressBookId;
    },
    url: function(){return API_URL + '/AddressBooks/' + this.addressBookId + '/entries';}
});



module.exports ={
    AddressBook:AddressBook,
    AddressBookCollection:AddressBookCollection,
    Entry:Entry,
    EntryCollection:EntryCollection
}