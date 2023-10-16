const ticketContainer = document.querySelector('#dataTicket')
ticketContainer.innerHTML = ''
const listTecnicos = () => {
	
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

	let tec ='<option value="0" selected>Seleccione...</option>'
	data.tecnicos.forEach((t)=>{
		tec += `<option value="${t.ID_TECNICO}">${t.NOMBRETECNICO}</option>`
	})

	let i = 1

	data.tickets.forEach((t)=>{
		if(t.ID_TECNICO === 1){
			let col_sm_3 = document.createElement('div')
			col_sm_3.className = 'col-sm-3'
			col_sm_3.innerHTML = `
			<div class="card">
			<div class="card-body p-1">
				<h5 class="card-title m-1" style="background-color:red;" title="Este ticket no está asignado">${t.ASUNTO}</h5>
				<p class="card-text m-1">${t.DESCRIPCION}</p>
				<p class="card-text m-1">${t.FECHATICKET}</p>
			</div>
			<select class="form-select selectTicketTecnico" id="listTec${i}" aria-label="Default select example">
			${tec}
			</select>
			</div>`
			ticketContainer.append(col_sm_3)
		}else{
			let col_sm_3 = document.createElement('div')
			col_sm_3.className = 'col-sm-3'
			col_sm_3.innerHTML = `
			<div class="card">
			<div class="card-body p-1">
				<h5 class="card-title m-1" style="background-color:green">${t.ASUNTO}</h5>
				<p class="card-text m-1">${t.DESCRIPCION}</p>
				<p class="card-text m-1">${t.FECHATICKET}</p>
			</div>
			<select class="form-select selectTicketTecnico" id="listTec${i}" aria-label="Default select example">
			${tec}
			</select>
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
const setTicketTecnico = (e) => {
	const idSelect = e.target.getAttribute('id')
	const data = document.querySelector(`#${idSelect}`).value
	console.log(data)
}
