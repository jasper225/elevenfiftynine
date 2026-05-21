import { create } from "zustand";
import api from "../services/api";

export const useBoardStore = create((set, get) => ({
  boards: [], currentBoard: null, lists: [], loading: false, error: null,
  fetchBoards: async (workspaceId) => {
    set({ loading: true });
    try { const { data } = await api.get(`/workspaces/${workspaceId}/boards`); set({ boards: data, loading: false }); }
    catch (err) { set({ error: err.message, loading: false }); }
  },
  fetchBoard: async (boardId) => {
    set({ loading: true });
    try { const { data } = await api.get(`/boards/${boardId}`); set({ currentBoard: data.board, lists: data.lists, loading: false }); }
    catch (err) { set({ error: err.message, loading: false }); }
  },
  moveCard: (cardId, sourceListId, destListId, newPosition) => {
    set((state) => ({
      lists: state.lists.map((list) => {
        if (list._id === sourceListId) return { ...list, cards: list.cards.filter((c) => c._id !== cardId) };
        if (list._id === destListId) {
          const card = state.lists.find((l) => l._id === sourceListId)?.cards.find((c) => c._id === cardId);
          if (!card) return list;
          const cards = [...list.cards];
          cards.splice(newPosition, 0, { ...card, list: destListId });
          return { ...list, cards };
        }
        return list;
      }),
    }));
  },
}));
