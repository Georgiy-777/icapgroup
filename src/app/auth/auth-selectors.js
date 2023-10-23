const getIsLoggedIn = () => (state) => state.auth.isLoggedIn;
const getRecoveryEmail = () => (state) => state.auth.recovery_email;

export { getIsLoggedIn, getRecoveryEmail };
