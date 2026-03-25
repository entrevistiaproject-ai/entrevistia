import { put, del, list } from "@vercel/blob";

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface FileMetadata {
  candidatoId: string;
  tipo: "cv" | "linkedin_pdf" | "foto" | "documento";
  nomeOriginal: string;
}

/**
 * Faz upload de um arquivo para o Vercel Blob
 */
export async function uploadFile(
  file: File | Blob,
  metadata: FileMetadata
): Promise<UploadResult> {
  try {
    const { candidatoId, tipo, nomeOriginal } = metadata;

    // Gera nome único para o arquivo
    const timestamp = Date.now();
    const extension = nomeOriginal.split(".").pop()?.toLowerCase() || "";
    const filename = `candidatos/${candidatoId}/${tipo}/${timestamp}.${extension}`;

    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return {
      success: true,
      url: blob.url,
    };
  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Remove um arquivo do Vercel Blob
 */
export async function deleteFile(url: string): Promise<boolean> {
  try {
    await del(url);
    return true;
  } catch (error) {
    console.error("Erro ao deletar arquivo:", error);
    return false;
  }
}

/**
 * Lista arquivos de um candidato
 */
export async function listCandidatoFiles(candidatoId: string): Promise<string[]> {
  try {
    const { blobs } = await list({
      prefix: `candidatos/${candidatoId}/`,
    });

    return blobs.map((blob) => blob.url);
  } catch (error) {
    console.error("Erro ao listar arquivos:", error);
    return [];
  }
}

/**
 * Valida o tipo de arquivo
 */
export function isValidFileType(
  filename: string,
  allowedTypes: string[]
): boolean {
  const extension = filename.split(".").pop()?.toLowerCase() || "";
  return allowedTypes.includes(extension);
}

/**
 * Valida o tamanho do arquivo (em bytes)
 */
export function isValidFileSize(size: number, maxSizeBytes: number): boolean {
  return size <= maxSizeBytes;
}

// Constantes
export const MAX_CV_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_FOTO_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_CV_TYPES = ["pdf", "docx", "doc"];
export const ALLOWED_FOTO_TYPES = ["jpg", "jpeg", "png", "webp"];
