import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import type { ContentGenerationRequest } from '../../types';

const contentSchema = z.object({
  platform: z.enum(['facebook', 'instagram', 'tiktok']),
  content_type: z.enum([
    'post',
    'reel_script',
    'video_description',
    'product_promotion',
    'seasonal_greeting',
    'explainer_content'
  ]),
  length: z.enum(['short', 'standard', 'detailed']),
  objective: z.enum(['brand_awareness', 'lead_generation', 'sales']),
  style: z.enum(['polite', 'friendly', 'humorous']),
  product_name: z.string().optional(),
  key_message: z.string().optional(),
  target_audience: z.string().optional(),
  keywords: z.string().optional(),
  business_page: z.string().url().optional(),
  include_emojis: z.boolean().default(true),
  include_cta: z.boolean().default(true),
  include_hashtags: z.boolean().default(true),
  variations_count: z.number().min(1).max(3).default(1),
});

type ContentFormData = z.infer<typeof contentSchema>;

interface ContentFormProps {
  onGenerate: (data: ContentGenerationRequest) => Promise<void>;
}

export default function ContentForm({ onGenerate }: ContentFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      variations_count: 1,
      include_emojis: true,
      include_cta: true,
      include_hashtags: true,
    }
  });

  const selectedPlatform = watch('platform');
  const selectedContentType = watch('content_type');

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
          <label className="block text-sm font-medium text-gray-700">Platform</label>
          <select
            {...register('platform')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
          </select>
          {errors.platform && (
            <p className="mt-1 text-sm text-red-600">{errors.platform.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Content Type</label>
          <select
            {...register('content_type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="post">Post</option>
            <option value="reel_script">Reel Script</option>
            <option value="video_description">Video Description</option>
            <option value="product_promotion">Product Promotion</option>
            <option value="seasonal_greeting">Seasonal Greeting</option>
            <option value="explainer_content">Explainer Content</option>
          </select>
          {errors.content_type && (
            <p className="mt-1 text-sm text-red-600">{errors.content_type.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Length</label>
          <select
            {...register('length')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="short">Short</option>
            <option value="standard">Standard</option>
            <option value="detailed">Detailed</option>
          </select>
          {errors.length && (
            <p className="mt-1 text-sm text-red-600">{errors.length.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Style</label>
          <select
            {...register('style')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="polite">Polite (Formal Burmese)</option>
            <option value="friendly">Friendly (Casual Burmese)</option>
            <option value="humorous">Humorous</option>
          </select>
          {errors.style && (
            <p className="mt-1 text-sm text-red-600">{errors.style.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Primary Objective</label>
        <select
          {...register('objective')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="brand_awareness">Brand Awareness</option>
          <option value="lead_generation">Lead Generation</option>
          <option value="sales">Sales</option>
        </select>
        {errors.objective && (
          <p className="mt-1 text-sm text-red-600">{errors.objective.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Product/Service Name (Optional)</label>
        <input
          type="text"
          {...register('product_name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Enter product or service name"
        />
        {errors.product_name && (
          <p className="mt-1 text-sm text-red-600">{errors.product_name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Key Message/Details</label>
        <textarea
          {...register('key_message')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Enter key message or details about your product/service"
        />
        {errors.key_message && (
          <p className="mt-1 text-sm text-red-600">{errors.key_message.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Target Audience (Optional)</label>
        <input
          type="text"
          {...register('target_audience')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Describe your target audience"
        />
        {errors.target_audience && (
          <p className="mt-1 text-sm text-red-600">{errors.target_audience.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Keywords (Optional)</label>
        <input
          type="text"
          {...register('keywords')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Enter keywords separated by commas"
        />
        {errors.keywords && (
          <p className="mt-1 text-sm text-red-600">{errors.keywords.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Business Facebook Page URL (Optional)</label>
        <input
          type="url"
          {...register('business_page')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="https://facebook.com/your-business-page"
        />
        {errors.business_page && (
          <p className="mt-1 text-sm text-red-600">{errors.business_page.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('include_emojis')}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Include Emojis</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('include_cta')}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Include Call-to-Action (CTA)</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('include_hashtags')}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Include Hashtags</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Number of Variations</label>
        <select
          {...register('variations_count', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value={1}>1 Variation</option>
          <option value={2}>2 Variations</option>
          <option value={3}>3 Variations</option>
        </select>
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