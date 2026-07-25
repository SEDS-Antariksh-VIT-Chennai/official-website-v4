"use client";

import { useState, useEffect } from "react";
import { getFormConfig, updateFormConfig } from "@/src/actions/admin";
import { Plus, Trash2, Save, GripVertical, Settings2, FileText, LayoutTemplate, Layers } from "lucide-react";

type FormField = { id: string; type: string; label: string; required: boolean; options?: string[] };
type FormPage = { id: string; title: string; description: string; targetDepartment?: string; fields: FormField[] };

export default function SettingsPage() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [draggedFieldIndex, setDraggedFieldIndex] = useState<number | null>(null);
  const [draggedPageIndex, setDraggedPageIndex] = useState<number | null>(null);

  useEffect(() => {
    getFormConfig().then(data => {
      if (data) {
        // Migration or initialize
        let pages = data.customFields;
        if (!pages || !Array.isArray(pages) || (pages.length > 0 && !(pages[0] as any)?.fields)) {
          // It's the old format or empty, let's reset to an empty page structure
          pages = [
            { id: "page_1", title: "General Details", description: "", fields: [] }
          ];
        }
        
        setConfig({
          ...data,
          customFields: pages
        });
        setActivePageId((pages[0] as any)?.id || "page_1");
      }
      setLoading(false);
    });
  }, []);

  const handleAddPage = () => {
    const newPage = { id: `page_${Date.now()}`, title: "New Page", description: "", targetDepartment: "Always Show", fields: [] };
    setConfig({
      ...config,
      customFields: [...config.customFields, newPage]
    });
    setActivePageId(newPage.id);
  };

  const handleRemovePage = (id: string) => {
    const newPages = config.customFields.filter((p: FormPage) => p.id !== id);
    if (newPages.length === 0) {
      newPages.push({ id: `page_${Date.now()}`, title: "Page 1", description: "", targetDepartment: "Always Show", fields: [] });
    }
    setConfig({ ...config, customFields: newPages });
    if (activePageId === id) setActivePageId(newPages[0].id);
  };

  const handlePageChange = (id: string, key: string, value: string) => {
    setConfig({
      ...config,
      customFields: config.customFields.map((p: FormPage) => p.id === id ? { ...p, [key]: value } : p)
    });
  };

  const handleAddField = (pageId: string) => {
    setConfig({
      ...config,
      customFields: config.customFields.map((p: FormPage) => {
        if (p.id === pageId) {
          return {
            ...p,
            fields: [
              ...p.fields,
              { id: `field_${Date.now()}`, type: "text", label: "New Field", required: false, options: [] }
            ]
          };
        }
        return p;
      })
    });
  };

  const handleRemoveField = (pageId: string, fieldId: string) => {
    setConfig({
      ...config,
      customFields: config.customFields.map((p: FormPage) => {
        if (p.id === pageId) {
          return { ...p, fields: p.fields.filter(f => f.id !== fieldId) };
        }
        return p;
      })
    });
  };

  const handleFieldChange = (pageId: string, fieldId: string, key: keyof FormField, value: any) => {
    setConfig({
      ...config,
      customFields: config.customFields.map((p: FormPage) => {
        if (p.id === pageId) {
          return {
            ...p,
            fields: p.fields.map(f => f.id === fieldId ? { ...f, [key]: value } : f)
          };
        }
        return p;
      })
    });
  };

  const handleOptionChange = (pageId: string, fieldId: string, optionIndex: number, value: string) => {
    setConfig({
      ...config,
      customFields: config.customFields.map((p: FormPage) => {
        if (p.id === pageId) {
          return {
            ...p,
            fields: p.fields.map(f => {
              if (f.id === fieldId) {
                const newOptions = [...(f.options || [])];
                newOptions[optionIndex] = value;
                return { ...f, options: newOptions };
              }
              return f;
            })
          };
        }
        return p;
      })
    });
  };

  const handleAddOption = (pageId: string, fieldId: string) => {
    setConfig({
      ...config,
      customFields: config.customFields.map((p: FormPage) => {
        if (p.id === pageId) {
          return {
            ...p,
            fields: p.fields.map(f => {
              if (f.id === fieldId) {
                return { ...f, options: [...(f.options || []), "New Option"] };
              }
              return f;
            })
          };
        }
        return p;
      })
    });
  };

  const handleRemoveOption = (pageId: string, fieldId: string, optionIndex: number) => {
    setConfig({
      ...config,
      customFields: config.customFields.map((p: FormPage) => {
        if (p.id === pageId) {
          return {
            ...p,
            fields: p.fields.map(f => {
              if (f.id === fieldId) {
                const newOptions = [...(f.options || [])];
                newOptions.splice(optionIndex, 1);
                return { ...f, options: newOptions };
              }
              return f;
            })
          };
        }
        return p;
      })
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    const result = await updateFormConfig(config);
    setSaving(false);
    
    if (result?.success) {
      setStatus({ type: 'success', message: "Form configuration saved successfully!" });
      setTimeout(() => setStatus(null), 3000);
    } else {
      setStatus({ type: 'error', message: "Failed to save configuration." });
    }
  };

  if (loading) return <div className="text-white/50">Loading configuration...</div>;
  if (!config) return <div className="text-red-400">Failed to load configuration. Make sure database is connected.</div>;

  const activePage = config.customFields.find((p: FormPage) => p.id === activePageId);

  const departmentOptions = config.customFields
    .flatMap((p: FormPage) => p.fields || [])
    .find((f: FormField) => f.id === "pref1")?.options || [];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-white/10 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Form Generator</h1>
          <p className="text-white/50 text-sm">Build your multi-page application form.</p>
        </div>
        <div className="flex items-center gap-4">
          {status && (
            <span className={`text-sm font-bold uppercase tracking-widest ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {status.message}
            </span>
          )}
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 font-bold uppercase tracking-widest text-xs rounded-none hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Form"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar - Pages List */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="tech-glass tech-border p-4 rounded-none">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Form Pages
            </h2>
            
            <div className="flex flex-col gap-2">
              {config.customFields.map((page: FormPage, idx: number) => (
                <button
                  key={page.id}
                  draggable
                  onDragStart={(e) => {
                    setDraggedPageIndex(idx);
                    e.dataTransfer.effectAllowed = "move";
                    e.dataTransfer.setData("text/plain", idx.toString());
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move";
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggedPageIndex === null || draggedPageIndex === idx) return;
                    
                    const newPages = [...config.customFields];
                    const [draggedItem] = newPages.splice(draggedPageIndex, 1);
                    newPages.splice(idx, 0, draggedItem);
                    setConfig({ ...config, customFields: newPages });
                    setDraggedPageIndex(null);
                  }}
                  onDragEnd={() => setDraggedPageIndex(null)}
                  onClick={() => setActivePageId(page.id)}
                  className={`text-left px-4 py-3 text-sm font-mono transition-colors border-l-2 cursor-grab active:cursor-grabbing ${
                    draggedPageIndex === idx ? 'opacity-50 border-white/50 bg-white/5' :
                    activePageId === page.id 
                      ? "border-white bg-white/10 text-white" 
                      : "border-transparent text-white/50 hover:bg-white/5 hover:text-white/80"
                  }`}
                >
                  Page {idx + 1}: {page.title || "Untitled"}
                </button>
              ))}
              
              <button 
                onClick={handleAddPage}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white border border-dashed border-white/20 hover:border-white/50 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Page
              </button>
            </div>
          </div>
          
          <div className="tech-glass tech-border p-4 rounded-none">
             <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <Settings2 className="w-4 h-4" /> Settings
            </h2>
            <label className="flex items-center justify-between cursor-pointer mb-4">
              <span className="text-white/80 text-sm">Recruitment Open</span>
              <input 
                type="checkbox" 
                checked={config.isOpen} 
                onChange={(e) => setConfig({...config, isOpen: e.target.checked})}
                className="w-4 h-4 accent-white"
              />
            </label>
            <p className="text-xs text-white/40">Toggle whether the public can view and submit this form.</p>
          </div>
        </div>

        {/* Main Builder Area */}
        <div className="lg:col-span-3">
          {activePage ? (
            <div className="flex flex-col gap-6">
              
              {/* Page Editor */}
              <div className="tech-glass tech-border p-6 rounded-none">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5" /> Edit Page
                  </h2>
                  <button 
                    onClick={() => handleRemovePage(activePage.id)}
                    className="text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-widest flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Page
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Page Title</label>
                    <input 
                      type="text" 
                      value={activePage.title}
                      onChange={(e) => handlePageChange(activePage.id, "title", e.target.value)}
                      placeholder="e.g. General Details"
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 text-sm focus:outline-none focus:border-white/50 font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Description (Optional)</label>
                    <input 
                      type="text" 
                      value={activePage.description}
                      onChange={(e) => handlePageChange(activePage.id, "description", e.target.value)}
                      placeholder="e.g. Please fill out your basic info."
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 text-sm focus:outline-none focus:border-white/50 font-mono"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-white/10">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Page Visibility Condition</label>
                    <select 
                      value={activePage.targetDepartment || "Always Show"}
                      onChange={(e) => handlePageChange(activePage.id, "targetDepartment", e.target.value)}
                      className="w-full bg-[#111] border border-white/10 text-white px-4 py-2 text-sm focus:outline-none focus:border-white/50 font-mono appearance-none cursor-pointer"
                    >
                      <option value="Always Show">Always Show (Default)</option>
                      {departmentOptions.map((dept: string) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    <p className="text-[10px] text-white/30">Select a department to only show this page if the applicant chose it as a preference.</p>
                  </div>
                </div>
              </div>

              {/* Fields Editor */}
              <div className="tech-glass tech-border p-6 rounded-none">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5" /> Form Fields
                  </h2>
                  <button 
                    onClick={() => handleAddField(activePage.id)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 font-bold uppercase tracking-widest text-xs transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Field
                  </button>
                </div>
                
                <div className="flex flex-col gap-6">
                  {activePage.fields.map((field: FormField, index: number) => (
                    <div 
                      key={field.id} 
                      draggable
                      onDragStart={(e) => {
                        setDraggedFieldIndex(index);
                        e.dataTransfer.effectAllowed = "move";
                        // Firefox requires some data to be set for drag to work
                        e.dataTransfer.setData("text/plain", index.toString());
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (draggedFieldIndex === null || draggedFieldIndex === index) return;
                        
                        setConfig({
                          ...config,
                          customFields: config.customFields.map((p: FormPage) => {
                            if (p.id === activePage.id) {
                              const newFields = [...p.fields];
                              const [draggedItem] = newFields.splice(draggedFieldIndex, 1);
                              newFields.splice(index, 0, draggedItem);
                              return { ...p, fields: newFields };
                            }
                            return p;
                          })
                        });
                        setDraggedFieldIndex(null);
                      }}
                      onDragEnd={() => setDraggedFieldIndex(null)}
                      className={`flex gap-4 items-start bg-black/50 p-4 border transition-colors group relative ${draggedFieldIndex === index ? 'opacity-50 border-white/50' : 'border-white/10'}`}
                    >
                      <div className="mt-2 cursor-grab active:cursor-grabbing text-white/30 hover:text-white/70 hidden md:block">
                        <GripVertical className="w-5 h-5 pointer-events-none" />
                      </div>
                      
                      <div className="flex-1 flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="md:col-span-6 flex flex-col gap-1">
                            <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Field Label / Question</label>
                            <input 
                              type="text" 
                              value={field.label}
                              onChange={(e) => handleFieldChange(activePage.id, field.id, "label", e.target.value)}
                              placeholder="e.g. Registration Number"
                              className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:border-white/50 font-mono"
                            />
                          </div>
                          
                          <div className="md:col-span-4 flex flex-col gap-1">
                            <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Field Type</label>
                            <select 
                              value={field.type}
                              onChange={(e) => handleFieldChange(activePage.id, field.id, "type", e.target.value)}
                              className="w-full bg-[#111] border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:border-white/50 font-mono"
                            >
                              <option value="text">Short Text</option>
                              <option value="textarea">Long Text</option>
                              <option value="email">Email</option>
                              <option value="dropdown">Dropdown Select</option>
                              <option value="radio">Radio Buttons</option>
                              <option value="url">URL Link</option>
                              <option value="file">File Upload (PDF/IMG)</option>
                            </select>
                          </div>

                          <div className="md:col-span-2 flex flex-col gap-1 items-center justify-center pt-5">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={field.required}
                                onChange={(e) => handleFieldChange(activePage.id, field.id, "required", e.target.checked)}
                                className="w-4 h-4 accent-white"
                              />
                              <span className="text-xs text-white/70 font-mono uppercase tracking-widest">Req.</span>
                            </label>
                          </div>
                        </div>

                        {/* Options Editor for Dropdown/Radio */}
                        {(field.type === 'dropdown' || field.type === 'radio') && (
                          <div className="mt-2 pl-0 md:pl-2 border-l-2 border-white/10">
                            <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-2 block">Options</label>
                            <div className="flex flex-col gap-2">
                              {(field.options || []).map((opt, optIdx) => (
                                <div key={optIdx} className="flex items-center gap-2">
                                  <input 
                                    type="text" 
                                    value={opt}
                                    onChange={(e) => handleOptionChange(activePage.id, field.id, optIdx, e.target.value)}
                                    className="flex-1 bg-white/5 border border-white/10 text-white px-3 py-1.5 text-sm focus:outline-none focus:border-white/50 font-mono"
                                  />
                                  <button onClick={() => handleRemoveOption(activePage.id, field.id, optIdx)} className="text-white/30 hover:text-red-400 p-1">
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                              <button 
                                onClick={() => handleAddOption(activePage.id, field.id)}
                                className="text-left text-xs font-mono text-white/50 hover:text-white mt-1 w-fit"
                              >
                                + Add Option
                              </button>
                            </div>
                          </div>
                        )}
                        
                      </div>

                      <button 
                        onClick={() => handleRemoveField(activePage.id, field.id)}
                        className="mt-2 text-white/20 hover:text-red-400 transition-colors absolute top-2 right-2 md:relative md:top-0 md:right-0"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  
                  {activePage.fields.length === 0 && (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded-none text-white/30 font-mono">
                      No fields added to this page yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="tech-glass tech-border p-12 text-center text-white/50 font-mono">
              Select or create a page from the sidebar to start building.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}
