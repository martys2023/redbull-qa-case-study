# Red Bull QA Case Study — Test Plan

## Task 1: Device Table Filters

### Scope
Testing filter functionality on the Devices dashboard table.

### Priority
High — filters are the primary way users navigate device data.

### Approach
Filters tested individually first, then in combination to verify AND logic.
Automated using Playwright (TypeScript) for all status, core services, and
orientation filters. Metadata filters verified manually due to nested
field/value structure requiring click-through to verify results.

### Test Cases
| ID | Description | Expected Result | Actual Result | Status | Notes |
|----|-------------|-----------------|---------------|--------|-------|
| TC01 | No filters applied | 100 devices displayed | As expected | ✅ Automated | |
| TC02 | Status: Online | 34 devices | As expected | ✅ Automated | |
| TC03 | Status: Offline | 66 devices | As expected | ✅ Automated | |
| TC04 | Core Services: Up to Date | 32 devices | As expected | ✅ Automated | |
| TC05 | Core Services: Outdated | 68 devices | As expected | ✅ Automated | |
| TC06 | Orientation: Portrait | 62 devices | As expected | ✅ Automated | |
| TC07 | Orientation: Landscape | 29 devices | As expected | ✅ Automated | |
| TC08 | Combined: Offline + Up to Date | 0 devices | As expected | ✅ Automated | Tests empty state |
| TC09 | Combined: Online + Landscape | 8 devices | As expected | ✅ Automated | |
| TC10 | Combined: Outdated + Portrait | 45 devices | As expected | ✅ Automated | |
| TC11 | Combined: Offline + Outdated + Landscape | 21 devices | As expected | ✅ Automated | Three-way combination |
| TC12 | Metadata: Content Orientation filter | Correct devices shown per value | As expected | 📋 Manual | Spot-checked one result per value |
| TC13 | Metadata: POS Store Location filter | Correct devices shown per value | As expected | 📋 Manual | Spot-checked one result per value |
| TC14 | Metadata: OffP Placement filter | Correct devices shown per value | As expected | 📋 Manual | Spot-checked one result per value |
| TC15 | Metadata: IMEI LTE Device filter | Correct devices shown per value | Partially failing — see #13, #14 | 📋 Manual | (empty) option not selectable; slow load on value selection |

### Bugs Found
| ID | GitHub Issue | Description | Severity | Status |
|----|-------------|-------------|----------|--------|
| BUG-01 | #13 | IMEI LTE Device: (empty) option not selectable | Low | Logged |
| BUG-02 | #14 | IMEI LTE Device: slow load after selecting value — no loading indicator | Medium | Logged |
| BUG-03 | #15 | Square orientation exists in data but has no filter option — 9 devices permanently unfiltered | Medium | Logged |
| BUG-04 | #16 | Unavailable core services status exists in data but has no filter option | Medium | Logged |
| BUG-05 | #19 | No password validation on sign-up — password of "1" accepted | High | Logged |

### Questions for Product & Development
1. What is the expected behavior when filtering by (empty) IMEI LTE Device?
2. Is there an acceptable load time threshold for metadata filters?
3. Is the current empty state (showing only "0 devices" with no message) the intended design?
4. Should filters persist if the user navigates away and returns?
5. Are POS Store Location values 3 and 4 expected to exist in the dataset?
6. Is Placement value 3 missing intentionally?
7. Is password reset functionality planned? Currently users have no way to recover a forgotten password.

### UX Observations
- Metadata values are not visible in the table view — verification requires clicking into each device record. Consider surfacing key metadata fields as optional columns in the table view.
- No explanatory message shown when filters return zero results — only "0 devices" is displayed.

---

## Task 2: POST /api/devices/command

### Scope
Testing the new backend-to-backend endpoint for pushing commands to devices.

### Priority
High — no prior QA pass; other internal services are about to depend on this endpoint.

### Approach
No UI available — tested directly against the API using Playwright request context.
Authenticated via `POST /api/auth/signin` to obtain a Bearer token, reused across all requests.
Covered all acceptance criteria plus additional negative and security tests.

### Test Cases
| ID | Description | Expected Result | Actual Result | Status | Notes |
|----|-------------|-----------------|---------------|--------|-------|
| TC16 | Valid request with online device | 200, device appears in updated array, core_services_status is up-to-date | As expected | ✅ Automated | |
| TC17 | Request targeting offline device | Appropriate error response | 500 returned — see #17 | ✅ Automated | Test asserts current 500 behavior; should be 4xx |
| TC18 | Unsupported command_name | 400 validation error | As expected | ✅ Automated | |
| TC19 | Missing Authorization header | 401 Unauthorized | As expected | ✅ Automated | |
| TC20 | Invalid Authorization token | 401 Unauthorized | As expected | ✅ Automated | |

### Bugs Found
| ID | GitHub Issue | Description | Severity | Status |
|----|-------------|-------------|----------|--------|
| BUG-06 | #17 | Offline device command returns 500 instead of appropriate 4xx (409 Conflict recommended) | High | Logged |
| BUG-07 | #18 | Stack trace exposed in error response body | Medium | Logged |

### API Design Observations
- `POST /api/devices/command` accepts `device_id` strings but `GET /api/devices/:id` requires numeric `id` — inconsistent identification across endpoints. Consider standardizing on `device_id` for all external-facing endpoints.

### Questions for Product & Development
1. What is the intended status code for a command targeting an offline device?
2. Are additional `command_name` values planned? If so, how will the validation error message scale?

---

## Bug Triage & Release Recommendation

Next release is tomorrow. Recommended priority:

### Must Fix Before Release
| GitHub Issue | Description | Reason |
|-------------|-------------|--------|
| #17 | 500 Error for offline device | API ships tomorrow — downstream services need correct error codes to handle failures |
| #19 | No password validation | Authentication security gap — weak passwords directly enable unauthorized access |

### Fix Soon, Not Blocking
| GitHub Issue | Description | Reason |
|-------------|-------------|--------|
| #18 | Stack trace exposed | Security concern but limited blast radius (internal only) |
| #15 | Square orientation unfiltered | Functional gap — 9 devices permanently unfiltered with no workaround |
| #16 | Unavailable core services unfiltered | Functional gap — similar to Square orientation issue |

### Nice to Have
| GitHub Issue | Description | Reason |
|-------------|-------------|--------|
| #14 | Slow metadata filter | Performance improvement + loading indicator would reduce user confusion |
| #13 | IMEI (empty) not selectable | Minor UI cleanup — remove unselectable option or implement it |

Triage framework: **Severity × Blast Radius × Release Dependency**