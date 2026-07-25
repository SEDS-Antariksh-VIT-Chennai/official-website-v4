"use client";

import { Download } from "lucide-react";

export default function ExportButtons({ applications }: { applications: any[] }) {
  const downloadCSV = (departmentFilter?: string) => {
    // 1. Filter applications
    const filteredApps = departmentFilter 
      ? applications.filter(app => {
          if (!app.customAnswers) return false;
          const pref1 = app.customAnswers['pref1'] || app.customAnswers['Department Preference 1'];
          const pref2 = app.customAnswers['pref2'] || app.customAnswers['Department Preference 2'];
          return pref1 === departmentFilter || pref2 === departmentFilter;
        })
      : applications;

    if (filteredApps.length === 0) {
      alert("No applications found for this filter.");
      return;
    }

    // 2. Gather all unique headers
    const baseHeaders = ["Name", "Email", "Phone", "Date", "Status", "Resume", "Portfolio"];
    const customKeys = new Set<string>();
    filteredApps.forEach(app => {
      if (app.customAnswers) {
        Object.keys(app.customAnswers).forEach(k => customKeys.add(k));
      }
    });
    
    const allHeaders = [...baseHeaders, ...Array.from(customKeys)];
    
    // 3. Build CSV string
    const escapeCsv = (str: any) => {
      if (str === null || str === undefined) return '""';
      const s = String(str).replace(/"/g, '""');
      return `"${s}"`;
    };

    let csvContent = allHeaders.join(",") + "\n";

    filteredApps.forEach(app => {
      const row = [
        app.name,
        app.email,
        app.phone || "",
        new Date(app.createdAt).toLocaleDateString(),
        app.status,
        app.resumeUrl || "",
        app.portfolio || ""
      ];

      const customAnswersData = app.customAnswers || {};
      Array.from(customKeys).forEach(k => {
        row.push(customAnswersData[k] || "");
      });

      csvContent += row.map(escapeCsv).join(",") + "\n";
    });

    // 4. Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `applications${departmentFilter ? `_${departmentFilter}` : ''}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // We need to know what departments exist to show buttons for them
  const departments = new Set<string>();
  applications.forEach(app => {
    if (app.customAnswers) {
      const pref1 = app.customAnswers['pref1'] || app.customAnswers['Department Preference 1'];
      const pref2 = app.customAnswers['pref2'] || app.customAnswers['Department Preference 2'];
      if (pref1) departments.add(pref1);
      if (pref2) departments.add(pref2);
    }
  });

  return (
    <div className="flex flex-col items-end gap-2">
      <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Export to CSV</span>
      <div className="flex flex-wrap justify-end gap-2">
        <button 
          onClick={() => downloadCSV()}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 font-bold uppercase tracking-widest text-[10px] rounded-none hover:bg-gray-200 transition-colors"
        >
          <Download className="w-3 h-3" /> All Data
        </button>
        {Array.from(departments).map(dept => (
          <button 
            key={dept}
            onClick={() => downloadCSV(dept)}
            className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 font-bold uppercase tracking-widest text-[10px] rounded-none border border-white/20 hover:bg-white/20 transition-colors"
          >
            <Download className="w-3 h-3" /> {dept}
          </button>
        ))}
      </div>
    </div>
  );
}
