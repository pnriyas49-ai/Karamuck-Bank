'use client';
import { useState, useRef } from 'react';
import { Trash2, Plus, GripVertical, Save, ImageIcon } from 'lucide-react';

interface FacilitySection {
  title: string;
  titleMl: string;
  columns: string[];
  rows: string[][];
}
interface Subsidiary {
  title: string;
  titleMl: string;
  description: string;
  image: string;
}
interface FacilitiesData {
  heroImage: string;
  sections: FacilitySection[];
  subsidiaries: Subsidiary[];
}

export default function FacilitiesEditor({ initialData }: { initialData: FacilitiesData | null }) {
  const [data, setData] = useState<FacilitiesData>(
    initialData || { heroImage: '', sections: [], subsidiaries: [] }
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const heroRef = useRef<HTMLInputElement>(null);

  // ─── Hero Image ─────────────────────────────────
  const handleHeroImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setData((d) => ({ ...d, heroImage: reader.result as string }));
    reader.readAsDataURL(file);
  };

  // ─── Section Helpers ────────────────────────────
  const addSection = () =>
    setData((d) => ({
      ...d,
      sections: [...d.sections, { title: 'New Section', titleMl: '', columns: ['Column 1'], rows: [['—']] }],
    }));

  const removeSection = (idx: number) =>
    setData((d) => ({ ...d, sections: d.sections.filter((_, i) => i !== idx) }));

  const updateSection = (idx: number, key: keyof FacilitySection, val: any) =>
    setData((d) => {
      const s = [...d.sections];
      (s[idx] as any)[key] = val;
      return { ...d, sections: s };
    });

  // columns
  const addColumn = (sIdx: number) =>
    setData((d) => {
      const s = [...d.sections];
      s[sIdx].columns.push('New Column');
      s[sIdx].rows = s[sIdx].rows.map((r) => [...r, '—']);
      return { ...d, sections: s };
    });

  const removeColumn = (sIdx: number, cIdx: number) =>
    setData((d) => {
      const s = [...d.sections];
      s[sIdx].columns.splice(cIdx, 1);
      s[sIdx].rows = s[sIdx].rows.map((r) => r.filter((_, i) => i !== cIdx));
      return { ...d, sections: s };
    });

  const updateColumn = (sIdx: number, cIdx: number, val: string) =>
    setData((d) => {
      const s = [...d.sections];
      s[sIdx].columns[cIdx] = val;
      return { ...d, sections: s };
    });

  // rows
  const addRow = (sIdx: number) =>
    setData((d) => {
      const s = [...d.sections];
      s[sIdx].rows.push(s[sIdx].columns.map(() => '—'));
      return { ...d, sections: s };
    });

  const removeRow = (sIdx: number, rIdx: number) =>
    setData((d) => {
      const s = [...d.sections];
      s[sIdx].rows.splice(rIdx, 1);
      return { ...d, sections: s };
    });

  const updateCell = (sIdx: number, rIdx: number, cIdx: number, val: string) =>
    setData((d) => {
      const s = [...d.sections];
      s[sIdx].rows[rIdx][cIdx] = val;
      return { ...d, sections: s };
    });

  // ─── Subsidiary Helpers ─────────────────────────
  const addSubsidiary = () =>
    setData((d) => ({
      ...d,
      subsidiaries: [...d.subsidiaries, { title: '', titleMl: '', description: '', image: '' }],
    }));

  const removeSubsidiary = (idx: number) =>
    setData((d) => ({ ...d, subsidiaries: d.subsidiaries.filter((_, i) => i !== idx) }));

  const updateSubsidiary = (idx: number, key: keyof Subsidiary, val: string) =>
    setData((d) => {
      const subs = [...d.subsidiaries];
      subs[idx][key] = val;
      return { ...d, subsidiaries: subs };
    });

  const handleSubImage = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateSubsidiary(idx, 'image', reader.result as string);
    reader.readAsDataURL(file);
  };

  // ─── Save ───────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'singleton', model: 'facilities', action: 'save', data }),
      });
      if (!res.ok) throw new Error('Save failed');
      setMessage('Saved successfully!');
    } catch (err: any) {
      setMessage('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // ─── Render ─────────────────────────────────────
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Manage Facilities</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      {message && (
        <p className={`text-sm font-medium ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}

      {/* Hero Image */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Hero Image</h2>
        <div className="flex items-center gap-4">
          {data.heroImage && (
            <img src={data.heroImage} alt="Hero" className="h-28 rounded-lg object-cover" />
          )}
          <button
            onClick={() => heroRef.current?.click()}
            className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200"
          >
            <ImageIcon size={16} /> {data.heroImage ? 'Change Image' : 'Upload Image'}
          </button>
          <input ref={heroRef} type="file" accept="image/*" className="hidden" onChange={handleHeroImage} />
        </div>
      </div>

      {/* Sections */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Sections (Tables)</h2>
          <button onClick={addSection} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm hover:bg-blue-200">
            <Plus size={14} /> Add Section
          </button>
        </div>

        {data.sections.map((section, sIdx) => (
          <div key={sIdx} className="border rounded-lg p-4 mb-4 bg-gray-50">
            <div className="flex items-center gap-3 mb-3">
              <GripVertical size={16} className="text-gray-400" />
              <input
                value={section.title}
                onChange={(e) => updateSection(sIdx, 'title', e.target.value)}
                placeholder="Section Title (English)"
                className="flex-1 border rounded px-3 py-1.5 text-sm font-semibold"
              />
              <input
                value={section.titleMl}
                onChange={(e) => updateSection(sIdx, 'titleMl', e.target.value)}
                placeholder="Malayalam Title"
                className="flex-1 border rounded px-3 py-1.5 text-sm"
              />
              <button onClick={() => removeSection(sIdx)} className="text-red-500 hover:text-red-700 p-1">
                <Trash2 size={16} />
              </button>
            </div>

            {/* Columns */}
            <div className="mb-2">
              <p className="text-xs font-semibold text-gray-500 mb-1">Columns:</p>
              <div className="flex flex-wrap gap-2 items-center">
                {section.columns.map((col, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-1">
                    <input
                      value={col}
                      onChange={(e) => updateColumn(sIdx, cIdx, e.target.value)}
                      className="border rounded px-2 py-1 text-xs w-28"
                    />
                    {section.columns.length > 1 && (
                      <button onClick={() => removeColumn(sIdx, cIdx)} className="text-red-400 hover:text-red-600">
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={() => addColumn(sIdx)} className="text-blue-600 text-xs hover:underline">
                  + Column
                </button>
              </div>
            </div>

            {/* Rows Table */}
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr>
                    {section.columns.map((col, cIdx) => (
                      <th key={cIdx} className="border px-2 py-1 text-left bg-gray-200 font-semibold">
                        {col}
                      </th>
                    ))}
                    <th className="border px-2 py-1 bg-gray-200 w-8" />
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="border px-1 py-0.5">
                          <input
                            value={cell}
                            onChange={(e) => updateCell(sIdx, rIdx, cIdx, e.target.value)}
                            className="w-full px-1 py-0.5 text-xs border-0 outline-none bg-transparent"
                          />
                        </td>
                      ))}
                      <td className="border px-1 py-0.5 text-center">
                        <button onClick={() => removeRow(sIdx, rIdx)} className="text-red-400 hover:text-red-600">
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={() => addRow(sIdx)} className="mt-1 text-blue-600 text-xs hover:underline">
                + Add Row
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Subsidiaries */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Subsidiary Firms</h2>
          <button onClick={addSubsidiary} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm hover:bg-blue-200">
            <Plus size={14} /> Add Subsidiary
          </button>
        </div>

        {data.subsidiaries.length === 0 && <p className="text-gray-500 text-sm">No subsidiaries added yet.</p>}

        {data.subsidiaries.map((sub, idx) => (
          <div key={idx} className="border rounded-lg p-4 mb-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input
                value={sub.title}
                onChange={(e) => updateSubsidiary(idx, 'title', e.target.value)}
                placeholder="Title (English)"
                className="border rounded px-3 py-2 text-sm"
              />
              <input
                value={sub.titleMl}
                onChange={(e) => updateSubsidiary(idx, 'titleMl', e.target.value)}
                placeholder="Title (Malayalam)"
                className="border rounded px-3 py-2 text-sm"
              />
            </div>
            <textarea
              value={sub.description}
              onChange={(e) => updateSubsidiary(idx, 'description', e.target.value)}
              placeholder="Description"
              rows={2}
              className="w-full border rounded px-3 py-2 text-sm mb-3"
            />
            <div className="flex items-center gap-3">
              {sub.image && <img src={sub.image} alt={sub.title} className="h-20 rounded object-cover" />}
              <label className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded text-sm cursor-pointer hover:bg-blue-200">
                <ImageIcon size={14} /> Image
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSubImage(idx, e)} />
              </label>
              <button onClick={() => removeSubsidiary(idx)} className="ml-auto text-red-500 hover:text-red-700 text-sm flex items-center gap-1">
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
