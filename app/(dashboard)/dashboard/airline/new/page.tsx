import PolicyForm from "../PolicyForm";

export default function NewAirlinePolicyPage() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 p-6 md:p-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Create Airline Policy
        </h1>
        <p className="mt-2 text-muted-foreground">
          Write, categorize, and publish an airline policy article.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-5 md:p-8">
        <PolicyForm />
      </div>
    </main>
  );
}
