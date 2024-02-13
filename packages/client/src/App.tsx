import { useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import yApiService from 'services/y-api-service'

function App(): JSX.Element {
  useEffect(() => {
    const fetchServerData = async (): Promise<void> => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  const navigate = useNavigate()

  const checkUserAuth = async (): Promise<void> => {
    const res = await yApiService.getUser()
    if (!res?.login) {
      navigate('/sign-in')
    }
  }

  useEffect(() => {
    checkUserAuth()
  }, [])

  return <div className="App">Вот тут будет жить ваше приложение :)</div>
}

export default App
