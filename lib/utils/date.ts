const months = {
  '01': 'enero',
  '02': 'febrero',
  '03': 'marzo',
  '04': 'abril',
  '05': 'mayo',
  '06': 'junio',
  '07': 'julio',
  '08': 'agosto',
  '09': 'septiembre',
  '10': 'octubre',
  '11': 'noviembre',
  '12': 'diciembre'
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