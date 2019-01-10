export function RandColorGenerator() {
    let random = (min, max) => {
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    };
    return {
        r: random(100,255),
        g: random(100,255),
        b: random(100,255)
    };
}