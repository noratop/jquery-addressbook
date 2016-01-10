var Backbone = require('backbone');
var _ = require('underscore');

var abListTemplateText = require('raw!./templates/addressbooklist-view-template.ejs');
var entriestemplateText = require('raw!./templates/entries-view-template.ejs');

var AddressBookListView = Backbone.View.extend({
    initialize: function(){
        this.render();
        this.listenTo( this.collection, 'add', this.render );
    },
    template: _.template( abListTemplateText ),
    collection: null,
    tagName: 'div',
    render: function() {
        this.$el.html( this.template({abList: this.collection}) );
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


var entryTemplateText = require('raw!./templates/entry-view-template.ejs');
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



var form = require('raw!./templates/abForm.ejs');

var editForm = Backbone.View.extend({
    template: _.template( form ),
    collection:null,
    model: null,
    tagName: 'div',
    className: 'overlay',
    events: {
        'click .fi-pencil': 'editSomething',
        'keydown .input': 'add',
    },
    editSomething: function(evt) {
        var $this = $(evt.target).parent();
        var origText = $this.text();
        var attribut = $this.attr("name");
        $this.replaceWith('<input class="edit-input" name='+attribut+' type="text" value="' + origText + '">');
    },
    add: function(evt) {

        var $this = $(evt.target);
        var attribut = $this.attr("name");
        var inputValue = $this.val();

        if (evt.keyCode === 13) {

            var abColl = this.collection;

            this.model.set(attribut, inputValue);

            this.model.save().then(
                function(successResult) {
                    console.log('model has been saved');
                    console.log(successResult);
                    //view.render();
                    abColl.add(successResult);
                    console.log(abColl);
                },
                function(errorResult) {
                    console.log("error");
                    console.log(errorResult);
                    //evt.preventDefault();
                }
            );
            //}
            //this.model.save(null, {attrs: this.model.changedAttributes()}).then(
            //    function(successResult) {
            //        console.log('model has been saved');
            //        console.log(successResult);
            //        //view.render();
            //        this.collection.add(this.model);
            //    },
            //    function(errorResult) {
            //        console.log(errorResult);
            //        evt.preventDefault();
            //    }
            //);
        }
    },
    render: function() {
        this.$el.html( this.template({ab: this.model}) );
    }
});


module.exports = {
    EntryView:EntryView,
    AddressBookListView:AddressBookListView,
    EntriesView:EntriesView,
    editForm:editForm
}