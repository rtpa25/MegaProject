/** @format */
import { useState } from 'react';
import { bundler } from '../bundler';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import classes from './CodeCell.module.css';

function CodeCell() {
  //this peice of state is the user input
  const [input, setInput] = useState('');
  //this peice of state is the compiled code
  const [code, setCode] = useState('');

  const onClick = async () => {
    //this output is the bundled and compiled code being returned from bundler
    const output = await bundler(input);
    setCode(output);
  };

  return (
    <Resizable direction='vertical'>
      <div className={classes.codeCell}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue='hello'
            onChange={(value) => {
              setInput(value);
            }}
          />
        </Resizable>

        <Preview code={code} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
