import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Paper, Box, Alert } from '@mui/material';
import Navbar from './Navbar';
import EventCard from './EventCard';
import { initialEvents } from './mockData';

function App() {
  const [role, setRole] = useState('organizer');
  const [events, setEvents] = useState(initialEvents);
  const [form, setForm] = useState({ title: '', description: '', rules: '' });

  // Event Management: Approve/Reject (Admin)
  const handleStatusChange = (id, newStatus) => {
    setEvents(events.map(e => e.id === id ? { ...e, status: newStatus } : e));
  };

  // Event Management: Create (Organizer)
  const handleCreate = () => {
    if (!form.title) return;
    const newEvent = { ...form, id: Date.now(), status: 'pending', attendees: [], organizer: 'Prerna Thakur' };
    setEvents([newEvent, ...events]);
    setForm({ title: '', description: '', rules: '' });
  };

  // Event Registration: Register (Student)
  const handleRegister = (id) => {
    setEvents(events.map(e => e.id === id ? { ...e, attendees: [...e.attendees, 'C25121'] } : e));
    alert("Successfully registered for the event!");
  };

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh', pb: 5 }}>
      <Navbar role={role} setRole={setRole} />
      
      <Container>
        {/* CREATE EVENT SECTION (Organizer Only) */}
        {role === 'organizer' && (
          <Paper sx={{ p: 4, mb: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Create New Event</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}><TextField fullWidth label="Event Name" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></Grid>
              <Grid item xs={12} md={4}><TextField fullWidth label="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></Grid>
              <Grid item xs={12} md={4}><TextField fullWidth label="Rules" value={form.rules} onChange={e => setForm({...form, rules: e.target.value})} /></Grid>
            </Grid>
            <Button variant="contained" sx={{ mt: 2, bgcolor: '#1976d2' }} onClick={handleCreate}>Send for Approval</Button>
          </Paper>
        )}

        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </Typography>
        
        <Grid container spacing={3}>
          {events
            .filter(e => role === 'student' ? e.status === 'approved' : true)
            .map(e => (
              <Grid item xs={12} sm={6} md={4} key={e.id}>
                <EventCard event={e} role={role} onAction={handleStatusChange} onRegister={handleRegister} />
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </Box>
  );
}

export default App;