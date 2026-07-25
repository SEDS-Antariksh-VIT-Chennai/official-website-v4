"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function getFormConfig() {
  try {
    const config = await prisma.formConfig.findUnique({ where: { id: "default" } });
    if (!config) {
      return await prisma.formConfig.create({ 
        data: { 
          id: "default",
          customFields: []
        } 
      });
    }
    return config;
  } catch (error) {
    console.error("Failed to fetch FormConfig:", error);
    return null;
  }
}

export async function updateFormConfig(data: any) {
  try {
    await prisma.formConfig.update({
      where: { id: "default" },
      data: {
        isOpen: data.isOpen,
        requireResume: data.requireResume,
        requirePortfolio: data.requirePortfolio,
        customFields: data.customFields,
      }
    });
    
    revalidatePath("/admin/settings");
    revalidatePath("/join");
    return { success: true };
  } catch (error) {
    console.error("Failed to update FormConfig:", error);
    return { success: false, error };
  }
}

// ==========================================
// EVENTS
// ==========================================

export async function getEvents() {
  try {
    return await prisma.event.findMany({
      orderBy: { date: 'desc' }
    });
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export async function getEventById(id: string) {
  try {
    return await prisma.event.findUnique({
      where: { id }
    });
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return null;
  }
}

async function uploadToSupabase(file: File): Promise<string | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error("Missing Supabase configuration");
    return null;
  }

  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, '')}`;
  const uploadUrl = `${url}/storage/v1/object/events/${fileName}`;

  const res = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apiKey: serviceKey,
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Supabase Upload Error:", errorText);
    throw new Error(`Upload failed: ${res.statusText}`);
  }

  return `${url}/storage/v1/object/public/events/${fileName}`;
}

export async function createEvent(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const fee = formData.get("fee") as string;
    const isPinned = formData.get("isPinned") === "true";
    const buttonsStr = formData.get("buttons") as string;
    const buttons = buttonsStr ? JSON.parse(buttonsStr) : [];
    
    let coverImage = formData.get("coverImage") as string || "";
    const file = formData.get("coverImageFile") as File | null;
    
    if (file && file.size > 0) {
      const uploadedUrl = await uploadToSupabase(file);
      if (uploadedUrl) coverImage = uploadedUrl;
    }

    const galleryFiles = formData.getAll("galleryFiles") as File[];
    const galleryUrls: string[] = [];
    for (const f of galleryFiles) {
      if (f.size > 0) {
        const url = await uploadToSupabase(f);
        if (url) galleryUrls.push(url);
      }
    }

    const event = await prisma.event.create({
      data: {
        title,
        date: new Date(date),
        location,
        description,
        fee,
        coverImage,
        gallery: galleryUrls,
        buttons,
        isPinned,
      }
    });
    revalidatePath("/admin/events");
    return { success: true, event };
  } catch (error: any) {
    console.error("Failed to create event:", error);
    return { success: false, error: error.message };
  }
}

export async function updateEvent(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const fee = formData.get("fee") as string;
    const isPinned = formData.get("isPinned") === "true";
    const buttonsStr = formData.get("buttons") as string;
    const buttons = buttonsStr ? JSON.parse(buttonsStr) : [];
    
    let coverImage = formData.get("coverImage") as string || "";
    const file = formData.get("coverImageFile") as File | null;
    
    if (file && file.size > 0) {
      const uploadedUrl = await uploadToSupabase(file);
      if (uploadedUrl) coverImage = uploadedUrl;
    }

    const existingGalleryStr = formData.get("existingGallery") as string;
    const existingGallery = existingGalleryStr ? JSON.parse(existingGalleryStr) : [];
    
    const galleryFiles = formData.getAll("galleryFiles") as File[];
    const galleryUrls: string[] = [...existingGallery];
    for (const f of galleryFiles) {
      if (f.size > 0) {
        const url = await uploadToSupabase(f);
        if (url) galleryUrls.push(url);
      }
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        title,
        date: new Date(date),
        location,
        description,
        fee,
        coverImage,
        gallery: galleryUrls,
        buttons,
        isPinned,
      }
    });
    revalidatePath("/admin/events");
    return { success: true, event };
  } catch (error: any) {
    console.error("Failed to update event:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({ where: { id } });
    revalidatePath("/admin/events");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete event:", error);
    return { success: false, error };
  }
}

// ==========================================
// APPLICATIONS
// ==========================================

export async function getApplications() {
  try {
    return await prisma.application.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return [];
  }
}

export async function updateApplicationStatus(id: string, status: 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED') {
  try {
    await prisma.application.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/admin/applications");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update application status:", error);
    return { success: false, error };
  }
}

// ==========================================
// PROJECTS
// ==========================================

export async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function getProjectById(id: string) {
  try {
    return await prisma.project.findUnique({
      where: { id }
    });
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
}

export async function createProject(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const fullDescription = formData.get("fullDescription") as string;
    const status = formData.get("status") as string;
    const teamSize = formData.get("teamSize") as string;
    const timeline = formData.get("timeline") as string;
    const iconName = formData.get("iconName") as string;
    const isPinned = formData.get("isPinned") === "true";
    
    let image = formData.get("image") as string || "";
    const file = formData.get("imageFile") as File | null;
    
    if (file && file.size > 0) {
      const uploadedUrl = await uploadToSupabase(file);
      if (uploadedUrl) image = uploadedUrl;
    }

    const galleryFiles = formData.getAll("galleryFiles") as File[];
    const galleryUrls: string[] = [];
    for (const f of galleryFiles) {
      if (f.size > 0) {
        const url = await uploadToSupabase(f);
        if (url) galleryUrls.push(url);
      }
    }

    const project = await prisma.project.create({
      data: {
        title,
        category,
        description,
        fullDescription,
        status,
        teamSize,
        timeline,
        iconName,
        image,
        gallery: galleryUrls,
        isPinned,
      }
    });
    revalidatePath("/admin/projects");
    return { success: true, project };
  } catch (error: any) {
    console.error("Failed to create project:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const fullDescription = formData.get("fullDescription") as string;
    const status = formData.get("status") as string;
    const teamSize = formData.get("teamSize") as string;
    const timeline = formData.get("timeline") as string;
    const iconName = formData.get("iconName") as string;
    const isPinned = formData.get("isPinned") === "true";
    
    let image = formData.get("image") as string || "";
    const file = formData.get("imageFile") as File | null;
    
    if (file && file.size > 0) {
      const uploadedUrl = await uploadToSupabase(file);
      if (uploadedUrl) image = uploadedUrl;
    }

    const existingGalleryStr = formData.get("existingGallery") as string;
    const existingGallery = existingGalleryStr ? JSON.parse(existingGalleryStr) : [];
    
    const galleryFiles = formData.getAll("galleryFiles") as File[];
    const galleryUrls: string[] = [...existingGallery];
    for (const f of galleryFiles) {
      if (f.size > 0) {
        const url = await uploadToSupabase(f);
        if (url) galleryUrls.push(url);
      }
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        category,
        description,
        fullDescription,
        status,
        teamSize,
        timeline,
        iconName,
        image,
        gallery: galleryUrls,
        isPinned,
      }
    });
    revalidatePath("/admin/projects");
    return { success: true, project };
  } catch (error: any) {
    console.error("Failed to update project:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error };
  }
}
