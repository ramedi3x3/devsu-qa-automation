// api petstore - mascotas
// idemar rojas jun 2026
// uso cy.request porque no quiero agregar axios ni nada extra al proyecto

const BASE = 'https://petstore.swagger.io/v2'

// Date.now para que el id sea unico y no choque con otros que usen la api publica
const petId = Date.now()

describe('petstore api - mascotas', () => {

  it('crear mascota nueva', () => {
    cy.request({
      method: 'POST',
      url: `${BASE}/pet`,
      headers: { 'Content-Type': 'application/json' },
      body: {
        id: petId,
        category: { id: 1, name: 'perros' },
        name: 'Toby',
        photoUrls: [],
        tags: [{ id: 1, name: 'adoptado' }],
        status: 'available'
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.name).to.eq('Toby')
      expect(res.body.status).to.eq('available')
    })
  })

  it('buscar mascota por id', () => {
    cy.request({
      method: 'POST',
      url: `${BASE}/pet`,
      headers: { 'Content-Type': 'application/json' },
      body: { id: petId, name: 'Toby', photoUrls: [], status: 'available' }
    })

    cy.request('GET', `${BASE}/pet/${petId}`).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.id).to.eq(petId)
      expect(res.body.name).to.eq('Toby')
    })
  })

  it('actualizar mascota y cambiar a sold', () => {
    cy.request({
      method: 'POST',
      url: `${BASE}/pet`,
      headers: { 'Content-Type': 'application/json' },
      body: { id: petId, name: 'Toby', photoUrls: [], status: 'available' }
    })

    cy.request({
      method: 'PUT',
      url: `${BASE}/pet`,
      headers: { 'Content-Type': 'application/json' },
      body: {
        id: petId,
        name: 'Toby v2',
        photoUrls: [],
        status: 'sold'
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.name).to.eq('Toby v2')
      expect(res.body.status).to.eq('sold')
    })
  })

  it('mascota vendida aparece en findByStatus', () => {
    cy.request({
      method: 'POST',
      url: `${BASE}/pet`,
      headers: { 'Content-Type': 'application/json' },
      body: { id: petId, name: 'Toby', photoUrls: [], status: 'sold' }
    })

    cy.request('GET', `${BASE}/pet/findByStatus?status=sold`).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.be.an('array')

      const found = res.body.find(p => p.id === petId)
      expect(found).to.not.be.undefined
      expect(found.status).to.eq('sold')
    })
  })

})
