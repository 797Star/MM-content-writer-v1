// This is a mock. Replace with real subscription logic as needed.
export async function getSubscriptionStatus(userId: string): Promise<'free' | 'pro' | 'enterprise'> {
  // Simulate API call delay
  await new Promise((r) => setTimeout(r, 500));
  return 'free';
}
