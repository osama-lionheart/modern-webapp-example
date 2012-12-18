define(function(require) {

    var Marionette = require('marionette'),
        dropdown = require('bootstrap-dropdown'),
        collapse = require('bootstrap-collapse'),
        navbarTemplate = require('hbs!users/templates/navbar'),
        Example = window.Example,

        NavbarView = Marionette.ItemView.extend({

            template: navbarTemplate,

            initialize: function() {
                this.bindTo(Backbone.history, 'all', this.onUrlChanged, this);
            },

            getNeutralFragment: function() {
                var fragment = Backbone.history.fragment,
                    idx = fragment.indexOf(Example.Constants.lang),
                    length = Example.Constants.lang.length;

                if (idx === 0) {
                    fragment = fragment.substr(length + 1);
                }

                return fragment;
            },

            templateHelpers: function() {
                return {
                    langs: Example.Constants.langs,
                    fragment: this.getNeutralFragment()
                };
            },

            onUrlChanged: function() {
                var fragment = this.getNeutralFragment();

                this.$('.nav-lang .dropdown-menu li').each(function() {
                    var $li = $(this),
                        $a = $li.find('a'),
                        lang = $li.attr('data-lang');

                    $a.attr('href', '#' + lang + '/' + fragment);
                });
            },

            onRender: function() {
                // HACK: avoid unused jshint.
                void(dropdown);
                void(collapse);

                // trigger the dropdown and the collapse plugin.
                this.$('.dropdown-toggle').dropdown();
                this.$('.collapse').collapse();
            }
        });

    Example.Users = Example.Users || {};
    Example.Users.Views = Example.Users.Views || {};
    Example.Users.Views.Navbar = NavbarView;

    return NavbarView;
});
