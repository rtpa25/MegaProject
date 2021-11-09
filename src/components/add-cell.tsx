/** @format */

import { useAppDispatch } from '../hooks';
import { insertCellAfter } from '../store/slice/cells-slice';
import './add-cell.css';

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
        <button
          className='button is-rounded is-primary is-small'
          onClick={() => {
            dispatch(insertCellAfter({ cellId: prevCellId, cellType: 'code' }));
          }}>
          <span className='icon is-small'>
            <i className='fas fa-plus'></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className='button is-rounded is-primary is-small'
          onClick={() => {
            dispatch(insertCellAfter({ cellId: prevCellId, cellType: 'text' }));
          }}>
          <span className='icon is-small'>
            <i className='fas fa-plus'></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  );
};

export default AddCell;
