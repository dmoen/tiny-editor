import Draggable from '@telerik/kendo-draggable';
import tinymce from 'tinymce/tinymce';

let dragBar = document.getElementById('simple-editor__drag-bar');

let editor = document.getElementById('simple-editor');

let dragStartYPos;

let origEditorHeight;

let dragEndYPos;

let dockPosition = 'bottom';

let resizeTinyMce = () => {
  let tinymceHeight = editor.offsetHeight - dragBar.offsetHeight - 101;
  tinymce.activeEditor.theme.resizeTo(window.innerWidth, tinymceHeight);
};

let maximizeWindow = () => {
  editor.style.height = window.innerHeight + 'px';
  resizeTinyMce();
};

let minimizeWindow = () => {
  dockEditorToBottom();
  let dragBarHeight = dragBar.offsetHeight;
  editor.style.height = dragBarHeight + 'px';
};

let dockEditorToTop = () => {
  dockPosition = 'top';
  editor.appendChild(dragBar);
  editor.style.bottom = 'auto';
  editor.style.top = 0 + 'px';
};

let dockEditorToBottom = () => {
  dockPosition = 'bottom';
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
  resizeTinyMce();
};

let reverseDragResize = (e) => {
  let dragDistance = (dragStartYPos - dragEndYPos) * -1;
  editor.style.height = dragDistance + origEditorHeight + 'px';
  resizeTinyMce();
};

let autoResize = (e) => {
  let dragDistance = (dragStartYPos - dragEndYPos);
  let dockedDistance = (dockPosition === 'bottom') ? dragDistance : dragDistance * -1;
  let editorHeight = dockedDistance + origEditorHeight;
  let windowLeft = window.innerHeight - editorHeight;

  if (windowLeft < 100) {
    maximizeWindow();
  } else if (editorHeight < 100 && dockPosition === 'bottom') {
    minimizeWindow();
  }

  resizeTinyMce();
};

let draggable = new Draggable({
  press: function (e) {
    origEditorHeight = editor.offsetHeight;
    dragStartYPos = e.pageY;
  },
  drag: function (e) {
    dragEndYPos = e.pageY;

    if (dockPosition === 'top') {
      reverseDragResize(e);
    } else {
      dragResize(e);
    }
  },
  release: function (e) {
    autoResize(e);
  }
});

draggable.bindTo(dragBar);

document.querySelector('#simple-editor__controls .maximize').addEventListener('click', () => {
  maximizeWindow();
});

document.querySelector('#simple-editor__controls .minimize').addEventListener('click', () => {
  minimizeWindow();
});

document.querySelector('#simple-editor__controls .dock-top').addEventListener('click', () => {
  dockWindowToTop();
});
