import { api } from "~/lib/api";
import { DefaultResponse } from "../types";

export async function deletarCupom(id: number) {
  const { data } = await api.delete<DefaultResponse>(`/cupons/${id}`)

  return data
}
