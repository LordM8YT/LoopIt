import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://pvcwmeikidfgksqjerit.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2Y3dtZWlraWRmZ2tzcWplcml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NzE4MjgsImV4cCI6MjA1MzE0NzgyOH0.1X8Hv3SSkJyen8zi1e2tJKqC3fB-SX6PSkjW4L0TIpM');

export default supabase;
