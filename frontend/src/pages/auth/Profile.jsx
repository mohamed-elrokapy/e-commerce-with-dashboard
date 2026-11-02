import { useForm } from "react-hook-form";
import { useApp } from "../../state/hooks";
import { nameRule, phoneRule } from "../../lib/validation";
import Button from "../../components/ui/Button";
import Field from "../../components/ui/Field";
import { Badge } from "../../components/ui/States";

export default function Profile() {
  const { user, updateProfile, notify } = useApp();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({ defaultValues: { fullName: user.fullName, phone: user.phone } });

  const onSubmit = async (values) => {
    try {
      await updateProfile({ fullName: values.fullName.trim(), phone: values.phone.trim() });
      notify("Profile updated.");
    } catch (error) {
      notify(error.message, "error");
    }
  };

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-xl">
        <p className="eyebrow">Account</p>
        <h1 className="mt-1 text-4xl font-semibold">Your profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="card mt-6 space-y-4 p-5 sm:p-6">
          <div>
            <p className="mb-1.5 text-sm font-medium">Email</p>
            <p className="flex items-center gap-2 text-sm text-ink-soft">
              {user.email} <Badge tone={user.role === "admin" ? "accent" : "neutral"}>{user.role}</Badge>
            </p>
          </div>
          <Field label="Full name" autoComplete="name" error={errors.fullName?.message} {...register("fullName", nameRule)} />
          <Field label="Phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone", phoneRule)} />
          <Button type="submit" loading={isSubmitting} disabled={!isDirty}>
            Save changes
          </Button>
        </form>
      </div>
    </div>
  );
}
