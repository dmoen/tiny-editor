let btnMaximize = (() => {
  let btnElement = document.querySelector('#simple-editor__drag-bar a.maximize');

  return {
    init: (editorWindow) => {
      btnElement.addEventListener('click', () => {
        editorWindow.maximize();
      });
    }
  };
})();

export default btnMaximize;
