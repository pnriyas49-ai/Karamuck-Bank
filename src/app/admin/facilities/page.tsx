import { getCollection } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/DeleteButton';



export default async function FacilitiesAdmin() {
  const facilities = getCollection('facilities');
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Facilities</h1>
      
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Add New Facility</h2>
        <GenericForm
          model="facilities"
          type="collection"
          fields={[
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'desc', label: 'Description', type: 'textarea' },
            { name: 'iconName', label: 'Icon Name (e.g. Shield, TrendingUp, Landmark, Lock, Smartphone, HandCoins)', type: 'text' },
            { name: 'colorClass', label: 'Color Class (e.g. text-gold, text-accent, text-primary)', type: 'text' },
            { name: 'image', label: 'Facility Image (Optional)', type: 'image' },
          ]}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Existing Facilities</h2>
        {facilities.length === 0 ? (
          <p className="text-gray-500">No facilities added yet.</p>
        ) : (
          <ul className="space-y-4">
            {facilities.map((fac: any) => (
              <li key={fac.slug} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold text-lg">{fac.entry.title}</h3>
                  <p className="text-sm text-gray-500">{fac.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/facilities/${fac.slug}`} className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
                    Edit
                  </Link>
                  <DeleteButton model="facilities" slug={fac.slug} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
