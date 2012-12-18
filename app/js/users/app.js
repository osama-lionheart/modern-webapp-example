define(function(require) {

    var Backbone = require('backbone'),
        Marionette = require('marionette'),
        UsersRouter = require('users/router'),
        UserModel = require('users/models/user'),
        UserView = require('users/views/user'),
        Users = require('users/collections/users'),
        UsersView = require('users/views/users'),
        NavbarView = require('users/views/navbar'),
        i18n = require('i18next'),
        Example = window.Example,

        // Create an instance of Marionette.Application which handle regions and startup of your application.
        UsersApp = new Marionette.Application();

    // Defining the regions in the webpage that this application will use to render it's views
    // through UsersApp.usersRegion.show(new View());
    UsersApp.addRegions({
        navbarRegion: '.navbar .container',
        usersRegion: '.main.container'
    });

    // Grouping the functions that handles the routes function to be provided to the `AppRouter` when instantiated.
    UsersApp.controller = {

        handleLanguage: function(lang, path) {

            Example.Constants.lang = lang;

            if (i18n.lng() !== lang) {
                var oldLang = i18n.lng();
                i18n.setLng(lang);
                UsersApp.trigger('change:lang', oldLang, lang);
            }

            Backbone.history.loadUrl(path);

            // HACK: load back the original fragment with the lang, to avoid reloading of the same urls.
            Backbone.history.fragment = lang + '/' + path;
        },

        createUser: function() {

            UsersApp.usersRegion.show(new UserView({
                model: new UserModel()
            }));
        },

        editUser: function(id) {

            UsersApp.usersRegion.show(new UserView({
                // Get a user by id from the users collection.
                model: UsersApp.users.get(id)
            }));
        },

        listUsers: function() {

            if (!Example.Constants.lang) {
                Backbone.history.navigate(Example.Constants.defaultLang + '/' + Backbone.history.fragment, true);
                return;
            }

            UsersApp.usersRegion.show(new UsersView({
                // Provide the collection that this view will display.
                collection: UsersApp.users
            }));
        },

        defaultRoute: function() {
            Backbone.history.navigate(Example.Constants.lang + '/users', {
                trigger: true,
                replace: true
            });
        }
    };

    // Add a function callback to our App Initializers callback, that will be called when the App started.
    UsersApp.addInitializer(function() {

        // Create a new Router that handles our url changes using the provided controller object for function lookup.
        UsersApp.router = new UsersRouter({
            controller: UsersApp.controller
        });

        // Create a new `Users` collection to store our users objects and attach it to our application.
        UsersApp.users = new Users();

        // Load the users from the backend/localStorage into our users collection object.
        UsersApp.users.fetch();

        // Start tracking of the url changes.
        Backbone.history.start();

        // Render the navbar.
        UsersApp.navbarRegion.show(new NavbarView());

        // Re-render the navbar when the language changes.
        UsersApp.on('change:lang', function() {
            UsersApp.navbarRegion.currentView.render();
        });
    });

    Example.Users = Example.Users || {};
    Example.Users.App = UsersApp;

    return UsersApp;
});
