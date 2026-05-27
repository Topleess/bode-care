import { ExerciseDetailClient } from "./exercise-detail-client";

export default async function ExerciseDetailPage({ params }: { params: Promise<{ exerciseId: string }> }) {
  const { exerciseId } = await params;
  return <ExerciseDetailClient exerciseId={exerciseId} />;
}
