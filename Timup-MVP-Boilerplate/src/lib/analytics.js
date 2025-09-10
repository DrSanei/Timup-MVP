// src/lib/analytics.js
import { supabase } from './supabaseClient'

// visit logging
export async function logVisit({ page, user_id = null, extra = {} } = {}) {
  // matches your `visits` table
  const { error } = await supabase.from('visits').insert([{
    page, user_id, extra, created_at: new Date().toISOString()
  }])
  if (error) console.warn('logVisit skipped:', error.message)
}

// interaction logging
export async function logInteraction({ event_type, context = {}, user_id = null } = {}) {
  // matches your `interaction_events` table
  const { error } = await supabase.from('interaction_events').insert([{
    event_type, context, user_id, created_at: new Date().toISOString()
  }])
  if (error) console.warn('logInteraction skipped:', error.message)
}
