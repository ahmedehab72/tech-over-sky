import { useState } from "react";

import type { UserFormValues } from "@/features/users/schemas/user-schema";

export function useUsers() {
  const [users, setUsers] = useState<UserFormValues[]>([]);

  function createUser(values: UserFormValues) {
    setUsers((currentUsers) => [values, ...currentUsers]);
  }

  return {
    users,
    createUser,
  };
}
