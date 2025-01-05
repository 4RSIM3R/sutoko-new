export type Base<T> = {
    prev_page?: number;
    items: T;
    current_page?: number;
    next_page?: number;
}