export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to the Bank CMS</h1>
      <p className="text-gray-600 text-lg">
        Select a section from the sidebar to manage content for the Karamuck Service Co-operative Bank website.
      </p>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-bold text-lg mb-2">How it works</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>When you save changes here, the data is pushed securely to the central repository.</li>
          <li>Cloudflare will automatically detect these changes and rebuild the live website.</li>
          <li>This rebuilding process takes about 1-2 minutes.</li>
          <li>Once complete, the new content will be visible to all users.</li>
        </ul>
      </div>
    </div>
  );
}
