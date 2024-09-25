import { FormEvent, useState, useRef } from 'react'

function App(): JSX.Element {
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string>('')
  const form = useRef<HTMLFormElement>(null)

  const handleCalculate = (): void => {
    if (!form.current) return

    const formData = new FormData(form.current)
    const last = formData.get('last-month') as string
    const current = formData.get('current-month') as string
    const checked = formData.get('percentage') === 'on'

    console.log(`${last} ${current} ${checked}`)
    if (!last && !current) return

    let eq: number = (Number(last) - Number(current)) / Number(last)

    if (isNaN(eq)) {
      setError('Valores não são números')
      return
    } else {
      setError('')
    }

    if (checked) eq *= 100

    setResult(eq)
  }

  const clearInputs = (): void => {
    if (!form.current) return

    form.current.reset()
    setResult(null)
    setError('')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    handleCalculate()
  }

  const difference = (): number => {
    if (!form.current) return 0

    const formData = new FormData(form.current)
    const last = Number(formData.get('last-month'))
    const current = Number(formData.get('current-month'))

    return last - current
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} ref={form}>
        <div>
          <label htmlFor="last-month">Mês passado: </label>
          <input type="text" name="last-month" />
        </div>
        <div>
          <label htmlFor="current-month">Mês atual: </label>
          <input type="text" name="current-month" />
        </div>
        <div>
          <label htmlFor="percentage">Porcentagem? </label>
          <input type="checkbox" name="percentage" />
        </div>
        <button type="submit">Calcular</button>
        <input type="button" value="clear" onClick={clearInputs} />
      </form>
      {result !== null && (
        <div className="result-wrapper">
          <h1>
            Resultado: {result.toFixed(2)}
            {(form.current?.elements?.namedItem('percentage') as HTMLInputElement).checked && '%'}
          </h1>
          <h1>Diferença {difference()}</h1>
        </div>
      )}
      {error && <h1>{error}</h1>}
    </div>
  )
}

export default App
