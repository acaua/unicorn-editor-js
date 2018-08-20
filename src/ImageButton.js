import React from "react";

export default class ImageButton extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    this.input.value = null;
    this.input.click();
  };

  onChange = e => {
    // e.preventDefault();
    const file = e.target.files[0];
    if (file.type.indexOf("image/") === 0) {
      const { editorState, setEditorState, addImage } = this.props;
      const src = URL.createObjectURL(file);

      const newState = addImage(editorState, src);
      setEditorState(newState);
    }
  };

  render() {
    return (
      <button type="button" onClick={this.onClick} title="Add an Image">
        Add an image
        <input
          type="file"
          ref={c => {
            this.input = c;
          }}
          onChange={this.onChange}
          style={{ display: "none" }}
        />
      </button>
    );
  }
}
