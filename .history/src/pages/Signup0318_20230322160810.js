import { useState } from 'react';
import Router from 'next/router';
import svg1 from '../../public/images/signup_appreciation.svg';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Validate form input
    if (!username || !email || !password || !passwordConfirmation) {
      setError('All fields are required.');
      return;
    }

    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6 || password.length > 13) {
      setError('Password must be between 6 and 13 characters.');
      return;
    }

    // Check if username or email already exists
    const res = await fetch('/api/Signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, }),
    });

    if (res.status === 409) {
      setError('An account with that username or email already exists. Please log in.');
      return;
    }

    if (!res.ok) {
      setError('Something went wrong. Please try again later.');
      return;
    }

    // Create user
    const user = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    }).then((r) => r.json());

    if (user.error) {
      setError(user.error);
      return;
    }
    // Navigate to homepage
    // if(res.status===201){
      Router.push('/home');
    // }

  };

  return (
    <div className='container mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
    <div className='form'>
    <form onSubmit={handleSubmit}>
      <h4>Sign Up</h4>
      {error && <p>{error}</p>}
      <label className='d-flex align-items-center'>
        <div className='text'>Username: </div>
        <input type="text" className="inputSP" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label className='d-flex align-items-center'>
      <div className='text'>Email:</div>
        <input type="email" className="inputSP" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className='d-flex align-items-center'>
      <div className='text'>Password:</div>
        <input type="password" className="inputSP" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label className='d-flex align-items-center'>
      <div className='text'>Confirm Password:</div>
        <input
          type="password"
          value={passwordConfirmation}
          className="inputSP"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </label>
      <button type="submit" className='btn'>Sign Up</button>
    </form>
    <div className='pic'><img src={svg1} alt='welcome' className='svg1' width='300'/></div>
    </div>

<style jsx>{`
.container{width:500px; margin:60px 35%;}

.text{
     width:180px;
     color: #26628a;
}
.inputSP{
    height:35px;
    border: none;
    margin:5px;
    border-radius: 10px;
    background-color:#d8e9f4;
}
.btn{
    margin-left: 73%;
    margin-top: 25px;
    width: 150px;
    height: 35px;
    border: none;
    background-color: #4B9CD3;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}
`}</style>
</div>
  );
  
}
