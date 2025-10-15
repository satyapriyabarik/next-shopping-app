// Centralized HTTP error messages

export const ErrorMessages = {
    // ----- 4xx: Client Errors -----
    400: "Bad request — please check your input.",
    401: "Unauthorized — please log in to continue.",
    403: "Forbidden — you don’t have permission to perform this action.",
    404: "Resource not found — the requested item doesn’t exist.",
    405: "Method not allowed — invalid HTTP method.",
    408: "Request timeout — please try again.",
    409: "Conflict — the resource already exists or was modified.",
    410: "Resource gone — it’s no longer available.",
    413: "Payload too large — file or data size exceeded limit.",
    415: "Unsupported media type — invalid content type.",
    422: "Unprocessable entity — validation failed.",
    429: "Too many requests — please slow down.",

    // ----- 5xx: Server Errors -----
    500: "Internal server error — please try again later.",
    501: "Not implemented — feature not available.",
    502: "Bad gateway — upstream service error.",
    503: "Service unavailable — server temporarily overloaded or down.",
    504: "Gateway timeout — upstream service not responding.",
    507: "Insufficient storage — server ran out of space.",
    511: "Network authentication required — please authenticate to access.",
} as const;

export type ErrorCode = keyof typeof ErrorMessages;

/**
 * Get a user-friendly message for a given HTTP status code.
 */
export function getErrorMessage(status: number, fallback = "Unexpected error occurred.") {
    return ErrorMessages[status as ErrorCode] || fallback;
}
