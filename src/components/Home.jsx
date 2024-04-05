import { React, useContext } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import { CharContext } from './context/charContext'

import CardItem from '../components/card/CardItem'

function Home ()  {
  const data = useContext(CharContext)
  const characterList = data?.characters?.results

  if (!characterList) {
    return <div className='text-center mt-4'>Loading....</div>
  } 

  return (
    <div className='mx-auto'>
        <Container>
            <Row>
             {
                characterList.map((data, index) => {
                    return <Col className='mt-3' key={index}><CardItem character={data}/></Col>     
                })
             }  
            </Row>
        </Container>
    </div>
  )
}

export default Home