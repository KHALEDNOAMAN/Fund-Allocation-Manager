import React from 'react';
const cards = [
  { title: 'Total Budget', value: 'â‚º11,000,000', icon: 'ðŸ¦', change: '6 active funds', color: '#3b82f6' },
  { title: 'Allocated', value: 'â‚º5,500,000', icon: 'ðŸ“Š', change: '50% utilized', color: '#f59e0b' },
  { title: 'Available', value: 'â‚º5,500,000', icon: 'ðŸ’°', change: 'Ready to allocate', color: '#22c55e' },
  { title: 'Pending Requests', value: '3', icon: 'â³', change: 'â‚º375,000 total', color: '#8b5cf6' },
];
const pending = [
  { id: 2, number: 'ALLOC-2026-0002', purpose: 'React Native mobile app dev', fund: 'Platform Development', amount: 'â‚º180,000', priority: 'medium' },
  { id: 3, number: 'ALLOC-2026-0003', purpose: 'GPT integration R&D', fund: 'AI/ML Research', amount: 'â‚º120,000', priority: 'high' },
  { id: 4, number: 'ALLOC-2026-0004', purpose: 'Q3 marketing campaign', fund: 'Operating Fund', amount: 'â‚º75,000', priority: 'medium' },
];
const pc = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444', critical: '#dc2626' };
export default function Dashboard() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>ðŸ¦ Fund Allocation Dashboard</h1>
      <p style={{ color: '#64748b', marginBottom: 24 }}>Budget management and allocation tracking</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 32 }}>
        {cards.map(c => (<div key={c.title} style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 24 }}>{c.icon}</span><span style={{ color: c.color, fontSize: 12, fontWeight: 600 }}>{c.change}</span></div>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>{c.title}</p><p style={{ fontSize: 24, fontWeight: 700 }}>{c.value}</p>
        </div>))}
      </div>
      <div style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>â³ Pending Allocation Requests</h2>
        {pending.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#94a3b8' }}>{p.number}</span>
                <span style={{ background: pc[p.priority] + '20', color: pc[p.priority], padding: '1px 8px', borderRadius: 8, fontSize: 11, fontWeight: 600 }}>{p.priority}</span>
              </div>
              <p style={{ fontWeight: 600 }}>{p.purpose}</p>
              <p style={{ fontSize: 13, color: '#64748b' }}>{p.fund}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18, fontWeight: 700 }}>{p.amount}</span>
              <button style={{ background: '#22c55e', color: 'white', border: 'none', padding: '6px 14px', borderRadius: 8, fontWeight: 600 }}>Approve</button>
              <button style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 14px', borderRadius: 8, fontWeight: 600 }}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
