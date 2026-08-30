import { useState } from 'react';
import VulnerabilityTable from '../components/VulnerabilityTable';
import { ShieldAlert } from 'lucide-react';

export default function VulnerabilitiesPage({ onOpenModal }) {
  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header__left">
          <h1 className="page-header__title">Vulnerability <span>Register</span></h1>
          <p className="page-header__subtitle">Detailed CVE findings, severity rankings, and Jira integration workflow.</p>
        </div>
      </div>

      <VulnerabilityTable onSelectVuln={(v) => onOpenModal('vulnerability', v)} />
    </div>
  );
}
