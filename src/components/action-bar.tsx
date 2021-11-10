/** @format */

import { useAppDispatch } from '../hooks';
import { moveCell, deleteCell } from '../store/slice/cells-slice';
import ActionBarButton from './action-bar-button';
import './action-bar.css';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  return (
    <div className='action-bar'>
      <ActionBarButton
        onClick={() => dispatch(moveCell({ cellId: id, direction: 'up' }))}
        iClassName={'fas fa-arrow-up'}
      />
      <ActionBarButton
        onClick={() => dispatch(moveCell({ cellId: id, direction: 'down' }))}
        iClassName={'fas fa-arrow-down'}
      />
      <ActionBarButton
        onClick={() => dispatch(deleteCell({ cellId: id }))}
        iClassName={'fas fa-times'}
      />
    </div>
  );
};

export default ActionBar;
