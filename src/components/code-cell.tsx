/** @format */

import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../store/cell';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateCell } from '../store/slice/cells-slice';
import { compile } from '../store/thunks/bundle';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useAppDispatch();

  const bundle = useAppSelector((state) => state.bundle[cell.id]);

  //this useEffect is called whenever the input from the user is changed
  useEffect(() => {
    //if bundle does not exist we immidiately create and return so we don't need to wait for 750ms
    //for no reason on the first boot up
    if (!bundle) {
      dispatch(compile(cell.content, cell.id));
      return;
    }
    const timer = setTimeout(async () => {
      dispatch(compile(cell.content, cell.id));
    }, 500);

    //every time a timer is called it has to be cleared or the times of the counter will fuck up
    return () => {
      clearTimeout(timer);
    };
    //adding bundle to the dependency array starts a infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, dispatch]);

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
        <div className='bg'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
