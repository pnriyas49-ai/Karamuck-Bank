import { getSingleton } from '@/lib/data-reader';
import FacilitiesClient from '@/components/FacilitiesClient';

export default async function FacilitiesPage() {
  const data = getSingleton('facilities');

  return (
    <main className="min-h-screen">
      <FacilitiesClient data={data} />
    </main>
  );
}
