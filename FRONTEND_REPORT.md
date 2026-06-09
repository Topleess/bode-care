# Frontend Report: Bode Care

## Краткое резюме

Bode Care сейчас реализован как mobile-first прототип клиентского фитнес-приложения: пользователь проходит welcome/onboarding, заполняет анкету, видит план дня, логирует питание и воду, открывает тренировку, заполняет check-in, добавляет замеры прогресса и управляет базовыми настройками профиля.

Фронт построен вокруг Next.js App Router, React client components и единого mock-store в `src/lib/store.tsx`. Реального backend/API, авторизации и загрузки файлов пока нет: все доменные данные лежат в `src/lib/mock-data.ts`, состояние сохраняется в `localStorage`, а пользовательские действия меняют локальный `AppState`.

Главная ценность текущей реализации - уже собранная карта пользовательских сценариев и визуальная система мобильного приложения. Главный риск для дальнейшей разработки - демо-логика постепенно смешивается с будущей продуктовой логикой, поэтому перед серьезными доработками стоит стабилизировать доменную модель и отделить mock-store от будущего API-слоя.

## Технологический стек

| Область | Реализация |
| --- | --- |
| Framework | Next.js `16.2.6` |
| Router | App Router, директория `src/app` |
| React | React `19.2.4`, React DOM `19.2.4` |
| Язык | TypeScript |
| Стили | Tailwind CSS `4`, глобальные CSS-переменные в `src/app/globals.css` |
| Иконки | `lucide-react` |
| Хранение состояния | React Context + `useState` + `localStorage` |
| Данные | Typed mock data в `src/lib/mock-data.ts` |
| PWA | `public/manifest.webmanifest`, metadata/viewport в `src/app/layout.tsx` |

В `AGENTS.md` есть важное правило проекта: эта версия Next.js считается нестандартной для агента, перед изменением кода нужно читать релевантные документы из `node_modules/next/dist/docs/`. Для текущего отчета код не менялся.

## Архитектура приложения

Приложение разделено на три основных слоя:

1. **Маршруты и экраны** в `src/app`.
   Page-файлы App Router обычно тонкие: они либо сразу рендерят client-компонент экрана, либо извлекают dynamic route params и передают их в client-компонент.

2. **Переиспользуемые UI-компоненты** в `src/components`.
   Здесь лежат shell, bottom navigation, карточки задач/еды/прогресса, формы, bottom sheets, controls и workout player.

3. **Доменная модель, mock data и store** в `src/lib`.
   Типы описаны в `types.ts`, начальные данные в `mock-data.ts`, UI-маппинги цветов в `ui.ts`, а все мутации состояния - в `store.tsx`.

Корневой layout `src/app/layout.tsx` подключает шрифты Geist, глобальные стили, PWA metadata и оборачивает все приложение в `MockStoreProvider`. Поэтому любой client-компонент внутри дерева может работать с `useMockStore()`.

## Карта экранов и маршрутов

| Route | Экран | Назначение | Основные компоненты/данные |
| --- | --- | --- | --- |
| `/` | Welcome | Первый экран продукта с CTA на onboarding. | `PrimaryButton`, статичный hero-copy |
| `/onboarding` | Onboarding | Слайдер с объяснением ценности приложения. | локальный `slides`, `useState`, `router.push('/questionnaire')` |
| `/questionnaire` | Questionnaire | Многошаговая анкета пользователя. | `QuestionnaireProfile`, локальный draft, `updateState` |
| `/today` | Today | Главный экран с планом дня, задачами и модулями. | `TodayClient`, `DaySwitcher`, `TaskCard`, `StickyModulePanel` |
| `/nutrition` | Nutrition | Питание, КБЖУ, быстрый лог еды/воды, список приемов пищи. | `NutritionClient`, `MealCard`, `BottomSheet`, `StepperInput` |
| `/nutrition/[mealId]` | Meal Detail | Детали приема пищи и отметка "съедено". | `MealDetailClient`, `logMeal(meal.id)` |
| `/training` | Training | Обзор тренировки и список упражнений. | `TrainingClient`, `workout`, `workoutSession` |
| `/training/preview` | Training Preview | Предпросмотр сегодняшней тренировки из плана дня. | `TrainingPreviewClient` |
| `/training/session` | Workout Mode | Активная тренировка: видео-заглушка, подходы, навигация по упражнениям. | `TrainingSessionClient`, `WorkoutPlayer`, workout store methods |
| `/training/exercises/[exerciseId]` | Exercise Detail | Техника, комментарий тренера и история упражнения. | `ExerciseDetailClient`, `WorkoutPlayer` |
| `/check-in` | Check-in | Вечерний отчет: настроение, голод, сон, стресс, комментарий. | `CheckInForm`, `submitCheckIn` |
| `/progress` | Progress | Карточка прогресса, привычки, timeline замеров. | `ProgressClient`, `ProgressCard`, `Timeline` |
| `/progress/new` | New Progress Entry | Добавление веса, талии, заметки и фото-заглушки. | `ProgressEntryForm`, `addProgressEntry` |
| `/profile` | Profile | Профиль, тренер, цель, уведомления, приватность, сброс демо-данных. | `ProfileClient`, `BottomSheet`, `SegmentedControl` |

Dynamic route handlers используют новый для проекта паттерн `params: Promise<...>` и `await params`:

- `src/app/nutrition/[mealId]/page.tsx`;
- `src/app/training/exercises/[exerciseId]/page.tsx`.

## UI-shell и навигация

Основная мобильная рамка находится в `MobileShell`. Она задает:

- full-height mobile viewport через `min-h-dvh`;
- максимальную ширину `480px`;
- темный app-like фон;
- safe-area padding;
- sticky header с брендовым `B`-линком на `/today`;
- optional `title`, `eyebrow`, `action`;
- нижний padding под tab bar;
- `BottomNav`, если `showNav` включен.

`BottomNav` фиксирован снизу и содержит пять основных разделов:

- `/today` - Сегодня;
- `/nutrition` - Питание;
- `/training` - Тренировка;
- `/progress` - Прогресс;
- `/profile` - Профиль.

Активный tab вычисляется через `usePathname()`. Сейчас активность проверяется строгим сравнением `pathname === item.href`, поэтому вложенные страницы вроде `/nutrition/lunch` или `/training/session` не подсвечивают родительский tab.

## Состояние и данные

Центральная модель приложения описана типом `AppState` в `src/lib/types.ts`. Ключевые сущности:

| Тип | Роль |
| --- | --- |
| `AppState` | Полное состояние прототипа: пользователь, дни, питание, тренировка, check-in, прогресс, уведомления. |
| `User` | Имя, цель, фаза, streak, readiness, настройки уведомлений/приватности и тренер. |
| `DayState` | День в календаре: summary, readiness, вода и список задач. |
| `Task` | Элемент плана дня: время, заголовок, тип, target, href, accent, status. |
| `MealLog` / `Meal` | Прием пищи: КБЖУ, время, порция, state, ингредиенты, note. |
| `Workout` | Описание тренировки: title, duration, focus, readiness note и упражнения. |
| `WorkoutSession` | Текущее прохождение тренировки: activeExerciseId, completed, effort, setsByExercise. |
| `CheckInEntry` | Самочувствие, голод, сон, стресс, комментарий, фото-заглушка. |
| `ProgressEntry` | Контрольный замер: вес, талия, заметка, фото-заглушка. |

Начальные данные лежат в `src/lib/mock-data.ts` как `initialState`. Там уже заполнены:

- пользователь Никита;
- тренер Алексей Морозов;
- nutrition goals;
- дни `yesterday`, `today`, `tomorrow`, `day-plus-2`, `day-plus-3`;
- meals: breakfast, lunch, dinner;
- recipes;
- workout с упражнениями bench/row/raise/triceps;
- workout session sets;
- check-in defaults;
- progress snapshot и entries;
- notification.

Store реализован в `src/lib/store.tsx`:

- `MockStoreProvider` держит `AppState` в React state;
- `useMockStore()` предоставляет состояние и методы обработки;
- `getInitialState()` возвращает `structuredClone(initialState)`;
- `loadState()` читает `localStorage`;
- `saveState()` записывает `localStorage`.

Состояние сохраняется под ключом:

```ts
bode-care-state-v2
```

При чтении store проверяет `parsed.version !== initialState.version`. Если версии отличаются, состояние сбрасывается к `initialState`. В текущем mock data `version: 4`, поэтому изменение версии можно использовать как простой reset миграции demo-state.

## Методы обработки пользовательских действий

| Метод | Что делает | Где используется |
| --- | --- | --- |
| `updateState(recipe)` | Базовый способ изменить `AppState` и сохранить его в `localStorage`. | Questionnaire, Training Session, внутренние методы store |
| `resetState()` | Сбрасывает состояние к `initialState`. | Profile |
| `selectDay(dayId)` | Меняет выбранный день. | `DaySwitcher` |
| `updateTaskStatus(taskId, status)` | Меняет статус задачи в дне `today`. | `ActionStack` |
| `logMeal(mealId, updates?)` | Обновляет meal, ставит `state: 'eaten'`, `tag: 'съедено'`, закрывает связанную meal-task. | Nutrition, Meal Detail |
| `addWater(amount)` | Добавляет воду к дню `today`, не выше `waterGoalMl`. | Nutrition bottom sheet |
| `updateWorkoutSet(exerciseId, setId, set)` | Обновляет вес/повторы/done конкретного подхода. | Training Session |
| `addWorkoutSet(exerciseId)` | Добавляет подход к упражнению с дефолтным весом из упражнения. | Training Session |
| `completeWorkout()` | Помечает тренировку завершенной, ставит `finishedAt`, обновляет progress и закрывает workout-task. | Training Session |
| `submitCheckIn(entry)` | Сохраняет check-in, ставит `completed`, `submittedAt`, закрывает checkin-task. | Check-in form |
| `addProgressEntry(entry)` | Добавляет новый замер, пересчитывает summary веса/талии, обновляет insight, закрывает progress-task. | Progress entry form |
| `updateUser(updates)` | Обновляет поля пользователя. | Profile bottom sheets |

Внутри store есть локальный helper `markTaskByType(current, type, targetId?)`, который помечает задачи в `today` как `done` по типу и optional target. Это связывает действия из модулей с планом дня.

Важная деталь: часть методов жестко работает с `day.id === 'today'`. Это нормально для прототипа, но перед переходом к реальному календарю нужно передавать активный день или дату явно.

## Основные пользовательские сценарии

### Onboarding и анкета

Пользователь попадает на `/`, нажимает CTA и переходит в `/onboarding`. Onboarding хранит индекс слайда локально через `useState`. Можно переключаться по точкам, идти назад/вперед или пропустить на `/questionnaire`.

Анкета `/questionnaire` состоит из 5 шагов:

1. цель;
2. стартовые параметры;
3. тренировочный опыт/частота/место;
4. формат питания/количество приемов/предпочтения;
5. травмы, аллергии, график.

Draft анкеты хранится локально. На финальном шаге `updateState` записывает `questionnaire`, обновляет `user.goal` и `user.phase`, затем делает `router.push('/today')`.

### План дня

`/today` берет `selectedDay`, `state` и `nutritionTotals` из store. Экран показывает:

- горизонтальный `DaySwitcher`;
- счетчик выполненных задач;
- список `TaskCard`;
- раскрываемые панели питания, тренировки, check-in и прогресса.

`DaySwitcher` поддерживает:

- выбор дня кнопкой;
- свайп влево/вправо;
- auto-scroll выбранного дня в центр.

### Питание и вода

`/nutrition` показывает дневные КБЖУ, быстрые действия, поиск-заглушку, список приемов пищи и рецепты. Быстрые действия открывают `BottomSheet`:

- meal sheet: пользователь меняет калории/белок через `StepperInput`, затем `logMeal('lunch', { calories, protein })`;
- water sheet: `addWater(250)`.

`/nutrition/[mealId]` ищет meal по `mealId`, показывает состав и метрики. Кнопка `Отметить как съедено` вызывает `logMeal(meal.id)`.

### Тренировка

`/training` показывает текущий workout, done sets и список упражнений. `/training/preview` дает более сфокусированный предпросмотр из плана дня.

`/training/session` - основной workout mode:

- вычисляет active exercise через `workoutSession.activeExerciseId`;
- показывает `WorkoutPlayer`;
- показывает сетку подходов;
- позволяет менять weight/reps;
- позволяет togglить `done`;
- позволяет добавить подход;
- переключает упражнения назад/вперед;
- на последнем упражнении вызывает `completeWorkout()` и возвращает на `/today`.

`/training/exercises/[exerciseId]` показывает технику, комментарий тренера и историю по упражнению.

### Check-in

`/check-in` содержит форму `CheckInForm`. Она хранит локально mood/hunger/sleep/stress/comment, а при submit вызывает:

```ts
submitCheckIn({ mood, hunger, sleep, stress, comment, photoStub: "ужин добавлен" })
```

После сохранения пользователь возвращается на `/today`.

### Прогресс

`/progress` показывает:

- `ProgressCard`;
- habit scores: белок, тренировки, сон, вода;
- CTA на новый замер;
- кнопку "Поделиться карточкой" без обработчика;
- timeline замеров.

`/progress/new` содержит `ProgressEntryForm`. Submit вызывает `addProgressEntry`, добавляет вес/талию/заметку/photoStub и ведет пользователя обратно на `/progress`.

### Профиль

`/profile` показывает карточку пользователя, карточку тренера, список настроек и кнопку сброса демо-данных. Настройки открываются в `BottomSheet`:

- цель: выбор из preset-целей, `updateUser({ goal })`;
- уведомления: segmented control `Вкл/Выкл`, `updateUser({ notifications })`;
- приватность: `updateUser({ privacy })`;
- подписка сейчас статична и не открывает sheet.

## Переиспользуемые компоненты

| Компонент | Роль |
| --- | --- |
| `MobileShell` | Общая мобильная рамка экранов, sticky header, bottom nav. |
| `BottomNav` | Основная tab-навигация. |
| `BottomSheet` | Модальные нижние панели для быстрых действий и настроек. |
| `DaySwitcher` | Выбор активного дня, свайпы и auto-scroll. |
| `TaskCard` | Карточка задачи плана дня. |
| `StickyModulePanel` | Раскрываемый модуль на Today. |
| `MealCard` | Карточка приема пищи. |
| `NutritionQuickActions` | Быстрые действия питания: фото, шаблон, КБЖУ, вода. |
| `RecipeCard` | Горизонтальная карточка рецепта. |
| `WorkoutPlayer` | Видео/плеер-заглушка и локальное управление playback/sets. |
| `CheckInForm` | Форма вечернего check-in. |
| `ProgressEntryForm` | Форма нового замера прогресса. |
| `ProgressCard` | Summary-карточка прогресса. |
| `Timeline` | Timeline замеров. |
| `StepperInput` | Числовой control с плюс/минус. |
| `SegmentedControl` | Переключатель вариантов. |
| `PrimaryButton` | CTA-ссылка на welcome. |
| `ActionStack` | Bottom-sheet сценарий "приступить" к задачам, сейчас в основных экранах не используется. |
| `StatusToast`, `CompletionRing` | UI-компоненты, доступные в проекте, но не являются центральными для текущих маршрутов. |

## Styling и визуальная система

Визуальный язык приложения - темный premium mobile UI:

- фон `#050606`;
- поверхности `#101211`, `#171a18`;
- muted text `#8e968f`;
- акценты `lime`, `mint`, `aqua`, `coral`, `violet`;
- много rounded cards/pills;
- safe-area классы для мобильных устройств;
- bottom sheets и sticky headers с blur;
- max-width `480px`, чтобы desktop выглядел как телефон.

Глобальные CSS-переменные и Tailwind theme tokens определены в `src/app/globals.css`. Маппинги accent-классов лежат в `src/lib/ui.ts`:

- `accentText`;
- `accentBg`;
- `accentSoft`.

Шрифты Geist подключаются через `next/font/google` в `layout.tsx`. PWA-поведение задается через metadata, viewport и manifest.

## Текущие ограничения

- Все данные моковые и лежат в клиентском bundle.
- Нет backend/API и сетевого слоя.
- Нет авторизации, ролей пользователя, тренера или администратора.
- Нет реальной загрузки фото еды/формы: используются `photoStub` и визуальные заглушки.
- Нет реального поиска еды/продуктов: input есть, обработчика нет.
- Нет barcode scanner, shopping list и share flow: UI частично намечен.
- Состояние хранится только в браузерном `localStorage`; другой браузер или reset storage потеряет данные.
- Нет миграций состояния кроме reset по `version`.
- Несколько методов жестко обновляют `today`, а не выбранный день.
- В некоторых местах используется `state.days[1]` как сегодняшний день, что хрупко при изменении порядка массива.
- Нет loading/error states, потому что нет асинхронного API.
- Нет серверной валидации и полноценной клиентской валидации форм.
- Нет e2e/unit тестов пользовательских сценариев.
- Active state в bottom nav не учитывает вложенные маршруты.

## Риски при доработке

- **Смешение demo и production logic.** Если продолжать расширять `MockStoreProvider`, будущая миграция на API станет дороже.
- **Хрупкая дата-модель.** Привязки к `today` и `state.days[1]` помешают нормальному календарю, истории и планированию.
- **Нет контрактов данных.** Backend можно начать делать вразнобой, если заранее не зафиксировать DTO/API shapes.
- **Формы без валидации.** Сейчас можно сохранить почти любые строки в вес, повторы, комментарии и параметры анкеты.
- **UI уже выглядит как продукт.** Пользователь может ожидать реального поведения от кнопок, которые пока являются заглушками.
- **Client-only persistence.** При появлении авторизации нужно будет решить конфликт локального состояния и серверных данных.

## Рекомендованный план развития

1. **Стабилизировать доменную модель.**
   Уточнить сущности `User`, `Coach`, `PlanDay`, `Task`, `Meal`, `Workout`, `WorkoutSession`, `CheckIn`, `ProgressEntry`. Отделить UI-поля вроде `accent`, `tag`, `photoStub` от серверных доменных данных.

2. **Отделить mock-store от future data layer.**
   Сохранить текущий store как adapter для прототипа, но ввести интерфейс сервисов: nutrition, training, progress, profile. UI должен зависеть от методов сервиса, а не от деталей mock data.

3. **Подготовить backend contracts.**
   Описать минимальные API-контракты для:
   - получения плана дня;
   - логирования meal/water;
   - прохождения workout session;
   - отправки check-in;
   - добавления progress entry;
   - обновления profile settings.

4. **Убрать жесткие привязки к `today`.**
   Все действия должны принимать `dayId` или дату. Компоненты не должны полагаться на `state.days[1]`.

5. **Добавить валидацию форм.**
   Проверять числовые поля анкеты, веса, талии, подходов, сна/стресса и т.д. Ошибки должны быть видны в UI.

6. **Добавить loading/error/empty states.**
   Это нужно до подключения API, чтобы дизайн не ломался при сетевых задержках, пустых данных и ошибках.

7. **Покрыть ключевые сценарии тестами.**
   Минимальный набор: questionnaire submit, log meal, add water, complete workout, submit check-in, add progress entry, update profile.

8. **Постепенно заменить заглушки реальными flows.**
   Фото, поиск еды, barcode, share, shopping list и уведомления лучше подключать после стабилизации модели и API.

## Быстрый справочник для разработчика

| Нужно изменить | Где смотреть сначала |
| --- | --- |
| Добавить/поменять экран | `src/app/...` и соответствующий client-компонент |
| Изменить общий layout мобильных экранов | `src/components/mobile-shell.tsx` |
| Изменить нижнюю навигацию | `src/components/bottom-nav.tsx` |
| Изменить типы данных | `src/lib/types.ts` |
| Изменить mock content | `src/lib/mock-data.ts` |
| Изменить обработку действий | `src/lib/store.tsx` |
| Изменить цвета/accent mapping | `src/app/globals.css`, `src/lib/ui.ts` |
| Изменить питание | `src/app/nutrition/*`, `src/components/meal-card.tsx` |
| Изменить тренировку | `src/app/training/*`, `src/components/workout-player.tsx` |
| Изменить check-in | `src/app/check-in/page.tsx`, `src/components/check-in-form.tsx` |
| Изменить прогресс | `src/app/progress/*`, `src/components/progress-entry-form.tsx` |
| Изменить профиль | `src/app/profile/profile-client.tsx` |

Перед крупной доработкой лучше начинать не с визуального экрана, а с ответа на три вопроса:

1. Какие данные должны прийти с backend?
2. Какой пользовательский action должен изменить эти данные?
3. Что UI показывает в состояниях loading, success, empty и error?

Так текущий сильный прототип можно развивать в продукт без переписывания всего фронта за один раз.
