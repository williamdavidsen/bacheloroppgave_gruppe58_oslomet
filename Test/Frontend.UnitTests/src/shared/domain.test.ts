import { describe, expect, it } from 'vitest'
import {
  normalizeDomainInput,
  validateDomainInput,
} from '../../../../Frontend/dashboard/src/shared/lib/domain'

describe('domain input validation', () => {
  it('accepts valid domain equivalence classes', () => {
    expect(validateDomainInput('oslomet.no')).toBe('')
    expect(validateDomainInput('student.oslomet.no')).toBe('')
    expect(validateDomainInput('EXAMPLE.COM')).toBe('')
  })

  it('normalizes whitespace and casing before submission', () => {
    expect(normalizeDomainInput('  Student.OsloMet.No  ')).toBe('student.oslomet.no')
  })

  it('rejects invalid domain equivalence classes', () => {
    expect(validateDomainInput('')).toBe('Domain is required.')
    expect(validateDomainInput('example')).toContain('valid domain')
    expect(validateDomainInput('example..com')).toContain('valid domain')
    expect(validateDomainInput('user@example.com')).toContain('valid domain')
    expect(validateDomainInput('example!.com')).toContain('valid domain')
  })

  it('rejects protocol input with a specific message', () => {
    expect(validateDomainInput('http://example.com')).toContain('only the domain name')
    expect(validateDomainInput('https://example.com')).toContain('only the domain name')
  })
})
