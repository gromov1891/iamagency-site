"use client";

import type { ReactNode } from "react";

export default function SchoolLeadButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const openCourseForm = () => {
    const modalTrigger = document.getElementById("global-course-lead-trigger");
    if (modalTrigger instanceof HTMLButtonElement) {
      modalTrigger.click();
      return;
    }
    window.dispatchEvent(
      new CustomEvent("iam:open-lead", {
        detail: { label: typeof children === "string" ? children : "SMM School course enquiry" },
      }),
    );
  };

  return <button type="button" className={className} onClick={openCourseForm}>{children}</button>;
}
