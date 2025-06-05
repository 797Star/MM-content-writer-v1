export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export type Platform = 'facebook' | 'instagram' | 'tiktok';
export type ContentType = 
  | 'post'
  | 'reel_script'
  | 'video_description'
  | 'product_promotion'
  | 'seasonal_greeting'
  | 'explainer_content';
export type ContentLength = 'short' | 'standard' | 'detailed';
export type ContentObjective = 'brand_awareness' | 'lead_generation' | 'sales';
export type ContentStyle = 'polite' | 'friendly' | 'humorous';

export interface ContentGeneration {
  id: string;
  user_id: string;
  platform: Platform;
  content_type: ContentType;
  length: ContentLength;
  objective: ContentObjective;
  style: ContentStyle;
  product_name?: string;
  key_message?: string;
  target_audience?: string;
  keywords?: string;
  business_page?: string;
  include_emojis: boolean;
  include_cta: boolean;
  include_hashtags: boolean;
  variations_count: number;
  generated_content: string;
  created_at: string;
}

export interface ContentGenerationRequest {
  platform: Platform;
  content_type: ContentType;
  length: ContentLength;
  objective: ContentObjective;
  style: ContentStyle;
  product_name?: string;
  key_message?: string;
  target_audience?: string;
  keywords?: string;
  business_page?: string;
  include_emojis: boolean;
  include_cta: boolean;
  include_hashtags: boolean;
  variations_count: number;
}