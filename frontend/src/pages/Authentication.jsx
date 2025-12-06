import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext.jsx';
import Snackbar from '@mui/material/Snackbar';


const defaultTheme = createTheme();

export default function Authentication() {

  const [name, setName] = React.useState();
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();

  const [formState, setFormState] = React.useState(1); // 1(signup) 0(login).

  const [open, setOpen] = React.useState();

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result);
        setUsername("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
      }
      if (formState === 0) {
        let result = await handleLogin(username, password);
      }
    } catch (error) {
      console.log(error);
      let message = (error.response.data.message);
      setError(message);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <div>
            <Button variant={formState === 1 ? "contained" : ""} onClick={() => setFormState(1)}>
              SignUP
            </Button>
            <Button variant={formState === 0 ? "contained" : ""} onClick={() => setFormState(0)}>
              SignIN
            </Button>
          </div>

          <Box component="form" noValidate sx={{ mt: 1 }}>

            {formState === 1 ?
              <TextField
                margin="normal"
                required
                fullWidth
                id="Full Name"
                label="Full Name"
                name="name"
                value={name}
                autoComplete="Full Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              /> : ""
            }
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <p style={{color:"red"}}>{error}</p>

            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAuth}
            >
            {formState === 1 ? "Rejister" : "Log in"}
            </Button>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message} 
      />

    </ThemeProvider>
  );
}