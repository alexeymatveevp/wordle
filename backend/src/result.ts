export interface Result<T> {
    success: boolean;
    error?: string;
    data?: T;
}

export const successResult = <T>(data: T): Promise<Result<T>> => new Promise(resolve => resolve({
    success: true,
    data,
}));
export const errorResult = <T>(error: string): Promise<Result<T>> => new Promise(resolve => resolve({
    success: false,
    error,
}));