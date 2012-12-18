define(function(require) {

    var Marionette = require('marionette'),
        userItemTemplate = require('hbs!users/templates/userItem'),
        Example = window.Example,

        UserItemView = Marionette.ItemView.extend({

            template: userItemTemplate,

            tagName: 'tr'
        });

    Example.Users = Example.Users || {};
    Example.Users.Views = Example.Users.Views || {};
    Example.Users.Views.UserItem = UserItemView;

    return UserItemView;
});
