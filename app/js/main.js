require.config({
    paths: { // A Key/Value hash object that contains shortcut to the library referenced throughout the code
        json2: '../components/json2/json2',
        text: '../components/requirejs-text/text',
        hbs: '../components/require-handlebars-plugin/hbs',
        handlebars: '../components/require-handlebars-plugin/Handlebars',
        i18nprecompile: '../components/require-handlebars-plugin/hbs/i18nprecompile',
        i18n: 'i18n',
        i18next: '../components/i18next/release/i18next.amd-1.5.9',
        jquery: '../components/jquery/jquery',
        underscore: '../components/underscore-amd/underscore',
        backbone: '../components/backbone-amd/backbone',
        'backbone.eventbinder': '../components/backbone.eventbinder/lib/amd/backbone.eventbinder',
        'backbone.wreqr': '../components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../components/backbone.babysitter/lib/amd/backbone.babysitter',
        marionette: '../components/marionette/lib/core/amd/backbone.marionette',
        'backbone.validation': '../components/backbone-validation/dist/backbone-validation-amd',
        modelbinder: '../components/Backbone.ModelBinder/Backbone.ModelBinder',
        localStorage: 'backbone.localStorage',
        'bootstrap-dropdown': '../components/twitter-bootstrap-sass/vendor/assets/javascripts/bootstrap-dropdown',
        'bootstrap-collapse': '../components/twitter-bootstrap-sass/vendor/assets/javascripts/bootstrap-collapse'
    },
    shim: {
        bootstrap: ['jquery'],
        json2: {
            exports: 'JSON',
            init: function() {
                return JSON;
            }
        }
    },
    hbs: {
        disableI18n: true,
        templateExtension: 'html',
        disableHelpers: true
    }
});

// App Constants
var Example = window.Example = window.Example || {};

Example.Constants = {
    baseUrl: '/docs/example',
    apiUrl: '/api/v1',
    defaultLang: 'en',
    langs: [{
        code: 'en',
        name: 'English'
    }, {
        code: 'de',
        name: 'Deutsch'
    }]
};

// require jquery to be loaded before running the following function
require([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'backbone.validation',
    'users/app',
    'handlebars',
    'i18next',
    'i18n!nls/dictionary'
], function($, _, Backbone, Marionette, Validation, UsersApp, Handlebars, i18next) {

    Example.Constants.lang = i18next.lng();

    Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
        // Marionette expects "templateId" to be the ID of a DOM element.
        // But with RequireJS, templateId is actually the full text of the template.
        var template = templateId;

        // Make sure we have a template before trying to compile it
        if (!template || template.length === 0) {
            var msg = "Could not find template: '" + templateId + "'";
            var err = new Error(msg);
            err.name = "NoTemplateError";
            throw err;
        }

        return template;
    };

    Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
        return _.isFunction(rawTemplate) ? rawTemplate : _.template(rawTemplate);
    };

    Handlebars.registerHelper('t', function(key) {
        var result = i18next.t('tree.' + key);
        return new Handlebars.SafeString(result);
    });

    Handlebars.registerHelper('c', function(key) {
        var constants = Example.Constants;

        if (constants) {
            var value = eval('constants.' + key);
            return value;
        }

        return key;
    });

    _.extend(Backbone.Validation.callbacks, {
        valid: function(view, attr, selector) {

            view.$('[' + (selector || 'name') + '=' + attr + ']')
                .parents('.control-group').removeClass('error').addClass('success')
                .find('.help-block').empty();
        },
        invalid: function(view, attr, error, selector) {

            view.$('[' + (selector || 'name') + '=' + attr + ']')
                .parents('.control-group').removeClass('success').addClass('error')
                .find('.help-block').text(error);
        }
    });

    $(function() {
        // Start the application when the Dom is ready.
        UsersApp.start();
    });
});
