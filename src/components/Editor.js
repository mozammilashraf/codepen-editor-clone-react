import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';

const Editor = (props) => {
  const {
    language,
    displayName,
    value,
    onChange
  } = props;
  const [open, setOpen] = useState(true);

  /**
   * calls the onChange prop with the updated value, which will update the value of the ControlledEditor and trigger a re-render.
   * @param {*} editor CodeMirror instance
   * @param {*} data object that contains information about the change that was made to the editor's content
   * @param {*} value new value of the editor's content after the change has been made
   */
  const handleChange = (editor, data, value) => { 
    onChange(value);
  }

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className="editor-title">
        {displayName}
        <button
          type='button'
          className='expand-collapse-btn'
          onClick={() => setOpen(prevOpen => !prevOpen)}
        >
          <FontAwesomeIcon 
            icon={open ? faCompressAlt : faExpandAlt}
          />
        </button>
      </div>
      {/* code editor */}
      <ControlledEditor 
        onBeforeChange={handleChange} //called before the editor's value is changed
        value={value}
        className='code-mirror-wrapper'
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true
        }}
      />
    </div>
  )
}

export default Editor


