import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../state/hooks";
import { emailRule } from "../../lib/validation";
import { DEMO_ACCOUNTS } from "../../services/demoSeed";
import Button from "../../components/ui/Button";
import Field from "../../components/ui/Field";
import AuthShell from "./AuthShell";
import PasswordField from "./PasswordField";

function DemoAccounts({ onPick }) {
  return (
    <aside className="card border-dashed bg-paper-2/60 p-5" aria-label="Demo accounts">
      <h2 className="text-lg font-semibold">Demo accounts</h2>
      <p className="mt-1 text-[13px] text-ink-soft">
        These accounts are fake and only exist in this browser. Pick one to fill the form.
      </p>
      <ul className="mt-4 space-y-3">
        {DEMO_ACCOUNTS.map((a) => (
          <li key={a.email} className="rounded-md border border-line bg-white p-3 text-sm">
            <p className="font-semibold capitalize">{a.role === "admin" ? "Admin" : "Shopper"}</p>
            <p className="break-all text-ink-soft">{a.email}</p>
            <button
              type="button"
              onClick={() => onPick(a)}
              className="mt-2 text-[13px] font-semibold text-syrup hover:text-syrup-dark"
            >
              Use this account
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default function Login() {
  const { login, loginWithGoogle, backend, notify } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: "", password: "", remember: false } });

  const done = (user) => {
    notify(`Welcome back, ${user.fullName || user.email}.`);
    navigate(from ?? (user.role === "admin" ? "/admin/dashboard" : "/"), { replace: true });
  };

  const onSubmit = async (values) => {
    setFormError("");
    try {
      done(await login(values));
    } catch (error) {
      setFormError(error.message);
    }
  };

  const isDemo = backend?.id === "demo";

  return (
    <AuthShell
      title="Sign in"
      subtitle="Welcome back. Sign in to check out and manage your profile."
      aside={
        isDemo ? (
          <DemoAccounts
            onPick={(a) => {
              setValue("email", a.email);
              setValue("password", a.password);
            }}
          />
        ) : null
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email", emailRule)}
        />
        <PasswordField
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="h-4 w-4 accent-[#A8461A]" {...register("remember")} />
          Keep me signed in on this device
        </label>

        {formError && (
          <p role="alert" className="rounded-md bg-berry-tint px-3 py-2 text-sm text-berry">
            {formError}
          </p>
        )}

        <Button type="submit" className="w-full" loading={isSubmitting}>
          Sign in
        </Button>
      </form>

      {backend?.capabilities.google && (
        <div className="mt-4">
          <div className="my-4 flex items-center gap-3 text-xs text-ink-faint">
            <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
          </div>
          <Button
            variant="secondary"
            className="w-full"
            onClick={async () => {
              setFormError("");
              try {
                done(await loginWithGoogle());
              } catch (error) {
                setFormError(error.message);
              }
            }}
          >
            Continue with Google
          </Button>
        </div>
      )}

      <p className="mt-6 text-sm text-ink-soft">
        New here?{" "}
        <Link to="/signup" className="font-semibold text-syrup hover:text-syrup-dark">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
