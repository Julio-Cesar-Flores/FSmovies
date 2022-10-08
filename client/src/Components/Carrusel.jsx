import { Carousel } from 'primereact/carousel'
import { Button } from 'primereact/button'

import '../css/carrusel.css'

const responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 3
  },
  {
    breakpoint: '600px',
    numVisible: 2,
    numScroll: 2
  },
  {
    breakpoint: '480px',
    numVisible: 1,
    numScroll: 1
  }
]

export const Carrusel = ({ dataSeries, query, episodes, crew }) => {
  const serieTemplate = ({ show }) => { // id
    return (
      <div className='product-item'>
        <div className='product-item-content'>
          <div className='mb-3'>
            {show.image
              ? <img
                  src={show.image.medium}
                  alt={show.name}
                  className='product-image'
                />
              : <img
                  src='/src/assets/placeholder.png'
                  alt={show.name}
                  className='product-image'
                />}
          </div>
          <div>
            <h5 className='mb-1'>{show.name}</h5>
            {show.summary
              ? <span style={{ fontFamily: 'Arial', fontSize: '10px' }} dangerouslySetInnerHTML={{ __html: show.summary }} />
              : <span style={{ fontFamily: 'Arial', fontSize: '10px' }}>No disponible</span>}
            <div className='car-buttons mt-5'>
              <Button
                tooltip='Episodios'
                onClick={() => { episodes(show.id) }}
                icon='pi pi-search' className='p-button p-button-rounded mr-2'
              />
              <Button
                tooltip='Artistas'
                onClick={() => { crew(show.id) }}
                icon='pi pi-star-fill'
                className='p-button-success p-button-rounded mr-2'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='carousel-demo'>
      <div className='card'>
        <Carousel
          value={dataSeries} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions}
          itemTemplate={serieTemplate} header={<h5>{query}</h5>}
        />
      </div>
    </div>
  )
}
