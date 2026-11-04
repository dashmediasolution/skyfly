
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import PolicyForm, {
  type PolicyFormInitialData,
  type PolicyStatus,
} from "../../PolicyForm";
import type { PolicyFAQ } from "@/app/(dashboard)/_components/PolicyFaqEditor";

interface EditPolicyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPolicyPage({
  params,
}: EditPolicyPageProps) {
  const { id } = await params;

  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    notFound();
  }

  const policy = await prisma.airlinePolicy.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!policy) {
    notFound();
  }

  const status: PolicyStatus =
    policy.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";

  const initialData: PolicyFormInitialData = {
    id: policy.id,
    categoryId: policy.categoryId,
    policyType: policy.policyType,
    excerpt: policy.excerpt ?? "",
    content: policy.content,
    metaTitle: policy.metaTitle ?? "",
    metaDescription: policy.metaDescription ?? "",
    metaKeywords: Array.isArray(policy.metaKeywords)
      ? policy.metaKeywords.join(", ")
      : "",
    status,
    faqs: Array.isArray(policy.faqs)
      ? (policy.faqs as unknown as PolicyFAQ[])
      : [],
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Edit Airline Policy
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Update airline policy information, article content, FAQs and SEO settings.
        </p>
      </div>

      <PolicyForm initialData={initialData} />
    </div>
  );
}
