'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function DeleteButton({ model, slug }: { model: string, slug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          model,
          type: 'collection',
          slug,
        }),
      });

      if (!res.ok) throw new Error('Failed to delete');
      
      router.refresh();
    } catch (err) {
      alert('Error deleting item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading}
      className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 disabled:opacity-50"
    >
      {loading ? '...' : 'Delete'}
    </button>
  );
}
