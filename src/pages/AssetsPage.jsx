import { useState } from 'react';
import { Globe, Search, Filter, Terminal, ShieldCheck, Download, Radio } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const MOCK_ASSETS = [
  { id: 'a1', name: 'api.acme-corp.com', ip: '104.21.44.181', type: 'REST API', env: 'Production', riskGrade: 'A', score: 94, status: 'Active' },
  { id: 'a2', name: 'app.acme-corp.com', ip: '104.21.44.182', type: 'Web App', env: 'Production', riskGrade: 'A-', score: 88, status: 'Active' },
  { id: 'a3', name: 'staging.acme-corp.com', ip: '104.21.44.199', type: 'Staging Server', env: 'Staging', riskGrade: 'C', score: 62, status: 'Warning' },
  { id: 'a4', name: 'dev-db.internal.acme-corp.com', ip: '192.168.1.104', type: 'PostgreSQL DB', env: 'Internal', riskGrade: 'F', score: 24, status: 'Critical' },
  { id: 'a5', name: 'vpn.acme-corp.com', ip: '198.51.100.45', type: 'OpenVPN Endpoint', env: 'Production', riskGrade: 'B', score: 78, status: 'Active' },
];

export default function AssetsPage({ onOpenModal }) {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');

  const filtered = MOCK_ASSETS.filter(a => a.name.includes(search) || a.ip.includes(search) || a.type.includes(search));

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header__left">
          <h1 className="page-header__title">Asset <span>Inventory</span></h1>
          <p className="page-header__subtitle">Comprehensive discovery of all public-facing and internal attack surface endpoints.</p>
        </div>
      </div>

      <div className="dash-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div className="table-search-box">
            <Search size={14} color="var(--text-muted)" />
            <input placeholder="Search assets..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Total: <strong>{filtered.length}</strong> Assets</div>
        </div>

        <table className="domain-data-table">
          <thead>
            <tr>
              <th>Asset Endpoint</th>
              <th>IP Address</th>
              <th>Type</th>
              <th>Environment</th>
              <th>Risk Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} style={{ cursor: 'pointer' }} onClick={() => onOpenModal('asset', a)}>
                <td className="mono-cell" style={{ fontWeight: 600, color: 'var(--neon-blue)' }}>{a.name}</td>
                <td className="mono-cell">{a.ip}</td>
                <td>{a.type}</td>
                <td><span className="mono-cell" style={{ fontSize: 11 }}>{a.env}</span></td>
                <td><span className="cvss-pill">{a.score}/100 ({a.riskGrade})</span></td>
                <td><span className={`status-badge ${a.status.toLowerCase()}`}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
