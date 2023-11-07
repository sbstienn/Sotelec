import {createHash,isValidPassword} from '../utils.js'

import {Router, json} from 'express'
const router = Router()

const folder = 'tecnicos'

import TecnicosService from '../services/tecnicos.services.js'
import TicketService from '../services/tickets.service.js'
const Tecnicos = new TecnicosService()
const Tickets = new TicketService()

//ok//
router.get('/',async(req,res) => {
    try{
        const tecnicos = await Tecnicos.getTecnicos()
        const tickets = await Tickets.getAllTickets()
        const obj = {
            tecnicos,
            tickets
        }
        return res.status(200).json(obj)
    } catch(error) {

        console.log(error)
    }
})

router.get('/logout',async(req,res) =>{
    try {
        req.session.destroy(err =>{
            if(err){
                return res.status().send({success:false,message:'error'})
            }
            res.redirect('/')
        })
    } catch (error) {
        
    }
})

router.post('/login',async(req,res)=> {
    try{
        const {CORREOTECNICO,PASSWORD} = req.body
        if(!CORREOTECNICO || !PASSWORD)
            return res.status(400).json({success:false,message:'Debe ingresar correo y contraseña'})
        const tecnico = await Tecnicos.getTecnicoByEmail(CORREOTECNICO)
        if((tecnico.length > 0 && isValidPassword(tecnico[0],PASSWORD))){
            req.session.tecnico= {
                NOMBRETECNICO:tecnico[0].NOMBRETECNICO,
                ID_TECNICO:tecnico[0].ID_TECNICO,
                CORREOTECNICO:tecnico[0].CORREOTECNICO,
                PERFIL:tecnico[0].PERFIL
            }
            return res.cookie('kookieSession',{maxAge:60*60*1000,httpOnly:true}).send({success:true,tecnico})
        }else{
            return res.status(400).json({success:false,message:'Error Al Iniciar Sesión'})
        }
    }catch (error){
        console.log(error)
    }
})

router.get('/create',async (req,res)=>{
    res.render(`${folder}/create`,{sessionUSER:req.session.tecnico})
})

//ok//
router.post('/',async(req,res) => {
    try {
        const  {PASSWORD,CORREOTECNICO, NOMBRETECNICO, PERFIL} = req.body
        const obj = {PASSWORD:createHash(PASSWORD),CORREOTECNICO,NOMBRETECNICO,PERFIL}
        const respuesta = await Tecnicos.addTecnicos(obj)
        return res.status(200).json({success:true,message:respuesta})
    } catch (err) {
        console.log('error ' + err)
    }
})
//ok
router.get('/:id', async(req,res) => {
    try {
        const id = req.params.id
        const newTecnicos = await Tecnicos.getTecnicosById(id);
        if (newTecnicos) {
            return res.status(200).json(newTecnicos);
        } else {
            return res.status(404).json({ message: 'Técnico no encontrado' });
        }
        
    } catch (err) {
        console.log('error' + err)
    }
})


router.delete('/:id',async(req,res) => {
    try {
        const id = req.params.id
        const respuesta = await Tecnicos.deleteTecnicos(id)  
        return res.status(200).json(respuesta)     
    } catch (err) {
        console.log('error ' + err)
    }
})
                                                                                                                                  
router.put('/:id',async(req,res) => {
    try {
        const id = req.params.id
        const obj = req.body
        const respuesta = await Tecnicos.updateTecnicos(id,obj)    
        return res.status(200).json(respuesta)
    } catch (err) {
        console.log('error ' + err)
    }
})
router.get('/ticket/:id',async(req,res) => {
    try{
        const id = req.params.id
        const data = await Tecnicos.getTicketTecnicos(id)
        return res.render(`${folder}/ticketstecnico`,{data,sessionUSER:req.session.tecnico})
    } catch(error) {

        console.log(error)
    }
})



export default router