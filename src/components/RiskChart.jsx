import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Activity, ShieldAlert, Lock, Filter } from 'lucide-react';

const MOCK_TIME_SERIES_DATA = [
  { date: 'Aug 01', critical: 12, high: 24, medium: 45, safe: 88 },
  { date: 'Aug 05', critical: 10, high: 22, medium: 40, safe: 92 },
  { date: 'Aug 10', critical: 15, high: 28, medium: 48, safe: 85 },
  { date: 'Aug 15', critical: 8,  high: 19, medium: 35, safe: 98 },
  { date: 'Aug 20', critical: 11, high: 21, medium: 38, safe: 95 },
  { date: 'Aug 25', critical: 7,  high: 16, medium: 30, safe: 104 },
  { date: 'Aug 30', critical: 5,  high: 14, medium: 28, safe: 110 },
];

export default function RiskChart() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="dash-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="dash-card__header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 className="dash-card__title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Activity size={18} color="var(--neon-blue)" /> Threat Exposure & Severity Velocity
          </h3>
          <p className="dash-card__subtitle" style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
            Historical 30-day breakdown of Critical, High, and Remediated vulnerability trends.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`target-chip ${timeRange === range ? 'active' : ''}`}
              style={{
                padding: '4px 10px',
                fontSize: 11,
                borderRadius: 4,
                border: '1px solid var(--border)',
                background: timeRange === range ? 'var(--neon-blue)' : 'var(--bg-card)',
                color: timeRange === range ? '#030712' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 280, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_TIME_SERIES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
            <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{ background: 'var(--bg-surface)', borderColor: 'var(--border-hover)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 12 }}
            />
            <Legend wrapperStyle={{ paddingTop: 10, fontSize: 12 }} />
            <Area type="monotone" dataKey="critical" stroke="#ef4444" fillOpacity={1} fill="url(#colorCritical)" name="Critical CVEs" strokeWidth={2} />
            <Area type="monotone" dataKey="high" stroke="#f97316" fillOpacity={1} fill="url(#colorHigh)" name="High Risk" strokeWidth={2} />
            <Area type="monotone" dataKey="safe" stroke="#22c55e" fillOpacity={1} fill="url(#colorSafe)" name="Remediated Endpoints" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
