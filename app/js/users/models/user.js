define(function(require) {
    var Backbone = require('backbone'),
        Example = window.Example,

        // Creating a new Model by extending the Backbone.Model object.
        UserModel = Backbone.Model.extend({

            defaults: {
                // Add default model attributes(properties) here.
                firstName: '',
                lastName: '',
                email: ''
            },

            validation: {
                // Add validation rules for model attributes.
                firstName: [{
                    required: true
                }],
                lastName: [{
                    required: true
                }],
                email: [{
                    required: true
                }]
            }
        });

    Example.Users = Example.Users || {};
    Example.Users.Models = Example.Users.Models || {};
    Example.Users.Models.User = UserModel;

    return UserModel;
});
