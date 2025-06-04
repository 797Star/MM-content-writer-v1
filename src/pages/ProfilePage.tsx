import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return <div className="p-8">You must be logged in to view your profile.</div>;
  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white rounded shadow p-6">
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>ID:</strong> {user.id}</div>
      </div>
    </div>
  );
}
