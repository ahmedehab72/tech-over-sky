import { UserForm } from "@/features/users/components/user-form";
import { UsersList } from "@/features/users/components/users-list";
import { USERS_PAGE_COPY } from "@/features/users/constants/user-constants";
import { useUsers } from "@/features/users/hooks/use-users";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export function UsersPage() {
  const { users, createUser } = useUsers();

  return (
    <section className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{USERS_PAGE_COPY.formTitle}</CardTitle>
          <CardDescription>{USERS_PAGE_COPY.formDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm onSubmit={createUser} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{USERS_PAGE_COPY.listTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <UsersList users={users} />
        </CardContent>
      </Card>
    </section>
  );
}
