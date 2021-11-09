/** @format */

import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from '../hooks';
import { updateCell } from '../store/slice/cells-slice';
import { Cell } from '../store/cell';
import './text-editor.css';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  //this state manages wether the user is still editing or wants to see in the view mode
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      //id statement catches the case when user clicks anywhere but on the markdown itself
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className='text-editor' ref={ref}>
        <MDEditor
          value={cell.content}
          onChange={(v) =>
            dispatch(updateCell({ id: cell.id, content: v || '' }))
          }
        />
      </div>
    );
  }

  return (
    <div
      className='text-editor card'
      onClick={() => {
        setEditing(true);
      }}>
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
