import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
  const [error,setError] = useState('');

  const handleSubmit = async (e:any) =>{
    e.preventDefault();
    setError('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),    
    });

    const data = await res.json();

    if(data.success){
      navigate({ to:data.redirectTo,});
    }else{
      setError(data.message);
    }
  }
    
    return(
    <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <p className="text-red-800 font-bold border-red-800 border-2 rounded-md p-1"> {error}</p>
      }

    <form method="POST" onSubmit={handleSubmit} className='space-y-4'>
       <label className="block text-sm font-medium text-gray-700">Username:</label>
        <input type="text" name="username" required 
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'/> 
        <label className='block text-sm font-medium text-gray-700'>Password:</label>
        <input className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500' 
          type="password" name="password" required/>
        <button className='w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition' type="submit">Login</button>
    </form>
    </div>
    )
}

const Logout= (props:any)=>{

    const{ destroySession } = props;
    const navigate = useNavigate()
    const handleLogout = async ()=> {
      
        const res = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

            }),    
        });
         const data = await res.json();
        
        if(data.success){
            destroySession();
            navigate({ to:"/login"});
        }else{
            alert("logout error");
        }
       
    }
    
    return (<button onClick={handleLogout}> Logout</button>);
};



export {Logout , Login};
export default Login;

