import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dfebsmqjlghxuemfcvwg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmZWJzbXFqbGdoeHVlbWZjdndnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MjU3NDksImV4cCI6MjA3OTUwMTc0OX0.a2Pe720QGgjxgMjJfMiMwraIa9NuIH_EQPpcM0YQGiE'

export const supabase = createClient(supabaseUrl, supabaseKey)