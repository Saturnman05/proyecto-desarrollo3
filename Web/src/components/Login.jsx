import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue } from '@chakra-ui/react'
import { useState, useContext } from 'react'

import { API_URL } from '../constants/constantes'
import { UserContext } from '../context/user.jsx'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { setUserVal } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const loginData = {
      username,
      password
    }

    try {
      const response = await fetch(`${API_URL}api/Users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })

      if (response.ok){
        const userData = await response.json()
        setUserVal({ userId: userData.userId, userName: userData.userName, fullName: userData.fullName, password: userData.password })
        
        // redirigir con el user a la pagina de inicio
      }
    } catch (error) {
      console.error('Error al realizar la solicitud', error)
    }
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Inicia Sesión con tu cuenta</Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <form onSubmit={handleSubmit} method='post'>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Nombre de usuario</FormLabel>
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Contraseña</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Stack spacing={10}>
                <Button type="submit" bg="blue.400" color="white" _hover={{ bg: 'blue.500' }}>
                  Iniciar Sesión
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login;
