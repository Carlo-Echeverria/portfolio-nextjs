const months = {
  '01': 'Enero',
  '02': 'Febrero',
  '03': 'Marzo',
  '04': 'Abril',
  '05': 'Mayo',
  '06': 'Junio',
  '07': 'Julio',
  '08': 'Agosto',
  '09': 'Septiembre',
  '10': 'Octubre',
  '11': 'Noviembre',
  '12': 'Diciembre'
}

export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return ""

  try {
    // Esperamos un formato ISO: "YYYY-MM-DD"
    const [year, month] = dateString.split('-')
    
    if (!year || !month) {
      return ""
    }

    return `${months[month as keyof typeof months]} ${year}`
  } catch (error) {
    console.error('Error formatting date:', error)
    return ""
  }
} 