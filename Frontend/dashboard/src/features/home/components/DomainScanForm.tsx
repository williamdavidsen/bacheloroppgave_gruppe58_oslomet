import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { normalizeDomainInput, validateDomainInput } from '../../../shared/lib/domain'

type DomainScanFormProps = {
  onSubmitDomain: (domain: string) => void
}

export function DomainScanForm({ onSubmitDomain }: DomainScanFormProps) {
  const [domain, setDomain] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalized = normalizeDomainInput(domain)
    const validationMessage = validateDomainInput(normalized)

    if (validationMessage) {
      setError(validationMessage)
      return
    }

    setError('')
    onSubmitDomain(normalized)
  }

  return (
    <Paper
      component="section"
      variant="outlined"
      sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 2, bgcolor: 'background.paper' }}
      aria-labelledby="scan-form-title"
    >
      <Typography id="scan-form-title" component="h2" variant="h6" align="center" gutterBottom sx={{ fontWeight: 700 }}>
        Analyse your security posture
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2} sx={{ maxWidth: 520, mx: 'auto' }}>
          <TextField
            id="domain-input"
            name="domain"
            label="Enter domain name"
            placeholder="e.g. firma.no"
            value={domain}
            onChange={(event) => {
              const nextValue = event.target.value
              setDomain(nextValue)
              if (error) {
                setError(validateDomainInput(nextValue))
              }
            }}
            onBlur={() => setError(validateDomainInput(domain))}
            autoComplete="off"
            required
            fullWidth
            error={Boolean(error)}
            helperText={error || 'Enter only the domain, without http:// or https://'}
          />

          {error ? <Alert severity="error">{error}</Alert> : null}

          <Button type="submit" variant="contained" size="large" sx={{ py: 1.2, mt: 0.5 }}>
            Run security scan
          </Button>
        </Stack>
      </Box>
    </Paper>
  )
}
