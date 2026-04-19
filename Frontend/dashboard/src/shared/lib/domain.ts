const domainPattern = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,63}$/

export function normalizeDomainInput(value: string): string {
  return value.trim().toLowerCase()
}

export function validateDomainInput(value: string): string {
  const normalized = normalizeDomainInput(value)

  if (!normalized) {
    return 'Domain is required.'
  }

  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    return 'Please enter only the domain name, for example firma.no'
  }

  if (!domainPattern.test(normalized)) {
    return 'Please enter a valid domain like example.com'
  }

  return ''
}
