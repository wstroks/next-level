import express from 'express';
import knex from './database/connection';
import multer from 'multer';
import config from './config/multer';
import { celebrate, Joi } from 'celebrate';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const uploads =multer(config);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/',(request, response)=>{
    return response.json('Api next');
});

routes.get('/items',itemsController.index );
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post('/points', uploads.single('image'), celebrate({
    body:  Joi.object().keys({
        name: Joi.string().required(),
        email:Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
    })
}),pointsController.create);


export default routes;