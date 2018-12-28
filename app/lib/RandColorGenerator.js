export function RandColorGenerator() {
    let random = (min, max) => {
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    };
    let bgc = `rgba(${random(1,155)}, ${random(1,155)}, ${random(1,155)})`;
    return bgc
}