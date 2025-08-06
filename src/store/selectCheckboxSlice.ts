import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const selectCheckboxSlice = createSlice({
  name: 'selectCheckbox',
  initialState: {
    checkedItems: [] as string[],
  },
  reducers: {
    toggleIsCheckedItem(state, action: PayloadAction<string>) {
      const name = action.payload;
      const index = state.checkedItems.indexOf(name);

      if (index >= 0) {
        state.checkedItems.splice(index, 1);
      } else {
        state.checkedItems.push(name);
      }
    },
    unselectAllItems(state) {
      state.checkedItems = [];
    },
  },
});

export const { toggleIsCheckedItem, unselectAllItems } =
  selectCheckboxSlice.actions;

export default selectCheckboxSlice.reducer;
