import React, { useEffect, useState } from 'react'; // Allerede inkludert useEffect
import { createClient } from '@supabase/supabase-js'; // Supabase import

const supabaseUrl = 'https://pvcwmeikidfgksqjerit.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2Y3dtZWlraWRmZ2tzcWplcml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NzE4MjgsImV4cCI6MjA1MzE0NzgyOH0.1X8Hv3SSkJyen8zi1e2tJKqC3fB-SX6PSkjW4L0TIpM';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
