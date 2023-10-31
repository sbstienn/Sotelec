import config from '../config/config.js'
import knex from 'knex'
export default class detalleticketService{
    constructor(){
        this.knex = knex(config)
    }

   
    async storeDetalleTicket(detalle){
        return this.knex('detalleticket').insert(detalle)
    }
    
}


