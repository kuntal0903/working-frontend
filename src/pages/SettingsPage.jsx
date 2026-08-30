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
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [displayName, setDisplayName] = useState('Alex Dawson');
  const [email, setEmail] = useState('alex.dawson@corp.internal');
  const [keys, setKeys] = useState(INITIAL_KEYS);

  const showToast = (msg) => addToast(msg, 'success');

  return (
    <div className="page-content settings-container">
      <div className="page-header">
        <div className="page-header__left">
          <h1 className="page-header__title">System <span>Settings</span></h1>
          <p className="page-header__subtitle">Configure workspace security controls, API access keys, integrations, and user permissions.</p>
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
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className="clickable-row"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: isActive ? 'var(--neon-blue)' : 'transparent',
                        color: isActive ? '#030712' : 'var(--text-secondary)',
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

        <div className="settings-card" style={{ padding: 24 }}>
          {activeTab === 'profile' && (
            <div>
              <h3>Profile Settings</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 16 }}>Personal display details</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Display Name</label>
                  <input className="domain-input" value={displayName} onChange={e => setDisplayName(e.target.value)} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Email Address</label>
                  <input className="domain-input" type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%' }} />
                </div>
                <button className="btn btn--primary" style={{ marginTop: 12, width: 'fit-content' }} onClick={() => showToast('Profile changes saved')}>Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'api-keys' && (
            <div>
              <h3>API Keys</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 16 }}>Programmatic access keys</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {keys.map(k => (
                  <div key={k.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg-base)' }}>
                    <div>
                      <strong style={{ fontSize: 13 }}>{k.name}</strong>
                      <div className="mono-cell" style={{ fontSize: 12, color: 'var(--neon-blue)', marginTop: 2 }}>{k.value}</div>
                    </div>
                    <button className="btn btn--outline" style={{ fontSize: 11 }} onClick={() => showToast(`Copied ${k.name}`)}>Copy Key</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== 'profile' && activeTab !== 'api-keys' && (
            <div>
              <h3>{activeTab.toUpperCase()} Configuration</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: 8, fontSize: 13 }}>Workspace configuration for {activeTab} is active.</p>
              <button className="btn btn--primary" style={{ marginTop: 16 }} onClick={() => showToast(`Saved ${activeTab} preferences`)}>Save Configuration</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
