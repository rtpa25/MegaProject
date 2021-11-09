/** @format */

import { useAppSelector } from '../hooks';
import CellListItem from './cell-list-item';

const CellList: React.FC = () => {
  const order = useAppSelector((state) => state.cell.order);
  const data = useAppSelector((state) => state.cell.data);
  const cells = order.map((id) => {
    return data[id];
  });

  console.log(data);
  console.log(order);

  const renderedCells = cells.map((cell) => (
    <CellListItem key={cell.id} cell={cell} />
  ));

  return <div>{renderedCells}</div>;
};

export default CellList;
