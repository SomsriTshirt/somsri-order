import { v4 as uuidv4 } from 'uuid';

export function useGenVueKey(text: string | number) {
    const id = uuidv4()
    return `${id}-${text}`
}
