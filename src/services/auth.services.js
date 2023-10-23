import authSlice, { authActions } from '../store/auth/auth.slice';
import { axiosService } from './apiService/axiosService';
import { icapgroupApi } from './apiService';


const authApi = icapgroupApi.injectEndpoints({
  endpoints: (builder) => ({

    signIn: builder.mutation({
      async queryFn({ incomeData, action }, { dispatch }) {
        try {
          const { data } = await axiosService.post(`login/`, {
            ...incomeData,
          });
          if (data?.message.includes("Authentication successful.")) {
            dispatch(authActions.setIsLoggedIn(true));
            action && action();
          }
      
          return { data };
        } catch (error) {

          return { error: error?.message || error };
        }
      },
      providesTags: ['auth'],
    }),

  }),
  overrideExisting: true,
});

export const {  useSignInMutation } =  authApi;

export default authApi;
