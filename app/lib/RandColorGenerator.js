export function RandColorGenerator() {
    let random = (min, max) => {
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    };
    return `rgba(${random(100, 255)}, ${random(100, 255)}, ${random(100, 255)})`;
}