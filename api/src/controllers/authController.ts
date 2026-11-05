import type { Request, Response } from "express";
import * as service from "../services/authService.js";
import type { LoginInput } from "@clinica/shared/auth";

export async function login(req: Request, res: Response) {
  const dados: LoginInput = req.body;
  const secretario = await service.autenticar(dados);
  if (!secretario) {
    // Mesma mensagem para CPF inexistente e senha errada: não revela qual dos dois falhou
    return res.status(401).json({ mensagem: "CPF ou senha inválidos" });
  }
  return res.json(secretario);
}
