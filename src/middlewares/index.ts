import express from 'express';
import { get , merge} from 'lodash';

import {getUserBySessionToken} from '../models/User';

export const isAuthenticated = async  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        // console.log(req.cookies['DEVS-AUTH']);

        const sessionToken = req.cookies['DEVS-AUTH'];

        if(!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        
        if(!existingUser) {
            res.sendStatus(403);
        }

        merge(req, {identity: existingUser});

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}