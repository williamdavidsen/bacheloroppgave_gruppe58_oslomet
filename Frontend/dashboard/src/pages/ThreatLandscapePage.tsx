import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Navigate, useParams } from 'react-router-dom'
import { routes } from '../shared/constants/routes'

const threatContent = {
  'phishing-spoofing': {
    label: 'Phishing & spoofing',
    title: 'Reduce phishing and domain spoofing risk',
    summary:
      'Attackers often imitate trusted domains to steal credentials, redirect payments, or make malware delivery look legitimate.',
    checks: [
      'Verify SPF, DKIM, and DMARC records for the domain.',
      'Review whether DMARC is enforced with quarantine or reject.',
      'Monitor lookalike domains and suspicious sender infrastructure.',
    ],
    actions: [
      'Move DMARC gradually from monitoring to enforcement.',
      'Keep SPF records short, accurate, and free from stale senders.',
      'Use clear reporting routines for suspicious email activity.',
    ],
  },
  'weak-tls-certs': {
    label: 'Weak TLS / certs',
    title: 'Keep TLS and certificates trustworthy',
    summary:
      'Weak TLS settings, expired certificates, and poor lifecycle routines can expose users to interception and trust failures.',
    checks: [
      'Confirm that HTTPS endpoints support modern TLS versions.',
      'Check certificate validity, issuer details, and remaining lifetime.',
      'Review cipher strength and endpoint grades where provider data is available.',
    ],
    actions: [
      'Renew certificates before the final month of validity.',
      'Disable legacy TLS versions where compatibility allows it.',
      'Track certificate changes across all public endpoints.',
    ],
  },
  'missing-headers': {
    label: 'Missing headers',
    title: 'Harden browser-facing security headers',
    summary:
      'Missing HTTP security headers can make otherwise healthy sites easier to abuse through clickjacking, content injection, and browser downgrade paths.',
    checks: [
      'Inspect Strict-Transport-Security, Content-Security-Policy, and X-Content-Type-Options.',
      'Check clickjacking and referrer policy protections.',
      'Compare live headers with Mozilla Observatory results when available.',
    ],
    actions: [
      'Introduce missing headers in staging before production rollout.',
      'Start with a report-only CSP if the application has many third-party scripts.',
      'Retest after CDN, proxy, or hosting configuration changes.',
    ],
  },
} as const

type ThreatTopic = keyof typeof threatContent

function isThreatTopic(value: string | undefined): value is ThreatTopic {
  return value === 'phishing-spoofing' || value === 'weak-tls-certs' || value === 'missing-headers'
}

export function ThreatLandscapePage() {
  const { topic } = useParams()

  if (!isThreatTopic(topic)) {
    return <Navigate to={routes.threatPhishing} replace />
  }

  const content = threatContent[topic]

  return (
    <Stack spacing={3}>
      <Box>
        <Chip label={content.label} color="primary" variant="outlined" sx={{ mb: 1.5 }} />
        <Typography component="h1" variant="h4" sx={{ fontWeight: 800, color: 'secondary.dark' }}>
          {content.title}
        </Typography>
        <Typography sx={{ mt: 1, color: 'text.secondary', maxWidth: 820 }}>
          {content.summary}
        </Typography>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5}>
        <Paper variant="outlined" sx={{ p: 3, flex: 1 }}>
          <Typography component="h2" variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
            What to check
          </Typography>
          <Stack component="ul" spacing={1.2} sx={{ m: 0, pl: 2.5 }}>
            {content.checks.map((item) => (
              <Typography component="li" key={item} sx={{ color: 'text.secondary' }}>
                {item}
              </Typography>
            ))}
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, flex: 1 }}>
          <Typography component="h2" variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
            Practical next steps
          </Typography>
          <Stack component="ul" spacing={1.2} sx={{ m: 0, pl: 2.5 }}>
            {content.actions.map((item) => (
              <Typography component="li" key={item} sx={{ color: 'text.secondary' }}>
                {item}
              </Typography>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  )
}
