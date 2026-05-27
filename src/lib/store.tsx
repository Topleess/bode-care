"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialState } from "./mock-data";
import type { AppState, CheckInEntry, MealLog, ProgressEntry, SetEntry, TaskStatus } from "./types";

const STORAGE_KEY = "bode-care-state-v2";

type StoreContextValue = {
  state: AppState;
  selectedDay: AppState["days"][number];
  nutritionTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  updateState: (recipe: (state: AppState) => AppState) => void;
  resetState: () => void;
  selectDay: (dayId: string) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  logMeal: (mealId: string, updates?: Partial<MealLog>) => void;
  addWater: (amount: number) => void;
  updateWorkoutSet: (exerciseId: string, setId: string, set: Partial<SetEntry>) => void;
  addWorkoutSet: (exerciseId: string) => void;
  completeWorkout: () => void;
  submitCheckIn: (entry: Partial<CheckInEntry>) => void;
  addProgressEntry: (entry: Omit<ProgressEntry, "id" | "date">) => void;
  updateUser: (updates: Partial<AppState["user"]>) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function getInitialState(): AppState {
  return structuredClone(initialState);
}

export function loadState(): AppState {
  if (typeof window === "undefined") return getInitialState();

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return getInitialState();

    const parsed = JSON.parse(stored) as AppState;
    if (parsed.version !== initialState.version) return getInitialState();
    return parsed;
  } catch {
    return getInitialState();
  }
}

export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function MockStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => getInitialState());

  useEffect(() => {
    const timer = window.setTimeout(() => setState(loadState()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const updateState = useCallback((recipe: (current: AppState) => AppState) => {
    setState((current) => {
      const next = recipe(current);
      saveState(next);
      return next;
    });
  }, []);

  const selectedDay = useMemo(
    () => state.days.find((day) => day.id === state.selectedDayId) ?? state.days[0],
    [state.days, state.selectedDayId],
  );

  const nutritionTotals = useMemo(() => {
    return state.meals
      .filter((meal) => meal.state === "eaten")
      .reduce(
        (totals, meal) => ({
          calories: totals.calories + meal.calories,
          protein: totals.protein + meal.protein,
          carbs: totals.carbs + meal.carbs,
          fat: totals.fat + meal.fat,
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 },
      );
  }, [state.meals]);

  const updateTaskStatus = useCallback(
    (taskId: string, status: TaskStatus) => {
      updateState((current) => ({
        ...current,
        days: current.days.map((day) =>
          day.id === "today"
            ? {
                ...day,
                tasks: day.tasks.map((task) => (task.id === taskId ? { ...task, status } : task)),
              }
            : day,
        ),
      }));
    },
    [updateState],
  );

  const value = useMemo<StoreContextValue>(() => {
    const markTaskByType = (
      current: AppState,
      type: "meal" | "workout" | "checkin" | "progress",
      targetId?: string,
    ) => ({
      ...current,
      days: current.days.map((day) =>
        day.id === "today"
          ? {
              ...day,
              tasks: day.tasks.map((task) =>
                task.type === type && (!targetId || task.targetId === targetId)
                  ? { ...task, status: "done" as const }
                  : task,
              ),
            }
          : day,
      ),
    });

    return {
      state,
      selectedDay,
      nutritionTotals,
      updateState,
      resetState: () => updateState(() => getInitialState()),
      selectDay: (dayId) => updateState((current) => ({ ...current, selectedDayId: dayId })),
      updateTaskStatus,
      logMeal: (mealId, updates) =>
        updateState((current) => {
          const next = {
            ...current,
            meals: current.meals.map((meal) =>
              meal.id === mealId ? { ...meal, ...updates, state: "eaten" as const, tag: "съедено" } : meal,
            ),
          };
          return markTaskByType(next, "meal", mealId);
        }),
      addWater: (amount) =>
        updateState((current) => ({
          ...current,
          days: current.days.map((day) =>
            day.id === "today"
              ? { ...day, waterMl: Math.min(day.waterGoalMl, day.waterMl + amount) }
              : day,
          ),
        })),
      updateWorkoutSet: (exerciseId, setId, set) =>
        updateState((current) => ({
          ...current,
          workoutSession: {
            ...current.workoutSession,
            setsByExercise: {
              ...current.workoutSession.setsByExercise,
              [exerciseId]: (current.workoutSession.setsByExercise[exerciseId] ?? []).map((entry) =>
                entry.id === setId ? { ...entry, ...set } : entry,
              ),
            },
          },
        })),
      addWorkoutSet: (exerciseId) =>
        updateState((current) => {
          const currentSets = current.workoutSession.setsByExercise[exerciseId] ?? [];
          const exercise = current.workout.exercises.find((item) => item.id === exerciseId);
          return {
            ...current,
            workoutSession: {
              ...current.workoutSession,
              setsByExercise: {
                ...current.workoutSession.setsByExercise,
                [exerciseId]: [
                  ...currentSets,
                  {
                    id: `${exerciseId}-${currentSets.length + 1}`,
                    weight: exercise?.weight.replace(" кг", "") ?? "",
                    reps: "",
                    done: false,
                  },
                ],
              },
            },
          };
        }),
      completeWorkout: () =>
        updateState((current) => {
          const next = {
            ...current,
            workoutSession: {
              ...current.workoutSession,
              completed: true,
              finishedAt: new Date().toISOString(),
            },
            progress: {
              ...current.progress,
              adherence: Math.min(100, current.progress.adherence + 4),
              training: Math.max(current.progress.training, 5),
            },
          };
          return markTaskByType(next, "workout");
        }),
      submitCheckIn: (entry) =>
        updateState((current) => {
          const next = {
            ...current,
            checkIn: {
              ...current.checkIn,
              ...entry,
              completed: true,
              submittedAt: new Date().toISOString(),
            },
          };
          return markTaskByType(next, "checkin");
        }),
      addProgressEntry: (entry) =>
        updateState((current) => {
          const next = {
            ...current,
            progressEntries: [
              ...current.progressEntries,
              {
                ...entry,
                id: `p-${Date.now()}`,
                date: "сегодня",
              },
            ],
            progress: {
              ...current.progress,
              weight: `${Number(entry.weight) - 86.4 > 0 ? "+" : ""}${(Number(entry.weight) - 86.4).toFixed(1)} кг`,
              waist: `${Number(entry.waist) - 92 > 0 ? "+" : ""}${(Number(entry.waist) - 92).toFixed(1)} см`,
              insight: "Новый замер добавлен. Тренер увидит динамику в weekly card.",
            },
          };
          return markTaskByType(next, "progress");
        }),
      updateUser: (updates) =>
        updateState((current) => ({
          ...current,
          user: { ...current.user, ...updates },
        })),
    };
  }, [nutritionTotals, selectedDay, state, updateState, updateTaskStatus]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useMockStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useMockStore must be used inside MockStoreProvider");
  }
  return context;
}
