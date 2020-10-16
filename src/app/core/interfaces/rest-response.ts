
export interface IRESTResponse<T = any> {
    count: number,
    next: number,
    previous: number,
    results: T[]
}
