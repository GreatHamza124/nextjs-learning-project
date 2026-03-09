'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Calculation {
  id: number
  cash: number
  burn_rate: number
  runway_months: number
  risk_level: string
  created_at: string
}

const colors: Record<string, string> = {
  safe: 'green',
  warning: 'orange',
  danger: 'red'
}

export default function History() {
  const [calculations, setCalculations] = useState<Calculation[]>([])

   async function refreshCalculations() {
    const response = await fetch('/api/calculations')
    const data = await response.json()
    setCalculations(data)
  }

  useEffect(() => {
   async function fetchCalculations() {
     const response = await fetch('/api/calculations')
     const data = await response.json()
     setCalculations(data)
   }
   fetchCalculations()
  }, [])

  async function deleteCalculation(id: number) {
    await fetch('/api/calculations', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    refreshCalculations()
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>Calculation History</h1>
      <a href="/dashboard" style={{ color: 'blue' }}>← Back to Calculator</a>
      
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Cash</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Burn Rate</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Runway</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {calculations.map(calc => (
            <tr key={calc.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>
                {new Date(calc.created_at).toLocaleDateString()}
              </td>
              <td style={{ padding: '10px' }}>${calc.cash.toLocaleString()}</td>
              <td style={{ padding: '10px' }}>${calc.burn_rate.toLocaleString()}/mo</td>
              <td style={{ padding: '10px', color: colors[calc.risk_level] }}>
                <strong>{calc.runway_months.toFixed(1)} months</strong>
              </td>
              <td style={{ padding: '10px', color: colors[calc.risk_level] }}>
                {calc.risk_level.toUpperCase()}
              </td>
              <td style={{ padding: '10px' }}>
                <button 
                  onClick={() => deleteCalculation(calc.id)}
                  style={{ color: 'red', cursor: 'pointer', background: 'none', border: 'none' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}