import { getCollection } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export default async function EditNewsPage({ params }: { params: { slug: string } }) {
  const newsList = getCollection('news');
  const newsItem = newsList.find((f: any) => f.slug === params.slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit News: {newsItem.entry.title}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <GenericForm
          model="news"
          type="collection"
          slug={params.slug}
          initialData={newsItem.entry}
          fields={[
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'date', label: 'Date (e.g. Oct 15, 2026)', type: 'text' },
            { name: 'tag', label: 'Tag (e.g. Event, Finance, Technology)', type: 'text' },
            { name: 'desc', label: 'Description', type: 'textarea' },
            { name: 'image', label: 'News Image (Optional)', type: 'image' },
          ]}
        />
      </div>
    </div>
  );
}
