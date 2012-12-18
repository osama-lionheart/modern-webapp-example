define(function(require) {

    var Marionette = require('marionette'),

        UsersRouter = Marionette.AppRouter.extend({

            // Defines the routes for the application and the function to call for each route.
            // The functions will be provided in a controller object passed to this class when instantiated.
            appRoutes: {
                'users/create': 'createUser',
                'users/:id': 'editUser',
                'users/:id/edit': 'editUser',
                'users': 'listUsers',
                ':lang/*path': 'handleLanguage',
                // Handle any other unknown route to call defaultRoute function.
                '*other': 'defaultRoute'
            }
        });

    return UsersRouter;
});
