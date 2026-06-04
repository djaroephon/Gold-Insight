export const useAuth = () => {
  const isAuthenticated = useState<boolean>('auth.isAuthenticated', () => false)
  const user = useState<any>('auth.user', () => null)
  const token = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  })

  const login = async (credentials: any, rememberMe: boolean = false) => {
    try {
      const response = await $fetch<any>('https://backend-gold-insight.vercel.app/api/auth/login', {
        method: 'POST',
        body: credentials
      })
      
      if (response.success && response.token) {
        // Set cookie with or without expiration based on rememberMe
        const tokenCookie = useCookie<string | null>('auth_token', {
          maxAge: rememberMe ? 60 * 60 * 24 * 7 : undefined, // 7 days or session
          path: '/'
        })
        tokenCookie.value = response.token
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

  const forgotPassword = async (email: string) => {
    try {
      const response = await $fetch<any>('https://backend-gold-insight.vercel.app/api/auth/forgot-password', {
        method: 'POST',
        body: { email }
      })
      
      if (response.success) {
        return { success: true, message: response.message || 'Tautan reset kata sandi telah dikirim ke email kamu.' }
      }
      return { success: false, message: response.message || 'Gagal mengirim permintaan reset kata sandi.' }
    } catch (error: any) {
      return { success: false, message: error.data?.message || error.message || 'Terjadi kesalahan.' }
    }
  }

  const updateProfile = async (data: { name?: string; username?: string; email?: string; password?: string }) => {
    try {
      const response = await $fetch<any>('https://backend-gold-insight.vercel.app/api/auth/me', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body: data
      })
      
      if (response.success || response.user) {
        if (response.user) {
          user.value = response.user
        }
        return { success: true, message: response.message || 'Profil berhasil diperbarui.' }
      }
      return { success: false, message: response.message || 'Gagal memperbarui profil.' }
    } catch (error: any) {
      return { success: false, message: error.data?.message || error.message || 'Terjadi kesalahan.' }
    }
  }

  return {
    isAuthenticated,
    user,
    token,
    login,
    register,
    fetchUser,
    logout,
    forgotPassword,
    updateProfile
  }
}
