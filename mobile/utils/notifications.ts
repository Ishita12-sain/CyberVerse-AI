import { NotificationItem, INITIAL_NOTIFICATIONS } from '../data/notifications';

let localNotificationsStore: NotificationItem[] = [...INITIAL_NOTIFICATIONS];

export const getNotifications = (): NotificationItem[] => {
  return [...localNotificationsStore];
};

export const getUnreadNotificationCount = (): number => {
  return localNotificationsStore.filter((n) => !n.isRead).length;
};

export const markNotificationAsRead = (id: string): NotificationItem[] => {
  localNotificationsStore = localNotificationsStore.map((n) =>
    n.id === id ? { ...n, isRead: true } : n
  );
  return getNotifications();
};

export const markAllNotificationsAsRead = (): NotificationItem[] => {
  localNotificationsStore = localNotificationsStore.map((n) => ({
    ...n,
    isRead: true,
  }));
  return getNotifications();
};
