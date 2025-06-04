export default function ContentResult({ content }: { content: string }) {
  if (!content) return null;
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-md border border-gray-200">
      <h3 className="font-semibold mb-2">Generated Content</h3>
      <div className="whitespace-pre-line text-gray-800">{content}</div>
    </div>
  );
}
