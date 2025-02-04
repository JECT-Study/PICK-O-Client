export interface NotificationMessage {
  id: number;
  category: string;
  createdAt: string;
  postTitle: string;
  message: string;
  isNew?: boolean;
}
