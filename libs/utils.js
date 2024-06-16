import crypto from 'crypto';

export function generateSlat(){
    return crypto.randomBytes(128).toString('hex');
}