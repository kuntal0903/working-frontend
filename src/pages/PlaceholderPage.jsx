export default function PlaceholderPage({ pageId }) {
  return (
    <div className="page-content" style={{ textAlign: 'center', padding: 40 }}>
      <h2>Page: {pageId}</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Module initialized and ready for expansion.</p>
    </div>
  );
}
