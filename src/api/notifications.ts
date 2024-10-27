// import { useState, useEffect, useCallback } from 'react';
// import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { END_POINT } from '@/constants/api';
import { axiosInstance } from './interceptor';

// interface NotificationMessage {
//   id: number;
//   category: string;
//   createdAt: string;
//   postTitle: string;
//   message: string;
//   isNew?: boolean;
// }

export const postNotification = async (Id: number) => {
  const response = await axiosInstance.post(END_POINT.READ_NOTIFICATION(Id));
  return response;
};

// export const useFetchSSE = () => {
//   const [messages, setMessages] = useState<NotificationMessage[]>([]);

//   useEffect(() => {
//     const EventSource = EventSourcePolyfill || NativeEventSource;
//     const eventSource = new EventSource(
//       `${process.env.API_URL}${END_POINT.NOTIFICATON}`,
//       {
//         headers: {
//           Authorization: `${localStorage.getItem('accessToken')}`,
//         },
//         withCredentials: true,
//         heartbeatTimeout: 86400000,
//       },
//     );

//     eventSource.onmessage = (event) => {
//       const newMessage = JSON.parse(event.data);
//       setMessages((prevMessages) => [newMessage.time, ...prevMessages]);
//     };

//     eventSource.onerror = (error) => {
//       console.error('EventSource failed:', error);
//       eventSource.close();
//     };

//     return () => {
//       eventSource.close();
//     };
//   }, []);

// export const useFetchSSE = () => {
//   try {
//     const EventSource = EventSourcePolyfill || NativeEventSource;
//     const eventSource = new EventSourcePolyfill(
//       `${process.env.API_URL}${END_POINT.NOTIFICATON}`,
//       {
//         headers: {
//           Authorization: `${localStorage.getItem('accessToken')}`,
//         },
//         withCredentials: true,
//         heartbeatTimeout: 86400000,
//       },
//     );

//     eventSource.onmessage = (e) => {
//       console.log(e.data);
//     };

//     eventSource.onerror = (e) => {
//       console.log(e);
//       eventSource.close();
//     };

//   } catch (err) {
//     console.log('SSE error:', err);
//   }
// }

//   const handleMarkAsRead = useCallback(async (notificationId: number) => {
//     try {
//       await postNotification(notificationId);
//       setMessages((prevMessages) =>
//         prevMessages.map((message) =>
//           message.id === notificationId
//             ? { ...message, isNew: false }
//             : message,
//         ),
//       );
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   }, []);
//   return { messages, handleMarkAsRead };
// };
