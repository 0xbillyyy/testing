import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Api } from './Api.jsx'
import ReactAudioPlayer from 'react-audio-player'
import { Parallax } from 'react-parallax'

// Layout
import { Container, Row, Col } from 'react-bootstrap'

// Assets
import { Card } from "react-bootstrap"
import "./style.css"

function App() {
  // const [count, setCount] = useState(0)
  const { status, data, error, loading } = Api()
  const [paddingBox, setPaddingBox] = useState(6)
  const [searchTerm, setSearchTerm] = useState('')

  const spanSkelaton = []
  for (let i = 0; i < 15; i++) {
    spanSkelaton.push(<span key={i} className="placeholder col-12"></span>);
  }

  const cardSkelaton = () => {
    return (
      <p className="placeholder-glow p-5 mb-3">
        <span className="placeholder col-2"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="placeholder col-6"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="placeholder col-2"></span>
        <span className="placeholder col-2"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="placeholder col-6"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="placeholder col-2"></span>
        {spanSkelaton}
      </p>
    )
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }
  const filteredData = data ? data.filter((item) => {
    return item.nama.toLowerCase().includes(searchTerm.toLowerCase());
  }) : [];

  const toCapital = (char) => {
    return char.charAt(0).toUpperCase() + char.slice(1)
  }

  return (
    <div>
      <Parallax
        bgImage="../../public/bg-header2.jpg"
        strength={500}
        className="paralax-background"
      >
        <Container>
          <div style={{ height: '100vh' }}>
            <h1 className='text-center text-white' style={{ paddingTop: "20vh" }}>Al-Qur'an Digital</h1>
            <p className='text-center text-white'>Website ini merupakan digitalisasi Al-Qur'an Berbahasa Indonesia</p>
          </div>
        </Container>
      </Parallax>
      <Container className="content-container mb-5">
        <input
          type="text"
          placeholder="Cari Data..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input-search mb-4 mt-4"
        />
        {
          loading ? (
            <Row>
              <div className='col-md-6 col-sm-12 mt-3'>
                <Card>
                  {cardSkelaton()}
                </Card>
              </div>
              <div className='col-md-6 col-sm-12 mt-3'>
                <Card>
                  {cardSkelaton()}
                </Card>
              </div>
            </Row>
          ) : (
            <Row>
              {filteredData.length === 0 ? (
                <h1 className='text-center text-white'>'{searchTerm}' tidak ditemukan.</h1>
              ) : (
                filteredData.map((item, index) => (
                  <Col key={index} md={paddingBox} className='p-3'>
                    <Card className="p-3 hover-box hover h-100 border-0 shadow">
                      <Card.Body>
                        <Col md={12}>
                          <Row>
                            <div className='fw-bold col-2 fs-2'>
                              {item.nomor}
                            </div>
                            <div className='col-10'>
                              <Row>
                                <div className='col-8 fs-6'>
                                  <b className='text-nowrap'>{item.nama}</b> ( {item.arti} )
                                  <br />
                                  <b>Diturunkan</b>: {toCapital(item.type)}
                                </div>
                                <div className='col-4 text-end'>
                                  {item.asma}
                                </div>
                              </Row>
                            </div>
                          </Row>
                        </Col>
                        {/* </Row> */}
                        <div dangerouslySetInnerHTML={{ __html: item.keterangan }} className='mt-2' />
                        <blockquote className='blockquote'>
                          <footer className='blockquote-footer mt-2 mb-2'>
                            {item.arti}
                          </footer>
                        </blockquote>
                        <ReactAudioPlayer
                          src={item.audio}
                          controls
                          className='audio-width'
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          )

        }
      </Container>
    </div>


  )
}

export default App
