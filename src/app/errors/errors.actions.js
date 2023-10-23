import { errorActions } from "./errors.slice";

const loadingError = (error) => (dispatch) => {
  dispatch(
    errorActions.loadError(
      error?.response?.data?.error
        ? error?.response?.data?.error
        : error?.message
    )
  );
};

const clearErrors = () => (dispatch) => dispatch(errorActions.clearError());

export { loadingError, clearErrors };
