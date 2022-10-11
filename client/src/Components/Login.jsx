import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useEffect } from 'react'

const Login = ({
  state,
  setState,
  toast,
  findUser,
  fuSt: { loading, error, data }
}) => {
  const setEstado = ({ id, value }) => {
    if (value.length > 7) {
      return
    }
    const valid = state.cuenta?.length >= 4 && state.pass?.length >= 4
    setState({ ...state, [id]: value, valid })
  }

  const validaUser = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Buscando',
      detail: 'Login enviado'
    })

    findUser({
      variables: { usuario: state.cuenta, password: state.pass }
    })
  }

  useEffect(() => {
    if (!loading) {
      if (error) {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Url no disponible',
          life: 3000
        })
      } else {
        if (data?.findUser.length) {
          // console.log(data.findUser[0].token)
          if (state.valid) {
            toast.current.show({
              severity: 'success',
              summary: 'Cuenta',
              detail: 'Bienvenido',
              life: 3000
            })
            setState({
              ...state,
              pass: '',
              valid: false,
              entro: true,
              showLogin: false,
              token: data.findUser[0].token
            })
          }
        } else {
          toast.current.show({
            severity: 'info',
            summary: 'Cuenta',
            detail: 'Revisar su cuenta',
            life: 3000
          })
        }
      }
    }
  }, [loading, error, data, state.token])

  return (
    <div className='card'>
      <h5>Cuenta y Password</h5>
      <InputText
        id='cuenta'
        className='p-inputtext-sm block mb-2'
        keyfilter={/^[a-z0-9]+$/i}
        value={state.cuenta || ''}
        onChange={(e) => setEstado(e.target)}
        tooltip='Cuenta'
        placeholder='Cuenta'
      />
      <InputText
        id='pass'
        type='password'
        className='p-inputtext-sm block mb-2'
        keyfilter={/^[a-z0-9]+$/i}
        value={state.pass || ''}
        onChange={(e) => setEstado(e.target)}
        tooltip='Password'
        placeholder='Password'
      />
      <Button
        className='w3-button w3-green w3-border'
        disabled={loading || !state.valid}
        onClick={validaUser}
      >
        {loading ? 'Cargando...' : 'Aceptar'}
      </Button>
      <Button
        icon='pi pi-times'
        className='p-button-rounded p-button-danger p-button-text'
        aria-label='Cancel'
        onClick={() =>
          setState({ ...state, showLogin: false, pass: '', valid: false })}
      />
    </div>
  )
}

export default Login
