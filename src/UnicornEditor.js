import React, { Component } from "react";
import { EditorState } from "draft-js";
import Editor, { composeDecorators } from "draft-js-plugins-editor";

import createLinkifyPlugin from "draft-js-linkify-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";
import createImagePlugin from "draft-js-image-plugin";
import createAlignmentPlugin from "draft-js-alignment-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";

// import createDragNDropUploadPlugin from "draft-js-drag-n-drop-upload-plugin";

import "draft-js-linkify-plugin/lib/plugin.css";
import "draft-js-emoji-plugin/lib/plugin.css";
import "draft-js-image-plugin/lib/plugin.css";
import "draft-js-alignment-plugin/lib/plugin.css";
import "draft-js-focus-plugin/lib/plugin.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";

import ImageButton from "./ImageButton";
import ImportRawButton from "./ImportRawButton";

import styles from "./unicorneditor.css";

const linkifyPlugin = createLinkifyPlugin();

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

// const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
//   handleUpload: () => null, //mockUpload
//   addImage: imagePlugin.addImage
// });

const plugins = [
  linkifyPlugin,
  emojiPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  sideToolbarPlugin,
  inlineToolbarPlugin
  // dragNDropFileUploadPlugin,
];

export default class UnicornEditor extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    const { editorState } = this.state;
    return (
      <div style={{ padding: 56 }}>
        <div
          style={{ border: "1px solid black", margin: 40, minHeight: 200 }}
          className={styles.editor}
          onClick={this.focus}
        >
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={element => {
              this.editor = element;
            }}
          />
          <SideToolbar />
          <AlignmentTool />
          <InlineToolbar />
          <EmojiSuggestions />
        </div>
        <EmojiSelect />
        <ImageButton
          editorState={editorState}
          setEditorState={this.onChange}
          addImage={imagePlugin.addImage}
        />
        <ImportRawButton
          editorState={editorState}
          setEditorState={this.onChange}
        />
      </div>
    );
  }
}
