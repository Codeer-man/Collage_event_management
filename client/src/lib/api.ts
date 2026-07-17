import axios, { type AxiosRequestConfig } from "axios";
import { env } from "./env";
import type { ApiEnvolve } from "./type";

const api = axios.create({
  baseURL: env.backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

function getError(error: unknown) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data.errors[0].message || error.message || "request faile"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "something went wrong";
}

export async function apiGet<T>(url: string, config?: AxiosRequestConfig) {
  try {
    const response = await api.get<ApiEnvolve<T>>(url, config);

    if (response.data.status === "error" || !response.data.data) {
      throw new Error(response.data.errors?.message || "request failed");
    }

    return response.data.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}

export async function apiPost<TResponse, TBody = unknown>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig,
) {
  try {
    const respoones = await api.post<ApiEnvolve<TResponse>>(url, body, config);

    if (respoones.data.status === "error" || !respoones.data.data) {
      throw new Error(respoones.data.errors?.message || "request failed");
    }

    return respoones.data.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}

export async function getPut<TRespons, TBody = unknown>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig,
) {
  try {
    const respones = await api.put<ApiEnvolve<TRespons>>(url, body, config);

    if (respones.data.status === "error" || !respones.data.data) {
      throw new Error(respones.data.errors?.message || "request failed");
    }

    return respones.data.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}

export async function getPatch<TRespons, TBody = unknown>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig,
) {
  try {
    const respones = await api.patch<ApiEnvolve<TRespons>>(url, body, config);

    if (respones.data.status === "error" || !respones.data.data) {
      throw new Error(respones.data.errors?.message || "request failed");
    }

    return respones.data.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}

export async function getDelete<TRespons>(
  url: string,

  config?: AxiosRequestConfig,
) {
  try {
    const respones = await api.delete<ApiEnvolve<TRespons>>(url, config);

    if (respones.data.status === "error" || !respones.data.data) {
      throw new Error(respones.data.errors?.message || "request failed");
    }

    return respones.data.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}
