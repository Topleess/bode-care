export type Accent = "lime" | "mint" | "aqua" | "coral" | "violet";

export type TaskStatus = "next" | "planned" | "done";

export type Coach = {
  name: string;
  role: string;
  note: string;
  avatar: string;
};

export type User = {
  name: string;
  goal: string;
  phase: string;
  day: number;
  readiness: number;
  streak: number;
  coach: Coach;
  notifications: boolean;
  privacy: string;
};

export type Task = {
  id: string;
  time: string;
  title: string;
  detail: string;
  action: string;
  type: "meal" | "workout" | "checkin" | "progress";
  targetId?: string;
  href: string;
  accent: Accent;
  status: TaskStatus;
};

export type DayState = {
  id: string;
  dateLabel: string;
  weekday: string;
  summary: string;
  readiness: number;
  waterMl: number;
  waterGoalMl: number;
  tasks: Task[];
};

export type DailyPlan = DayState;

export type MealLog = {
  id: string;
  title: string;
  tag: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  portion: number;
  accent: Accent;
  state: "planned" | "eaten" | "suggested";
  ingredients: string[];
  note: string;
};

export type Meal = MealLog;

export type Recipe = {
  id: string;
  title: string;
  tag: string;
  time: string;
  calories: number;
  protein: number;
  accent: Accent;
};

export type SetEntry = {
  id: string;
  weight: string;
  reps: string;
  done: boolean;
};

export type Exercise = {
  id: string;
  name: string;
  muscle: string;
  sets: number;
  reps: string;
  weight: string;
  rest: string;
  technique: string[];
  coachTip: string;
  history: string[];
};

export type Workout = {
  title: string;
  duration: string;
  focus: string;
  readinessNote: string;
  exercises: Exercise[];
};

export type WorkoutSession = {
  activeExerciseId: string;
  completed: boolean;
  startedAt?: string;
  finishedAt?: string;
  effort: number;
  setsByExercise: Record<string, SetEntry[]>;
};

export type CheckInEntry = {
  completed: boolean;
  mood: number;
  hunger: number;
  sleep: number;
  stress: number;
  comment: string;
  photoStub: string;
  submittedAt?: string;
};

export type ProgressEntry = {
  id: string;
  date: string;
  weight: string;
  waist: string;
  note: string;
  photoStub: string;
};

export type ProgressSnapshot = {
  week: string;
  adherence: number;
  weight: string;
  waist: string;
  protein: number;
  training: number;
  insight: string;
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

export type NutritionSummary = {
  caloriesGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
};

export type AppState = {
  version: number;
  selectedDayId: string;
  user: User;
  days: DayState[];
  meals: MealLog[];
  recipes: Recipe[];
  workout: Workout;
  workoutSession: WorkoutSession;
  checkIn: CheckInEntry;
  progress: ProgressSnapshot;
  progressEntries: ProgressEntry[];
  notifications: Notification[];
  nutritionGoal: NutritionSummary;
};
