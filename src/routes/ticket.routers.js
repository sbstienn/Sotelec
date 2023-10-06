import { Router } from 'express';
const router = Router();

import TicketService from '../services/tickets.service.js';
import UsuarioService from '../services/users.service.js';
import EstadoTicketService from '../services/estadoticket.service.js'
const ticketservice = new TicketService();
const userservice = new UsuarioService();
const estadoticketservice = new EstadoTicketService();
const folder = 'tickets'

router.get('/create',async (req,res)=>{
    res.render(`${folder}/create`)
})

router.get('/', async (req, res) => {
    try {
        const tickets = await ticketservice.getAllTickets();
        if (tickets && tickets.length > 0) {
            res.render(`${folder}/index`,{tickets})

        } else {
            res.status(404).json({ success: false, data: 'No se encontraron registros.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, data: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { ASUNTO, CORREOUSUARIO, DESCRIPCION } = req.body;
        if (!ASUNTO || !CORREOUSUARIO || !DESCRIPCION) {
            return res.status(400).json({ success: false, data: 'Todos los campos son requeridos.' });
        }
        const newUser = await userservice.searchUsuarioEmail(CORREOUSUARIO);
        console.log(newUser)
        const ticketbody = req.body
        const fecha = new Date()
        const ticket = {
            ID_TECNICO:1,
            ID_USUARIO:newUser[0].ID_USUARIO,
            ASUNTO:ASUNTO,
            DESCRIPCION:DESCRIPCION,
            FECHATICKET:fecha
        }
        const newTicket = await ticketservice.storeTicket(ticket);
        const estadoticket = {
            ID_TICKET:newTicket[0],
            ESTADO:"Pendiente"
        }
        const estadot = await estadoticketservice.storeEstado(estadoticket)
        res.status(200).json({ success: true, data:estadot});
    } catch (error) {
        res.status(500).json({ success: false, data: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTicket = await ticket.updateTicket(req.params.id, req.body);
        if (updatedTicket) {
            res.status(200).json(updatedTicket);
        } else {
            res.status(404).send('Ticket not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await ticket.deleteTicket(req.params.id);
        if (result) {
            res.status(200).send('Ticket deleted successfully');
        } else {
            res.status(404).send('Ticket not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

export default router;