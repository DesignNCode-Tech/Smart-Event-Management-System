import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';

export default function Navbar({ role, setRole }) {
  return (
    <AppBar position="sticky" sx={{ mb: 4, backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Smart Event System
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant={role === 'admin' ? 'contained' : 'text'} color="inherit" onClick={() => setRole('admin')}>Admin View</Button>
          <Button variant={role === 'organizer' ? 'contained' : 'text'} color="inherit" onClick={() => setRole('organizer')}>Organizer View</Button>
          <Button variant={role === 'student' ? 'contained' : 'text'} color="inherit" onClick={() => setRole('student')}>Student View</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}