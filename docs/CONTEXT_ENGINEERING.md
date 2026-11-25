
# CONTEXT ENGINEERING
## NEXUS-COMMERCE — E-Commerce Website with Mini CRM

## 1. Introduction

Context Engineering is the process of providing an AI system with the right information, instructions, requirements, and supporting material to help it produce accurate and relevant results.

In software development, an AI assistant needs more than a simple task description. It may also need information about the existing code, programming languages, project structure, database, errors, and expected behavior.

In NEXUS-COMMERCE, context was organized around the existing application and its development requirements.

## 2. Project Background

NEXUS-COMMERCE is an E-Commerce Website with a Mini Customer Relationship Management (CRM) System.

The application provides two main areas:

### Customer Area

- Homepage and product catalog.
- Product search.
- Category filtering.
- Product details.
- Shopping cart.
- Quantity management.
- Checkout.
- Order confirmation.

### Administrative Area

- Admin authentication.
- Dashboard statistics.
- Customer directory.
- Order management.
- Order status updates.
- Inventory management.

## 3. Technical Context

The following technical information describes the project environment.

| Component | Technology | Purpose |
|---|---|---|
| Frontend | React.js | User interface |
| Build Tool | Vite | Frontend development and build |
| Backend | Node.js | Server-side runtime |
| API Framework | Express.js | Backend API routes |
| Database | SQLite | Persistent data storage |
| Authentication | JWT | Admin authentication |
| Password Security | bcryptjs | Password hashing support |
| Styling | CSS | Application design |
| Development Tool | VS Code | Code editing and debugging |

Providing these details helps an AI assistant suggest solutions that match the existing project instead of introducing unrelated technologies.

## 4. Project Structure Context

The existing folder structure is important when asking AI to modify the application.

### Frontend Structure

- `src/App.jsx` — Main React application.
- `src/App.css` — Main application styling.
- `src/index.css` — Global styling.
- `src/api.js` — Frontend API communication.
- `src/main.jsx` — Frontend entry point.

### Backend Structure

- `server/server.cjs` — Express server and API routes.
- `server/database.cjs` — Database initialization and operations.
- `server/auth.cjs` — Authentication-related functionality.
- `server/database.sqlite` — SQLite database.

### Documentation Structure

- `docs/` — Project documentation and screenshots.
- `prompts/` — AI prompt records.
- `README.md` — Main project instructions.

Providing relevant file paths helps the AI understand where a change should be made.

## 5. Types of Context Used

### 5.1 Requirement Context

Project requirements explain what the application should accomplish.

Examples:

- Build an e-commerce storefront.
- Provide product search and category filtering.
- Implement shopping cart functionality.
- Support checkout and order management.
- Provide a Mini CRM for customers and orders.

### 5.2 Technical Context

Technical context identifies the existing programming languages, frameworks, and database.

Examples:

- React and Vite for the frontend.
- Node.js and Express.js for the backend.
- SQLite for database operations.
- JWT for administrative authentication.

### 5.3 Code Context

Relevant source files are provided when an AI task requires code analysis.

Examples:

- `src/App.jsx`
- `src/api.js`
- `server/server.cjs`
- `server/database.cjs`

This prevents the AI from suggesting changes without considering the existing implementation.

### 5.4 Error Context

Actual error messages and terminal output help identify development problems.

Examples:

- API response errors.
- JavaScript syntax errors.
- Database operation errors.
- Frontend build errors.

### 5.5 Data Context

The project uses product, customer, inventory, and order information.

Database context helps an AI assistant understand how different records relate to one another.

### 5.6 Constraint Context

Constraints describe what should not be changed unnecessarily.

Examples:

- Preserve the existing project structure.
- Do not replace unrelated components.
- Use the current SQLite database.
- Keep existing API behavior compatible.
- Avoid exposing credentials.
- Preserve valid order information when anonymizing demo records.

## 6. Context Engineering Examples

The following examples explain how project-specific context can improve AI-assisted development.

### Example 1 — Checkout API Debugging

**Problem:**

The checkout functionality required investigation when the browser reported an unexpected token '<' error and received an HTML response instead of JSON.

**Context Provided:**

- Frontend uses React and Vite.
- Backend uses Express.js.
- Frontend API requests are handled in `src/api.js`.
- Backend routes are defined in `server/server.cjs`.
- The actual browser error message is included.

**AI Instruction:**

"Analyze the checkout request in the existing NEXUS-COMMERCE project. Review the frontend API URL, Express route, and response handling. Identify why an HTML response may be returned instead of JSON. Suggest a correction using the existing project architecture."

**Context Refinement:**

"Focus only on the relevant checkout request and backend route. Do not rewrite unrelated components. Explain how to verify the correction using the browser and backend."

**Expected Verification:**

- Start the backend.
- Start the frontend.
- Perform a checkout request.
- Inspect the browser Network tab.
- Confirm the correct API response.

**Result Status:**

The issue was investigated during project development. A fresh end-to-end checkout test is required before final submission.

### Example 2 — Server-Side Price Validation

**Problem:**

Prices and totals submitted by a browser should not be trusted as the final order amount.

**Context Provided:**

- Product information is maintained by the application.
- Checkout is processed by Express.js.
- Order information is stored in SQLite.
- The backend has access to trusted product prices.

**AI Instruction:**

"Review the existing checkout implementation. Make sure the backend calculates product prices using trusted server-side product information rather than accepting the final price or total submitted by the browser."

**Context Refinement:**

"Preserve the existing order structure. Check that invalid product IDs, incorrect quantities, and unavailable stock are handled safely."

**Implementation Mapping:**

- `server/server.cjs`
- `server/database.cjs`

**Outcome:**

The backend implementation includes server-side price calculation and inventory checks.

**Verification:**

Review the checkout implementation and test a modified client-side price to confirm that the server uses its own product price.

### Example 3 — Frontend API Error Handling

**Problem:**

An unexpected server response can cause frontend JSON parsing problems.

**Context Provided:**

- Frontend API functions are in `src/api.js`.
- Backend endpoints use Express.js.
- Successful requests normally return JSON.
- Failed requests may return other response formats.

**AI Instruction:**

"Review the frontend API response handling. Improve error handling so that an HTML or invalid JSON response does not produce an unclear parsing crash. Display a readable error message while preserving successful JSON responses."

**Context Refinement:**

"Keep the existing API functions and request behavior. Make the smallest appropriate change and explain how to test successful and failed responses."

**Implementation Mapping:**

- `src/api.js`

**Outcome:**

API response handling was included in the project's debugging and refinement work.

**Verification:**

Test both successful API requests and intentionally unsuccessful requests. Confirm that errors are understandable.

### Example 4 — Customer Data Privacy

**Problem:**

Customer and order information should be reviewed before the project is published publicly.

**Context Provided:**

- Customer records are stored in SQLite.
- Orders are linked to customer information.
- Database operations are implemented in `server/database.cjs`.
- Environment files may contain sensitive configuration.

**AI Instruction:**

"Review the NEXUS-COMMERCE demo database and identify customer information that should be anonymized before public publication. Preserve order IDs, product items, totals, and order statuses. Create a backup before changing the original database."

**Context Refinement:**

"Use consistent fictional demo names and contact information. Check that customer and order relationships remain valid after anonymization."

**Implementation Mapping:**

- `server/database.sqlite`
- `server/database.cjs`
- `server/anonymize-data.cjs`
- `.gitignore`

**Outcome:**

Privacy-related scripts and database cleanup procedures are included in the project.

**Verification:**

A final database backup, privacy scan, and customer/order relationship check must be completed before publication.

## 7. Context Selection and Management

Not every AI request requires the complete project source code.

Relevant context should be selected according to the task.

| Task | Relevant Context |
|---|---|
| Frontend design | React components and CSS |
| Product search | Product data and frontend filtering logic |
| Shopping cart | Cart state and quantity calculations |
| Checkout | Frontend API, backend routes, database |
| CRM | Admin components, authentication, customer and order APIs |
| Database issue | Database structure and related queries |
| Security review | Authentication, environment configuration, protected routes |
| Documentation | Project structure, features, screenshots and setup instructions |

This approach reduces irrelevant information and keeps the AI focused on the actual development problem.

## 8. Iterative Context Engineering Workflow

The project follows an iterative development approach.

### Step 1 — Understand the Requirement

Identify the feature or problem that needs attention.

### Step 2 — Collect Relevant Context

Select the appropriate source files, requirements, and error messages.

### Step 3 — Define the AI Task

Write a clear prompt describing the required solution.

### Step 4 — Review the AI Response

Check whether the suggested solution matches the project architecture.

### Step 5 — Apply the Change

Make the appropriate code modification.

### Step 6 — Provide Updated Context

If an error remains, provide the latest code, terminal output, or actual test result.

### Step 7 — Refine the Solution

Improve the instruction using the newly available information.

### Step 8 — Verify the Result

Test the feature and record the actual outcome.

## 9. Context Engineering Benefits

Context Engineering provides several benefits:

1. Better understanding of project requirements.
2. More relevant AI-generated suggestions.
3. Fewer unnecessary code changes.
4. Better compatibility with the existing architecture.
5. Easier debugging and error investigation.
6. Improved consistency between frontend and backend.
7. More effective testing and verification.
8. Better control over sensitive project information.

## 10. Limitations and Considerations

Context Engineering improves the quality of AI assistance, but it does not guarantee that every generated suggestion is correct.

Important considerations include:

- AI may misunderstand incomplete code.
- Outdated context can produce incorrect suggestions.
- Large amounts of irrelevant information can reduce focus.
- Generated code may introduce new errors.
- Sensitive information should never be shared unnecessarily.
- All important code changes must be tested.

## 11. Final Context Engineering Checklist

Before requesting AI assistance, the following checklist can be used:

- [ ] Clearly identify the development problem.
- [ ] Provide the relevant project requirements.
- [ ] Identify the programming language and framework.
- [ ] Provide relevant source file paths.
- [ ] Include the actual error message when debugging.
- [ ] Explain the expected application behavior.
- [ ] Mention important project constraints.
- [ ] Request a focused solution.
- [ ] Review the generated code.
- [ ] Test the actual implementation.
- [ ] Record the real result.

## 12. Conclusion

Context Engineering played an important role in organizing AI-assisted development for NEXUS-COMMERCE.

Instead of asking general questions, the development tasks were organized around project requirements, technical information, source files, database structure, errors, and expected results.

Combining Context Engineering with Prompt Engineering helps make AI assistance more relevant, structured, and useful.

The NEXUS-COMMERCE project demonstrates how relevant context and iterative feedback can support the development and improvement of a practical E-Commerce Website with a Mini CRM System.
