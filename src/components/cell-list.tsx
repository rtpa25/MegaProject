/** @format */

import { Fragment } from 'react';
import { useAppSelector } from '../hooks';
import AddCell from './add-cell';
import CellListItem from './cell-list-item';
import './cell-list.css';

const CellList: React.FC = () => {
  const order = useAppSelector((state) => state.cell.order);
  const data = useAppSelector((state) => state.cell.data);
  const cells = order.map((id) => {
    return data[id];
  });

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell forceVisible={cells.length === 0} prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
