import { useEffect, useState } from 'react'

import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {Routes, Route, HashRouter} from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'

import Footer from './components/Footer'
import { CharProvider } from './components/context/charContext'
import CharacterLocation from './components/CharacterLocation'
import Header from './components/Header'
import Home from './components/Home'

const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const GET_CHAR_LIST = gql`
  query getCharacterLists {
    characters(page:1) {
      results{
        id
        name
        status
        location {
          name
        }
        species
        image
      }
    }
  }
`

function App() {
  const [data, setData] = useState(null)
  const client = apolloClient

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.query({
          query: GET_CHAR_LIST
        })
    
        setData(result.data)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }

    fetchData()
  }, [])

  return (
    <CharProvider value={data}>
      <ApolloProvider client={client}>
        <HashRouter>
          <Header/>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/character-location' element={<CharacterLocation/>}/>
          </Routes>
          <Footer/>
        </HashRouter>
      </ApolloProvider>
    </CharProvider>


  )
}

export default App
