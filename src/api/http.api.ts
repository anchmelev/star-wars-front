import { QueryClient, QueryFunctionContext } from 'react-query';
import axios from 'axios';
import { AxiosError } from 'axios';
import { ApiError } from './types';

export const httpApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface ApiErrorData {
  detail: string;
}

httpApi.interceptors.response.use(undefined, (error: AxiosError<ApiErrorData>) => {
  throw new ApiError<ApiErrorData>(error.response?.data?.detail || error.message, error.response?.data);
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async (context: QueryFunctionContext) => {
        const { queryKey } = context;
        const queryArr = queryKey as [string];
        const response = await httpApi.get(queryArr[0]);
        return response.data;
      },
      onError: (error) => {
        // TODO ...
        console.error('Error fetching data:', error);
      },
    },
  },
});
