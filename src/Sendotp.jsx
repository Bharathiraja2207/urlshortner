import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
export function Sendotp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://url-shortner-task-backend.vercel.app/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.message);
      setTimeout(() => {
        navigate("/verify")
    }, 3000);
      // navigate("/verify")
    } catch (error) {
      console.log(error);
      setMessage('Failed to send OTP');
    }
  };
  return (
    <div className='parrent'>
      <Card  sx={{ maxWidth: 500 }}>
        <CardContent>
      <h1>Reset Password</h1>
      <form onSubmit={handleSendOtp}>
      <div className='child1'>
        <div><label><b>Email:</b></label></div>
        <div><TextField type="email"size="small" label="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div><Button type="submit" size="medium" variant="contained">Send OTP</Button></div>
        </div>
      </form>
      {message && <p>{message}</p>}
      </CardContent>
      </Card>
    </div>
  );
}
export function Verifyotp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setpassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://url-shortner-task-backend.vercel.app/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, password }),
      });
      const data = await response.json();
      setMessage(data.message);
      setTimeout(() => {
        navigate("/login")
    }, 3000);
    } catch (error) {
      console.log(error);
      setMessage('Failed to reset password');
    }
  };

  return (
    <div className='parrent'>
      <Card  sx={{ maxWidth: 500 }}>
        <CardContent>
      <form  className='newpassword' onSubmit={handleResetPassword}>
        <b>Reset Password</b>
        <div>
        <TextField type="text"label="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
        <TextField type="text" label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        </div>
        <div>
        <TextField
          type="password"
          label="New Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required />
          </div>
          <div>
        <Button type="submit" size="medium" variant="contained">Reset Password</Button>
        </div>
      </form>
      {message && <p>{message}</p>}
      </CardContent>
      </Card>
    </div>
  );
}
