import { MealDetailClient } from "./meal-detail-client";

export default async function MealDetailPage({ params }: { params: Promise<{ mealId: string }> }) {
  const { mealId } = await params;
  return <MealDetailClient mealId={mealId} />;
}
