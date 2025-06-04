const PricingPlans = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="border rounded-lg p-6 bg-white shadow">
        <h2 className="text-lg font-bold mb-2">Free</h2>
        <p className="mb-4">Basic content generation, limited features.</p>
        <div className="text-2xl font-bold mb-2">$0</div>
        <ul className="mb-4 text-sm text-gray-600">
          <li>10 generations/month</li>
          <li>Email support</li>
        </ul>
        <button className="w-full bg-primary-600 text-white py-2 rounded">Get Started</button>
      </div>
      <div className="border-2 border-primary-600 rounded-lg p-6 bg-white shadow-lg scale-105">
        <h2 className="text-lg font-bold mb-2 text-primary-600">Pro</h2>
        <p className="mb-4">Unlimited content, advanced features.</p>
        <div className="text-2xl font-bold mb-2">$19/mo</div>
        <ul className="mb-4 text-sm text-gray-600">
          <li>Unlimited generations</li>
          <li>Priority support</li>
          <li>Access to all templates</li>
        </ul>
        <button className="w-full bg-primary-600 text-white py-2 rounded">Upgrade</button>
      </div>
      <div className="border rounded-lg p-6 bg-white shadow">
        <h2 className="text-lg font-bold mb-2">Enterprise</h2>
        <p className="mb-4">Custom solutions for teams.</p>
        <div className="text-2xl font-bold mb-2">Contact us</div>
        <ul className="mb-4 text-sm text-gray-600">
          <li>Team management</li>
          <li>Custom integrations</li>
          <li>Dedicated support</li>
        </ul>
        <button className="w-full bg-primary-600 text-white py-2 rounded">Contact Sales</button>
      </div>
    </div>
  );
};

export default PricingPlans;
