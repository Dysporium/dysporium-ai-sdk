import { useState, useEffect, useCallback } from 'react'
import type { ModelId } from '../types'
import { DEFAULT_MODEL } from '../constants/models'

const MODEL_STORAGE_KEY = 'dysporium-selected-model'

export function useModel() {
  const [model, setModelState] = useState<ModelId>(() => {
    const saved = localStorage.getItem(MODEL_STORAGE_KEY)
    return (saved as ModelId) || DEFAULT_MODEL
  })

  useEffect(() => {
    localStorage.setItem(MODEL_STORAGE_KEY, model)
  }, [model])

  const setModel = useCallback((newModel: ModelId) => {
    setModelState(newModel)
  }, [])

  return {
    model,
    setModel,
  }
}


