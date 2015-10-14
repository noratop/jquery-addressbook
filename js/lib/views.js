var Backbone = require('backbone');
var _ = require('underscore');

var entryTemplateText = require('raw!./templates/entry-view-template.ejs');
// var entryTemplateText = $('#entry-template').html();

var abListTemplateText = require('raw!./templates/addressbooklist-view-template.ejs');
var entriestemplateText = require('raw!./templates/entries-view-template.ejs');

var AddressBookListView = Backbone.View.extend({
    template: _.template( abListTemplateText ),
    model: null,
    tagName: 'div',
    render: function() {
        this.$el.html( this.template({abList: this.model}) );
    }
});


var EntriesView = Backbone.View.extend({
    template: _.template( entriestemplateText ),
    model: null,
    tagName: 'div',
    render: function() {
        this.$el.html( this.template({entriesList: this.model}) );
    }
});


var EntryView = Backbone.View.extend({
    template: _.template( entryTemplateText ),
    model: null,
    tagName: 'div',
    events: {
        'click .fi-pencil': 'editSomething',
        'keypress .edit-input': 'editCompleted'
    },
    editSomething: function(evt) {
        var $this = $(evt.target).parent();
        var origText = $this.text();
        var attribut = $this.attr("name");
        $this.replaceWith('<input class="edit-input" name='+attribut+' type="text" value="' + origText + '">');
    },
    editCompleted: function(evt) {
        var $this = $(evt.target);
        var attribut = $this.attr("name");
        if (evt.keyCode === 13) {
            //console.log(this);
            var inputValue = $this.val();
            var view = this;
            this.model.set(attribut, inputValue);
            this.model.save(null, {attrs: this.model.changedAttributes()}).then(
                function(successResult) {
                    //alert('model has been saved');
                    console.log(successResult);
                    view.render();
                },
                function(errorResult) {
                    
                }
            );
        }
    },
    render: function() {
        this.$el.html( this.template({entry: this.model}) );
    }
});


module.exports = {
    EntryView:EntryView,
    AddressBookListView:AddressBookListView,
    EntriesView:EntriesView
}