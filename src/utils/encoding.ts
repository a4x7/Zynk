function encoder(id: number): string {
    const chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ';
    let encodedStr: string = '';
    while(id !== 0){
        const remainder: number = id % 62;
        encodedStr += chars[remainder];
        id = Math.floor(id / 62);
    }
    return encodedStr;
}

function decoder(str: string): number {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ';
    let id = 0;
    for(let i = 0; i !== str.length; i++) {
        id += chars.indexOf(str[i]!)*Math.pow(62, i);
    }
    return id;
}

export { encoder, decoder };
