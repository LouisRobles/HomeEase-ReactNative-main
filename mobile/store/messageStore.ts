import { create } from "zustand";
import { conversations as DummyConversations } from "../constants/dummyData";

export type Message = {
  id: string;
  conversationId: string;
  text: string;
  isSent: boolean;
  time: string;
};

export type Conversation = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
};

type MessageState = {
  conversations: Conversation[];
  messagesByConversation: Record<string, Message[]>;
  typingByConversation: Record<string, boolean>;
  sendMessage: (conversationId: string, text: string) => void;
  addIncomingMessage: (conversationId: string, text: string) => void;
  markTyping: (conversationId: string, typing: boolean) => void;
};

export const useMessageStore = create<MessageState>((set, get) => ({
  conversations: DummyConversations.map((conversation) => ({ ...conversation })),
  messagesByConversation: {},
  typingByConversation: {},
  sendMessage: (conversationId, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const id = String(now.getTime());

    set((state) => {
      const existing = state.messagesByConversation[conversationId] ?? [];
      const updatedConversation = state.conversations.map((c) =>
        c.id === conversationId ? { ...c, lastMessage: trimmed, time } : c,
      );

      return {
        conversations: updatedConversation,
        messagesByConversation: {
          ...state.messagesByConversation,
          [conversationId]: [
            ...existing,
            { id, conversationId, text: trimmed, isSent: true, time },
          ],
        },
      };
    });
  },
  addIncomingMessage: (conversationId, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const id = `r-${now.getTime()}`;

    set((state) => {
      const existing = state.messagesByConversation[conversationId] ?? [];
      const updatedConversation = state.conversations.map((c) =>
        c.id === conversationId ? { ...c, lastMessage: trimmed, time } : c,
      );

      return {
        conversations: updatedConversation,
        messagesByConversation: {
          ...state.messagesByConversation,
          [conversationId]: [
            ...existing,
            { id, conversationId, text: trimmed, isSent: false, time },
          ],
        },
      };
    });
  },
  markTyping: (conversationId, typing) =>
    set((state) => ({
      typingByConversation: {
        ...state.typingByConversation,
        [conversationId]: typing,
      },
    })),
}));

