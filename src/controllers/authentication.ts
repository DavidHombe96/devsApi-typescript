import { Response , Request} from "express";
import { authenticationSignature, randomHash } from "../helpers";
import { createUser, getUserByEmail } from '../models/User';

export const login = async (req:Request, res:Response) => {
    try {

        const { email, password } = req.body;

        if(!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password '); 

        if(!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authenticationSignature(user.authentication.salt, password);

        if(user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        const salt = randomHash();
        user.authentication.sessionToken = authenticationSignature(salt, user._id.toString());


        await user.save();

        res.cookie('DEVS-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/'});

        return res.sendStatus(200).json(user).end();

    } catch (error) {
        console.log("Error: " + error);
        return res.sendStatus(400);
    }
}

export const register = async (req: Request, res: Response) => {

    try {
        const { email, password, username } = req.body;

        if(!email || !username||!password) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.json({
                message: "email already exists",
            });
        }

        const salt =  randomHash();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authenticationSignature(salt, password),
            }
        });

        return res.status(200).json({ success: true , user}).end();


    } catch(error) {
        console.log("Error: " + error);
        return res.sendStatus(400);
    }
}