import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface GenerateContentParams {
  content_type: string;
  tone: string;
  length: string;
  prompt: string;
  user_id: string;
}

export async function generateContent(params: GenerateContentParams): Promise<string> {
  try {
    // Generate content based on parameters
    const generatedContent = `Sample generated content for ${params.prompt} in ${params.tone} tone`;
    
    // Store the generation in the database
    const { error } = await supabase
      .from('content_generations')
      .insert({
        user_id: params.user_id,
        content_type: params.content_type,
        tone: params.tone,
        length: params.length,
        generated_content: generatedContent
      });

    if (error) throw error;

    return generatedContent;
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content');
  }
}