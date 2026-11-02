import Button from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/States";

export default function UserMissing({ id }) {
  return (
    <div className="card">
      <EmptyState
        title={id ? "User not found" : "Choose a user first"}
        description={id ? "The account may have been deleted." : "Open a user from the users list."}
        action={<Button to="/admin/users">Back to users</Button>}
      />
    </div>
  );
}
