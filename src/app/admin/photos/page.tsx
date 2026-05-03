import { getSingleton } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';



export default async function PhotosAdmin() {
  const data = getSingleton('photoGallery') || {};
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Photo Gallery</h1>
      <GenericForm
        model="photoGallery"
        type="singleton"
        initialData={data}
        fields={[
          { name: 'images', label: 'Gallery Images', type: 'imageArray' },
        ]}
      />
    </div>
  );
}
