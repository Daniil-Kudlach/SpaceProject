import { Publisher } from "./share/Publisher.js";
import { EventsProcessingController } from "./animations/EventsProcessingController.js";
import { MoveAnimationsController } from "./animations/MoveAnimationsController.js";
import { UserObjectController } from "./objects/user/UserObjectController.js";
import { StarsController } from "./objects/background/StarsController.js";
import { ObjectsGeneratorController } from "./objects/ObjectsGeneratorController.js";

const publisher = new Publisher();
const methods = publisher.getMethods();
const eventsProcessing = new EventsProcessingController(methods);
const moveAnimation = new MoveAnimationsController(methods);
const stars = new StarsController(methods);
const generator = new ObjectsGeneratorController(methods);
const userObject = new UserObjectController(methods);