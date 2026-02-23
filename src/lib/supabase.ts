import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oajmdnlzvnliqxjifcfi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jam1kbmx6dm5saXF4amlmY2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NjUyNjIsImV4cCI6MjA4NzQ0MTI2Mn0.r2wS3sbVXUwTMphllvCnPHRAHf2TKsONOWx_2XK6ckc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);