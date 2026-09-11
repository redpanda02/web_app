import { useState } from 'react'

export function useItemForm() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
  })

  function resetForm() {
    setShowForm(false)
    setEditingId(null)
    setFormValues({ title: '', description: '' })
  }

  function startCreate() {
    resetForm()
    setShowForm(true)
  }

  function startEdit(item) {
    setEditingId(item.id)
    setFormValues({ title: item.title, description: item.description })
    setShowForm(true)
  }

  return {
    showForm,
    setShowForm,
    editingId,
    setEditingId,
    formValues,
    setFormValues,
    resetForm,
    startCreate,
    startEdit,
  }
}
