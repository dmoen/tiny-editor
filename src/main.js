// Main styles
import './main.styl';

// Font awesome
import './font-awesome-4.7.0/css/font-awesome.css';

// Tinymce
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';

// Plugins
import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/autoresize/plugin';

// Drag handler
import './scripts/drag-handler.js';

console.log('test');

tinymce.init({
  selector: 'textarea',
  themes: 'modern',
  width: '100%',
  resize: 'both',
  statusbar: true,
  plugins: ['paste', 'link', 'autoresize']
});
