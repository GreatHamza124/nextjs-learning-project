/*export default function Dashboard() {
  return <h1>This is my dashboard</h1>
}*/

import RunwayCard from '@/components/runwaycards'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <RunwayCard months={5.2} />
      <RunwayCard months={3.1} />
    </div>
  )
}