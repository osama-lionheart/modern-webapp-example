define(function(require) {
    var Backbone = require('backbone'),
        UserModel = require('users/models/user'),
        localStorage = require('localStorage'),
        Example = window.Example,

        Users = Backbone.Collection.extend({
            // The type of objects this collection will contains.
            model: UserModel,

            // The url used to synchronize this model with the server.
            url: 'users',

            // Instead of the url to sync to server we will use the localStorage for the sake of simplicity
            localStorage: new Backbone.LocalStorage("UsersCollection")
        });

        // HACK: avoid unused jshint.
        void(localStorage);

    Example.Users = Example.Users || {};
    Example.Users.Collections = Example.Users.Collections || {};
    Example.Users.Collections.Users = Users;

    return Users;
});
