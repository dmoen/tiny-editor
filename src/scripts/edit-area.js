// Tinymce
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';

// Plugins
import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/autoresize/plugin';
import 'tinymce/plugins/image/plugin';

let editArea = (() => {
  function tinyMceChange (ed) {
    document.querySelector('.tiny-editable__content').innerHTML = ed.getContent();
    console.log('Editor contents was modified. Contents: ' + ed.getContent());
  };

  let resize = (editorWrapElement) => {
    tinymce.activeEditor
      .theme
      .resizeTo(document.documentElement.clientWidth, editorWrapElement.clientHeight - 101);
  };

  let reset = () => {
    tinymce.activeEditor.setContent('');
    let content = document.querySelector('.tiny-editable .tiny-editable__content').textContent;
    tinymce.activeEditor.execCommand('mceInsertRawHTML', false, content);
  };

  return {
    init: (editorWindow) => {
      tinymce.init({
        selector: 'textarea',
        themes: 'modern',
        width: '100%',
        resize: 'both',
        statusbar: true,
        images_upload_url: 'postAcceptor.php',
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
        plugins: ['paste', 'link', 'autoresize', 'image']
      });

      editorWindow.element.addEventListener('editorShow', function (e) {
        reset();
        resize(editorWindow.wrapElement);
      }, false);

      editorWindow.element.addEventListener('editorResize', function (e) {
        resize(editorWindow.wrapElement);
      }, false);
    }
  };
})();

export default editArea;
