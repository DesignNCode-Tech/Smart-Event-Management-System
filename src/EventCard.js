import React from 'react';
import { Card, CardContent, Typography, Button, Stack, Chip, Divider, Box } from '@mui/material';

export default function EventCard({ event, role, onAction, onRegister }) {
  return (
    <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" fontWeight="bold" gutterBottom>{event.title}</Typography>
          <Chip 
            label={event.status.toUpperCase()} 
            color={event.status === 'approved' ? 'success' : 'warning'} 
            size="small" 
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {event.description}
        </Typography>
        
        <Box sx={{ p: 1.5, bgcolor: '#f8f9fa', borderRadius: 2, mb: 2 }}>
          <Typography variant="caption" fontWeight="bold">Rules:</Typography>
          <Typography variant="caption" display="block">{event.rules}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* ADMIN MODULE: Approval Logic */}
        {role === 'admin' && event.status === 'pending' && (
          <Stack direction="row" spacing={1}>
            <Button fullWidth variant="contained" color="success" onClick={() => onAction(event.id, 'approved')}>Approve</Button>
            <Button fullWidth variant="outlined" color="error" onClick={() => onAction(event.id, 'rejected')}>Reject</Button>
          </Stack>
        )}

        {/* REGISTRATION MODULE: Student Logic */}
        {role === 'student' && event.status === 'approved' && (
          <Button fullWidth variant="contained" onClick={() => onRegister(event.id)}>Register Now</Button>
        )}

        {/* TRACKING: Admin & Organizer see count */}
        {(role === 'admin' || role === 'organizer') && (
          <Typography variant="body2" color="primary" fontWeight="bold">
            Total Registrations: {event.attendees.length}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}