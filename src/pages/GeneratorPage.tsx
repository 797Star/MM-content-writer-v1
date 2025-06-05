import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentForm from '../components/ContentGenerator/ContentForm';
import ContentResult from '../components/ContentGenerator/ContentResult';
import { generateContent } from '../services/contentService';
import { useAuth } from '../contexts/AuthContext';

export default function GeneratorPage() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleGenerate = async (data: any) => {
    setError('');
    try {
      const content = await generateContent({
        ...data,
        user_id: user.id
      });
      setResult(content);
    } catch (e) {
      setError('Failed to generate content. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Content Generator</h1>
        <div className="space-y-8">
          <ContentForm onGenerate={handleGenerate} />
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
              {error}
            </div>
          )}
          <ContentResult content={result} />
        </div>
      </div>
    </div>
  );
}