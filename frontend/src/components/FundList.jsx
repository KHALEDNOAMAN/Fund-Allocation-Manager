import React from 'react';
const funds = [
  { code: 'OP-2026', name: 'Operating Fund 2026', type: 'Operating', budget: 5000000, allocated: 3200000, available: 1800000 },
  { code: 'CAP-2026', name: 'Capital Expenditure', type: 'Capital', budget: 2000000, allocated: 850000, available: 1150000 },
  { code: 'PRJ-PLAT', name: 'Platform Development', type: 'Project', budget: 1500000, allocated: 1100000, available: 400000 },
  { code: 'PRJ-AI', name: 'AI/ML Research', type: 'Project', budget: 1200000, allocated: 300000, available: 900000 },
  { code: 'RSV-2026', name: 'Reserve Fund', type: 'Reserve', budget: 800000, allocated: 0, available: 800000 },
  { code: 'EMR-2026', name: 'Emergency Fund', type: 'Emergency', budget: 500000, allocated: 50000, available: 450000 },
];
export default function FundList() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 700 }}>ðŸ¦ Fund Directory</h1><p style={{ color: '#64748b' }}>{funds.length} active funds</p></div>
        <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 12, fontWeight: 600 }}>+ New Fund</button>
      </div>
      <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: '#f8fafc' }}>{['Code', 'Fund Name', 'Type', 'Total Budget', 'Allocated', 'Available', 'Utilization'].map(h => <th key={h} style={{ textAlign: 'left', padding: 12, fontSize: 13, color: '#64748b' }}>{h}</th>)}</tr></thead>
          <tbody>{funds.map(f => { const pct = ((f.allocated / f.budget) * 100).toFixed(1); const c = pct > 75 ? '#ef4444' : pct > 50 ? '#f59e0b' : '#22c55e';
            return (<tr key={f.code} style={{ borderTop: '1px solid #f1f5f9' }}>
              <td style={{ padding: 12, fontFamily: 'monospace', fontSize: 13 }}>{f.code}</td>
              <td style={{ padding: 12, fontWeight: 600 }}>{f.name}</td>
              <td style={{ padding: 12 }}><span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: 8, fontSize: 12 }}>{f.type}</span></td>
              <td style={{ padding: 12, fontWeight: 600 }}>â‚º{(f.budget/1e6).toFixed(1)}M</td>
              <td style={{ padding: 12, color: '#f59e0b' }}>â‚º{(f.allocated/1e6).toFixed(1)}M</td>
              <td style={{ padding: 12, color: '#22c55e' }}>â‚º{(f.available/1e6).toFixed(1)}M</td>
              <td style={{ padding: 12 }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 60, height: 6, background: '#e2e8f0', borderRadius: 3 }}><div style={{ height: 6, borderRadius: 3, background: c, width: `${pct}%` }} /></div><span style={{ color: c, fontSize: 12 }}>{pct}%</span></div></td>
            </tr>); })}</tbody>
        </table>
      </div>
    </div>
  );
}
