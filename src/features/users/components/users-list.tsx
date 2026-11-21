import { UserCard } from "@/features/users/components/user-card";
import { USERS_PAGE_COPY } from "@/features/users/constants/user-constants";
import type { UserFormValues } from "@/features/users/schemas/user-schema";
import { EmptyState } from "@/shared/components/common/states/empty-state";

type UsersListProps = {
  users: UserFormValues[];
};

export function UsersList({ users }: UsersListProps) {
  if (users.length === 0) {
    return (
      <EmptyState
        title={USERS_PAGE_COPY.emptyTitle}
        description={USERS_PAGE_COPY.emptyDescription}
      />
    );
  }

  return (
    <ul className="divide-y">
      {users.map((user) => (
        <UserCard key={user.email} user={user} />
      ))}
    </ul>
  );
}
