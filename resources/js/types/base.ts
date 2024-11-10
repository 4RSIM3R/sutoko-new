export type Base<T> = {
    prev_page?: number;
    items: T;
    next_page?: number;
}