import { X, Bell, AlertTriangle, ShieldAlert, Check, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const NOTIFICATIONS = [
  { id: 'n1', title: 'New Critical CVE-2024-3094 Detected', desc: 'SSH liblzma backdoor signature matched on api-prod-01', time: '10m ago', type: 'critical' },
  { id: 'n2', title: 'Domain Recon Complete', desc: '104 subdomains discovered for acme-corp.com', time: '1h ago', type: 'info' },
  { id: 'n3', title: 'Exposed Database Warning', desc: 'Port 5432 exposed to 0.0.0.0/0 on dev-db.internal', time: '3h ago', type: 'warning' },
];

export default function NotificationsPanel({ isOpen, onClose, onNavigate, onOpenModal }) {
  const { addToast } = useToast();

  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    addToast('Marked all notifications as read', 'success');
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.5)', zIndex: 299 }} />
      <div className="notifications-panel" style={{ position: 'fixed', top: 60, right: 20, width: 360, background: 'var(--bg-surface)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-md)', zIndex: 300, padding: 16, boxShadow: 'var(--glow-cyan)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Bell size={16} color="var(--neon-blue)" /> Security Alerts & Digest
          </h4>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 320, overflowY: 'auto' }}>
          {NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className="clickable-row"
              onClick={() => {
                onClose();
                onOpenModal('threat', { title: n.title, description: n.desc });
              }}
              style={{ padding: 10, borderRadius: 6, background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: n.type === 'critical' ? 'var(--critical)' : 'var(--text-primary)' }}>{n.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{n.desc}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{n.time}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, paddingTop: 8, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <button className="btn btn--ghost" onClick={handleMarkAllRead} style={{ fontSize: 11, padding: '4px 10px' }}>
            Mark All as Read
          </button>
        </div>
      </div>
    </>
  );
}
