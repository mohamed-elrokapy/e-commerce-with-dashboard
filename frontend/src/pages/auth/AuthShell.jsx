export default function AuthShell({ title, subtitle, children, aside }) {
  return (
    <div className="container-page py-10 sm:py-16">
      <div className="mx-auto grid max-w-4xl items-start gap-8 md:grid-cols-[1fr_20rem]">
        <div className="card p-6 sm:p-8">
          <h1 className="text-3xl font-semibold">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-ink-soft">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
        {aside}
      </div>
    </div>
  );
}
