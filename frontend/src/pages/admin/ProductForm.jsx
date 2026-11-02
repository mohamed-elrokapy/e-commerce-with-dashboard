import { useForm } from "react-hook-form";
import { validateProduct } from "../../lib/validation";
import Button from "../../components/ui/Button";
import Field from "../../components/ui/Field";
import ProductImage from "../../components/ui/ProductImage";

const resolver = (values) => {
  const errors = validateProduct(values);
  return {
    values: Object.keys(errors).length ? {} : values,
    errors: Object.fromEntries(
      Object.entries(errors).map(([name, message]) => [name, { type: "validate", message }])
    ),
  };
};

export default function ProductForm({ initial, submitLabel, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver,
    defaultValues: {
      title: initial?.title ?? "",
      price: initial?.price ?? "",
      image: initial?.image ?? "",
      description: initial?.description ?? "",
    },
  });
  const image = watch("image");
  const title = watch("title");

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card grid gap-6 p-5 sm:p-6 md:grid-cols-[1fr_16rem]">
      <div className="space-y-4">
        <Field label="Title" error={errors.title?.message} {...register("title")} />
        <Field
          label="Price (USD)"
          type="number"
          step="0.01"
          min="0"
          inputMode="decimal"
          error={errors.price?.message}
          {...register("price")}
        />
        <Field
          label="Image URL"
          type="url"
          placeholder="https://"
          hint="Leave empty to show a placeholder."
          error={errors.image?.message}
          {...register("image")}
        />
        <Field label="Description" as="textarea" rows={4} error={errors.description?.message} {...register("description")} />
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="submit" loading={isSubmitting}>
            {submitLabel}
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
      <div>
        <p className="mb-1.5 text-sm font-medium">Preview</p>
        <div className="overflow-hidden rounded-md border border-line">
          <ProductImage key={image} src={image} title={title || "New product"} ratio="1 / 1" />
        </div>
      </div>
    </form>
  );
}
