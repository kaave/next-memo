export const actionTypes = Object.freeze({
  SHOW_MODAL: '@UI/SHOW_MODAL',
  HIDE_MODAL: '@UI/HIDE_MODAL',
} as const);
export const sagaTypes = Object.freeze({} as const);
export const types = Object.freeze({ ...actionTypes, ...sagaTypes } as const);

export type Action = keyof typeof types;

export type State = {
  showModal: boolean;
};
