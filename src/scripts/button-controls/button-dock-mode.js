let btnDockMode = (() => {
  let btnElement = document.querySelector('#simple-editor__drag-bar a.dock-toggle');

  return {
    init: (editorWindow) => {
      btnElement.addEventListener('click', () => {
        editorWindow.dockToggle();
      });
    }
  };
})();

export default btnDockMode;
