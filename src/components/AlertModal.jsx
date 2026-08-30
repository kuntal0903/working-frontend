import { X, Bell, ShieldAlert, CheckCircle2, Sliders, Play, Trash2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function AlertModal({ alert, onClose }) {
  const { addToast } = useToast();
  if (!alert) return null;

  const handleTestRule = () => {
    addToast(`Triggered test alert simulation for "${alert.name || alert.ruleName}"`, 'info');
  };

  const handleToggleState = () => {
    addToast(`Toggled alert rule "${alert.name || alert.ruleName}" state`, 'success');
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.75)', backdropFilter: 'blur(6px)', zIndex: 300 }} />
      <div role="dialog" aria-label={`Alert Rule - ${alert.name || alert.ruleName}`} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '92%', maxWidth: '520px', background: 'var(--bg-surface)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-lg)', zIndex: 301, padding: 24, boxShadow: 'var(--glow-blue)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bell size={18} color="var(--neon-blue)" /> {alert.name || alert.ruleName || 'Alert Rule Configuration'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={18} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
          <div>Rule ID: <span className="mono-cell" style={{ color: 'var(--neon-cyan)', background: 'var(--bg-raised)', padding: '2px 6px', borderRadius: 4 }}>{alert.id || 'RULE-04'}</span></div>
          <div>Condition Query: <p style={{ marginTop: 4, fontFamily: 'monospace', color: 'var(--text-primary)', background: 'var(--bg-base)', padding: 10, borderRadius: 6, border: '1px solid var(--border)' }}>{alert.condition || 'severity == "CRITICAL" && asset.environment == "production"'}</p></div>
          <div>Notification Target: <span className="mono-cell" style={{ color: 'var(--neon-blue)' }}>{alert.channel || '#sec-ops-alerts (Slack)'}</span></div>
          <div>Status: <span className={`status-badge ${(alert.status || 'ACTIVE').toLowerCase()}`}>{alert.status || 'ACTIVE'}</span></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginTop: 24, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
          <button className="btn btn--outline" onClick={handleTestRule} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Play size={14} /> Test Simulation
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn--ghost" onClick={onClose}>Close</button>
            <button className="btn btn--primary" onClick={handleToggleState}>
              Toggle Rule
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
