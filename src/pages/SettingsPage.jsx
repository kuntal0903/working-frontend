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

const INITIAL_INTEGRATIONS = [
  { id: 'splunk',      name: 'Splunk SIEM',      emoji: '🔍', desc: 'Stream events and findings to Splunk Enterprise or Cloud.',        status: 'connected', url: 'https://splunk.corp.internal:8088' },
  { id: 'jira',        name: 'Jira',             emoji: '🎯', desc: 'Auto-create tickets for new critical vulnerabilities.',            status: 'connected', url: 'https://jira.corp.internal' },
  { id: 'pagerduty',   name: 'PagerDuty',        emoji: '📟', desc: 'Trigger on-call alerts when critical findings are detected.',      status: 'warning',   url: 'https://events.pagerduty.com/v2/enqueue' },
  { id: 'slack',       name: 'Slack',            emoji: '💬', desc: 'Post real-time alerts and digest summaries to channels.',          status: 'connected', url: 'https://hooks.slack.com/services/T00/B00/X00' },
  { id: 'aws',         name: 'AWS Security Hub', emoji: '☁️', desc: 'Sync findings with AWS Security Hub for unified visibility.',     status: 'disconnected', url: '' },
  { id: 'crowdstrike', name: 'CrowdStrike',      emoji: '🦅', desc: 'Pull endpoint telemetry and host vulnerability data.',            status: 'disconnected', url: '' },
  { id: 'servicenow',  name: 'ServiceNow',       emoji: '🔧', desc: 'Create and update ITSM incidents via the Now Platform.',          status: 'disconnected', url: '' },
  { id: 'tenable',     name: 'Tenable.io',       emoji: '🔬', desc: 'Import Nessus scan results and asset data automatically.',       status: 'connected', url: 'https://cloud.tenable.com' },
  { id: 'teams',       name: 'Microsoft Teams',  emoji: '🟦', desc: 'Send alert digests and approval requests to Teams channels.',     status: 'disconnected', url: '' },
];

const INITIAL_TEAM = [
  { id: 'u1', initials: 'AD', name: 'Alex Dawson',   email: 'alex.dawson@corp.internal',    role: 'admin',    status: 'active', joined: '2024-01-15', color: '#8b5cf6' },
  { id: 'u2', initials: 'PK', name: 'Priya Kumar',   email: 'priya.kumar@corp.internal',   role: 'analyst',  status: 'active', joined: '2024-02-10', color: '#3b82f6' },
  { id: 'u3', initials: 'JL', name: 'James Lin',     email: 'james.lin@corp.internal',     role: 'analyst',  status: 'active', joined: '2024-03-22', color: '#06b6d4' },
  { id: 'u4', initials: 'SR', name: 'Sofia Reyes',   email: 'sofia.reyes@corp.internal',   role: 'readonly', status: 'active', joined: '2024-05-01', color: '#f97316' },
  { id: 'u5', initials: 'MB', name: 'Marcus Brown',  email: 'marcus.brown@corp.internal',  role: 'viewer',   status: 'pending', joined: '2024-08-01', color: '#eab308' },
];

function ProfileSection({ showToast }) {
  const initialForm = {
    displayName: 'Alex Dawson',
    email: 'alex.dawson@corp.internal',
    role: 'Security Engineer',
    bio: 'Lead security engineer managing the enterprise attack surface monitoring programme.',
    timezone: 'Asia/Kolkata',
  };
  const [form, setForm] = useState(initialForm);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    showToast('Profile updated successfully');
  };

  const handleReset = () => {
    setForm(initialForm);
    showToast('Profile changes reset');
  };

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        showToast(`Photo "${e.target.files[0].name}" uploaded`);
      }
    };
    input.click();
  };

  return (
    <div className="settings-section" id="settings-profile">
      <div className="settings-section__header">
        <div className="settings-section__icon" style={{ background: 'rgba(139,92,246,0.12)', color: 'var(--accent-purple)' }}>
          <User size={16} />
        </div>
        <div className="settings-section__titles">
          <h3>Profile</h3>
          <p>Manage your personal account details and display preferences</p>
        </div>
      </div>

      <div className="settings-section__body">
        <div className="profile-avatar-section">
          <div className="profile-avatar-large">AD</div>
          <div className="profile-avatar-info">
            <h4>{form.displayName}</h4>
            <p>Profile photo is auto-generated from your initials</p>
            <button className="btn btn--ghost" style={{ fontSize: 12, padding: '6px 14px' }} onClick={handlePhotoUpload}>
              Upload Photo
            </button>
          </div>
        </div>

        <div className="field-row">
          <div className="field-label">Display Name<span>Shown across the dashboard</span></div>
          <input id="settings-display-name" className="s-input" value={form.displayName}
            onChange={e => update('displayName', e.target.value)} />
        </div>

        <div className="field-row">
          <div className="field-label">Email Address<span>Used for login and notifications</span></div>
          <input id="settings-email" className="s-input" type="email" value={form.email}
            onChange={e => update('email', e.target.value)} />
        </div>

        <div className="field-row">
          <div className="field-label">Job Title<span>Displayed on team roster</span></div>
          <input id="settings-role" className="s-input" value={form.role}
            onChange={e => update('role', e.target.value)} />
        </div>

        <div className="field-row">
          <div className="field-label">Bio<span>Short description (optional)</span></div>
          <textarea id="settings-bio" className="s-textarea" value={form.bio}
            onChange={e => update('bio', e.target.value)} />
        </div>

        <div className="field-row">
          <div className="field-label">Timezone<span>Used for all timestamps</span></div>
          <select id="settings-timezone" className="s-select" value={form.timezone}
            onChange={e => update('timezone', e.target.value)}>
            {['Asia/Kolkata','UTC','America/New_York','America/Los_Angeles','Europe/London','Europe/Paris','Asia/Tokyo','Australia/Sydney'].map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>

        <div className="settings-footer">
          <button className="btn btn--ghost" onClick={handleReset}>Reset</button>
          <button className="btn btn--primary" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function SecuritySection({ showToast }) {
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [showOldPwd, setShowOldPwd]  = useState(false);
  const [showNewPwd, setShowNewPwd]  = useState(false);
  const [mfa,        setMfa]         = useState(true);
  const [ssoEnabled, setSsoEnabled]  = useState(false);
  const [ipLock,     setIpLock]      = useState(false);
  const [auditLog,   setAuditLog]    = useState(true);
  const [timeoutVal, setTimeoutVal]  = useState('30 minutes');

  const handleSaveSecurity = () => {
    if (newPwd && newPwd.length < 12) {
      showToast('Error: New password must be at least 12 characters');
      return;
    }
    setOldPwd('');
    setNewPwd('');
    showToast('Security policy and credentials updated');
  };

  const handleRevokeSessions = () => {
    showToast('All active user sessions revoked across 3 devices');
  };

  return (
    <div className="settings-section" id="settings-security">
      <div className="settings-section__header">
        <div className="settings-section__icon" style={{ background: 'rgba(59,130,246,0.12)', color: 'var(--accent-blue)' }}>
          <Shield size={16} />
        </div>
        <div className="settings-section__titles">
          <h3>Security</h3>
          <p>Password, multi-factor authentication, and session controls</p>
        </div>
      </div>

      <div className="settings-section__body">
        <div className="field-row">
          <div className="field-label">Current Password</div>
          <div style={{ position: 'relative' }}>
            <input
              id="settings-old-password"
              className="s-input"
              type={showOldPwd ? 'text' : 'password'}
              placeholder="Enter current password"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              style={{ paddingRight: 40 }}
            />
            <button onClick={() => setShowOldPwd(v => !v)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              {showOldPwd ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <div className="field-row">
          <div className="field-label">New Password<span>Min 12 chars, mixed case + symbol</span></div>
          <div style={{ position: 'relative' }}>
            <input
              id="settings-new-password"
              className="s-input"
              type={showNewPwd ? 'text' : 'password'}
              placeholder="Enter new password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              style={{ paddingRight: 40 }}
            />
            <button onClick={() => setShowNewPwd(v => !v)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              {showNewPwd ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <div className="settings-divider" />

        <label className="toggle-row" htmlFor="toggle-mfa">
          <div className="toggle-row__info">
            <div className="toggle-row__label">Multi-Factor Authentication (TOTP)</div>
            <div className="toggle-row__desc">Require a one-time code in addition to your password</div>
          </div>
          <label className="toggle">
            <input id="toggle-mfa" type="checkbox" checked={mfa} onChange={e => { setMfa(e.target.checked); showToast(`MFA ${e.target.checked ? 'enabled' : 'disabled'}`); }} />
            <div className="toggle__track" />
            <div className="toggle__thumb" />
          </label>
        </label>

        <label className="toggle-row" htmlFor="toggle-sso">
          <div className="toggle-row__info">
            <div className="toggle-row__label">Single Sign-On (SAML / OIDC)</div>
            <div className="toggle-row__desc">Authenticate via your corporate identity provider</div>
          </div>
          <label className="toggle">
            <input id="toggle-sso" type="checkbox" checked={ssoEnabled} onChange={e => { setSsoEnabled(e.target.checked); showToast(`SSO ${e.target.checked ? 'enabled' : 'disabled'}`); }} />
            <div className="toggle__track" />
            <div className="toggle__thumb" />
          </label>
        </label>

        <div className="settings-footer">
          <button className="btn btn--outline" onClick={handleRevokeSessions}>Revoke All Sessions</button>
          <button className="btn btn--primary" onClick={handleSaveSecurity}>Save Security Policy</button>
        </div>
      </div>
    </div>
  );
}

function ApiKeysSection({ keys, setKeys, showToast }) {
  const [showModal, setShowModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  const handleCreateKey = (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const newK = {
      id: `k${Date.now()}`,
      name: newKeyName,
      value: `asm_sk_live_${Math.random().toString(36).substring(2, 18)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      scopes: ['read', 'write']
    };
    setKeys([newK, ...keys]);
    setNewKeyName('');
    setShowModal(false);
    showToast(`Created API Key "${newK.name}"`);
  };

  const handleRevoke = (id, name) => {
    setKeys(keys.filter(k => k.id !== id));
    showToast(`Revoked API Key "${name}"`);
  };

  return (
    <div className="settings-section" id="settings-api-keys">
      <div className="settings-section__header">
        <div className="settings-section__icon" style={{ background: 'rgba(234,179,8,0.12)', color: 'var(--medium)' }}>
          <Key size={16} />
        </div>
        <div className="settings-section__titles">
          <h3>API Keys</h3>
          <p>Manage programmatic access keys for SIEM and CI/CD integrations</p>
        </div>
        <button className="btn btn--primary" style={{ marginLeft: 'auto', fontSize: 12, padding: '6px 14px' }} onClick={() => setShowModal(true)}>
          <Plus size={14} /> Generate New Key
        </button>
      </div>

      <div className="settings-section__body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {keys.map((k) => (
            <div key={k.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10 }}>
              <div>
                <strong style={{ fontSize: 14, color: 'var(--text-primary)' }}>{k.name}</strong>
                <div className="mono-cell" style={{ fontSize: 12, color: 'var(--neon-blue)', marginTop: 2 }}>{k.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Created {k.created} · Last used {k.lastUsed}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn--ghost" style={{ fontSize: 12, padding: '4px 10px' }} onClick={() => { navigator.clipboard.writeText(k.value); showToast('Copied API Key to clipboard'); }}>
                  <Copy size={12} /> Copy
                </button>
                <button className="btn btn--outline" style={{ fontSize: 12, padding: '4px 10px', color: 'var(--critical)', borderColor: 'rgba(239,68,68,0.3)' }} onClick={() => handleRevoke(k.id, k.name)}>
                  <Trash2 size={12} /> Revoke
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.75)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-hover)', borderRadius: 12, padding: 24, width: 400 }} onClick={e => e.stopPropagation()}>
            <h4 style={{ marginBottom: 12 }}>Generate New Secret Key</h4>
            <form onSubmit={handleCreateKey}>
              <input className="s-input" placeholder="Key name (e.g. Jenkins Builder)" value={newKeyName} onChange={e => setNewKeyName(e.target.value)} required style={{ width: '100%', marginBottom: 16 }} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button type="button" className="btn btn--ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn--primary">Generate Key</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SettingsPage() {
  const { addToast } = useToast();
  const [activeSection, setActiveSection] = useState('profile');
  const [keys, setKeys] = useState(INITIAL_KEYS);

  const showToast = useCallback((msg) => {
    addToast(msg, 'info');
  }, [addToast]);

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(`settings-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header__left">
          <h1 className="page-header__title">
            Platform <span>Settings</span>
          </h1>
          <div className="page-header__subtitle">
            Manage account, security, integrations, and system preferences
          </div>
        </div>
      </div>

      <div className="settings-layout" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24 }}>
        <nav className="settings-nav" style={{ background: 'var(--bg-card)', padding: 16, borderRadius: 12, border: '1px solid var(--border)' }}>
          {NAV_SECTIONS.map(group => (
            <div key={group.group} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: 1, marginBottom: 8, paddingLeft: 8 }}>
                {group.group}
              </div>
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    className="clickable-row"
                    onClick={() => scrollTo(item.id)}
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
                      textAlign: 'left',
                      marginBottom: 4
                    }}
                  >
                    <Icon size={15} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="settings-content" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <ProfileSection showToast={showToast} />
          <SecuritySection showToast={showToast} />
          <ApiKeysSection keys={keys} setKeys={setKeys} showToast={showToast} />
        </div>
      </div>
    </div>
  );
}
