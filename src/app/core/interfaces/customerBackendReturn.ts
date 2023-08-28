export interface CustomerBackendReturn<T> {
    status: number;
    message: string;
    data: T;
}
