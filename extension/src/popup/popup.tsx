import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import useSWR from 'swr'
import { fetcher, getAssets } from '../utils/api'
import './popup.css'
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import AssetList from './pages/assetList'
import RequestList from './pages/requestList'
import Layout from './components/layout'

const App: React.FC<{}> = () => {
  const { data, error } = useSWR(
    `https://rinkeby-api.opensea.io/api/v1/assets?owner=0x6cD3dde9dFf947F8F42aa780D0CCE8f897E8DE5F`,
    fetcher
  )

  return (
    <MemoryRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<AssetList />} />
          <Route path="/request-list" element={<RequestList />} />
        </Routes>
      </Layout>
    </MemoryRouter>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
