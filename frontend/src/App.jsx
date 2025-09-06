import React from 'react'
import PriceList from './pages/PriceList'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PriceList />} />
      </Routes>
    </div>
  )
}

export default App