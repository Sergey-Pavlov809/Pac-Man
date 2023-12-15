import { useEffect } from 'react'
import './App.css'
import { Navigate } from 'react-router-dom'

function App(): JSX.Element {
  useEffect(() => {
    //const fetchServerData = async (): Promise<void> => {
    //const url = `http://localhost:${__SERVER_PORT__}`
    //const response = await fetch(url)
    //const data = await response.json()
    //  console.log(data)
    //}
    //fetchServerData()
  }, [])
  return <Navigate to="/sign-in" replace={true} />
}

export default App
