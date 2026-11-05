import { useState } from 'react'
import { Alert, Anchor, Button, Paper, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import axios from 'axios'
import { cadastrarSecretario } from '../services/api.ts'

export function CadastroSecretarioPage({ aoVoltarParaLogin }: { aoVoltarParaLogin: () => void }) {
  // O que a pessoa digitou
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  // O que vamos mostrar na tela
  const [erro, setErro] = useState('')
  const [erroNome, setErroNome] = useState('')
  const [erroCpf, setErroCpf] = useState('')
  const [erroTelefone, setErroTelefone] = useState('')
  const [erroEmail, setErroEmail] = useState('')
  const [erroSenha, setErroSenha] = useState('')
  const [erroConfirmarSenha, setErroConfirmarSenha] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function cadastrar() {
    // Apaga as mensagens da tentativa anterior
    setErro('')
    setErroNome('')
    setErroCpf('')
    setErroTelefone('')
    setErroEmail('')
    setErroSenha('')
    setErroConfirmarSenha('')
    setSucesso('')

    // Conferência feita na tela: se não bate, para aqui e não chama a API
    if (senha !== confirmarSenha) {
      setErroConfirmarSenha('As senhas não conferem')
      return
    }

    setCarregando(true)

    try {
      const secretario = await cadastrarSecretario(nome, cpf, telefone, email, senha)
      setSucesso(`${secretario.nome} foi cadastrado(a) com sucesso!`)

      // Limpa os campos
      setNome('')
      setCpf('')
      setTelefone('')
      setEmail('')
      setSenha('')
      setConfirmarSenha('')
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        // A API respondeu com erro (400)
        const dados = e.response.data
        setErro(dados.mensagem)

        // No erro 400 de validação, a API manda uma mensagem para cada campo
        if (dados.detalhes) {
          for (const detalhe of dados.detalhes) {
            if (detalhe.campo === 'nome') setErroNome(detalhe.mensagem)
            if (detalhe.campo === 'cpf') setErroCpf(detalhe.mensagem)
            if (detalhe.campo === 'telefone') setErroTelefone(detalhe.mensagem)
            if (detalhe.campo === 'email') setErroEmail(detalhe.mensagem)
            if (detalhe.campo === 'senha') setErroSenha(detalhe.mensagem)
          }
        }
      } else {
        // A API nem respondeu
        setErro('Não foi possível conectar à API. Ela está rodando?')
      }
    }

    setCarregando(false)
  }

  return (
    <Paper withBorder shadow="md" p="xl" radius="md" w="100%" maw={400}>
      <Text c="blue" fw={700} size="sm">Clínica Médica</Text>
      <Title order={2}>Cadastrar secretário</Title>
      <Text c="dimmed" size="sm" mb="lg">Preencha os dados para criar a conta</Text>

      <form
        onSubmit={(evento) => {
          evento.preventDefault()
          cadastrar()
        }}
      >
        <Stack>
          {sucesso && <Alert color="green">{sucesso}</Alert>}
          {erro && <Alert color="red">{erro}</Alert>}

          <TextInput
            label="Nome"
            placeholder="Nome completo"
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
            error={erroNome}
          />
          <TextInput
            label="CPF"
            placeholder="Somente números"
            value={cpf}
            onChange={(evento) => setCpf(evento.target.value)}
            error={erroCpf}
          />
          <TextInput
            label="Telefone"
            placeholder="DDD + número, somente números"
            value={telefone}
            onChange={(evento) => setTelefone(evento.target.value)}
            error={erroTelefone}
          />
          <TextInput
            label="E-mail"
            placeholder="Opcional"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            error={erroEmail}
          />
          <PasswordInput
            label="Senha"
            placeholder="Mínimo de 8 caracteres"
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
            error={erroSenha}
          />
          <PasswordInput
            label="Confirmar senha"
            placeholder="Repita a senha"
            value={confirmarSenha}
            onChange={(evento) => setConfirmarSenha(evento.target.value)}
            error={erroConfirmarSenha}
          />

          <Button type="submit" loading={carregando}>Cadastrar</Button>

            <Text size="sm" ta="center">
            Já tem conta?{' '}
            <Anchor component="button" type="button" onClick={aoVoltarParaLogin}>
                Entrar
            </Anchor>
            </Text>
          
        </Stack>
      </form>
    </Paper>
  )
}