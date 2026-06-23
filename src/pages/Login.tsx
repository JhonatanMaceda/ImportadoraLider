import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { supabase } from '../services/supabase'

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  async function login() {

    setLoading(true)

    const { error } =
      await supabase.auth.signInWithPassword({

        email,
        password

      })

    if (error) {

      alert(
        'Credenciales incorrectas'
      )

      setLoading(false)

      return
    }

    navigate('/admin-panel-2026')

  }

  return (

    <div
      className="
      min-h-screen
      flex
      justify-center
      items-center
    "
    >

      <div
        className="
        w-full
        max-w-md
        p-8
        border
        rounded-xl
      "
      >

        <h1
          className="
          text-3xl
          font-bold
          mb-6
        "
        >
          Login Admin
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e =>
            setEmail(e.target.value)
          }
          className="
          w-full
          border
          p-3
          mb-4
          rounded
        "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e =>
            setPassword(e.target.value)
          }
          className="
          w-full
          border
          p-3
          mb-4
          rounded
        "
        />

        <button
          onClick={login}
          disabled={loading}
          className="
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-lg
        "
        >
          {loading
            ? 'Ingresando...'
            : 'Ingresar'}
        </button>

      </div>

    </div>

  )
}

