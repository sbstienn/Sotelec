import config from '../config/config.js'
import knex from 'knex'

export default class TicketService {
    constructor() {
        this.knex = knex(config)
    }

    async getAllTickets() {
        const tickets = await this.knex.from('ticket').select('ID_TICKET','ID_TECNICO','ASUNTO','DESCRIPCION','FECHATICKET')
        return Object.values(JSON.parse(JSON.stringify(tickets)))
        
        /*const tickets = await this.knex('ticket')
            .join('tecnico', 'ticket.ID_TECNICO', '=', 'tecnico.ID_TECNICO')
            .join('usuario', 'ticket.ID_USUARIO', '=', 'usuario.ID_USUARIO')
            .select('ticket.*', 'tecnico.NOMBRETECNICO', 'usuario.NOMBREUSUARIO')
            return Object.values(JSON.parse(JSON.stringify(tickets)))*/

    }

    async getTickets(){
        const tickets = await this.knex.from('ticket').select('*')
        return Object.values(JSON.parse(JSON.stringify(tickets)))
    }

    async storeTicket(ticket) {
        return this.knex('ticket').insert(ticket);
    }


    async editTicket(id, updatedTicket) {
        return this.knex('ticket')
            .where({ ID_ticket: id })
            .update(updatedTicket);
    }

    async searchTicket(id) {
        return this.knex('ticket')
            .select('*')
            .where({ ID_ticket: id });
    }

    async deleteTicket(id) {
        return this.knex('ticket')
            .where({ ID_ticket: id })
            .del();
    }

    async asingTicket (id_tecnico,id_ticket) {
        return this.knex('ticket')
            .where({ ID_TICKET: id_ticket })
            .update({ 
                ID_TECNICO:  id_tecnico
        })
    }
}
