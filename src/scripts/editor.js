import editorWindow from './editor-window.js';
import editArea from './edit-area.js';
import windowBar from './editor-window-bar.js';

// Buttons
import btnDockMode from './button-controls/button-dock-mode.js';
import btnMaximize from './button-controls/button-maximize.js';
import btnMinimize from './button-controls/button-minimize.js';
import btnClose from './button-controls/button-close.js';

windowBar.init([
  btnDockMode,
  btnMaximize,
  btnMinimize,
  btnClose
], editorWindow);

editArea.init(editorWindow);

document.querySelector('.tiny-editable__trigger').addEventListener('click', function (e) {
  e.preventDefault();
  editorWindow.init();
});
