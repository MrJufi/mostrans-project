import { React, useState, useContext } from 'react'

import { Col, Container, Row, Badge } from 'react-bootstrap'
import { CharContext } from './context/charContext'

import CardItem from './card/CardItem'

function CharacterLocation () {
  const [showList, setShowList] = useState([])

  const data = useContext(CharContext)
  const characterList = data?.characters?.results
  const locationChar = JSON.parse(localStorage.getItem('Location')) || []

  const toggleShowList = (location) => {
    setShowList(prevState => ({
      ...prevState,
      [location]: !prevState[location]
    }))
  }

  if (locationChar.length > 0 && characterList) {
    return (
        <div className='text-center'>
          <h3 className='mt-3'>List of character locations :</h3>
          {
            locationChar.map((loc, index) => {
              const location = Object.keys(loc)[0]

              const characterAssign = loc[location].map((id) => {
                return characterList.find((char) => char.id === id.toString());
              });

              return (
                <div className='mx-auto'>
                    <Badge className='mt-4 p-2' bg="success">
                      <h4 key={index} onClick={() => toggleShowList(location)}>{location}</h4>
                    </Badge>
                    <Container>
                      <Row>
                        {characterAssign && showList[location] &&
                          characterAssign.map((char, index) => {
                            return (
                              <Col className='mt-3' key={index}>
                                <CardItem character={char} type={'char-loc'}/>
                              </Col>
                            )
                          })
                        }
                      </Row>
                    </Container>
                </div>
              )
            })
          }
        </div>
    )
  }

  return (
    <div className='text-center p-5'>
      No Location Added Yet
    </div>
  )
}

export default CharacterLocation