import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

const contentSchema = z.object({
  content_type: z.enum([
    'product_promotion',
    'product_info',
    'seasonal_greeting',
    'product_explainer',
    'sales_announcement',
  ]),
  tone: z.enum(['polite', 'friendly', 'professional']),
  length: z.enum(['short', 'normal', 'script']),
  prompt: z.string().min(5, 'Please enter at least 5 characters').max(500, 'Prompt is too long'),
});

type ContentFormData = z.infer<typeof contentSchema>;

interface ContentFormProps {
  onGenerate: (data: ContentFormData) => Promise<void>;
}

export default function ContentForm({ onGenerate }: ContentFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
  });

  const onSubmit = async (data: ContentFormData) => {
    setLoading(true);
    try {
      await onGenerate(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Content Type</label>
          <select
            {...register('content_type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="product_promotion">Product Promotion</option>
            <option value="product_info">Product Information</option>
            <option value="seasonal_greeting">Seasonal Greeting</option>
            <option value="product_explainer">Product Explainer</option>
            <option value="sales_announcement">Sales Announcement</option>
          </select>
          {errors.content_type && (
            <p className="mt-1 text-sm text-red-600">{errors.content_type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tone</label>
          <select
            {...register('tone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="polite">Polite</option>
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
          </select>
          {errors.tone && (
            <p className="mt-1 text-sm text-red-600">{errors.tone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Length</label>
        <select
          {...register('length')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="short">Short (50-100 words)</option>
          <option value="normal">Normal (100-200 words)</option>
          <option value="script">Script (200+ words)</option>
        </select>
        {errors.length && (
          <p className="mt-1 text-sm text-red-600">{errors.length.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Prompt
          <span className="text-gray-500 text-xs ml-1">(Describe what you want to generate)</span>
        </label>
        <textarea
          {...register('prompt')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Enter your content prompt here..."
        />
        {errors.prompt && (
          <p className="mt-1 text-sm text-red-600">{errors.prompt.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
            Generating...
          </>
        ) : (
          'Generate Content'
        )}
      </button>
    </form>
  );
}