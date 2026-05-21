export const useAuth = () => {
  const isAuthenticated = useState<boolean>('auth.isAuthenticated', () => false)
  const user = useState<any>('auth.user', () => null)
  const token = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  })

  const login = async (credentials: any) => {
    try {
      const response = await $fetch<any>('https://backend-gold-insight.vercel.app/api/auth/login', {
        method: 'POST',
        body: credentials
      })
      
      if (response.success && response.token) {
        token.value = response.token
        isAuthenticated.value = true
        user.value = response.user
        return { success: true, message: response.message }
      }
      return { success: false, message: response.message || 'Login gagal' }
    } catch (error: any) {
      return { success: false, message: error.data?.message || error.message || 'Terjadi kesalahan saat login' }
    }
  }

  const register = async (userData: any) => {
    try {
      const response = await $fetch<any>('https://backend-gold-insight.vercel.app/api/auth/register', {
        method: 'POST',
        body: userData
      })
      
      // Mengikuti respons dari auth register
      if (response.success || response.user) {
        return { success: true, message: response.message || 'Registrasi berhasil' }
      }
      return { success: false, message: response.message || 'Registrasi gagal' }
    } catch (error: any) {
      return { success: false, message: error.data?.message || error.message || 'Terjadi kesalahan saat registrasi' }
    }
  }

  const fetchUser = async () => {
    if (!token.value) {
      isAuthenticated.value = false
      user.value = null
      return
    }

    try {
      const response = await $fetch<any>('https://backend-gold-insight.vercel.app/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      if (response.success && response.user) {
        isAuthenticated.value = true
        user.value = response.user
      } else {
        logout()
      }
    } catch (error) {
      logout()
    }
  }

  const logout = () => {
    token.value = null
    isAuthenticated.value = false
    user.value = null
    navigateTo('/login')
  }

  return {
    isAuthenticated,
    user,
    token,
    login,
    register,
    fetchUser,
    logout
  }
}
