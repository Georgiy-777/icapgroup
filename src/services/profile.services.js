import { axiosService } from './apiService/axiosService';
import { notifixApi } from './apiService';
import axios from 'axios';

const profileApi = notifixApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query({
      async queryFn({ incomeData, action }, { dispatch }) {
        try {
          const { data } = await axiosService.get(
            `profile/${incomeData?.profileId}`,
            {}
          );
          if (data?.success) {
            dispatch(profileAction.setProfile({ ...data?.profile }));
            action && action();
          }
          return { data };
        } catch (error) {
          return { error: error?.message || error };
        }
      },
      providesTags: ['getProfile'],
    }),
    updateProfile: builder.mutation({
      async queryFn(incomeData, { dispatch }) {
        try {
          const { data } = await axiosService.put(`profile`, { ...incomeData });
          if (data?.success) {
            dispatch(profileAction.setProfile({ ...incomeData }));
          }
          return { data };
        } catch (error) {
          return { error: error?.message || error };
        }
      },
      providesTags: ['profile'],
    }),
    updateAvatar: builder.mutation({
      async queryFn(media, { dispatch }) {
        try {
          const { data } = await axiosService.put(
            `profile/avatar`,
            { ...media },
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          if (data?.success) {
            dispatch(profileAction.setProfileAvatar(data?.profile?.avatar));
          }
          // if (!data?.success) dispatch(loadingError(data));

          return { data: null };
        } catch (error) {
          return { error: error?.message || error };
        }
      },
      invalidatesTags: ['getProfile'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
} = profileApi;

export default profileApi;
