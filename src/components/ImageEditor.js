import React from 'react';
import AvatarEditor from 'react-avatar-editor';

class ImageEditor extends React.Component {
  onClickSave = () => {
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.editor.getImage();
      console.log(canvas);


      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = this.editor.getImageScaledToCanvas();
    }
  }

  setEditorRef = (editor) => {this.editor = editor}

  render() {
    return (
      <div>
      <AvatarEditor
          ref={this.setEditorRef}
          image={this.props.image}
      />
      <button onClick={this.onClickSave}>save</button>
      </div>
    );
  }
}

export default ImageEditor


