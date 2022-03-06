import {Router, Request,Response} from "express"
import { ensureAutheticated } from "./middwares/ensureAutheticated";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import {CreateUserController} from "./useCases/createUser/CreateUserController";
import {RefreshTokenUserController} from "./useCases/refreshTokenUser/RefreshTokenUserController"

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/refresh-token", refreshTokenUserController.handle);

router.get("/courses", ensureAutheticated, (req: Request, res: Response)=>{
   return res.json ([
    {id: 1, name: "NodeJS"},
   ]);

});




export{router};