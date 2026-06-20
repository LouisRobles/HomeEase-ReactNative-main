import { create } from 'zustand';
import { notifications as dummyNotifications } from '../constants/dummyData';

export type Notification = {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly time: string;
  readonly type: "booking" | "payment" | "review" | "message" | "system";
  readonly isRead: boolean;
};

type NotificationState = {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  addNotification: (notification: Omit<Notification, 'time'>) => void;
  markAsRead: (id: string) => void;
};

export const useNotificationStore = create<NotificationState>((set) => {
  const initialNotifications = dummyNotifications.map((n) => ({
    ...n,
    isRead: false,
  })) as Notification[];
  const initialUnreadCount = initialNotifications.filter((n) => !n.isRead).length;

  return {
    notifications: initialNotifications,
    unreadCount: initialUnreadCount,
    markAllRead: () =>
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      })),
    addNotification: (notification: Omit<Notification, 'time'>) =>
      set((state) => {
        const newNotification: Notification = {
          ...notification,
          time: new Date().toISOString(),
        };
        return {
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        };
      }),
    markAsRead: (id: string) =>
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      })),
  };
});

