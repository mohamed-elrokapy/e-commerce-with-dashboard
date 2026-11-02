import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../state/hooks";
import { nameRule, phoneRule } from "../../lib/validation";
import Button from "../../components/ui/Button";
import Field from "../../components/ui/Field";
import PageHeader from "../../components/ui/PageHeader";
import { ErrorState, Skeleton } from "../../components/ui/States";
import UserMissing from "./UserMissing";
import { useUserParam } from "./useUserParam";

function EditForm({ user }) {
  const { updateUser, user: me, notify } = useApp();
  const navigate = useNavigate();
  const self = me.id === user.id;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { fullName: user.fullName, phone: user.phone, role: user.role } });

  const onSubmit = async (values) => {
    try {
      await updateUser(user.id, {
        fullName: values.fullName.trim(),
        phone: values.phone.trim(),
        ...(self ? {} : { role: values.role }),
      });
      notify("User updated.");
      navigate("/admin/users");
    } catch (error) {
      notify(error.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card max-w-2xl space-y-4 p-5 sm:p-6">
      <div>
        <p className="mb-1.5 text-sm font-medium">Email</p>
        <p className="text-sm text-ink-soft">{user.email}</p>
      </div>
      <Field label="Full name" error={errors.fullName?.message} {...register("fullName", nameRule)} />
      <Field label="Phone" type="tel" error={errors.phone?.message} {...register("phone", phoneRule)} />
      <Field
        label="Role"
        as="select"
        disabled={self}
        hint={self ? "You cannot change your own role." : undefined}
        {...register("role")}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </Field>
      <div className="flex flex-wrap gap-2 pt-2">
        <Button type="submit" loading={isSubmitting}>Save changes</Button>
        <Button variant="secondary" onClick={() => navigate("/admin/users")}>Cancel</Button>
      </div>
    </form>
  );
}

export default function UserEdit() {
  const { id, user, loading, error, retry } = useUserParam();
  if (loading) return <Skeleton className="h-72 w-full" />;
  if (error) return <div className="card"><ErrorState error={error} onRetry={retry} /></div>;
  if (!user) return <UserMissing id={id} />;
  return (
    <>
      <PageHeader title="Edit user" description={user.fullName || user.email} />
      <EditForm key={user.id} user={user} />
    </>
  );
}
