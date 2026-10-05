import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { ADD_NOTIFICATION } from '../redux/notification/reducer';

export const useNotificationWebSocket = (entityId, type = 'user') => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!entityId) return;

    const socket = new SockJS('http://localhost:5000/ws');
    const stompClient = Stomp.over(socket);
    stompClient.debug = () => {};

    stompClient.connect({}, () => {
      const destination = type === 'user'
        ? `/topic/notification/${entityId}`
        : `/topic/notification/salon/${entityId}`;

      stompClient.subscribe(destination, (message) => {
        if (message.body) {
          const notification = JSON.parse(message.body);
          dispatch({ type: ADD_NOTIFICATION, payload: notification });
        }
      });
    });

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, [entityId, type, dispatch]);
};
