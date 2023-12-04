import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

function controllerRouting(app) {
	
	const router = express.Router();
	app.use('/', router);

	// App Controller

	// should return if Redis is alive and if the DB is alive
	router.get('/status', (req, res) => {
		AppController.getStatus(req, res);
	});

	// should return the number of users and files in DB
	router.get('/stats', (req, res) => {
		AppController.getStats(req, res);
	});

	// User Controller

	// should create a new user in DB
	router.post('/users', (req, res) => {
		UsersController.postNew(req, res);
	});

	// should retrieve the user base on the token used
	router.get('/users/me', (req, res) => {
		UsersController.getMe(req, res);
	});

	// Auth Controller

	// should sign-in the user by generating a new authentication token
	router.get('/connect', (req, res) => {
		AuthController.getConnect(req, res);
	});

	// should sign-out the user based on the token
	router.get('/disconnect', (req, res) => {
		AuthController.getDisconnect(req, res);
	});

	// Files Controller

	// should create a new file in DB and in disk
	router.post('/files', (req, res) => {
		FilesController.postUpload(req, res);
	});

	//retrieve file document based on id

	router.get('/files/:id', (req, res) => {
		FilesController.getShow(req, res);
	})

	//retrieve all user file documents based on a parent id and by pagination
	router.get('/files', (req, res) => {
		FilesController.getIndex(req, res);
	});

	//publish a file
	router.put('/files/:id/publish', (req, res) => {
		FilesController.putPublish(req, res);
	});

	//unpublish a file
	router.put('/files/:id/unpublish', (req, res) => {
		FilesController.putUnpublish(req, res);
	});

	//get file data
	router.get('/files/:id/data', (req, res) => {
		FilesController.getFile(req, res);
	});
}

export default controllerRouting;
