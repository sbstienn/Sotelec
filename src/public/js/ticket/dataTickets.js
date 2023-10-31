const ticketContainer = document.querySelector('#dataTicket')
ticketContainer.innerHTML = ''
const listTecnicos = (tecnicos) => {
	let tec ='<option value="0" selected>Seleccione...</option>'
	tecnicos.forEach((t)=>{
		tec += `<option value="${t.ID_TECNICO}">${t.NOMBRETECNICO}</option>`
	})
	return tec
}
const asignarTicket = async(ticket) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type':'application/json'
		},
		body:JSON.stringify(ticket),
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/ticket/update`,options)
	const data = await respuesta.json()
	if(data.success){
		window.location.replace('/api/ticket')
	}
}
const setTicketTecnico = (e) => {
    const id = e.target.form.id
	document.querySelector(`#${id}`).addEventListener('submit',e=>{
		e.preventDefault()
		const data = Object.fromEntries(
			new FormData(e.target)
		)
		asignarTicket(data)
	})
}


const putTickets = async (id) => {
	const options = {
		method: 'GET',
		headers: {
			'Content-Type':'application/json'
		},
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/tecnicos`,options)
	const data = await respuesta.json()
	const {tecnicos,tickets} = data
	const tec = listTecnicos(tecnicos)
}

const llamandoAPI = async () => {
	const options = {
		method: 'GET',
		headers: {
			'Content-Type':'application/json'
		},
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/tecnicos`,options)
	const data = await respuesta.json()
	const {tecnicos,tickets} = data
	const tec = listTecnicos(tecnicos)
	
	let i = 1

	data.tickets.forEach((t)=>{
		if(t.ID_TECNICO === 1){
			let col_sm_3 = document.createElement('div')
			col_sm_3.className = 'col-sm-3'
			col_sm_3.innerHTML = `
			<div class="card ">
			<div class="card-body p-1">
				<h5 class="card-title m-1" style="background-color:red;" title="Este ticket no está asignado">${t.ASUNTO}</h5>
				<p class="card-text m-1">${t.DESCRIPCION}</p>
				<p class="card-text m-1">${t.FECHATICKET}</p>
			</div>
			<form id="form${i}">
				<select class="form-select selectTicketTecnico" name="id_tecnico" aria-label="Default select example">
					${tec}
				</select>
				<input type="hidden" name="id_ticket" value="${t.ID_TICKET}">
				<button type="submit" class="btn btn-primary m-1">Asignar</button>
			</form>
			</div>`
			ticketContainer.append(col_sm_3)
		}else{
			let col_sm_3 = document.createElement('div')
			col_sm_3.className = 'col-sm-3'
			col_sm_3.innerHTML = `
			<div class="card">
			<div class="card-body p-1">
				<h5 class="card-title m-1" style="background-color:green;" title="Este ticket no está asignado">${t.ASUNTO}</h5>
				<p class="card-text m-1">${t.DESCRIPCION}</p>
				<p class="card-text m-1">${t.FECHATICKET}</p>
			</div>
			<form id="form${i}">
				<select class="form-select selectTicketTecnico" name="id_tecnico" aria-label="Default select example">
					${tec}
				</select>
				<input type="hidden" name="id_ticket" value="${t.ID_TICKET}">
				<button type="submit" class="btn btn-primary m-1">Asignar</button>
			</form>
			</div>`
			ticketContainer.append(col_sm_3)
		}
	  	i += 1
	})
	const selectTicketTecnico = document.querySelectorAll('.selectTicketTecnico')
	selectTicketTecnico.forEach((s)=>{
		s.addEventListener('change',setTicketTecnico)
	})
	//<button type="button" class="btn btn-primary btnTicketTecnico m-1">Primary</button>
}
llamandoAPI()

