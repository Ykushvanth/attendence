import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hjmhirzrqrbutichyrgk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqbWhpcnpycXJidXRpY2h5cmdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NDkzNjAsImV4cCI6MjA1NDUyNTM2MH0.lzStWZ-mQFMZVCDnNwqmZ6aEt5SydM_8lab6pQ_xOYc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 