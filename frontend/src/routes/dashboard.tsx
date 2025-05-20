import { createFileRoute } from '@tanstack/react-router'
import {Logout} from '../components/Login'
import useSession from '../hooks/useSession'


export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const {session,destroySession}= useSession();
  
  
  return (
    <>
      {
      
      
      !session.loggedIn ?  <div> YOU ARE NOT AUTHORIZED TO BE HERE </div> : 
      
      <>
        <div className="p-2"> HELLO {session.user && session.user.username}</div>  
        <Logout destroySession={destroySession}/>
      </>
      }


    

  </>
  )

};
