'use babel';

import BackTextView from './back-text-view';
import { CompositeDisposable } from 'atom';

export default {

  backTextView: null,
  subscriptions: null,
  editorSub: null,

  activate(state) {
    this.backTextView = new BackTextView(state.backTextViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'back-text:show': () => this.show()
    }));

    this.subscriptions.add(atom.workspace.onDidStopChangingActivePaneItem(()=>{
      this.setupEditor();
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.backTextView.destroy();
  },

  serialize() {
    return {
      backTextViewState: this.backTextView.serialize()
    };
  },

  show() {
    this.setupEditor();
  },

  setupEditor() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()){
      let editorElement = atom.views.getView(editor)
      this.backTextView.setup(editor, editorElement);
      if (this.editorSub) this.editorSub.dispose();
      this.editorSub = editor.onDidChangeCursorPosition(()=>{
        this.backTextView.update();
      })
    }
  }

};
