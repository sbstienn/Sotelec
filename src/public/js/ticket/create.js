const mje = document.querySelector('#createTicketMessage')
document.querySelector('#createTicket').addEventListener('submit',e=>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
	llamandoAPI(data)
})

const llamandoAPI = async (data) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type':'application/json'
		},
        body:JSON.stringify(data),
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/ticket`,options)
	const data2 = await respuesta.json()
	mje.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
	<strong>Holy guacamole!</strong> $_{}
	<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
}