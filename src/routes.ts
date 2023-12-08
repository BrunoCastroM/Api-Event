import { Router } from 'express';
import { CreateEventController } from './controllers/create/CreateEventController';
import { CreateCategoryController } from './controllers/create/CreateCategoryController';
import { CreateLocationController } from './controllers/create/CreateLocationController';

import { UpdateEventController } from './controllers/update/UpdateEventController';
import { UpdateCategoryController } from './controllers/update/UpdateCategoryController';
import { UpdateLocationController } from './controllers/update/UpdateLocationController';

import { GetEventsController } from './controllers/get/GetEventController';
import { GetCategoriesController } from './controllers/get/GetCategoryController';
import { GetLocationsController } from './controllers/get/GetLocationController';
import { GetEventsByCategoryController } from './controllers/get/GetEventsByCategoryController';
import { GetEventsByLocationController } from './controllers/get/GetEventsByLocationController';
import { GetEventsByDateController } from './controllers/get/GetEventsByDateController';
import { GetEventNameController } from './controllers/get/GetEventNameController';

import { DeleteEventController } from './controllers/delete/DeleteEventController';
import { DeleteCategoryController } from './controllers/delete/DeleteCategoryController';
import { DeleteLocationController } from './controllers/delete/DeleteLocationController';

const router = Router();

// CREATE
const createEvent = new CreateEventController();
const createCategory = new CreateCategoryController();
const createLocation = new CreateLocationController();

// UPDATE
const updateEvent = new UpdateEventController();
const updateCategory = new UpdateCategoryController();
const updateLocation = new UpdateLocationController();

//GET
const getEvents = new GetEventsController();
const getEventsByCategory = new GetEventsByCategoryController();
const getEventsByLocation = new GetEventsByLocationController();
const GetEventsByDate = new GetEventsByDateController();
const getCategories = new GetCategoriesController();
const getLocations = new GetLocationsController();
const getEventName = new GetEventNameController();

// DELETE
const deleteEvent = new DeleteEventController();
const deleteCategory = new DeleteCategoryController();
const deleteLocation = new DeleteLocationController();

// Criar dados no banco de dados (CREATE)
router.post('/event', createEvent.handle);
router.post('/category', createCategory.handle);
router.post('/location', createLocation.handle);

// Atualizar dados no banco de dados (PUT)
router.put('/event/:id', updateEvent.handle);
router.put('/category/:id', updateCategory.handle);
router.put('/location/:id', updateLocation.handle);

// Procurando dados no banco de dados (GET)
router.get('/event/:id?', getEvents.handle);
router.get('/events/category/:name', getEventsByCategory.handle);
router.get('/events/location/:name', getEventsByLocation.handle);
router.get('/events/date/:date', GetEventsByDate.handle);
router.get('/category/:id?', getCategories.handle);
router.get('/location/:id?', getLocations.handle);
router.get('/events/event/:eventName', getEventName.handle);

// Deletando dados no banco de dados (DELETE)
router.delete('/event/:id', deleteEvent.handle);
router.delete('/category/:id', deleteCategory.handle);
router.delete('/location/:id', deleteLocation.handle);

export { router };
