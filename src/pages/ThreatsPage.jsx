import { useState } from 'react';
import { Activity, ShieldAlert, Search, Filter, AlertTriangle } from 'lucide-react';
import ThreatFeed from '../components/ThreatFeed';

export default function ThreatsPage({ onOpenModal }) {
  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header__left">
          <h1 className="page-header__title">Threat <span>Intelligence Feed</span></h1>
          <p className="page-header__subtitle">Correlated real-time threat intelligence and zero-day advisory streams.</p>
        </div>
      </div>

      <div className="dash-card">
        <ThreatFeed onSelectThreat={(t) => onOpenModal('threat', t)} />
      </div>
    </div>
  );
}
