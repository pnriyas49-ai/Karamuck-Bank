'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GenericForm({ 
  model, 
  type, 
  initialData = {}, 
  slug = '', 
  fields 
}: { 
  model: string, 
  type: 'singleton' | 'collection', 
  initialData?: any, 
  slug?: string,
  fields: { name: string, label: string, type: 'text' | 'textarea' | 'image' | 'number' | 'imageArray' }[] 
}) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [fieldName]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const itemSlug = slug || formData.slug || formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          model,
          type,
          slug: itemSlug,
          data: formData,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to save');
      
      alert('Saved successfully!');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded text-sm">{error}</div>}
      
      {type === 'collection' && !slug && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug (URL ID)</label>
          <input 
            type="text" 
            name="slug"
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
            required
          />
        </div>
      )}

      {fields.map(field => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
          
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
            />
          ) : field.type === 'image' ? (
            <div className="mt-1 flex items-center space-x-4">
              {formData[field.name] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={formData[field.name]} alt="Preview" className="h-20 w-20 object-cover rounded" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, field.name)}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
            </div>
          ) : field.type === 'imageArray' ? (
             <div className="mt-1">
                {Array.isArray(formData[field.name]) && formData[field.name].map((img: string, idx: number) => (
                   <div key={idx} className="mb-2 flex items-center space-x-4">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={img} alt="Preview" className="h-20 w-20 object-cover rounded" />
                     <button type="button" onClick={() => {
                        const newArr = [...formData[field.name]];
                        newArr.splice(idx, 1);
                        setFormData({ ...formData, [field.name]: newArr });
                     }} className="text-red-500 text-sm hover:underline">Remove</button>
                   </div>
                ))}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                     const file = e.target.files?.[0];
                     if (file) {
                       const reader = new FileReader();
                       reader.onloadend = () => {
                         const current = Array.isArray(formData[field.name]) ? formData[field.name] : [];
                         setFormData({ ...formData, [field.name]: [...current, reader.result] });
                       };
                       reader.readAsDataURL(file);
                     }
                  }}
                  className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
             </div>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="bg-red-700 text-white px-6 py-2.5 rounded-lg shadow hover:bg-red-800 disabled:opacity-50 font-semibold transition-colors"
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
