import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

export type ViewMode = 'preview' | 'raw';

export interface ViewModeState {
  mode: ViewMode;
}

const initialState: ViewModeState = {
  mode: 'preview',
};

export const { actions, reducer } = createSlice({
  name: 'viewMode',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<ViewMode>) => {
      state.mode = action.payload;
    },
    toggleMode: (state) => {
      state.mode = state.mode === 'preview' ? 'raw' : 'preview';
    },
  },
});

export const selectors = {
  selectMode: (state: RootState) => state.viewMode.mode,
};
