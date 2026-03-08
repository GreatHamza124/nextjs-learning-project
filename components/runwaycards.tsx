interface RunwayCardProps {
  months: number
}

export default function RunwayCard({ months }: RunwayCardProps) {
  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid black',
      borderRadius: '8px' 
    }}>
      <h2>Runway</h2>
      <p>{months} months remaining</p>
    </div>
  )
}