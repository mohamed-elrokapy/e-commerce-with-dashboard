import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../state/hooks";
import { emailRule, nameRule, passwordRule, phoneRule } from "../../lib/validation";
import Button from "../../components/ui/Button";
import Field from "../../components/ui/Field";
import AuthShell from "./AuthShell";
import PasswordField from "./PasswordField";

export default function Signup() {
  const { register: registerUser, login, backend, notify } = useApp();
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { fullName: "", email: "", phone: "", password: "" } });

  const onSubmit = async (values) => {
    setFormError("");
    try {
      await registerUser(values);
      // Some backends sign the user in on register, others do not. Signing in
      // explicitly keeps the behaviour the same everywhere.
      await login({ email: values.email, password: values.password, remember: true });
      notify("Account created. You are signed in.");
      navigate("/", { replace: true });
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="It takes a minute. You need an account to check out."
      aside={
        backend?.id === "demo" ? (
          <aside className="card border-dashed bg-paper-2/60 p-5 text-sm text-ink-soft">
            <h2 className="text-lg font-semibold text-ink">Demo mode</h2>
            <p className="mt-1">
              Your account is stored in this browser only, with a salted password hash. Clear the
              site data to remove it.
            </p>
          </aside>
        ) : null
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Field label="Full name" autoComplete="name" error={errors.fullName?.message} {...register("fullName", nameRule)} />
        <Field label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email", emailRule)} />
        <Field label="Phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone", phoneRule)} />
        <PasswordField
          autoComplete="new-password"
          hint="At least 8 characters, with a letter and a number."
          error={errors.password?.message}
          {...register("password", passwordRule)}
        />

        {formError && (
          <p role="alert" className="rounded-md bg-berry-tint px-3 py-2 text-sm text-berry">
            {formError}
          </p>
        )}

        <Button type="submit" className="w-full" loading={isSubmitting}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-sm text-ink-soft">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-syrup hover:text-syrup-dark">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
