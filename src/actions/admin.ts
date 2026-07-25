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
