import process from 'node:process';
import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';

function encrypt(pass: string): string {
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(process.env.SECRET_KEY || '92q09jwadmjid102jep0fhnna0f9').digest('hex');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(pass, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
}

function decrypt(encPass: string): string {
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(process.env.SECRET_KEY || '92q09jwadmjid102jep0fhnna0f9').digest('hex');
    const iv = encPass.slice(0, 32);
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encPass.slice(32), 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

export { encrypt, decrypt };
