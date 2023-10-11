const dataContainer = document.querySelector('.selectTecnicos')
dataContainer.innerHTML = ''
const llamandoAPI = async () => {
	const options = {
		method: 'GET',
		headers: {
			'Content-Type':'application/json'
		},
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/tecnicos`,options)
	const obj = await respuesta.json()
	let tecnicosSelect = ''
	obj.tecnicos.forEach((t)=>{
		tecnicosSelect += `<option value="${t.ID_TECNICO}">${t.NOMBRETECNICO}</option>`
	})

	obj.tickets.forEach((o)=>{
		const contenedor = document.createElement("div")
        contenedor.className = 'col-sm-3'
		contenedor.innerHTML = `
		<div class="card">
		  <div class="card-body p-1">
			<p class="card-text m-1">USUARIO: ${o.NOMBREUSUARIO}</p>
			<p class="card-text m-1">TECNICO: ${o.NOMBRETECNICO}</p>
			<h5 class="card-title m-1">${o.ASUNTO}</h5>
			<p class="card-text m-1">${o.DESCRIPCION}</p>
			<p class="card-text m-1">${o.FECHATICKET}</p>
			<select class="form-select selectTecnico" name="id_tecnico" aria-label="Default select example">
				${tecnicosSelect}
			</select>
			<button type="button" class="btn btn-primary btnTicketTecnico m-1">Primary</button>
		  </div>
	  	</div>`
	  
	  dataContainer.append(contenedor)
	})
	const btnTicketTecnico = document.querySelectorAll('.btnTicketTecnico')
	const selectTecnico = document.querySelector('.selectTecnico')
	
	btnTicketTecnico.forEach((btn)=>{
		btn.addEventListener('click',function(){
			const data = selectTecnico.value
		alert(data)
		})
	})
	
}
llamandoAPI()

