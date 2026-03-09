export async function GET() {
  const data = {
    cash: 50000,
    burnRate: 10000,
    runwayMonths: 5.0
  }
  
  return Response.json(data)
}

/*export async function POST(request: Request) {
  const body = await request.json()
  
  const { cash, burnRate } = body
  const runwayMonths = cash / burnRate
  
  return Response.json({ 
    runwayMonths: runwayMonths,
    calculation: `${cash} / ${burnRate} = ${runwayMonths} months`
  })
}*/

export async function POST(request: Request) {
  const body = await request.json()
  const { cash, accountsReceivable, accountsPayable, burnRate } = body
  
  const availableCash = cash + accountsReceivable - accountsPayable
  const runwayMonths = availableCash / burnRate
  
  let riskLevel = 'safe'
  if (runwayMonths < 3) riskLevel = 'danger'
  else if (runwayMonths < 6) riskLevel = 'warning'
  
  return Response.json({
    runwayMonths: runwayMonths.toFixed(1),
    availableCash,
    riskLevel,
    calculation: `(${cash} + ${accountsReceivable} - ${accountsPayable}) / ${burnRate} = ${runwayMonths.toFixed(1)} months`
  })
}