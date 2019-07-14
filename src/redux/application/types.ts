export const actionTypes = Object.freeze({
  LOADING_START: '@APPLICATION/LOADING_START',
  LOADING_END: '@APPLICATION/LOADING_END',
} as const);
export const sagaTypes = Object.freeze({} as const);
export const types = Object.freeze({ ...actionTypes, ...sagaTypes } as const);

export type State = {
  isLoading: boolean;
};
