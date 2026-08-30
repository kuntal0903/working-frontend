import { Download } from 'lucide-react';

export default function ExportCard({ onExport }) {
  return (
    <div className="export-card">
      <div className="export-card__info">
        <h4 className="export-card__title">Export Security Audit Report</h4>
        <p className="export-card__desc">Download complete attack surface assessment findings in JSON, CSV, or Executive PDF format.</p>
      </div>
      <div className="export-card__actions">
        <button className="export-btn" onClick={() => onExport('JSON')}>
          <Download size={14} /> Export JSON
        </button>
        <button className="export-btn outline" onClick={() => onExport('CSV')}>
          <Download size={14} /> Export CSV
        </button>
      </div>
    </div>
  );
}
