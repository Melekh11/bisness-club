import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { tokenProvider } from '../helpers/tokenProvider';
import { actionAPI } from '../api/actionAPI';

export type CounterState = {
  value: number;
}

let initValue = tokenProvider.token ? await actionAPI.get_counter() : 0;

const initialState: CounterState = {
  value: initValue
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setCounter: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    }
  }
})

export const { increment, decrement, setCounter } = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
