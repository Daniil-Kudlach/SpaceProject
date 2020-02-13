import { Publisher } from "./share/Publisher.js";
import { EventsProcessingController } from "./animations/EventsProcessingController.js";
import { MoveAnimationsController } from "./animations/MoveAnimationsController.js";
import { StarsController } from "./objects/background/StarsController.js";
import { ObjectsGenerator } from "./objects/ObjectsGenerator.js";
import { MainMenuController } from "./menu/MainMenuController.js";


const publisher = new Publisher();
const methods = publisher.getMethods();
let eventsProcessing = new EventsProcessingController(methods);
let moveAnimation = new MoveAnimationsController(methods);
let mainMenuController = new MainMenuController(methods);
let stars = new StarsController(methods);
let generator = new ObjectsGenerator(methods);