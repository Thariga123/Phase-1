import { useState } from 'react'
import './App.css'

function App() {
  const Countries=["India","New Zealand","Russia","Switzerland","Vietnam"]
  return(
    <>
    <div className='card'>
    <h2>Countries</h2>
    <ul>
    {Countries.map((Country) =>(
      <li>{Country}</li>
      
    ))}
    </ul>
    </div>
    </>
  )
}

export default App
