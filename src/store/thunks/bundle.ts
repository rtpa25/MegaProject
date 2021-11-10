/** @format */

import { getBundles, setLoading, setErr } from '../slice/code-bundle-slice';
import { AppDispatch } from '../index';
import bundle from '../../bundler';

export const compile = (inputCode: string, cellId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading({ cellId: cellId }));
    try {
      const output = await bundle(inputCode);
      dispatch(getBundles({ cellId: cellId, code: output.code }));
    } catch (error) {
      dispatch(setErr({ cellId: cellId, err: error as string }));
    }
  };
};
