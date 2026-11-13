import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../services/api'
import { useAuthStore } from '../../../store/authStore'
import type { LoginRequest, LoginResponse } from '../../../types/auth'

export function useLogin() {
  const setUser = useAuthStore((s) => s.setUser)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: LoginRequest) =>
      api.post<LoginResponse>('/api/auth/login', data).then((r) => r.data),
    onSuccess: (data) => {
      setUser(data)
      navigate('/', { replace: true })
    },
  })
}
