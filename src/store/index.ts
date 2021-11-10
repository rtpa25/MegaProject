/** @format */

import { configureStore } from '@reduxjs/toolkit';
import CellSliceActions from './slice/cells-slice';
import CodeBundleActions from './slice/code-bundle-slice';

const store = configureStore({
  reducer: {
    cell: CellSliceActions,
    bundle: CodeBundleActions,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
