export interface Service {
  id: string;
  location_id: string;
  name: string;
  duration_minutes: number;
  price_cents: number;
  is_active: boolean;
  created_at: string;
  service_type: string;
  description: string;
  image_path: string;
}

export interface Location {
  id: string;
  name: string;
  adress: string;
  is_active: string;
  created_at: string;
}
