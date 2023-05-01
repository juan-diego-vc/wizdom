export function toPixels(size : string) : number {
    if(size.startsWith('rem')){
        let rem = Number(size.replace('rem',''))
        let res = rem * Number(getComputedStyle(document.documentElement).fontSize)
        return res
    }
    return 0
}

export function capitalize(text: string) : string {
    return text[0].toLocaleUpperCase() + text.slice(1)
}

export function rand(a : number, b : number) : number{
    let dif = b - a
    return Math.floor(Math.random() * dif) + a
}

export function randomId(length = 16): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
  
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
}