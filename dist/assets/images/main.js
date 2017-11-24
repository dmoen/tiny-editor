'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _EditLink = require('./components/EditLink.vue');

var _EditLink2 = _interopRequireDefault(_EditLink);

var _tinymce = require('tinymce/tinymce');

var _tinymce2 = _interopRequireDefault(_tinymce);

require('tinymce/themes/modern/theme');

require('tinymce/plugins/paste/plugin');

require('tinymce/plugins/link/plugin');

require('tinymce/plugins/autoresize/plugin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require.context('file-loader?name=[path][name].[ext]&context=node_modules/tinymce!tinymce/skins', true, /.*/);

// Plugins


new _vue2.default({
  el: '#app',
  components: {
    // <my-component> will only be available in Parent's template
    'edit-link': _EditLink2.default,
    themes: "modern",
    height: 500
  }
});

_tinymce2.default.init({
  selector: 'textarea',
  themes: "modern",
  height: 500,
  plugins: ['paste', 'link', 'autoresize']
});