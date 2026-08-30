import { X, Globe, Shield, Activity, Lock, Terminal, Server } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function AssetModal({ asset, onClose }) {
  const { addToast } = useToast();
  if (!asset) return null;

  const handleScanAsset = () => {
    addToast(`Launched port & SSL scan on ${asset.name || asset.ip}`, 'info');
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.75)', backdropFilter: 'blur(6px)', zIndex: 300 }} />
      <div role="dialog" aria-label={`Asset Details - ${asset.name || asset.ip}`} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '92%', maxWidth: '520px', background: 'var(--bg-surface)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-lg)', zIndex: 301, padding: 24, boxShadow: 'var(--glow-cyan)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--neon-cyan)' }}>
            <Globe size={18} /> {asset.name || asset.ip || 'Asset Overview'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={18} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
          <div>IP Address / Endpoint: <span className="mono-cell" style={{ color: 'var(--neon-blue)', background: 'var(--bg-raised)', padding: '2px 6px', borderRadius: 4 }}>{asset.ip || '104.21.44.180'}</span></div>
          <div>Asset Type: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{asset.type || 'Subdomain / Cloud API'}</span></div>
          <div>Environment: <span className="mono-cell">{asset.environment || 'Production (AWS us-east-1)'}</span></div>
          <div>Risk Grade: <span className="status-badge safe">{asset.riskGrade || 'A- (88/100)'}</span></div>
          <div>Detected Ports: <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>{['80', '443', '8080'].map(p => <span key={p} className="port-tag">:{p}</span>)}</div></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
          <button className="btn btn--ghost" onClick={onClose}>Close</button>
          <button className="btn btn--primary" onClick={handleScanAsset} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Terminal size={14} /> Initiate Asset Scan
          </button>
        </div>
      </div>
    </>
  );
}
