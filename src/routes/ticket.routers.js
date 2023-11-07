import { Router } from 'express'
const router = Router()

import TicketService from '../services/tickets.service.js'
import UsuarioService from '../services/users.service.js'
import EstadoTicketService from '../services/estadoticket.service.js'
import TecnicoService from '../services/tecnicos.services.js'
import detalleticketService from '../services/detalleticket.js'
const ticketservice = new TicketService()
const userservice = new UsuarioService()
const estadoticketservice = new EstadoTicketService()
const tecnicoservice = new TecnicoService() 
const detalleticketservice = new detalleticketService()
const folder = 'tickets'

router.get('/create',async (req,res)=>{
    console.log(req.session.tecnico)
    res.render(`${folder}/create`,{sessionUSER:req.session.tecnico})
})

router.get('/', async (req, res) => {
    try {
        return res.render(`${folder}/index`,{sessionUSER:req.session.tecnico})
    } catch (error) {
        res.status(500).json({ success: false, data: error.message })
    }
})

router.post('/update', async (req, res) => {
    try {
        const {id_tecnico,id_ticket} = req.body
        //Actualizar TicKet A TRAVES deL SERVICIO
        //console.log(id_tecnico+' '+id_ticket)
        const respuesta = await ticketservice.asingTicket(id_tecnico,id_ticket)
        res.status(200).json({ success: true, data: 'ticket asignado'})
    } catch (error) {
        res.status(500).json({ success: false, data: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const { ASUNTO, CORREOUSUARIO, DESCRIPCION } = req.body;
        if (!ASUNTO || !CORREOUSUARIO || !DESCRIPCION) {
            return res.status(400).json({ success: false, data: 'Todos los campos son requeridos.' })
        }
        const newUser = await userservice.searchUsuarioEmail(CORREOUSUARIO);
       
        if (newUser.length == 0) {
            return res.status(400).json({ success: false, data: 'USUARIO NO SE ENCUENTRA REGISTRADO ' })
        }
        const ticketbody = req.body
        
        const fecha = new Date()
        const ticket = {
            ID_TECNICO:1,
            ID_USUARIO:newUser[0].ID_USUARIO,
            ASUNTO:ASUNTO,
            DESCRIPCION:DESCRIPCION,
            FECHATICKET:fecha
        }
        const newTicket = await ticketservice.storeTicket(ticket)
        const estadoticket = {
            ID_TICKET:newTicket[0],
            ESTADO:"Pendiente"
        }
        const estadot = await estadoticketservice.storeEstado(estadoticket)
        res.send({ success: true, data:'TICKET INGRESADO CORRECTAMENTE',sessionUSER:req.session.tecnico})
    } catch (error) {
        res.status(500).json({ success: false, data: error.message })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTicket = await ticket.editTicket(req.params.id, req.body)
        if (updatedTicket) {
            res.status(200).json(updatedTicket)
        } else {
            res.status(404).send('Ticket not found')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await ticket.deleteTicket(req.params.id)
        if (result) {
            res.status(200).send('Ticket deleted successfully')
        } else {
            res.status(404).send('Ticket not found')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
});

router.get('/detalle/:id',async (req,res)=>{
    const id = req.params.id
    res.render(`${folder}/detalleticket`,{id,sessionUSER:req.session.tecnico})
})

router.post('/detalle',async (req,res)=>{
   try {
        const data = req.body
        const estadoticket = {
            ID_TICKET: data.id,
            ESTADO: data.ESTADO
        }
        const detalleticket = {
            ID_TICKET: data.id,
            COMENTARIOS: data.DETALLE,
            FECHADETALLETICKET: new Date().toISOString()
        }
       const respuesta = await estadoticketservice.storeEstado(estadoticket)
       const respuesta2 = await detalleticketservice.storeDetalleTicket(detalleticket)
       return res.send({ success: true,data:'Detalle del ticket ha sido ingresado',sessionUSER:req.session.tecnico})
   } catch (error) {
    
   }
    
})

export default router
