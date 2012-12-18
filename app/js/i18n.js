define('i18n', ['module', 'underscore', 'nls/dictionary'], function(module, _, dictionary) {

    return {
        load: function(name, req, onLoad, config) {

            var langs = [],
                deps = ['i18next'];

            _.each(_.keys(dictionary), function(lang) {
                if (dictionary[lang]) {
                    langs.push(lang);
                    deps.push('nls/' + lang + '/dictionary');
                }
            });

            req(deps, function (i18n) {

                var dicts = [].slice.call(arguments, 1),
                    resStore = {};

                _.each(langs, function(lang, i) {
                    resStore[lang] = {
                        translation: {
                            tree: dicts[i]
                        }
                    };
                });

                if (config.isBuild) {
                    onLoad();
                } else {

                    i18n.langs = langs;

                    i18n.init({
                        fallbackLng: 'root',
                        resStore: resStore
                    });

                    onLoad(i18n.t('tree', { returnObjectTrees: true }));
                }
            });
        }
    };
});
