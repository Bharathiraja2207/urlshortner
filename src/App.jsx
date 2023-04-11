import { useState } from 'react'
import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Signin, Login } from './Signin';
import { Sendotp, Verifyotp } from './Sendotp';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
<Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<Sendotp />} />
        <Route path="/verify" element={<Verifyotp />} />
        <Route path="/url-Shortening" element={<ProtectedRoute> <Shorturl/></ProtectedRoute>} />
      </Routes>
    </div>
  )
}


function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  // const token=false;
  return (
    token ? <section>{children}</section> : <Navigate replace to="/" />
    //  token? <section>{children}</section>:<h1>unautharaied</h1>
  )
}

function Shorturl(){
  const navigate = useNavigate()
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://url-shortner-task-backend.vercel.app/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setShortUrl(data.shortUrl);
      setMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleclear=()=>{
    setUrl("")
    setShortUrl("")
  }
  const handleClick = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate("/login")
    }, 1500);
    console.log("logout")
  }

  return(
    <div className='parrent'>
      <Button onClick={handleClick} variant="contained">LOGOUT</Button>
      <Card sx={{ maxWidth: 500 }}>
      <CardContent>
      <div className='child1'>
      <div><h1>URL Shortener</h1></div>
      <div><Button  variant="outlined" onClick={handleclear}>clear</Button></div>
    </div>
    <form onSubmit={handleSubmit}>
      <div className='child1'>
      <div>
        <label>
       <b> Original URL:</b>
        </label>
        </div>
        <div> <TextField type='url'size="small" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <div><Button type="submit" size="medium" variant="contained" >Shorten</Button></div>
      </div>
    </form>
    {message && <p>{message}</p>}
    {shortUrl && (
      <div>
        <p><b>Shortened URL:</b></p>
        <a href={shortUrl} target="_blank" rel="noopener noreferrer">
          {shortUrl}
        </a>
      </div>
    )}
    
    </CardContent>
    </Card>
  </div>
  )
}





