let editorWindow = (() => {
  const initHeight = '400px';

  let editorElement = document.getElementById('simple-editor');

  let editorWrapElement = document.getElementById('simple-editor__editor-wrapper');

  let origHeight;

  let dockPosition = 'bottom';

  let fireResizeEvent = () => {
    let event = document.createEvent('Event');
    event.initEvent('editorResize', true, true);
    editorElement.dispatchEvent(event);
  };

  let fireShowEvent = () => {
    let event = document.createEvent('Event');
    event.initEvent('editorShow', true, true);
    editorElement.dispatchEvent(event);
  };

  let fireDockToTopEvent = () => {
    let event = document.createEvent('Event');
    event.initEvent('editorDockToTop', true, true);
    editorElement.dispatchEvent(event);
  };

  let fireDockToBottomEvent = () => {
    let event = document.createEvent('Event');
    event.initEvent('editorDockToBottom', true, true);
    editorElement.dispatchEvent(event);
  };

  let show = () => {
    editorElement.style.height = initHeight;
    editorElement.classList.add('visible');
  };

  let dockToTop = () => {
    dockPosition = 'top';
    editorElement.style.height = initHeight;
    // editorElement.appendChild(windowBar.element);
    editorElement.style.bottom = 'auto';
    editorElement.style.top = 0 + 'px';
  };

  let dockToBottom = () => {
    dockPosition = 'bottom';
    editorElement.style.height = initHeight;
    // editorElement.prepend(windowBar.element);
    editorElement.style.top = 'auto';
    editorElement.style.bottom = 0 + 'px';
  };

  return {
    init: () => {
      show();
      fireShowEvent();
    },
    initResize: () => {
      origHeight = editorElement.offsetHeight;
    },
    endResize: () => {
      editorWrapElement.classList.remove('hidden');
      fireResizeEvent();
    },
    dragResize: (dragDistance) => {
      editorWrapElement.classList.add('hidden');
      if (dockPosition === 'bottom') {
        editorElement.style.height = dragDistance + origHeight + 'px';
      } else {
        editorElement.style.height = dragDistance * -1 + origHeight + 'px';
      }
    },
    autoResize: function (barPos) {
      if ((barPos === 'top' && dockPosition === 'bottom') ||
        (barPos === 'bottom' && dockPosition === 'top')) {
        this.maximize();
      } else {
        this.minimize();
      }
    },
    close: () => {
      editorElement.classList.remove('visible');
    },
    minimize: () => {
      editorElement.style.height = editorElement.offsetHeight - editorWrapElement.offsetHeight + 'px';
      fireResizeEvent();
    },
    maximize: () => {
      editorElement.style.height = window.innerHeight + 'px';
      fireResizeEvent();
    },
    dockToggle: () => {
      if (dockPosition === 'bottom') {
        dockToTop();
        fireDockToTopEvent();
      } else {
        dockToBottom();
        fireDockToBottomEvent();
      }
      fireResizeEvent();
    },
    element: editorElement,
    wrapElement: editorWrapElement
  };
})();

export default editorWindow;
