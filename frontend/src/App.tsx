import { useState } from 'react'
import { Center } from '@mantine/core'
import { LoginPage } from './pages/LoginPage.tsx'
import { CadastroSecretarioPage } from './pages/CadastroSecretarioPage.tsx'

function App() {
  const [tela, setTela] = useState<'login' | 'cadastro'>('login')

  return (
    <Center mih="100vh" bg="gray.1" p="md">
      {tela === 'login' ? (
        <LoginPage aoIrParaCadastro={() => setTela('cadastro')} />
      ) : (
        <CadastroSecretarioPage aoVoltarParaLogin={() => setTela('login')} />
      )}
    </Center>
  )
}

export default App