import "server-only";

import { saveLeadRecord, validateLead } from "@/lib/lead-store";
import { uploadQualifiedLead } from "@/lib/yandex-offline-conversions";

export async function qualifyLead(id: string) {
  const record = await validateLead(id);
  if (!record) return null;
  if (record.offlineConversion?.status === "sent") return record;
  const offlineConversion = await uploadQualifiedLead(record);
  const updated = { ...record, offlineConversion };
  await saveLeadRecord(updated);
  return updated;
}
