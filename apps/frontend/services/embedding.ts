import { createApiClient, notImplemented } from "@/lib/api";

export const embeddingApi = createApiClient();

export const semanticSearch = (): never => notImplemented("Embedding");
export const indexDocument = (): never => notImplemented("Embedding");
export const getIndexedDocuments = (): never => notImplemented("Embedding");
export const removeIndexedDocument = (): never => notImplemented("Embedding");
