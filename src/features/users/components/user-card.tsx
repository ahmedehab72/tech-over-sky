import type { UserFormValues } from "@/features/users/schemas/user-schema";

type UserCardProps = {
  user: UserFormValues;
};

export function UserCard({ user }: UserCardProps) {
  return (
    <li className="py-3">
      <p className="text-sm font-medium">{user.name}</p>
      <p className="text-sm text-muted-foreground">{user.email}</p>
    </li>
  );
}
