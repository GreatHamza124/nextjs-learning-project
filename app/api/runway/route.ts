export async function GET() {
  const data = {
    cash: 50000,
    burnRate: 10000,
    runwayMonths: 5.0
  }
  
  return Response.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  
  const { cash, burnRate } = body
  const runwayMonths = cash / burnRate
  
  return Response.json({ 
    runwayMonths: runwayMonths,
    calculation: `${cash} / ${burnRate} = ${runwayMonths} months`
  })
}