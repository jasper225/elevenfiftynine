import { create } from "zustand";
import api from "../services/api";

export const useCourseStore = create((set, get) => ({
  courses: [], currentCourse: null, lists: [], loading: false, error: null,
  fetchCourses: async (semesterId) => {
    set({ loading: true });
    try { const { data } = await api.get(`/semesters/${semesterId}/courses`); set({ courses: data, loading: false }); }
    catch (err) { set({ error: err.message, loading: false }); }
  },
  fetchCourse: async (courseId) => {
    set({ loading: true });
    try { const { data } = await api.get(`/courses/${courseId}`); set({ currentCourse: data.course, lists: data.lists, loading: false }); }
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
