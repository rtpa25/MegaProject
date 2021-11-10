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
import { useCumulativeCode } from '../hooks/useCumilativeCode';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useAppDispatch();
  const bundle = useAppSelector((state) => state.bundle[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      dispatch(compile(cumulativeCode, cell.id));
      return;
    }
    const timer = setTimeout(async () => {
      dispatch(compile(cumulativeCode, cell.id));
    }, 500);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, dispatch]);

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
