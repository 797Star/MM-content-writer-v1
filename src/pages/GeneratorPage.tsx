import { useState } from 'react';
import ContentForm from '../components/ContentGenerator/ContentForm';
import ContentResult from '../components/ContentGenerator/ContentResult';
import { generateContent } from '../services/contentService';

export default function GeneratorPage() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async (data: any) => {
    setError('');
    try {
      const content = await generateContent(data);
      setResult(content);
    } catch (e) {
      setError('Failed to generate content.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Content Generator</h1>
      <ContentForm onGenerate={handleGenerate} />
      {error && <div className="text-red-600 mt-4">{error}</div>}
      <ContentResult content={result} />
    </div>
  );
}
