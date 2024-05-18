export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectLoading = (state) => state.auth.loading;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectUser = (state) => state.auth.user;
