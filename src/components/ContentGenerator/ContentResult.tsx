import { ClipboardCopy, Check } from 'lucide-react';
import { useState } from 'react';

export default function ContentResult({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  if (!content) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
        <button
          onClick={handleCopy}
          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <ClipboardCopy className="h-4 w-4 mr-2" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="prose max-w-none">
        <div className="whitespace-pre-wrap text-gray-800 font-medium">{content}</div>
      </div>
    </div>
  );
}