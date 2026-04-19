# Security Assessment API for SMB Customers

This project is an ASP.NET Core API for assessing the security posture of a domain. It is built as a bachelor project and is designed to give small and medium-sized business customers a simple, structured security overview based on several technical checks.

## What the project does

The API evaluates a target domain and produces a combined assessment score with grades, statuses, module-level scoring, and alerts.

The current assessment includes:

- SSL/TLS analysis
- HTTP security header analysis
- Email security analysis
- Reputation analysis
- PQC readiness analysis

## Main API modules

The API exposes dedicated endpoints for each module and one combined assessment endpoint:

- `/api/assessment/check/{domain}`
- `/api/ssl/check/{domain}`
- `/api/headers/check/{domain}`
- `/api/email/check/{domain}`
- `/api/reputation/check/{domain}`
- `/api/pqc/check/{domain}`

## Project structure

- `API/Controllers/Api` contains the REST API controllers
- `API/Services` contains the core assessment logic and external service clients
- `API/DTOs` contains request and response models
- `API/DAL` contains data access and repository code
- `Frontend/dashboard` contains the dashboard UI (React, TypeScript, Vite, Material UI)
- `Test` contains backend unit/integration tests, frontend unit tests, E2E tests, manual test plans, and reports

## Running the project

To run both the API and dashboard together, install the frontend dependencies once:

```powershell
cd Frontend\dashboard
npm install
```

Then start the dev environment from the `Frontend` folder:

```powershell
cd ..
npm run dev
```

The dev script starts the ASP.NET API on `http://localhost:5052` and Vite on `http://localhost:5173`. Vite proxies `/api` to `http://localhost:5052`; override the proxy target with `VITE_DEV_API_PROXY` in `Frontend/dashboard/.env.development` if needed.

## Running the API only

From the `API` folder:

```powershell
dotnet run --project .\API.csproj --launch-profile http
```

Swagger UI:

```text
http://localhost:5052/swagger
```

OpenAPI JSON:

```text
http://localhost:5052/swagger/v1/swagger.json
```

## Running tests

Backend tests:

```powershell
dotnet test .\Test\API.UnitTests\API.UnitTests.csproj
dotnet test .\Test\API.IntegrationTests\API.IntegrationTests.csproj
```

Frontend unit tests:

```powershell
cd Test\Frontend.UnitTests
npm install
npm test
```

End-to-end tests:

```powershell
cd Test\E2E
npm install
npm test
```

Optional batch validation against a running API:

```powershell
dotnet run --project .\Test\AssessmentBatchRunner\AssessmentBatchRunner.csproj -- http://localhost:5052 .\Test\AssessmentBatchRunner\domains.txt
```

## Notes

- The project depends on external services and network-based checks.
- Some modules use third-party APIs and HTTP/DNS lookups.
- Output quality depends on network availability and the quality of upstream data sources.

## Purpose

The goal of the project is to provide a practical API-based security assessment workflow that can be used as a basis for customer-facing evaluation, experimentation, and further development.
