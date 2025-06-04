import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../contexts/AuthContext';

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
  prompt: z.string().min(5, 'Please enter a prompt'),
});

type ContentFormData = z.infer<typeof contentSchema>;

export default function ContentForm({ onGenerate }: { onGenerate: (data: any) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
  });
  const [loading, setLoading] = useState(false);

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
      <div>
        <label className="block text-sm font-medium text-gray-700">Content Type</label>
        <select {...register('content_type')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="product_promotion">Product Promotion</option>
          <option value="product_info">Product Info</option>
          <option value="seasonal_greeting">Seasonal Greeting</option>
          <option value="product_explainer">Product Explainer</option>
          <option value="sales_announcement">Sales Announcement</option>
        </select>
        {errors.content_type && <p className="text-red-600 text-sm">{errors.content_type.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tone</label>
        <select {...register('tone')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="polite">Polite</option>
          <option value="friendly">Friendly</option>
          <option value="professional">Professional</option>
        </select>
        {errors.tone && <p className="text-red-600 text-sm">{errors.tone.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Length</label>
        <select {...register('length')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="short">Short</option>
          <option value="normal">Normal</option>
          <option value="script">Script</option>
        </select>
        {errors.length && <p className="text-red-600 text-sm">{errors.length.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Prompt</label>
        <textarea {...register('prompt')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" rows={3} />
        {errors.prompt && <p className="text-red-600 text-sm">{errors.prompt.message}</p>}
      </div>
      <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded-md" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Content'}
      </button>
    </form>
  );
}
