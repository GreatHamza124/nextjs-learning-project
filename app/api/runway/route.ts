import { supabase } from '@/lib/supabase'

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

/*export async function POST(request: Request) {
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
}*/

export async function POST(request: Request) {
  console.log("API route hit!")
  
  const body = await request.json()
  const { cash, accountsReceivable, accountsPayable, burnRate } = body
  
  console.log("Body received:", body)
  
  const availableCash = cash + accountsReceivable - accountsPayable
  const runwayMonths = availableCash / burnRate
  
  let riskLevel = 'safe'
  if (runwayMonths < 3) riskLevel = 'danger'
  else if (runwayMonths < 6) riskLevel = 'warning'
  
  const { data, error } = await supabase.from('calculations').insert({
    cash,
    burn_rate: burnRate,
    runway_months: runwayMonths,
    risk_level: riskLevel
  })
  
  console.log("Supabase response:", data, error)
  
  return Response.json({
    runwayMonths: runwayMonths.toFixed(1),
    availableCash,
    riskLevel,
    calculation: `(${cash} + ${accountsReceivable} - ${accountsPayable}) / ${burnRate} = ${runwayMonths.toFixed(1)} months`
  })
}