import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@homeease_auth_token',
  AUTH_USER: '@homeease_auth_user',
  BOOKING_DRAFT: '@homeease_booking_draft',
  SEARCH_HISTORY: '@homeease_search_history',
  BOOKINGS_CACHE: '@homeease_bookings_cache',
  MESSAGES_CACHE: '@homeease_messages_cache',
  NOTIFICATIONS_CACHE: '@homeease_notifications_cache',
  WORKERS_CACHE: '@homeease_workers_cache',
};

// Auth Storage
export const authStorage = {
  async saveToken(token: string) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Error saving auth token:', error);
    }
  },

  async getToken() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error reading auth token:', error);
      return null;
    }
  },

  async saveUser(user: any) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  async getUser() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading user:', error);
      return null;
    }
  },

  async clearAuth() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  },
};

// Booking Draft Storage
export const bookingStorage = {
  async saveDraft(draft: any) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKING_DRAFT, JSON.stringify(draft));
    } catch (error) {
      console.error('Error saving booking draft:', error);
    }
  },

  async getDraft() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BOOKING_DRAFT);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading booking draft:', error);
      return null;
    }
  },

  async clearDraft() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.BOOKING_DRAFT);
    } catch (error) {
      console.error('Error clearing booking draft:', error);
    }
  },

  // Cache full bookings list for offline access
  async cacheBookings(bookings: any[]) {
    try {
      const data = {
        bookings,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKINGS_CACHE, JSON.stringify(data));
    } catch (error) {
      console.error('Error caching bookings:', error);
    }
  },

  async getCachedBookings() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BOOKINGS_CACHE);
      return data ? JSON.parse(data).bookings : [];
    } catch (error) {
      console.error('Error reading cached bookings:', error);
      return [];
    }
  },

  async clearBookingsCache() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.BOOKINGS_CACHE);
    } catch (error) {
      console.error('Error clearing bookings cache:', error);
    }
  },
};

// Search History Storage
export const searchStorage = {
  async saveSearches(searches: string[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(searches));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  },

  async getSearches() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading search history:', error);
      return [];
    }
  },

  async clearSearches() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  },
};

// Messages Cache Storage
export const messageStorage = {
  async cacheMessages(conversationId: string, messages: any[]) {
    try {
      const data = {
        messages,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(
        `${STORAGE_KEYS.MESSAGES_CACHE}_${conversationId}`,
        JSON.stringify(data)
      );
    } catch (error) {
      console.error('Error caching messages:', error);
    }
  },

  async getCachedMessages(conversationId: string) {
    try {
      const data = await AsyncStorage.getItem(
        `${STORAGE_KEYS.MESSAGES_CACHE}_${conversationId}`
      );
      return data ? JSON.parse(data).messages : [];
    } catch (error) {
      console.error('Error reading cached messages:', error);
      return [];
    }
  },

  async clearMessagesCache(conversationId?: string) {
    try {
      if (conversationId) {
        await AsyncStorage.removeItem(
          `${STORAGE_KEYS.MESSAGES_CACHE}_${conversationId}`
        );
      } else {
        // Clear all message caches
        const keys = await AsyncStorage.getAllKeys();
        const messageKeys = keys.filter((k) => k.startsWith(STORAGE_KEYS.MESSAGES_CACHE));
        await AsyncStorage.multiRemove(messageKeys);
      }
    } catch (error) {
      console.error('Error clearing messages cache:', error);
    }
  },
};

// Notifications Cache Storage
export const notificationStorage = {
  async cacheNotifications(notifications: any[]) {
    try {
      const data = {
        notifications,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(
        STORAGE_KEYS.NOTIFICATIONS_CACHE,
        JSON.stringify(data)
      );
    } catch (error) {
      console.error('Error caching notifications:', error);
    }
  },

  async getCachedNotifications() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS_CACHE);
      return data ? JSON.parse(data).notifications : [];
    } catch (error) {
      console.error('Error reading cached notifications:', error);
      return [];
    }
  },

  async clearNotificationsCache() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS_CACHE);
    } catch (error) {
      console.error('Error clearing notifications cache:', error);
    }
  },
};

// Workers Cache Storage
export const workerStorage = {
  async cacheWorkers(workers: any[]) {
    try {
      const data = {
        workers,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(STORAGE_KEYS.WORKERS_CACHE, JSON.stringify(data));
    } catch (error) {
      console.error('Error caching workers:', error);
    }
  },

  async getCachedWorkers() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.WORKERS_CACHE);
      return data ? JSON.parse(data).workers : [];
    } catch (error) {
      console.error('Error reading cached workers:', error);
      return [];
    }
  },

  async clearWorkersCache() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.WORKERS_CACHE);
    } catch (error) {
      console.error('Error clearing workers cache:', error);
    }
  },
};

// General storage utilities
export const appStorage = {
  async clearAll() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing all storage:', error);
    }
  },

  /**
   * Clear only cached data (not auth or user prefs)
   */
  async clearCaches() {
    try {
      await Promise.all([
        bookingStorage.clearBookingsCache(),
        messageStorage.clearMessagesCache(),
        notificationStorage.clearNotificationsCache(),
        workerStorage.clearWorkersCache(),
      ]);
      console.log('[Storage] All caches cleared');
    } catch (error) {
      console.error('Error clearing caches:', error);
    }
  },
};
