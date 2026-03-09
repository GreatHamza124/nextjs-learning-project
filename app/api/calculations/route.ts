import { supabase } from '@/lib/supabase'

// READ all calculations
export async function GET() {
  const { data, error } = await supabase
    .from('calculations')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) return Response.json({ error }, { status: 500 })
  return Response.json(data)
}

// DELETE a calculation
export async function DELETE(request: Request) {
  const { id } = await request.json()
  
  const { error } = await supabase
    .from('calculations')
    .delete()
    .eq('id', id)
  
  if (error) return Response.json({ error }, { status: 500 })
  return Response.json({ success: true })
}