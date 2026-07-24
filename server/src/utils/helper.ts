import { AppError } from "./AppError.js";

export function textRequired(
  value: unknown,
  message: string,
  statusCode = 400,
) {
  if (!String(value)) {
    throw new AppError(statusCode, message);
  }
}

export function numberRequires(
  value: unknown,
  message: string,
  statusCode = 400,
) {
  if (!Number(value)) {
    throw new AppError(statusCode, message);
  }
}
export function booleanRequires(
  value: unknown,
  message: string,
  statusCode = 400,
) {
  if (!Boolean(value)) {
    throw new AppError(statusCode, message);
  }
}

export function requireFound<T>(
  value: T | null,
  message: string,
  statusCode = 404,
) {
  if (!value) {
    throw new AppError(statusCode, message);
  }

  return value;
}
