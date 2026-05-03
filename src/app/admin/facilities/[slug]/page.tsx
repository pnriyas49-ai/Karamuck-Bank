import { getCollection } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';
import { notFound } from 'next/navigation';



export default async function EditFacilityPage({ params }: { params: { slug: string } }) {
  const facilities = getCollection('facilities');
  const facility = facilities.find((f: any) => f.slug === params.slug);

  if (!facility) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Facility: {facility.entry.title}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <GenericForm
          model="facilities"
          type="collection"
          slug={params.slug}
          initialData={facility.entry}
          fields={[
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'desc', label: 'Description', type: 'textarea' },
            { name: 'iconName', label: 'Icon Name (e.g. Shield, TrendingUp, Landmark, Lock, Smartphone, HandCoins)', type: 'text' },
            { name: 'colorClass', label: 'Color Class (e.g. text-gold, text-accent, text-primary)', type: 'text' },
            { name: 'image', label: 'Facility Image (Optional)', type: 'image' },
          ]}
        />
      </div>
    </div>
  );
}
