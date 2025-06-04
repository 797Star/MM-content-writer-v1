/*
  # User Profiles and Content Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, matches auth.users)
      - `email` (text)
      - `full_name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `content_generations`
      - `id` (uuid)
      - `user_id` (uuid, references profiles)
      - `content_type` (text)
      - `tone` (text)
      - `length` (text)
      - `generated_content` (text)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to:
      - Read and update their own profile
      - Read and create their own content generations
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create content_generations table
CREATE TABLE IF NOT EXISTS content_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  content_type text NOT NULL,
  tone text NOT NULL,
  length text NOT NULL,
  generated_content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_generations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Content generations policies
CREATE POLICY "Users can view own content generations"
  ON content_generations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create content generations"
  ON content_generations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();