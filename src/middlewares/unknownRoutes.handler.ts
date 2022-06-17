import { NotFoundException } from '~/utils/exceptions';

export const UnknownRoutesHandler = () => {
    throw new NotFoundException(`Resource not found.`);
};
