// Example mock data for development
export const mockProfiles = [
  {
    id: '1',
    email: 'user@example.com',
    full_name: 'Test User',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const mockContent = [
  {
    id: '1',
    user_id: '1',
    content_type: 'product_promotion',
    tone: 'friendly',
    length: 'short',
    generated_content: 'Sample generated content',
    created_at: new Date().toISOString(),
  },
];
