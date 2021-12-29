import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Label } from 'reactstrap';
import './TextEditor.scss';

TextEditor.propTypes = {
  title: PropTypes.string,
  close: PropTypes.func,
  onTextChange: PropTypes.func,
  text: PropTypes.string
};

TextEditor.defaultProps = {
  title: '',
  close: null,
  onTextChange: null,
  text: ''
}

function TextEditor(props) {
  const { title, close, onTextChange, text } = props;
  const [data, setData] = useState(text)

  const handleChange = (e, editor) => {
    const currentData = editor.getData();
    setData(currentData);
  }

  const handleDone = (data) => {
    onTextChange(data);
    close();
  }

  return (
    <div className="text-editor">
      <Label>{title}</Label>
      <CKEditor
        editor={ClassicEditor}
        // config={{
          
        // }}
        data={data}
        onChange={handleChange}
      />
      <div className="text-editor__btn-group">
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={() => handleDone(data)}
        >Done</button>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={close}
        >Cancel</button>
      </div>
    </div>
  );
}

export default TextEditor;