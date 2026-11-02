import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useApp } from "../../state/hooks";

export function useUserParam() {
  const { id } = useParams();
  const { users, loadUsers } = useApp();

  useEffect(() => {
    if (users.status === "idle") loadUsers();
  }, [users.status, loadUsers]);

  return {
    id,
    loading: users.status === "loading" || users.status === "idle",
    error: users.status === "error" ? users.error : null,
    retry: loadUsers,
    user: id ? users.items.find((u) => u.id === id) : undefined,
  };
}
