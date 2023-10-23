const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  currentPath: null,
  breadcrumbs: [],
  currentIndexTabDeploy: 0,
  isActionsVisible: false,
  isActions: true,
  setActionsList: null,
  temporaryCode: null,
  temporaryName: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setCurrentPath: (state, { payload }) => {
      state.currentPath = payload;
    },
    setBreadcrumbs: (state, { payload }) => {
      state.breadcrumbs = [...payload];
    },
    setCurrentIndexTabDeploy: (state, { payload }) => {
      state.currentIndexTabDeploy = payload;
    },
    setIsActionsVisible: (state, { payload }) => {
      state.isActionsVisible = payload;
    },
    setIsActions: (state, { payload }) => {
      state.isActions = payload;
    },
    setActionsList: (state, { payload }) => {
      state.isActions = payload;
    },
    setTemporaryCode: (state, { payload }) => {
      state.temporaryCode = payload;
    },
    setTemporaryName: (state, { payload }) => {
      state.temporaryName = payload;
    },
    resetContent: state => {
      Object.keys(initialState).forEach(key => {
        state[key] = initialState[key];
      });
    },
  },
});

export const contentAction = contentSlice.actions;

export default contentSlice;
