"use client";

import { useState } from "react";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateProject } from "@/src/actions/admin";

export default function EditProjectForm({ project }: { project: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(project.image);
  
  const [existingGallery, setExistingGallery] = useState<string[]>(project.gallery || []);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: project.title,
    category: project.category,
    status: project.status,
    teamSize: project.teamSize || "",
    timeline: project.timeline || "",
    iconName: project.iconName || "",
    description: project.description,
    fullDescription: project.fullDescription || "",
    image: project.image,
    isPinned: project.isPinned || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("status", formData.status);
    data.append("description", formData.description);
    if (formData.fullDescription) data.append("fullDescription", formData.fullDescription);
    if (formData.teamSize) data.append("teamSize", formData.teamSize);
    if (formData.timeline) data.append("timeline", formData.timeline);
    if (formData.iconName) data.append("iconName", formData.iconName);
    
    data.append("isPinned", String(formData.isPinned));
    data.append("image", formData.image);
    
    if (imageFile) {
      data.append("imageFile", imageFile);
    }

    data.append("existingGallery", JSON.stringify(existingGallery));
    
    galleryFiles.forEach((file) => {
      data.append("galleryFiles", file);
    });
    
    const result = await updateProject(project.id, data);
    setLoading(false);
    
    if (result.success) {
      router.push("/admin/projects");
    } else {
      setError("Failed to update project. Please check the details and try again.");
      console.error(result.error);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
        <Link href="/admin/projects" className="p-2 hover:bg-white/10 rounded transition-colors text-white/50 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Edit Project</h1>
          <p className="text-white/50 text-sm">Update the details for {project.title}.</p>
        </div>
      </div>

      <div className="max-w-2xl bg-white/5 border border-white/10 rounded-xl p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Project Title *</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-white/50 transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Category *</label>
              <input 
                type="text" 
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-white/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Status *</label>
              <select 
                required
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-white/50 transition-all"
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Planning">Planning</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Team Size</label>
              <input 
                type="text" 
                value={formData.teamSize}
                onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-white/50 transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Timeline</label>
              <input 
                type="text" 
                value={formData.timeline}
                onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-white/50 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Icon Name (Lucide React)</label>
            <input 
              type="text" 
              value={formData.iconName}
              onChange={(e) => setFormData({...formData, iconName: e.target.value})}
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-white/50 transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Short Description *</label>
            <textarea 
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-white/50 transition-all resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Full Description</label>
            <textarea 
              rows={5}
              value={formData.fullDescription}
              onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-white/50 transition-all resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Cover Image</label>
            
            <div className="flex flex-col gap-4">
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors relative cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      setImagePreview(URL.createObjectURL(file));
                      setFormData({...formData, image: ""});
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                {imagePreview ? (
                  <div className="relative w-full max-w-sm aspect-[4/5] rounded overflow-hidden border border-white/20 group">
                    <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-bold">Click to change</p>
                    </div>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setImageFile(null);
                        setImagePreview(null);
                        setFormData({...formData, image: ""});
                      }}
                      className="absolute top-2 right-2 bg-black/80 backdrop-blur-md border border-white/10 text-white/70 hover:text-white rounded-full p-2 flex items-center justify-center transition-all z-20 hover:bg-red-500 hover:border-red-500 shadow-xl"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/10 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-xl">📸</span>
                    </div>
                    <p className="text-white font-medium mb-1">Click or drag image here</p>
                    <p className="text-white/50 text-xs">Supports JPG, PNG, WebP</p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-px bg-white/10 flex-1"></div>
                <span className="text-white/30 text-xs uppercase tracking-widest">OR USE URL</span>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>

              <input 
                type="url" 
                value={formData.image}
                onChange={(e) => {
                  setFormData({...formData, image: e.target.value});
                  if (e.target.value) {
                    setImageFile(null);
                    setImagePreview(null);
                  }
                }}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-white/50 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Project Gallery (Optional)</label>
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors relative cursor-pointer">
              <input 
                type="file" 
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.length > 0) {
                    setGalleryFiles(prev => [...prev, ...files]);
                    const newPreviews = files.map(file => URL.createObjectURL(file));
                    setGalleryPreviews(prev => [...prev, ...newPreviews]);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
                {/* Existing Gallery Images */}
                {existingGallery.map((url, i) => (
                  <div key={`existing-${i}`} className="relative aspect-square rounded overflow-hidden border border-white/20 group">
                    <img src={url} alt={`Gallery ${i}`} className="object-cover w-full h-full" />
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setExistingGallery(prev => prev.filter((_, idx) => idx !== i));
                      }}
                      className="absolute top-1 right-1 bg-black/80 backdrop-blur-md border border-white/10 text-white/70 hover:text-white rounded-full p-1.5 flex items-center justify-center transition-all z-20 hover:bg-red-500 hover:border-red-500 shadow-lg"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {/* New Gallery Previews */}
                {galleryPreviews.map((preview, i) => (
                  <div key={`new-${i}`} className="relative aspect-square rounded overflow-hidden border border-white/20 group">
                    <img src={preview} alt={`New Gallery ${i}`} className="object-cover w-full h-full" />
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setGalleryFiles(prev => prev.filter((_, idx) => idx !== i));
                        setGalleryPreviews(prev => prev.filter((_, idx) => idx !== i));
                      }}
                      className="absolute top-1 right-1 bg-black/80 backdrop-blur-md border border-white/10 text-white/70 hover:text-white rounded-full p-1.5 flex items-center justify-center transition-all z-20 hover:bg-red-500 hover:border-red-500 shadow-lg"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                <div className="aspect-square rounded border border-dashed border-white/20 flex flex-col items-center justify-center text-white/30 hover:bg-white/5 hover:text-white/50 transition-colors cursor-pointer">
                  <span className="text-2xl">+</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/10 pt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={formData.isPinned}
                  onChange={(e) => setFormData({...formData, isPinned: e.target.checked})}
                />
                <div className={`block w-14 h-8 rounded-full transition-colors ${formData.isPinned ? 'bg-white' : 'bg-white/10 border border-white/20'}`}></div>
                <div className={`absolute left-1 top-1 bg-black w-6 h-6 rounded-full transition-transform ${formData.isPinned ? 'translate-x-6' : ''}`}></div>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-white">Pin Project</span>
                <p className="text-[10px] text-white/50">Pinned projects will be featured exclusively on the home page.</p>
              </div>
            </label>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              {error && (
                <span className="text-red-400 text-sm font-bold uppercase tracking-widest">{error}</span>
              )}
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-xs rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? "Saving..." : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
