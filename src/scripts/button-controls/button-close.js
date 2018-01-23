let btnClose = (() => {
  let btnElement = document.querySelector('#simple-editor__drag-bar a.close');

  return {
    init: (editorWindow) => {
      btnElement.addEventListener('click', () => {
        editorWindow.close();
      });
    }
  };
})();

export default btnClose;
