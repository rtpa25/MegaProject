/** @format */

import { AppDispatch } from '../index';
import { setErr, setLoading } from '../slice/cells-slice';
import axios from 'axios';
import { Cell } from '../cell';

export const saveCells = (cells: Cell[]) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading());
    try {
      await axios.post('http://localhost:4005/cells', {
        cells: cells,
      });
    } catch (error: any) {
      dispatch(setErr({ error: error.message }));
    }
    dispatch(setLoading());
  };
};
