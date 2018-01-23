let btnMinimize = (() => {
  let btnElement = document.querySelector('#simple-editor__drag-bar a.minimize');

  return {
    init: (editorWindow) => {
      btnElement.addEventListener('click', () => {
        editorWindow.minimize();
      });
    }
  };
})();

export default btnMinimize;
