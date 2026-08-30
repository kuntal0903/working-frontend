import { useState, useCallback, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useToast } from '../context/ToastContext';
import {
  User, Shield, Key, Plug, Calendar, Bell, Palette,
  Users, AlertTriangle, Check, Copy, RefreshCw, Plus,
  Trash2, Eye, EyeOff, Mail, MessageSquare, Link2, Globe,
  ChevronRight, LogOut, Download, Cpu, X, CheckCircle,
} from 'lucide-react';

import '../styles/settings.css';

const NAV_SECTIONS = [
  { group: 'ACCOUNT',  items: [
    { id: 'profile',      label: 'Profile',       icon: User },
    { id: 'security',     label: 'Security',      icon: Shield },
    { id: 'api-keys',     label: 'API Keys',      icon: Key },
  ]},
  { group: 'PLATFORM', items: [
    { id: 'integrations', label: 'Integrations',  icon: Plug },
    { id: 'scan',         label: 'Scan Schedule', icon: Calendar },
    { id: 'notifications',label: 'Notifications', icon: Bell },
  ]},
  { group: 'SYSTEM',   items: [
    { id: 'appearance',   label: 'Appearance',    icon: Palette },
    { id: 'team',         label: 'Team',          icon: Users },
    { id: 'danger',       label: 'Danger Zone',   icon: AlertTriangle },
  ]},
];

const INITIAL_KEYS = [
  { id: 'k1', name: 'Production API Key',    value: 'asm_sk_prod_a8f2c9d1e4b7x9z',  created: '2024-06-01', lastUsed: '2m ago',  scopes: ['read', 'write', 'export'] },
  { id: 'k2', name: 'CI/CD Integration Key', value: 'asm_sk_ci_3e6f1a8b5c9d2w4', created: '2024-05-12', lastUsed: '1h ago',  scopes: ['read'] },
  { id: 'k3', name: 'SIEM Connector Key',    value: 'asm_sk_siem_7b4e2f9c1d8a6q8', created: '2024-04-30', lastUsed: '4d ago',  scopes: ['read', 'stream'] },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { addToast } = useToast();
  const [activeSection, setActiveSection] = useState('profile');

  const handleSaveSettings = () => {
    addToast('System preferences updated successfully', 'success');
  };

  return (
    <div className="page-content settings-container">
      <div className="page-header">
        <div className="page-header__left">
          <h1 className="page-header__title">
            System <span>Settings</span>
          </h1>
          <p className="page-header__subtitle">
            Configure workspace security controls, API access keys, integrations, and user permissions.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24 }}>
        <div className="settings-card" style={{ padding: 16 }}>
          {NAV_SECTIONS.map((sec) => (
            <div key={sec.group} style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: 1, marginBottom: 8, paddingLeft: 8 }}>
                {sec.group}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className="clickable-row"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: isActive ? 'var(--accent-glow)' : 'transparent',
                        color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        fontSize: 13,
                        fontWeight: 600,
                        width: '100%',
                        textAlign: 'left'
                      }}
                    >
                      <Icon size={16} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="settings-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, textTransform: 'capitalize' }}>{activeSection} Configuration</h3>
            <button className="btn btn--primary" onClick={handleSaveSettings}>Save Configuration</button>
          </div>

          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <p>System configuration panel for <strong>{activeSection}</strong> is active.</p>
            <p style={{ marginTop: 8 }}>All changes take effect immediately across all connected API endpoints and team members.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
