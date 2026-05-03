import { getSingleton } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';

export const dynamic = 'force-dynamic';

export default async function ContactAdmin() {
  const data = getSingleton('contact') || {};
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Contact Page</h1>
      <GenericForm
        model="contact"
        type="singleton"
        initialData={data}
        fields={[
          { name: 'address', label: 'Address', type: 'textarea' },
          { name: 'phone1', label: 'Primary Phone', type: 'text' },
          { name: 'phone2', label: 'Secondary Phone', type: 'text' },
          { name: 'email', label: 'Email Address', type: 'text' },
          { name: 'workingHours', label: 'Working Hours', type: 'textarea' },
        ]}
      />
    </div>
  );
}
