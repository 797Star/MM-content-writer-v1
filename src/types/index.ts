export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContentGeneration {
  id: string;
  user_id: string;
  content_type: 'product_promotion' | 'product_info' | 'seasonal_greeting' | 'product_explainer' | 'sales_announcement';
  tone: 'polite' | 'friendly' | 'professional';
  length: 'short' | 'normal' | 'script';
  generated_content: string;
  created_at: string;
}

export type ContentType = ContentGeneration['content_type'];
export type ContentTone = ContentGeneration['tone'];
export type ContentLength = ContentGeneration['length'];