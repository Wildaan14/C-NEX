// pages/SettingsPage.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Lock, Globe, Moon, Sun, Shield, Trash2, Save } from "lucide-react";

export const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    transaction: true,
    newsletter: false,
  });
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("id");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Pengaturan</h1>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Notifikasi</h3>
            <p className="text-sm text-muted-foreground">Kelola preferensi notifikasi Anda</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { key: "email", label: "Notifikasi Email", desc: "Terima update via email" },
            { key: "push", label: "Push Notification", desc: "Notifikasi di browser" },
            { key: "transaction", label: "Transaksi", desc: "Notifikasi setiap transaksi" },
            { key: "newsletter", label: "Newsletter", desc: "Berita dan tips mingguan" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  notifications[item.key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    notifications[item.key as keyof typeof notifications] ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            {darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Tampilan</h3>
            <p className="text-sm text-muted-foreground">Sesuaikan tampilan aplikasi</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Mode Gelap</p>
              <p className="text-sm text-muted-foreground">Gunakan tema gelap</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? "left-7" : "left-1"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Bahasa</p>
                <p className="text-sm text-muted-foreground">Pilih bahasa aplikasi</p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
            >
              <option value="id">Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Keamanan</h3>
            <p className="text-sm text-muted-foreground">Kelola keamanan akun Anda</p>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Ubah Password</span>
            </div>
            <span className="text-muted-foreground">→</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Autentikasi 2 Faktor</span>
            </div>
            <span className="px-2 py-1 bg-amber-500/10 text-amber-500 rounded-lg text-xs">Nonaktif</span>
          </button>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border border-destructive/50 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-destructive/10 rounded-lg">
            <Trash2 className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Zona Bahaya</h3>
            <p className="text-sm text-muted-foreground">Tindakan permanen pada akun</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-destructive/10 text-destructive rounded-lg font-medium hover:bg-destructive/20 transition-colors">
          Hapus Akun
        </button>
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Save className="w-5 h-5" />
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
