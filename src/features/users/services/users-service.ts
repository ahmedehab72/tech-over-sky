import type { UserFormValues } from "@/features/users/schemas/user-schema";

export type User = UserFormValues;

export async function listUsers(): Promise<User[]> {
  return [];
}
