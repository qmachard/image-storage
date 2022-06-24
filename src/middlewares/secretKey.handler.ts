import { NextFunction, Request, Response } from 'express';

const secretKey = require('secret-key');

import { UnauthorizedException } from '~/utils/exceptions';

export const SecretKeyHandler = (req: Request, res: Response, next: NextFunction) => {
    let { signature } = req.query;

    if (!signature) {
        signature = req.header('X-API-SIGNATURE')
    }

    if (!signature) {
        throw new UnauthorizedException('You must provide signature.');
    }

    const [ secret, iv, timestamp ] = Buffer.from(signature as string, 'base64').toString('ascii').split('.');

    if (!secret || !iv || !timestamp) {
        throw new UnauthorizedException('You must provide signature.');
    }

    if (!secretKey.check(process.env.SECRET_KEY, secret, iv, timestamp)) {
        throw new UnauthorizedException('Secret key invalid.');
    }

    next();
};
