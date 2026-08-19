export interface Service {
  id: string;
  location_id: string;
  name: string;
  durations: string[];
  price_cents: number;
  is_active: boolean;
  created_at: string;
  service_type: string;
  description: string;
  image_path: string;
  image_alt: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  is_active: string;
  created_at: string;
  emoji: string;
  prio_number: number;
  image_path: string;
  image_alt: string
}

// ── Backend-Tabellen (public schema) — nur die Felder, die das Frontend nutzt ──

export interface AvailabilityRule {
  id: string;
  weekday: number; // 0..6 (entspricht JS Date.getDay(): 0 = Sonntag)
  start_time: string; // 'HH:MM:SS'
  end_time: string; // 'HH:MM:SS'
  valid_from: string | null;
  valid_until: string | null;
  location_id: string | null;
  closed: boolean | null;
}

export interface Customer {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  created_at?: string;
}

export interface TimeSlot {
  id?: string;
  location_id: string;
  service_id: string;
  start_datetime: string; // ISO
  end_datetime: string; // ISO
  is_bookable?: boolean;
  created_at?: string;
}

export type BookingStatus = "requested" | "confirmed" | "cancelled" | "expired";

export interface Booking {
  id?: string;
  time_slot_id: string;
  customer_id: string;
  status?: BookingStatus;
  confirmed_at?: string | null;
  cancelled_at?: string | null;
  created_at?: string;
}
