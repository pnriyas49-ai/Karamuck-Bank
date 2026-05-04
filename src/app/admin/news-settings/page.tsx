import { getSingleton } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';

export default async function NewsSettingsAdmin() {
  const data = getSingleton('newsSettings') || {};
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">News Page Settings</h1>
      <GenericForm
        model="newsSettings"
        type="singleton"
        initialData={data}
        fields={[
          { name: 'heroImages', label: 'Hero Banner Images (Carousel)', type: 'imageArray' },
        ]}
      />
    </div>
  );
}
