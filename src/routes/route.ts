import { FaceRecognitionController } from './../controllers/face-recognition.controller';
import { Router } from "express";

import upload from "../utils/upload.on.memory";
import { UserController } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/authorization";
import { DevicesController } from "../controllers/device.controller";
import { VisitorController } from './../controllers/visitor.controller';

export const route = Router();

const userController = new UserController();
const deviceController = new DevicesController();
const visitorController = new VisitorController();
const faceRecognitionController = new FaceRecognitionController();

// authentication routes
route.post("/register", userController.register.bind(userController));
route.post("/login", userController.login.bind(userController));
route.post("/logout", authenticateToken, userController.logout.bind(userController));
route.post("/refresh-token", userController.refreshToken.bind(userController));
route.get("/me", authenticateToken, userController.whoami.bind(userController));


// user routes
route.get("/users", authenticateToken, userController.list.bind(userController));
route.get("/users/:id", authenticateToken, userController.getUserById.bind(userController));
route.post("/users", authenticateToken, userController.register.bind(userController));
route.put("/users/:id", authenticateToken, userController.update.bind(userController));
route.delete("/users/:id", authenticateToken, userController.delete.bind(userController));

// device routes
route.get("/devices", authenticateToken, deviceController.list.bind(deviceController));
route.get("/devices/:id", authenticateToken, deviceController.show.bind(deviceController));
route.post("/devices", authenticateToken, deviceController.create.bind(deviceController));
route.put("/devices/:id", authenticateToken, deviceController.update.bind(deviceController));
route.delete("/devices/:id", authenticateToken, deviceController.delete.bind(deviceController));

// visitor routes
route.get('/visitors', authenticateToken, visitorController.list);
route.get('/visitors/:id', authenticateToken, visitorController.show);
route.post('/visitors', authenticateToken, upload.single('img_base64'), visitorController.create);
route.put('/visitors/:id', authenticateToken, upload.single('img_base64'), visitorController.update);
route.delete('/visitors/:id', authenticateToken, visitorController.delete);

// face recognition routes
route.post('/dataUpload', upload.single('imgBase64'), faceRecognitionController.create);
route.post('/getPersonList', faceRecognitionController.list);
route.post('/getPersonInfo', faceRecognitionController.info);

// visitor records
route.get('/visitor-records', authenticateToken, faceRecognitionController.listVisitorRecords);

export default route;