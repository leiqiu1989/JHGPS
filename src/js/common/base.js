define("base", [], function() {
    var basicUrl = './js';

    seajs.config({
        base: basicUrl,
        charset: 'utf-8',
        paths: {
            staticBase: 'https://s.56qq.com/staticBase/dist/20160831/js/'
        },
        alias: {
            page: 'staticBase/common/page.js',
            datepicker: 'plugin/jquery.datetimepicker.js',
            ajaxform: 'plugin/jquery.form.js',
            lodash: 'plugin/lodash.min.js',
            dialog: 'staticBase/common/_dialog.js',
            validate: 'staticBase/common/validate.js',
            chosen: 'plugin/chosen.jquery.min.js',
            docEvent: 'common/docEvent.js',
            app: 'app.js',
            api: 'common/api',
            map: 'common/map',
            constValue: 'common/constValue',
            router: 'common/router.js',
            common: 'common/common.js'
        }
    });
});
seajs.use("base");