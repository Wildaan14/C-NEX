// pages/ReportsPage.tsx
import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Calendar, Filter, Eye, Trash2 } from "lucide-react";

const reports = [
  { id: "1", name: "Laporan Emisi Q4 2024", type: "Emisi", date: "2024-12-01", size: "2.4 MB", status: "completed" },
  { id: "2", name: "Sertifikat Kredit Karbon VCS", type: "Sertifikat", date: "2024-11-28", size: "1.1 MB", status: "completed" },
  { id: "3", name: "Laporan ESG Tahunan 2024", type: "ESG", date: "2024-11-15", size: "5.8 MB", status: "completed" },
  { id: "4", name: "Audit MRV November 2024", type: "MRV", date: "2024-11-10", size: "3.2 MB", status: "completed" },
  { id: "5", name: "Laporan Emisi Q3 2024", type: "Emisi", date: "2024-10-01", size: "2.1 MB", status: "completed" },
];

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Laporan</h1>
          <p className="text-muted-foreground">Kelola dan unduh laporan karbon Anda</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Buat Laporan Baru
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Nama Laporan</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Tipe</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Tanggal</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Ukuran</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-muted rounded-lg text-sm text-muted-foreground">{report.type}</span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{report.date}</td>
                  <td className="px-6 py-4 text-muted-foreground">{report.size}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-primary/10 transition-colors">
                        <Download className="w-4 h-4 text-primary" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
