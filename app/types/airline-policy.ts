export const POLICY_TYPES = [
  { label: "Flight Change Policy", value: "FLIGHT" },
  { label: "Name Correction Policy", value: "NAME" },
  { label: "Cancellation Policy", value: "CANCELLATION" },
  { label: "Baggage Policy", value: "BAGGAGE" },
] as const;

export type PolicyType =
  (typeof POLICY_TYPES)[number]["value"];