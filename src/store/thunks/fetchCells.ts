/** @format */

import { AppDispatch } from '../index';
import { Cell } from '../cell';
import { getCells, setErr, setLoading } from '../slice/cells-slice';
import axios from 'axios';

export const fetchCells = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading());
    try {
      const { data }: { data: Cell[] } = await axios.get('/cells');
      console.log(data);
      console.log('hurray');
      dispatch(getCells({ cells: data }));
    } catch (error: any) {
      dispatch(setErr(error.message));
    }
    dispatch(setLoading());
  };
};
