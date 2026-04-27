export interface Service {
  id: string;
  location_id: string;
  name: string;
  duration: Record<string, number>;
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
}
