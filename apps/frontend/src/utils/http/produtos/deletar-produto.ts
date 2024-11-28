import { api } from "~/lib/api";
import { DefaultResponse } from "../types";

export async function deletarProduto(id: number) {
  const { data } = await api.delete<DefaultResponse>(`/produtos/${id}`)

  return data
}
