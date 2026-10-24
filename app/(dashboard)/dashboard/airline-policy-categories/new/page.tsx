import CategoryForm from "../../../_components/CategoryForm";

export default function NewAirlinePolicyCategoryPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 p-6 md:p-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Create Policy Category
        </h1>

        <p className="mt-2 text-muted-foreground">
          Create a category to organize your airline name correction policies.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-5 md:p-8">
        <CategoryForm />
      </div>
    </main>
  );
}