import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@homeease_auth_token',
  AUTH_USER: '@homeease_auth_user',
  BOOKING_DRAFT: '@homeease_booking_draft',
  SEARCH_HISTORY: '@homeease_search_history',
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

// General storage utilities
export const appStorage = {
  async clearAll() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing all storage:', error);
    }
  },
};
