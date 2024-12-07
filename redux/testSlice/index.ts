// slices/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  greeting: string;
}

const initialState: InitialState = {
  greeting: 'Hello, this is FurrEver App.'
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
  },
});

// export const { increment, decrement, incrementByAmount } = testSlice.actions;
export default testSlice.reducer;
