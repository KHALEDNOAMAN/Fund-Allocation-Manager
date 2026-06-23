import React, { useState } from 'react';
const funds = ['Operating Fund 2026', 'Capital Expenditure', 'Platform Development', 'AI/ML Research', 'Reserve Fund', 'Emergency Fund'];
const priorities = ['Low', 'Medium', 'High', 'Critical'];
export default function AllocationForm() {
  const [form, setForm] = useState({ fund: '', amount: '', purpose: '', priority: 'Medium', notes: '' });
  const u = (f, v) => setForm({ ...form, [f]: v });
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>ðŸ“ New Allocation Request</h1>
      <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Fund *</label>
            <select value={form.fund} onChange={e => u('fund', e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db' }}><option value="">Select fund</option>{funds.map(f => <option key={f}>{f}</option>)}</select></div>
          <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Amount (TRY) *</label>
            <input type="number" value={form.amount} onChange={e => u('amount', e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db' }} /></div>
          <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Priority</label>
            <select value={form.priority} onChange={e => u('priority', e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db' }}>{priorities.map(p => <option key={p}>{p}</option>)}</select></div>
          <div style={{ gridColumn: 'span 2' }}><label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Purpose *</label>
            <textarea value={form.purpose} onChange={e => u('purpose', e.target.value)} rows={3} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db', resize: 'none' }} /></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
          <button style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #d1d5db', background: 'white' }}>Cancel</button>
          <button style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#2563eb', color: 'white', fontWeight: 600 }}>Submit Request</button>
        </div>
      </div>
    </div>
  );
}
