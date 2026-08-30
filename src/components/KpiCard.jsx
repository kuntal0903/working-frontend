export default function KpiCard({ title, value, change, isPositive, icon: Icon, color }) {
  return (
    <div className="kpi-card">
      <div className="kpi-card__header">
        <span className="kpi-card__title">{title}</span>
        {Icon && (
          <div className="kpi-card__icon-box" style={{ color: color || 'var(--neon-blue)', background: `${color || 'var(--neon-blue)'}15` }}>
            <Icon size={18} />
          </div>
        )}
      </div>
      <div className="kpi-card__body">
        <div className="kpi-card__value">{value}</div>
        {change && (
          <span className={`kpi-card__change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '▲' : '▼'} {change}
          </span>
        )}
      </div>
    </div>
  );
}
