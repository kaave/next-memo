export type State = {
  isLoading: boolean;
  message: string;
};

export const types = Object.freeze({
  LOADING_START: '@APPLICATION/LOADING_START',
  LOADING_END: '@APPLICATION/LOADING_END',
  ASYNC_WRITE_MESSAGE: '@APPLICATION/ASYNC_WRITE_MESSAGE',
} as const);
