import { useState, useEffect } from 'react'

interface CountdownValues {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function useCountdown(targetDate: string): CountdownValues {
  const [values, setValues] = useState<CountdownValues>(() => calc(targetDate))

  useEffect(() => {
    const id = setInterval(() => {
      setValues(calc(targetDate))
    }, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return values
}

function calc(target: string): CountdownValues {
  const diff = Math.max(0, new Date(target).getTime() - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}
