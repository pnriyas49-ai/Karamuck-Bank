import { getSingleton } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';



export default async function AboutAdmin() {
  const data = getSingleton('about') || {};
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit About Page</h1>
      <GenericForm
        model="about"
        type="singleton"
        initialData={data}
        fields={[
          { name: 'visionTitle', label: 'Vision Title', type: 'text' },
          { name: 'visionText', label: 'Vision Description', type: 'textarea' },
          { name: 'missionTitle', label: 'Mission Title', type: 'text' },
          { name: 'missionText', label: 'Mission Description', type: 'textarea' },
          { name: 'historyText', label: 'Bank History', type: 'textarea' },
          { name: 'aboutImage', label: 'About Page Image', type: 'image' },
        ]}
      />
    </div>
  );
}
