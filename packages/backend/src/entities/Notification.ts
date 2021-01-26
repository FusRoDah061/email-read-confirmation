export default interface Notification {
  id: string;
  sender: string;
  description: string;
  viewCount: number;
  expiration: string;
  recipient?: string;
}
