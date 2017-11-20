import './main.styl';

import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';

// Plugins
import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/autoresize/plugin';

tinymce.init({
  selector: 'textarea',
  themes: 'modern',
  height: 500,
  plugins: ['paste', 'link', 'autoresize']
});
