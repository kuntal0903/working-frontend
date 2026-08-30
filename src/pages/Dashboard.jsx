import { useState } from 'react';
import KpiCard from '../components/KpiCard';
import RiskChart from '../components/RiskChart';
import VulnerabilityTable from '../components/VulnerabilityTable';
import ThreatFeed from '../components/ThreatFeed';
import ExportCard from '../components/ExportCard';
import { Globe, ShieldAlert, Activity, ShieldCheck, Download, Search, Zap } from 'lucide-react';

export default function Dashboard({ onExport, onVulnClick, onOpenModal }) {
  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header__left">
          <h1 className="page-header__title">Attack Surface <span>Overview</span></h1>
          <p className="page-header__subtitle">Real-time threat landscape intelligence and security posture metrics.</p>
        </div>
        <ExportCard onExport={onExport} />
      </div>

      <div className="kpi-grid">
        <KpiCard title="Total Discovered Assets" value="142" change="12%" isPositive={true} icon={Globe} color="var(--neon-blue)" />
        <KpiCard title="Critical Vulnerabilities" value="7" change="23%" isPositive={false} icon={ShieldAlert} color="var(--critical)" />
        <KpiCard title="Active Threat Feed Items" value="12" change="5%" isPositive={true} icon={Activity} color="var(--high)" />
        <KpiCard title="Security Posture Score" value="88/100" change="4 pts" isPositive={true} icon={ShieldCheck} color="#4ade80" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginTop: 24 }}>
        <RiskChart />
        <div className="dash-card">
          <ThreatFeed onSelectThreat={(t) => onOpenModal('threat', t)} />
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <VulnerabilityTable onSelectVuln={(v) => onOpenModal('vulnerability', v)} />
      </div>
    </div>
  );
}
