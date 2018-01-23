import Draggable from '@telerik/kendo-draggable';

let windowBar = (() => {
  let dragStartYPos;

  let dragEndYPos;

  let dragbarElement = document.getElementById('simple-editor__drag-bar');

  let isDraggedToTop = () => {
    let barTopOffset = dragbarElement
      .getBoundingClientRect().top;

    if (barTopOffset < 100) {
      return true;
    }

    return false;
  };

  let initButtonControls = (buttonCollection, editorWindow) => {
    buttonCollection.forEach((button) => {
      button.init(editorWindow);
    });
  };

  let isDraggedToBottom = () => {
    let barBottomOffset = dragbarElement
      .getBoundingClientRect().bottom;

    if (window.innerHeight - barBottomOffset < 100) {
      return true;
    }

    return false;
  };

  return {
    init: (buttonCollection = [], editorWindow) => {
      initButtonControls(buttonCollection, editorWindow);

      new Draggable({
        press: function (e) {
          dragStartYPos = e.pageY;
          editorWindow.initResize();
        },
        drag: function (e) {
          dragEndYPos = e.pageY;
          let dragDistance = dragStartYPos - dragEndYPos;
          editorWindow.dragResize(dragDistance);
        },
        release: function () {
          if (isDraggedToTop()) {
            editorWindow.autoResize('top');
          } else if (isDraggedToBottom()) {
            editorWindow.autoResize('bottom');
          }
          editorWindow.endResize();
        }
      }).bindTo(dragbarElement);

      editorWindow.element.addEventListener('editorDockToBottom', function (e) {
        editorWindow.element.prepend(dragbarElement);
      }, false);

      editorWindow.element.addEventListener('editorDockToTop', function (e) {
        editorWindow.element.appendChild(dragbarElement);
      }, false);
    }
  };
})();

export default windowBar;
