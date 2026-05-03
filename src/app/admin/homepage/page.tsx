import { getSingleton } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';



export default async function HomepageAdmin() {
  const data = getSingleton('homepage') || {};
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Homepage</h1>
      <GenericForm
        model="homepage"
        type="singleton"
        initialData={data}
        fields={[
          { name: 'title', label: 'Hero Title', type: 'text' },
          { name: 'subtitle', label: 'Hero Subtitle', type: 'textarea' },
          { name: 'heroImages', label: 'Hero Background Images (Carousel)', type: 'imageArray' },
        ]}
      />
    </div>
  );
}
