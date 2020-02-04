import {StarsController} from "./stars/StarsController.js";
import {Publisher} from "./share/Publisher.js";
import { MoveAnimationsController } from "./animations/MoveAnimationsController.js";
import { UserObjectController } from "./objects/UserObjectController.js";

const publisher = new Publisher();
const methods = publisher.getMethods();
const star = new StarsController(methods);
const moveAnimations = new MoveAnimationsController(methods);
// const userObject = new UserObjectController(methods);