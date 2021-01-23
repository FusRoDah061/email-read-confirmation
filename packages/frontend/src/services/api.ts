import axios, { AxiosResponse } from 'axios';

type ApiResponse<T> = Promise<AxiosResponse<T>>;

interface CreateNotificationData {
  description: string;
  sender: string;
  recipient?: string;
}

interface CreateNotificationResponse {
  id: string;
  sender: string;
  description: string;
  viewCount: number;
  expiration: string;
  recipient?: string;
}

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const api = {
  createNotification: ({
    description,
    sender,
    recipient,
  }: CreateNotificationData): ApiResponse<CreateNotificationResponse> =>
    client.post<CreateNotificationResponse>('/notify', {
      description,
      sender,
      recipient,
    }),
};

export default api;
