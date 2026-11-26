/** Tipos do contrato /v1/admin/* (PLAN-admin §4) — respostas UTC ISO-8601. */
export type TenantListItem = {
  id: string;
  name: string;
  slug: string;
  owner_email: string | null;
  subscription_status: string;
  trial_ends_at: string | null;
  suspended_at: string | null;
  created_at: string;
};

export type TenantDetail = TenantListItem & {
  suspension_reason: string | null;
  timezone: string;
  business_type: string;
};

export type TenantsPage = {
  items: TenantListItem[];
  page: number;
  page_size: number;
  total: number;
};

export type BillingInfo = {
  tenant_id: string;
  subscription_status: string;
  trial_ends_at: string | null;
  provider?: string;
  customer_id?: string;
  subscription_id?: string;
  recent_payments?: {
    id: string;
    status: string;
    value_cents: number;
    due_date: string;
    paid_at: string | null;
  }[];
};

export type AuditEntry = {
  id: string;
  who: { user_id: string; name: string | null; email: string | null };
  what: string;
  target: { type: string; id: string };
  metadata: Record<string, unknown>;
  occurred_at: string;
  ip: string;
};

export type AuditPage = {
  items: AuditEntry[];
  page: number;
  page_size: number;
  total: number;
};
