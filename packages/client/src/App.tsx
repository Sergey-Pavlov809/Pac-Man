import { useEffect } from 'react'
import './App.css'

function App(): JSX.Element {
  // console.log(process.env)
  useEffect(() => {
    const fetchServerData = async (): Promise<void> => {
      const url = `http://localhost:${8080}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return <div className="App">Вот тут будет жить ваше приложение :)</div>
}

export default App
