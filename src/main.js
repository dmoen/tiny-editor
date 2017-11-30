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

// Editor window
import editorWindow from './scripts/editor-window.js';

editorWindow.init();

tinymce.init({
  selector: 'textarea',
  themes: 'modern',
  width: '100%',
  resize: 'both',
  statusbar: true,
  setup: function (ed) {
    ed.on('keyup', function (e) {
      tinyMceChange(ed);
    });
    ed.on('keydown', function (e) {
      tinyMceChange(ed);
    });
    ed.on('change', function (e) {
      tinyMceChange(ed);
    });
  },
  plugins: ['paste', 'link', 'autoresize']
});

function tinyMceChange (ed) {
  document.querySelector('.tiny-editable__content').innerHTML = ed.getContent();
  console.log('Editor contents was modified. Contents: ' + ed.getContent());
}
