define(function(require) {
    var Backbone = require('backbone'),
        Marionette = require('marionette'),
        ModelBinder = require('modelbinder'),
        Validation = require('backbone.validation'),
        template = require('hbs!users/templates/user'),
        Example = window.Example,

        // Creating a new View by extending the Backbone.Marionette.ItemView object.
        UserView = Marionette.ItemView.extend({

            // template
            template: template,

            initialize: function() {
                // Creating a new ModelBinder object that handles data-binding between model and template.
                this.modelBinder = new ModelBinder();
            },

            events: {
                'submit form.update-form': 'updateUser',
                'click .delete-model': 'removeUser'
            },

            // OnRender will be called after the template is compiled automatically by marionette.
            onRender: function() {
                // Bind the model to the html node rendered from the template.
                this.modelBinder.bind(this.model, this.el);
            },

            updateUser: function() {
                // Start the validation plugin on this view when the submit button pressed.
                Validation.bind(this, {
                    forceUpdate: true
                });

                // Ask the model to validate and check if it's valid.
                if(this.model.isValid(true)) {
                    // If this is a new model, create it using the users collection.
                    if(this.model.isNew()) {

                        // Replacing the current model with the new saved model.
                        this.model = Example.Users.App.users.create(this.model.toJSON());

                        // Navigating to the new saved model url.
                        Backbone.history.navigate(Example.Constants.lang + '/users/' + this.model.id + '/edit', true);

                    } else { // this is already saved so just update it.
                        this.model.save();
                        Backbone.history.navigate(Example.Constants.lang + '/users', true);
                    }
                }

                return false;
            },

            removeUser: function() {
                if(this.model.collection) {
                    this.model.destroy();
                }

                Backbone.history.navigate(Example.Constants.lang + '/users', true);

                return false;
            }
        });

    Example.Users = Example.Users || {};
    Example.Users.Views = Example.Users.Views || {};
    Example.Users.Views.User = UserView;

    return UserView;
});
