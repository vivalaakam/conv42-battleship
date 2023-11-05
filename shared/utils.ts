export function pos(x: number, y: number): number {
    return y * 10 + x;
}

export function calcPos(position: number, dx: number, dy: number): number {
    const ox = (position % 10) + dx;
    const oy = Math.floor(position / 10) + dy;

    if (ox < 0 || ox > 9 || oy < 0 || oy > 9) {
        return -1;
    }

    return pos(ox, oy);
}