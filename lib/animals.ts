import { animals } from "@/lib/data";

export type AnimalProfile = (typeof animals)[number];

export function getAnimalSlug(animal: AnimalProfile) {
  return animal.id;
}

export function getAnimalBySlug(slug: string) {
  return animals.find((animal) => getAnimalSlug(animal) === slug) || null;
}
