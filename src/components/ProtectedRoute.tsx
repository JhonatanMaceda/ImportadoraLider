import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { supabase } from '../services/supabase'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({
  children,
}: Props) {

  const [loading, setLoading] =
    useState(true)

  const [authenticated,
    setAuthenticated] =
    useState(false)

  useEffect(() => {

    verificar()

  }, [])

  async function verificar() {

    const { data } =
      await supabase.auth.getSession()

    setAuthenticated(
      !!data.session
    )

    setLoading(false)

  }

  if (loading) {

    return (
      <div>
        Cargando...
      </div>
    )

  }

  if (!authenticated) {

    return (
      <Navigate
        to="/login"
      />
    )

  }

  return children

}