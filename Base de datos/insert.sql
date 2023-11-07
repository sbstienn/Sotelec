INSERT INTO `usuario`(`ID_USUARIO`, `AREA`, `CORREOUSUARIO`, `NOMBREUSUARIO`) VALUES 
(NULL,'redes','andresrojas@gmail.com','Andrés Rojas'),
(NULL,'hardware','martafernandez@gmail.com','Marta Fernández'),
(NULL,'software','sergioruiz@gmail.com','Sergio Ruiz'),
(NULL,'redes','luisacosta@gmail.com','Luisa Costa'),
(NULL,'hardware','josehernandez@gmail.com','José Hernández');

INSERT INTO `tecnico`(`ID_TECNICO`, `PASSWORD`, `CORREOTECNICO`, `NOMBRETECNICO`, `PERFIL`) VALUES 
(NULL,'','','NO ASIGNADO',''),
(NULL,'$2b$10$C8IEta677cZ./QoHhHWCte7zTVpH6UcVo9f90JyCtFKy5tBm78E8i','anagallego@gmail.com','Ana Gallego','Técnico'),
(NULL,'$2b$10$C8IEta677cZ./QoHhHWCte7zTVpH6UcVo9f90JyCtFKy5tBm78E8i','jorgemartinez@gmail.com','Jorge Martínez','Supervisor'),
(NULL,'$2b$10$C8IEta677cZ./QoHhHWCte7zTVpH6UcVo9f90JyCtFKy5tBm78E8i','estherlopez@gmail.com','Esther López','Técnico'),
(NULL,'$2b$10$C8IEta677cZ./QoHhHWCte7zTVpH6UcVo9f90JyCtFKy5tBm78E8i','robertogomez@gmail.com','Roberto Gómez','Técnico'),
(NULL,'$2b$10$C8IEta677cZ./QoHhHWCte7zTVpH6UcVo9f90JyCtFKy5tBm78E8i','aliciatorres@gmail.com','Alicia Torres','Técnico');

INSERT INTO `ticket`(`ID_TICKET`, `ID_TECNICO`, `ID_USUARIO`, `ASUNTO`, `DESCRIPCION`, `FECHATICKET`) VALUES 
(NULL,1,1,'Problema de impresora','La impresora no imprime','2023-09-10'),
(NULL,1,4,'Problema con el sistema operativo','No inicia el sistema','2023-09-11'),
(NULL,1,5,'Problema de hardware','El monitor no enciende','2023-09-12'),
(NULL,1,3,'Error de software','Error al guardar archivos','2023-09-13'),
(NULL,1,2,'Problema de conexión','No se puede conectar a internet','2023-09-14');

INSERT INTO `estadoticket`(`ID_ESTADO`, `ID_TICKET`, `ESTADO`) VALUES 
(NULL,1,'En espera'),
(NULL,2,'Cerrado'),
(NULL,3,'En proceso'),
(NULL,4,'Cerrado'),
(NULL,5,'En proceso');

INSERT INTO `detalleticket`(`ID_DETALLETICKET`, `ID_TICKET`, `COMENTARIOS`, `FECHADETALLETICKET`) VALUES 
(NULL,1,'Se reemplazó el cartucho de tinta.','2023-09-11'),
(NULL,2,'Se reinstaló el sistema operativo y ahora inicia correctamente.','2023-09-12'),
(NULL,3,'Se reemplazó la tarjeta gráfica y el monitor funciona correctamente.','2023-09-13'),
(NULL,4,'Se solucionó el problema de software.','2023-09-14'),
(NULL,5,'Se revisó la configuración de red y se solucionó el problema.','2023-09-15');
