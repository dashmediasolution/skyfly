
"use client";

import { Plus, Trash2, ChevronUp, ChevronDown, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type PolicyFAQ = {
  question: string;
  answer: string;
};

type Props = {
  faqs: PolicyFAQ[];
  onChange: (faqs: PolicyFAQ[]) => void;
};

export default function PolicyFaqEditor({ faqs, onChange }: Props) {
  function updateFaq(
    index: number,
    field: keyof PolicyFAQ,
    value: string
  ) {
    onChange(
      faqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      )
    );
  }

  function addFaq() {
    onChange([...faqs, { question: "", answer: "" }]);
  }

  function removeFaq(index: number) {
    onChange(faqs.filter((_, i) => i !== index));
  }

  function moveFaq(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;

    if (nextIndex < 0 || nextIndex >= faqs.length) return;

    const next = [...faqs];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    onChange(next);
  }

  return (
    <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <HelpCircle className="h-5 w-5 text-[#538440]" />
            Frequently Asked Questions
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Add questions and answers specific to this airline policy.
          </p>
        </div>

        <Button type="button" onClick={addFaq}>
          <Plus className="mr-2 h-4 w-4" />
          Add FAQ
        </Button>
      </div>

      {faqs.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <HelpCircle className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-3 font-medium">No FAQs added yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add questions to help visitors understand this policy.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="space-y-4 rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold">
                  FAQ {index + 1}
                </span>

                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={index === 0}
                    onClick={() => moveFaq(index, -1)}
                    aria-label={`Move FAQ ${index + 1} up`}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={index === faqs.length - 1}
                    onClick={() => moveFaq(index, 1)}
                    aria-label={`Move FAQ ${index + 1} down`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFaq(index)}
                    aria-label={`Remove FAQ ${index + 1}`}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`faq-question-${index}`}>Question</Label>
                <Input
                  id={`faq-question-${index}`}
                  value={faq.question}
                  onChange={(event) =>
                    updateFaq(index, "question", event.target.value)
                  }
                  placeholder="e.g. Can I change my flight date?"
                  maxLength={300}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`faq-answer-${index}`}>Answer</Label>
                <Textarea
                  id={`faq-answer-${index}`}
                  value={faq.answer}
                  onChange={(event) =>
                    updateFaq(index, "answer", event.target.value)
                  }
                  placeholder="Write a clear answer..."
                  rows={4}
                  maxLength={5000}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Only complete questions and answers will be saved. Their displayed
        order follows the order shown here.
      </p>
    </section>
  );
}
