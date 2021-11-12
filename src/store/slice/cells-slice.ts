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
  order: [],
  data: {},
};

const CellSlice = createSlice({
  name: 'cell',
  initialState: initialState,
  reducers: {
    setLoading(state) {
      state.loading = !state.loading;
    },

    setErr(state, action: PayloadAction<{ error: string | null }>) {
      const { error } = action.payload;
      state.error = error;
    },

    getCells(state, action: PayloadAction<{ cells: Cell[] }>) {
      const { cells } = action.payload;
      state.order = cells.map((cell) => cell.id);
      state.data = cells.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellsState['data']);
    },

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

    insertCellAfter(
      state,
      action: PayloadAction<{
        cellId: string | null;
        cellType: 'code' | 'text';
      }>
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
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }
    },
  },
});

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export const {
  updateCell,
  deleteCell,
  moveCell,
  insertCellAfter,
  setLoading,
  setErr,
  getCells,
} = CellSlice.actions;

export default CellSlice.reducer;
