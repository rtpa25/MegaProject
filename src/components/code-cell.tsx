/** @format */

import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';
import { Cell } from '../store/cell';
import { useAppDispatch } from '../hooks';
import { updateCell } from '../store/slice/cells-slice';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useAppDispatch();
  //state associated with the compiled code
  const [code, setCode] = useState('');
  //state associated with the compilation status
  const [err, seterr] = useState('');

  //this useEffect is called whenever the input from the user is changed
  useEffect(() => {
    const timer = setTimeout(async () => {
      //bundling and compiling of code happens every 750ms
      const output = await bundle(cell.content);
      setCode(output.code);
      seterr(output.err);
    }, 750);

    //every time a timer is called it has to be cleared or the times of the counter will fuck up
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100%)',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) =>
              dispatch(updateCell({ id: cell.id, content: value }))
            }
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
