"use client";

import { useState, useEffect } from "react";
import { getFormConfig, updateFormConfig } from "@/src/actions/admin";
import { Plus, Trash2, Save, GripVertical } from "lucide-react";

export default function SettingsPage() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getFormConfig().then(data => {
      if (data) {
        // Ensure customFields is an array even if null in DB
        setConfig({
          ...data,
          customFields: data.customFields || []
        });
      }
      setLoading(false);
    });
  }, []);

  const handleAddField = () => {
    setConfig({
      ...config,
      customFields: [
        ...config.customFields,
        { id: `field_${Date.now()}`, type: "text", label: "", required: false }
      ]
    });
  };

  const handleRemoveField = (id: string) => {
    setConfig({
      ...config,
      customFields: config.customFields.filter((f: any) => f.id !== id)
    });
  };

  const handleFieldChange = (id: string, key: string, value: any) => {
    setConfig({
      ...config,
      customFields: config.customFields.map((f: any) => 
        f.id === id ? { ...f, [key]: value } : f
      )
    });
  };

  const handleSave = async () => {
    setSaving(true);
    await updateFormConfig(config);
    setSaving(false);
    alert("Saved successfully!");
  };

  if (loading) return <div className="text-white/50">Loading configuration...</div>;
  if (!config) return <div className="text-red-400">Failed to load configuration. Make sure database is connected.</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Form Configuration</h1>
          <p className="text-white/50 text-sm">Configure how the "Join Us" application form works and add custom fields.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 font-bold uppercase tracking-widest text-xs rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Core Settings */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-6">General Settings</h2>
            
            <label className="flex items-center justify-between cursor-pointer mb-6">
              <span className="text-white/80">Recruitment Open</span>
              <input 
                type="checkbox" 
                checked={config.isOpen} 
                onChange={(e) => setConfig({...config, isOpen: e.target.checked})}
                className="w-5 h-5 accent-white"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer mb-6">
              <span className="text-white/80">Require Resume URL</span>
              <input 
                type="checkbox" 
                checked={config.requireResume} 
                onChange={(e) => setConfig({...config, requireResume: e.target.checked})}
                className="w-5 h-5 accent-white"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-white/80">Require Portfolio URL</span>
              <input 
                type="checkbox" 
                checked={config.requirePortfolio} 
                onChange={(e) => setConfig({...config, requirePortfolio: e.target.checked})}
                className="w-5 h-5 accent-white"
              />
            </label>
          </div>
        </div>

        {/* Custom Fields Builder */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-white">Custom Fields</h2>
              <button 
                onClick={handleAddField}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-white/70 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Field
              </button>
            </div>
            
            <p className="text-white/50 text-sm mb-6">
              Add dynamic questions to your application form. These will be appended to the end of the standard form.
            </p>

            <div className="flex flex-col gap-4">
              {config.customFields.map((field: any, index: number) => (
                <div key={field.id} className="flex gap-4 items-start bg-black/50 p-4 border border-white/10 rounded-lg group">
                  <div className="mt-3 cursor-grab text-white/30 hover:text-white/70">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-7 flex flex-col gap-1">
                      <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Field Label / Question</label>
                      <input 
                        type="text" 
                        value={field.label}
                        onChange={(e) => handleFieldChange(field.id, "label", e.target.value)}
                        placeholder="e.g. Why do you want to join?"
                        className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:border-white/50"
                      />
                    </div>
                    
                    <div className="md:col-span-3 flex flex-col gap-1">
                      <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Type</label>
                      <select 
                        value={field.type}
                        onChange={(e) => handleFieldChange(field.id, "type", e.target.value)}
                        className="w-full bg-[#111] border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:border-white/50 appearance-none"
                      >
                        <option value="text">Short Text</option>
                        <option value="textarea">Long Text</option>
                        <option value="url">URL</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-1 items-center justify-center pt-5">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={field.required}
                          onChange={(e) => handleFieldChange(field.id, "required", e.target.checked)}
                          className="w-4 h-4 accent-white"
                        />
                        <span className="text-xs text-white/70">Req.</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleRemoveField(field.id)}
                    className="mt-3 text-red-400/50 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              
              {config.customFields.length === 0 && (
                <div className="text-center py-12 border border-dashed border-white/10 rounded-lg text-white/30">
                  No custom fields added yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
