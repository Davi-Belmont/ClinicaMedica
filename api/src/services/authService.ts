import bcrypt from "bcryptjs";
import * as secretarioRepository from "../repositories/secretarioRepository.js";
import type { LoginInput } from "@clinica/shared/auth";

// Devolve o secretário (sem senha) se CPF e senha conferem; senão, null
export async function autenticar({ cpf, senha }: LoginInput) {
  const secretario = await secretarioRepository.findByCpfComSenha(cpf);
  if (!secretario || !secretario.senha) {
    return null;
  }

  const senhaConfere = await bcrypt.compare(senha, secretario.senha);
  if (!senhaConfere) {
    return null;
  }

  const { senha: _, ...secretarioSemSenha } = secretario;
  return secretarioSemSenha;
}
