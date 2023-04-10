import { useState } from 'react'
import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function App() {
  

  return (
    <div className="App">
     <Shorturl/>
      
    </div>
  )
}


function Shorturl(){
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://url-shortner-backend-wine.vercel.app/api/shorten', {
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

  return(
    <div className='parrent'>
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
        Original URL:
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
        <p>Shortened URL:</p>
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
