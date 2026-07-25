"use server";

import prisma from "@/lib/prisma";

export async function submitApplication(data: any) {
  try {
    const config = await prisma.formConfig.findUnique({ where: { id: "default" } });
    if (!config || !config.isOpen) {
      return { success: false, error: "Recruitment is currently closed." };
    }

    // data contains name, email, phone, resumeUrl, portfolioUrl, and everything else goes to customAnswers
    const { name, email, phone, resumeUrl, portfolioUrl, ...customAnswers } = data;

    if (!name || !email || !phone) {
      return { success: false, error: "Name, email, and phone number are required." };
    }

    if (config.requirePortfolio && !portfolioUrl) {
      return { success: false, error: "Portfolio URL is required." };
    }

    const application = await prisma.application.create({
      data: {
        name,
        email,
        phone,
        resumeUrl: resumeUrl || null,
        portfolio: portfolioUrl || null,
        customAnswers,
        status: "PENDING"
      }
    });

    return { success: true, application };
  } catch (error: any) {
    console.error("Failed to submit application:", error);
    return { success: false, error: error.message || "Failed to submit application" };
  }
}
