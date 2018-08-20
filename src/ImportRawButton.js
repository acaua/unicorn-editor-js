import React from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";

export default class ImportRawButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rawContentString: undefined };
  }

  importRawContent = () => {
    const { rawContentString } = this.state;
    const { setEditorState } = this.props;

    try {
      const rawContent = JSON.parse(rawContentString);
      console.log(JSON.stringify(rawContent));
      setEditorState(EditorState.createWithContent(convertFromRaw(rawContent)));
    } catch (e) {
      console.error(e);
    }
  };

  onRawContentStringChange = e =>
    this.setState({ rawContentString: e.target.value });

  logRawContent = () => {
    const rawContent = convertToRaw(this.props.editorState.getCurrentContent());
    console.log(JSON.stringify(rawContent, null, 2));
  };

  render() {
    const { rawContentString } = this.state;
    return (
      <div>
        <div>
          <button type="button" onClick={this.importRawContent}>
            Import Raw content
          </button>
          <button type="button" onClick={this.logRawContent}>
            Log Raw content
          </button>
        </div>
        <textarea
          onChange={this.onRawContentStringChange}
          value={rawContentString}
        />
      </div>
    );
  }
}
