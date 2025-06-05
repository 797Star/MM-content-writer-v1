/*
  # Update content generations table

  1. Changes
    - Add new fields for enhanced content generation
    - Update existing columns to match new requirements
    - Add appropriate indexes for performance
  
  2. Security
    - Enable RLS
    - Add policies for user access
*/

-- Update the content_generations table
ALTER TABLE content_generations 
ADD COLUMN IF NOT EXISTS platform text,
ADD COLUMN IF NOT EXISTS objective text,
ADD COLUMN IF NOT EXISTS product_name text,
ADD COLUMN IF NOT EXISTS key_message text,
ADD COLUMN IF NOT EXISTS target_audience text,
ADD COLUMN IF NOT EXISTS keywords text,
ADD COLUMN IF NOT EXISTS business_page text,
ADD COLUMN IF NOT EXISTS include_emojis boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS include_cta boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS include_hashtags boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS variations_count integer DEFAULT 1;

-- Add indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS content_generations_user_id_idx ON content_generations(user_id);
CREATE INDEX IF NOT EXISTS content_generations_platform_idx ON content_generations(platform);
CREATE INDEX IF NOT EXISTS content_generations_content_type_idx ON content_generations(content_type);

-- Enable RLS
ALTER TABLE content_generations ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can insert their own content generations"
ON content_generations FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own content generations"
ON content_generations FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);