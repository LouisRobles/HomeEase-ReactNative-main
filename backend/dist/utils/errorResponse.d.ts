export declare class ApiError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string);
}
export declare const errorResponse: (statusCode: number, message: string) => {
    success: boolean;
    statusCode: number;
    message: string;
    error: string;
};
//# sourceMappingURL=errorResponse.d.ts.map