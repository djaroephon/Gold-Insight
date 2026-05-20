export const useAuth = () => {
  const isAuthenticated = useState<boolean>('auth.isAuthenticated', () => false)
  const user = useState<{ name: string; email: string } | null>('auth.user', () => null)

  const login = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    isAuthenticated.value = true
    user.value = {
      name: 'John Doe',
      email: 'john.doe@example.com'
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
  }

  return {
    isAuthenticated,
    user,
    login,
    logout
  }
}
