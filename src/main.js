import {StarsController} from "./stars/StarsController.js";
import {Publisher} from "./share/Publisher.js";
import { MoveAnimationsController } from "./animations/MoveAnimationsController.js";

const publisher = new Publisher();
const methods = publisher.getMethods();
const star = new StarsController(methods);
const moveAnimations = new MoveAnimationsController(methods);