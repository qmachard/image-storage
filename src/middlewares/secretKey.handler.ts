import { NextFunction, Request, Response } from 'express';

const secretKey = require('secret-key');

import { UnauthorizedException } from '~/utils/exceptions';

export const SecretKeyHandler = (req: Request, res: Response, next: NextFunction) => {
    const secret = req.header('X-API-SECRET');
    const iv = req.header('X-API-IV');
    const timestamp = req.header('X-API-TIMESTAMP');

    if (!secret || !iv || !timestamp) {
        throw new UnauthorizedException('You must provide secret.');
    }

    if (!secretKey.check(process.env.SECRET_KEY, secret, iv, timestamp)) {
        throw new UnauthorizedException('Secret key invalid.');
    }

    next();
}
