/*export default function Dashboard() {
  return <h1>This is my dashboard</h1>
}*/

/*import RunwayCard from '@/components/runwaycards'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <RunwayCard months={5.2} />
      <RunwayCard months={3.1} />
    </div>
  )
}*/

/*'use client'  // This line is needed for useState

import { useState } from 'react'

export default function Dashboard() {
  const [runway, setRunway] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  async function fetchRunway() {
    setLoading(true)
    
    const response = await fetch('/api/runway')
    const data = await response.json()
    
    setRunway(data.runwayMonths)
    setLoading(false)
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={fetchRunway}>
        Calculate Runway
      </button>
      
      {loading && <p>Loading...</p>}
      {runway && <p>Runway: {runway} months</p>}
    </div>
  )
}*/

'use client'

import { useState } from 'react'

interface RunwayResult {
  runwayMonths: string
  availableCash: number
  riskLevel: string
  calculation: string
}

export default function Home() {
  const [cash, setCash] = useState('')
  const [ar, setAr] = useState('')
  const [ap, setAp] = useState('')
  const [burn, setBurn] = useState('')
  const [result, setResult] = useState<RunwayResult | null>(null)

  async function calculate() {
    const response = await fetch('/api/runway', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cash: Number(cash),
        accountsReceivable: Number(ar),
        accountsPayable: Number(ap),
        burnRate: Number(burn)
      })
    })
    const data = await response.json()
    setResult(data)
  }

  const colors = {
    safe: 'green',
    warning: 'orange', 
    danger: 'red'
  }

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>AI-BOSS Runway Calculator</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          placeholder="Cash ($)" 
          value={cash} 
          onChange={e => setCash(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input 
          placeholder="Accounts Receivable ($)" 
          value={ar} 
          onChange={e => setAr(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input 
          placeholder="Accounts Payable ($)" 
          value={ap} 
          onChange={e => setAp(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input 
          placeholder="Monthly Burn Rate ($)" 
          value={burn} 
          onChange={e => setBurn(e.target.value)}
          style={{ padding: '8px' }}
        />
        
        <button 
          onClick={calculate}
          style={{ padding: '10px', backgroundColor: 'black', color: 'white', cursor: 'pointer' }}
        >
          Calculate Runway
        </button>
      </div>

      {result && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          border: `2px solid ${colors[result.riskLevel as keyof typeof colors]}`,
          borderRadius: '8px'
        }}>
          <h2 style={{ color: colors[result.riskLevel as keyof typeof colors] }}>
            {result.runwayMonths} months runway
          </h2>
          <p style={{ fontFamily: 'monospace' }}>{result.calculation}</p>
          <p>Status: <strong>{result.riskLevel.toUpperCase()}</strong></p>
        </div>
      )}
    </div>
  )
}