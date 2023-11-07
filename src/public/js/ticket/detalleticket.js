const mje = document.querySelector('#detalleTicketMessage')
document.querySelector('#detalleTicket').addEventListener('submit', e => {
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
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/ticket/detalle`, options)
	const data2 = await respuesta.json()
	if (data2.success == true) {
		mje.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
		<strong>${data2.data}</strong>
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  		</div>`
	}else{
		mje.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
		<strong>${data2.data}</strong>
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  		</div>`
	}
}

