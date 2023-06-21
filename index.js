import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://usvrbflgisagtbuafvzt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzdnJiZmxnaXNhZ3RidWFmdnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczNDU1MzksImV4cCI6MjAwMjkyMTUzOX0.K8ujYDCO2f19_-tPWAOVEkMGZDcP-t0dq0uOyGy9ddo';
const supabase = createClient(supabaseUrl, supabaseKey);

// Access the form element
const form = document.getElementById('form');

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get the values from the form inputs
    const nameInput = document.getElementById('name');
    const aboutMeInput = document.getElementById('aboutMe');
    const name = nameInput.value;
    const aboutMe = aboutMeInput.value;

    // Insert or update the data in the Supabase table
    const { data, error } = await supabase
        .from('users')
        .upsert({ name, aboutMe });

    if (error) {
        console.error('Error saving data:', error);
    } else {
        console.log('Data saved successfully:', data);
        // Clear the form inputs after successful submission
        nameInput.value = '';
        aboutMeInput.value = '';
    }
});
