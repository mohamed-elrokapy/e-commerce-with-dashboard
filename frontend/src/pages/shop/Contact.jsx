import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { emailRule } from "../../lib/validation";
import Button from "../../components/ui/Button";
import Field from "../../components/ui/Field";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 300));
    reset();
    setSent(true);
  };

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-xl">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-1 text-4xl font-semibold">Say hello</h1>
        <p className="mt-3 text-ink-soft">
          This form is a demo. Submitting it shows a confirmation but does not send your message
          anywhere.
        </p>

        {sent && (
          <div role="status" className="mt-6 flex items-start gap-3 rounded-md border border-leaf/30 bg-leaf-tint p-4 text-sm">
            <CheckCircleIcon className="h-5 w-5 shrink-0 text-leaf" aria-hidden="true" />
            <p>Thanks. In a real shop your message would be on its way. Nothing was sent.</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="card mt-6 space-y-4 p-5 sm:p-6">
          <Field label="Name" autoComplete="name" error={errors.name?.message} {...register("name", { required: "Name is required" })} />
          <Field label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email", emailRule)} />
          <Field label="Message" as="textarea" rows={5} error={errors.message?.message} {...register("message", { required: "Message is required", minLength: { value: 10, message: "Write at least 10 characters" } })} />
          <Button type="submit" loading={isSubmitting}>
            Send message
          </Button>
        </form>
      </div>
    </div>
  );
}
