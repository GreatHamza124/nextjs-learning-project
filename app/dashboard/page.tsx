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

'use client'  // This line is needed for useState

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
}