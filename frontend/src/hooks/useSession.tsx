import { useEffect, useState } from 'react';

const defaultUser ={username:null,email:null,role:null};
export default function useSession() {
  const [session, setSession] = useState({ loading: true, loggedIn: false , user: defaultUser });

  
  useEffect(() => {
    fetch(`/api/session`, {
      credentials: 'include', // ✅ VERY IMPORTANT
    })
      .then(res => res.json())
      .then(data => {
        setSession({ loading: false, loggedIn: data.loggedIn, user: data.user });
      })
      .catch(() => setSession({ loading: false, loggedIn: false,user: defaultUser }));
  }, []);

  function destroySession (){
      setSession({loading:false,loggedIn:false, user: defaultUser})
  }

  return {session , destroySession};
}