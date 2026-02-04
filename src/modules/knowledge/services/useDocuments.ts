import api from "@/services/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { 
  DocumentsResponse, 
  DocumentsQueryParams, 
  UploadDocumentsResponse 
} from "../types";

export const useDocuments = (params?: DocumentsQueryParams) => {
  return useQuery<DocumentsResponse>({
    queryKey: ['documents', params],
    queryFn: () => api.get('/documents/list', { params }),
  });
};

export const useUploadDocumentMutation = () => {
  return useMutation<UploadDocumentsResponse, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      return api.post("documents/upload-multiple", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    mutationKey: ["useUploadDocumentMutation"],
  });
};

export const useDeleteDocumentsMutation = () => {
  return useMutation<void, Error, number[]>({
    mutationFn: async (documentIds: number[]) => {
      return api.delete("documents/multiple", {
        data: documentIds,
      });
    },
    mutationKey: ["useDeleteDocumentsMutation"],
  });
};
