/** @format */

import { useAppDispatch } from '../hooks';
import { insertCellAfter } from '../store/slice/cells-slice';
import AddCellButton from './add-cell-button';
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
        <AddCellButton
          onClick={() =>
            dispatch(insertCellAfter({ cellId: prevCellId, cellType: 'code' }))
          }
          buttonText={'Code'}
        />
        <AddCellButton
          onClick={() =>
            dispatch(insertCellAfter({ cellId: prevCellId, cellType: 'text' }))
          }
          buttonText={'Text'}
        />
      </div>
      <div className='divider'></div>
    </div>
  );
};

export default AddCell;
