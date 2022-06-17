export function getFilepath(filename: string): string {
    const a = filename.substring(0, 1);
    const b = filename.substring(1, 2);
    const c = filename.substring(2, 3);

    return `${process.env.IMAGE_STORAGE}/${a}/${b}/${c}/${filename}`;
}
