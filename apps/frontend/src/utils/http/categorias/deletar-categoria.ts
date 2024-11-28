import { api } from "~/lib/api";
import { DefaultResponse } from "../types";

export async function deletarCategoria(id: number) {
  const { data } = await api.delete<DefaultResponse>(`/categorias/${id}`)

  return data
}
