//
// The CompositeView will loop through all of the models in the specified collection,
// render each of them using a specified itemView, then append the results of the
// item view's el to the collection view's el.
//
define(function(require) {
    var Marionette = require('marionette'),
        UserItemView = require('users/views/userItem'),
        usersTemplate = require('hbs!users/templates/users'),
        emptyUsersTemplate = require('hbs!users/templates/emptyUsers'),
        Example = window.Example,

        // Creating a new View by extending the Backbone.Marionette.CompositeView object.
        UsersView = Marionette.CompositeView.extend({

            template: usersTemplate,

            // Provide the view that will render each model
            itemView: UserItemView,

            // Specify a selector in the template where the children will be appended.
            itemViewContainer: 'tbody',

            // Provide the view that will be rendered if the collection is empty.
            emptyView: Marionette.ItemView.extend({
                tagName: 'tr',
                template: emptyUsersTemplate
            })
        });

    Example.Users = Example.Users || {};
    Example.Users.Views = Example.Users.Views || {};
    Example.Users.Views.Users = UsersView;

    return UsersView;
});
