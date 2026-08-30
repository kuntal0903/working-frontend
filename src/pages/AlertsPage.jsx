import { useState } from 'react';
import { Bell, Plus, Filter, Search, Play, Trash2, CheckCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const INITIAL_RULES = [
  { id: 'r1', name: 'Critical CVE Auto-Alert', condition: 'severity == "CRITICAL"', channel: '#sec-ops-alerts', status: 'ACTIVE', lastTriggered: '12m ago' },
  { id: 'r2', name: 'Unauthenticated DB Exposure', condition: 'port IN (5432, 3306) AND status == "EXPOSED"', channel: 'PagerDuty', status: 'ACTIVE', lastTriggered: '2h ago' },
  { id: 'r3', name: 'SSL Expiry Warning (<30 Days)', condition: 'ssl.daysRemaining < 30', channel: 'Email Digest', status: 'ACTIVE', lastTriggered: '1d ago' },
  { id: 'r4', name: 'Subdomain Takeover Indicator', condition: 'dns.status == "DANGLING_CNAME"', channel: '#threat-intel', status: 'PAUSED', lastTriggered: '4d ago' },
];

export default function AlertsPage({ onOpenModal }) {
  const { addToast } = useToast();
  const [rules, setRules] = useState(INITIAL_RULES);

  const handleToggleRule = (rId) => {
    setRules(prev => prev.map(r => r.id === rId ? { ...r, status: r.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : r));
    addToast('Alert rule status toggled', 'info');
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header__left">
          <h1 className="page-header__title">Alert Rules & <span>Triggers</span></h1>
          <p className="page-header__subtitle">Manage automated notification policies and SIEM routing rules.</p>
        </div>
        <button className="btn btn--primary" onClick={() => onOpenModal('alert', rules[0])}>
          <Plus size={16} /> Create Alert Rule
        </button>
      </div>

      <div className="dash-card">
        <table className="domain-data-table">
          <thead>
            <tr>
              <th>Rule Name</th>
              <th>Trigger Condition</th>
              <th>Notification Channel</th>
              <th>Last Fired</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((r) => (
              <tr key={r.id} style={{ cursor: 'pointer' }} onClick={() => onOpenModal('alert', r)}>
                <td style={{ fontWeight: 600, color: 'var(--neon-blue)' }}>{r.name}</td>
                <td className="mono-cell" style={{ fontSize: 12 }}>{r.condition}</td>
                <td style={{ fontWeight: 500 }}>{r.channel}</td>
                <td className="mono-cell" style={{ color: 'var(--text-muted)' }}>{r.lastTriggered}</td>
                <td><span className={`status-badge ${r.status.toLowerCase()}`}>{r.status}</span></td>
                <td>
                  <button className="btn btn--outline" onClick={(e) => { e.stopPropagation(); handleToggleRule(r.id); }} style={{ fontSize: 11, padding: '2px 8px' }}>
                    {r.status === 'ACTIVE' ? 'Pause' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
