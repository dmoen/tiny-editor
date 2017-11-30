import Draggable from '@telerik/kendo-draggable';
import tinymce from 'tinymce/tinymce';

let dragBar = document.getElementById('simple-editor__drag-bar');

let editor = document.getElementById('simple-editor');

let editorWrapper = document.getElementById('simple-editor__editor-wrapper');

let editorInitHeight = '400px';

let dragStartYPos;

let origEditorHeight;

let dragEndYPos;

let dockPosition = 'bottom';

let resizeTinyMce = () => {
  tinymce.activeEditor.theme.resizeTo(window.innerWidth, editorWrapper.clientHeight - 101);
};

let maximizeWindow = () => {
  editor.style.height = window.innerHeight + 'px';
  resizeTinyMce();
};

let minimizeWindow = () => {
  if (dockPosition === 'bottom') {
    dockEditorToBottom();
  } else {
    dockEditorToTop();
  }
  let dragBarHeight = dragBar.offsetHeight;
  editor.style.height = dragBarHeight + 'px';
};

let dockEditorToTop = () => {
  dockPosition = 'top';
  editor.style.height = editorInitHeight;
  editor.appendChild(dragBar);
  editor.style.bottom = 'auto';
  editor.style.top = 0 + 'px';
};

let dockEditorToBottom = () => {
  dockPosition = 'bottom';
  editor.style.height = editorInitHeight;
  editor.prepend(dragBar);
  editor.style.top = 'auto';
  editor.style.bottom = 0 + 'px';
};

let dockWindowToTop = () => {
  if (dockPosition === 'bottom') {
    dockEditorToTop();
  } else {
    dockEditorToBottom();
  }
  resizeTinyMce();
};

let dragResize = (e) => {
  let dragDistance = dragStartYPos - dragEndYPos;
  editor.style.height = dragDistance + origEditorHeight + 'px';
};

let reverseDragResize = (e) => {
  let dragDistance = (dragStartYPos - dragEndYPos) * -1;
  editor.style.height = dragDistance + origEditorHeight + 'px';
};

let autoResize = () => {
  let dragDistance = (dragStartYPos - dragEndYPos);
  let dockedDistance = (dockPosition === 'bottom') ? dragDistance : dragDistance * -1;
  let editorHeight = dockedDistance + origEditorHeight;
  let windowLeft = window.innerHeight - editorHeight;
  if (windowLeft < 100) {
    maximizeWindow();
  } else if (editorHeight < 100) {
    minimizeWindow();
  }
};

let hideEditor = () => {
  editor.classList.remove('visible');
};

let showEditor = (e) => {
  e.preventDefault();
  editor.style.height = editorInitHeight;
  editor.classList.add('visible');
  tinymce.activeEditor.setContent('');
  let content = e.target.parentElement.querySelector('.tiny-editable__content').textContent;
  tinymce.activeEditor.execCommand('mceInsertRawHTML', false, content);
  resizeTinyMce();
};

let init = () => {
  document.querySelector('.tiny-editable__trigger').addEventListener('click', showEditor);
};

let draggable = new Draggable({
  press: function (e) {
    origEditorHeight = editor.offsetHeight;
    dragStartYPos = e.pageY;
  },
  drag: function (e) {
    dragEndYPos = e.pageY;
    editorWrapper.classList.add('hidden');
    if (dockPosition === 'top') {
      reverseDragResize(e);
    } else {
      dragResize(e);
    }
  },
  release: function (e) {
    editorWrapper.classList.remove('hidden');
    if (origEditorHeight !== editor.offsetHeight) {
      autoResize(e);
    }
    resizeTinyMce();
  }
});

draggable.bindTo(dragBar);

document.querySelector('#simple-editor__controls .maximize').addEventListener('click', () => {
  maximizeWindow();
});

document.querySelector('#simple-editor__controls .minimize').addEventListener('click', () => {
  minimizeWindow();
});

document.querySelector('#simple-editor__controls .close').addEventListener('click', () => {
  hideEditor();
});

document.querySelector('#simple-editor__controls .dock-top').addEventListener('click', () => {
  dockWindowToTop();
});

export default {
  init: init
};
