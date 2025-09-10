// src/lib/analytics.js
import { supabase } from './supabaseClient'

export async function logVisit(pathname = window.location.pathname) {
  try {
    const ua = navigator.userAgent || ''
    const ref = document.referrer || ''
    const visitor_id = (() => {
      let v = localStorage.getItem('visitor_id')
      if (!v) {
        v = (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now())
        localStorage.setItem('visitor_id', v)
      }
      return v
    })()

    const { error } = await supabase.from('visits').insert([
      {
        ts: new Date().toISOString(), // matches your table
        path: pathname,
        referrer: ref,
        user_agent: ua,
        visitor_id
      }
    ])
    if (error) console.warn('logVisit failed:', error.message)
  } catch (e) {
    console.warn('logVisit error:', e)
  }
}

export async function logEvent(event_type, details = {}) {
  try {
    // Use interaction_events (exists) or create analytics_events (see SQL below)
    const { error } = await supabase.from('interaction_events').insert([
      {
        event_type,         // make sure this column exists in your table
        details             // json/jsonb column in your table
      }
    ])
    if (error) console.warn('logEvent failed:', error.message)
  } catch (e) {
    console.warn('logEvent error:', e)
  }
}
