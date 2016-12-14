'use babel';

export default class BackTextView {
  constructor(serializedState) {
    this.container = document.createElement('div');
    this.container.classList.add('backtext-container');
    this.title = document.createElement('div');
    this.container.appendChild(this.title);
    this.title.classList.add('backtext-container','title');
    this.title.textContent = 'looking for todo ...';
  }

  setup(editor, editorElement){
    this.editor = editor;
    editorElement.shadowRoot.appendChild(this.container);
    this.update();
  }

  update(){
    let text = this.editor.getText();
    let lines = []
    let tmp = ''
    for (let c of text){
      if (c === '\r' || c === '\n'){
        lines.push(tmp);
        tmp = ''
      }
      else {
        tmp = tmp + c;
      }
    }
    lines.push(tmp)
    cursor = this.editor.getCursorBufferPosition().row;
    for (let i = cursor ; i >= 0; i--){
      let todo = lines[i].indexOf('TODO');
      if (todo >= 0) {
        let line = lines[i].replace('//TODO','');
        line = "TODO: " + line;
        this.title.textContent = line;
        break;
      }
    }
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.container.remove();
  }

  getElement() {
    return this.container;
  }

}
