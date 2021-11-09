/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: ['test-1', 'test-2', 'test-3', 'test-4'],
  data: {
    'test-1': { id: 'test-1', type: 'code', content: '' },
    'test-2': { id: 'test-2', type: 'text', content: '' },
    'test-3': { id: 'test-3', type: 'code', content: '' },
    'test-4': { id: 'test-4', type: 'text', content: '' },
  },
};

const CellSlice = createSlice({
  name: 'cell',
  initialState: initialState,
  reducers: {
    updateCell(state, action: PayloadAction<{ id: string; content: string }>) {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    deleteCell(state, action: PayloadAction<{ cellId: string }>) {
      const { cellId } = action.payload;
      delete state.data[cellId];
      state.order = state.order.filter((id) => id !== cellId);
    },
    moveCell(
      state,
      action: PayloadAction<{ direction: string; cellId: string }>
    ) {
      const { direction, cellId } = action.payload;
      const index = state.order.findIndex((id) => id === cellId);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = cellId;
    },
    insertCellBefore(
      state,
      action: PayloadAction<{ cellId: string; cellType: 'code' | 'text' }>
    ) {
      const { cellId, cellType } = action.payload;
      const cell: Cell = {
        content: '',
        type: cellType,
        id: randomId(),
      };

      state.data[cell.id] = cell;
      const foundIndex = state.order.findIndex((id) => id === cellId);

      if (foundIndex < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(foundIndex, 0, cell.id);
      }
    },
  },
});

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export const { updateCell, deleteCell, moveCell, insertCellBefore } =
  CellSlice.actions;

export default CellSlice.reducer;
