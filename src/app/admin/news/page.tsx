import { getCollection } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function NewsAdmin() {
  const news = getCollection('news');
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage News & Announcements</h1>
      
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Add New Announcement</h2>
        <GenericForm
          model="news"
          type="collection"
          fields={[
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'date', label: 'Date (e.g. Oct 15, 2026)', type: 'text' },
            { name: 'tag', label: 'Tag (e.g. Event, Finance, Technology)', type: 'text' },
            { name: 'desc', label: 'Description', type: 'textarea' },
            { name: 'image', label: 'News Image (Optional)', type: 'image' },
          ]}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Existing News</h2>
        {news.length === 0 ? (
          <p className="text-gray-500">No news added yet.</p>
        ) : (
          <ul className="space-y-4">
            {news.map((item: any) => (
              <li key={item.slug} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold text-lg">{item.entry.title}</h3>
                  <p className="text-sm text-gray-500">{item.entry.date}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/news/${item.slug}`} className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
                    Edit
                  </Link>
                  <DeleteButton model="news" slug={item.slug} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
