"use client";

export default function ContactLeadButton({ children }: { children: string }) {
  const openLeadForm = () => {
    window.dispatchEvent(new CustomEvent("iam:open-lead", { detail: { label: children } }));
  };

  return (
    <button type="button" onClick={openLeadForm}>
      {children}
    </button>
  );
}
