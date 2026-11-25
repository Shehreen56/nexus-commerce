
# AI PROMPT DOCUMENTATION
## NEXUS-COMMERCE — E-Commerce Website with Mini CRM

## 1. Project Overview

NEXUS-COMMERCE is an AI-assisted E-Commerce Website with a Mini Customer Relationship Management (CRM) System.

The main objective of this project is to provide an online shopping experience and an administrative system for managing customers, products, orders, and inventory.

The project uses the following technologies:

- Frontend: React.js and Vite
- Backend: Node.js and Express.js
- Database: SQLite
- Authentication: JWT
- Password Security: bcryptjs
- Styling: CSS
- Development Environment: Visual Studio Code

## 2. Role of AI in Project Development

AI was used as a development assistant throughout the project.

The purpose of using AI was to:

- Understand project requirements.
- Divide the project into smaller development tasks.
- Plan frontend and backend features.
- Generate and improve code.
- Understand existing code structures.
- Identify and troubleshoot errors.
- Improve API handling and validation.
- Review security and privacy considerations.
- Prepare testing and project documentation.

AI-generated suggestions were treated as assistance. Code changes and results were checked against the actual project implementation.

## 3. Prompt Engineering Approach

Prompt Engineering involves writing clear and structured instructions to obtain useful results from an AI system.

The following approach was used to organize the development prompts:

1. Identify the feature or problem.
2. Provide a clear instruction.
3. Include relevant technical requirements.
4. Specify expected behavior.
5. Review the AI-generated solution.
6. Refine the prompt when additional details are required.
7. Apply the proposed changes.
8. Verify the implementation.

### Prompt Refinement Strategy

The development process followed an iterative approach:

- Initial Prompt: Describe the main requirement.
- Improved Prompt: Add missing functionality and constraints.
- Refined Prompt: Include relevant technical details and expected behavior.
- Verification: Check the implementation and actual output.

## 4. AI Prompt Categories

The following sections document the main prompt categories used during NEXUS-COMMERCE development.

**Authenticity Note:** The examples below are reconstructed documentation examples based on the project development tasks. They are not claimed to be exact historical conversation transcripts. Exact original prompts should only be labelled Original when their original wording is available.

### 4.1 Project Planning

**Objective:**

Understand the capstone requirements and organize the development process.

**Initial Prompt:**

"Analyze the NEXUS-COMMERCE e-commerce project requirements. Identify the important frontend, backend, database, shopping, CRM, testing, and documentation features."

**Improved Prompt:**

"Organize the NEXUS-COMMERCE requirements into smaller development tasks. Separate the customer storefront, product catalog, shopping cart, checkout, backend APIs, database, and admin CRM. Suggest an implementation order that follows the existing React, Express, and SQLite project structure."

**Context Provided:**

- E-commerce project requirements.
- Existing starter project structure.
- Required customer and admin features.
- Technology stack.

**Implementation Mapping:**

- Project frontend: `src/`
- Backend: `server/`
- Database: `server/database.cjs`
- Documentation: `docs/`

**Outcome:**

The project was organized into customer-facing shopping functionality and administrative CRM functionality.

**Verification:**

The implemented project structure and available features were reviewed against the project requirements.

### 4.2 Frontend Development

**Objective:**

Develop a responsive shopping interface.

**Initial Prompt:**

"Create a React e-commerce website with a homepage, product cards, product images, product names, and prices."

**Improved Prompt:**

"Improve the existing React and Vite storefront. Add product search, category filtering, product details, and a responsive layout. Preserve the existing application structure and maintain a consistent design."

**Additional Refinement — Shopping Cart:**

"Implement a shopping cart where customers can add products, remove products, increase or decrease quantities, and see automatically calculated subtotals and totals."

**Context Provided:**

- React and Vite project.
- Existing component structure.
- Product information.
- Existing CSS styling.
- Expected customer shopping workflow.

**Implementation Mapping:**

- `src/App.jsx`
- `src/App.css`
- `src/index.css`
- `src/api.js`

**Outcome:**

The frontend includes product browsing, search, category filtering, product details, and shopping cart functionality.

**Verification:**

The relevant interface and feature implementations were reviewed. Final runtime verification should be performed after a clean project installation.

### 4.3 Backend and Database Development

**Objective:**

Create backend functionality and persistent data storage.

**Initial Prompt:**

"Help develop a Node.js and Express.js backend for an e-commerce website using an SQLite database."

**Improved Prompt:**

"Review the existing Express backend and SQLite database structure. Implement or improve APIs for customer information, order creation, inventory management, and administrative operations. Follow the existing project architecture."

**Additional Refinement — Order Processing:**

"Validate checkout information on the server. Calculate product prices using trusted server-side product information, check available inventory, and save order information using safe database operations."

**Context Provided:**

- Express.js server.
- SQLite database.
- Existing API routes.
- Product and inventory information.
- Order and customer data structures.

**Implementation Mapping:**

- `server/server.cjs`
- `server/database.cjs`
- `server/database.sqlite`
- `src/api.js`

**Outcome:**

The backend contains API functionality for order processing, customers, inventory, and administrative operations.

Server-side price calculation and inventory checks are included in the implementation.

**Verification:**

Backend syntax and database integrity were checked. Complete live API testing should be repeated before submission.

### 4.4 Admin Dashboard and Mini CRM

**Objective:**

Provide administrative functionality for managing store operations.

**Initial Prompt:**

"Create an admin dashboard for an e-commerce website where administrators can view customers and orders."

**Improved Prompt:**

"Extend the existing React admin dashboard with customer management, order management, inventory information, dashboard statistics, and order status updates. Connect the interface with the existing Express backend and protected administrative APIs."

**Context Provided:**

- Existing frontend.
- Backend API routes.
- Customer records.
- Order records.
- Authentication requirements.

**Implementation Mapping:**

- `src/App.jsx`
- `src/api.js`
- `server/server.cjs`
- `server/auth.cjs`

**Outcome:**

The project includes an administrative interface for customer and order management, inventory operations, and dashboard information.

**Verification:**

The admin interface and related backend routes were reviewed. Authentication and complete runtime workflows require final testing.

### 4.5 Debugging and Code Refinement

**Objective:**

Identify and correct application errors.

**Prompt Example 1 — Checkout Response Error:**

"Investigate the checkout error where the browser reports an unexpected token '<' and receives an HTML response instead of JSON. Review the frontend API request and backend route to identify the cause."

**Prompt Example 2 — Improved Debugging:**

"Analyze the relevant frontend and backend files. Identify the actual cause of the error and suggest the smallest correction without changing unrelated features."

**Prompt Example 3 — Code Review:**

"Review the updated code for syntax errors, incorrect imports, API response problems, and possible side effects. Explain how the correction can be verified."

**Context Provided:**

- Actual error messages.
- Relevant source files.
- Terminal output.
- API route information.
- Existing application behavior.

**Implementation Mapping:**

- `src/api.js`
- `src/App.jsx`
- `server/server.cjs`
- `server/database.cjs`

**Outcome:**

The project development process included investigation and refinement of checkout, API handling, and application code.

**Verification:**

JavaScript syntax checks were performed. The final checkout workflow must be retested in the running application.

### 4.6 Security and Data Privacy

**Objective:**

Improve the security of administrative functionality and protect customer information.

**Initial Prompt:**

"Review the security of the NEXUS-COMMERCE application, including admin authentication, API protection, environment variables, and customer information."

**Improved Prompt:**

"Inspect the existing JWT authentication and protected API routes. Review environment configuration, password hashing, CORS restrictions, and customer demo data. Recommend improvements that preserve the current project functionality."

**Additional Refinement — Privacy:**

"Review the SQLite customer and order records. Identify information that should be anonymized before public repository submission. Preserve valid order relationships and create a backup before making database changes."

**Context Provided:**

- Authentication implementation.
- Environment configuration.
- Database records.
- Protected API routes.
- Git ignore configuration.

**Implementation Mapping:**

- `server/auth.cjs`
- `server/server.cjs`
- `server/database.sqlite`
- `.env.example`
- `.gitignore`

**Outcome:**

The project includes JWT-based authentication, password hashing dependencies, protected administrative operations, and environment-based configuration.

**Verification:**

Security-related source files were reviewed. Final secret scanning, privacy verification, and staged-file inspection remain necessary before GitHub publication.

### 4.7 Testing and Validation

**Objective:**

Verify that the implemented features behave as expected.

**Initial Prompt:**

"Prepare a testing checklist for the NEXUS-COMMERCE e-commerce application."

**Improved Prompt:**

"Create a step-by-step manual test plan for the homepage, product catalog, search, category filtering, product details, shopping cart, quantity changes, checkout, inventory, admin authentication, customer management, and order status updates. Include expected results and actual results."

**Context Provided:**

- Project requirements.
- Existing features.
- Frontend and backend structure.
- Database functionality.
- Testing observations.

**Implementation Mapping:**

- `src/`
- `server/`
- `docs/`
- Existing screenshots and testing documentation.

**Outcome:**

A feature-based testing approach was prepared to evaluate the main shopping and CRM workflows.

**Verification:**

Database integrity and backend JavaScript syntax were checked. Full end-to-end runtime testing is still required.

### 4.8 Documentation and Deployment

**Objective:**

Prepare the project for presentation, repository publication, and deployment.

**Initial Prompt:**

"Prepare documentation for the NEXUS-COMMERCE project, including its features, technologies, setup instructions, and screenshots."

**Improved Prompt:**

"Review the project structure and prepare a clear README for a student capstone submission. Include installation commands, environment configuration, frontend and backend startup instructions, screenshots, testing information, and deployment guidance."

**Additional Refinement — Deployment:**

"Prepare the project for GitHub publication and identify a suitable hosting approach for the React frontend and Express backend. Explain environment variables, database persistence requirements, and security precautions."

**Context Provided:**

- Existing project files.
- Package configuration.
- README.
- Screenshot directory.
- Environment configuration.
- Deployment requirements.

**Implementation Mapping:**

- `README.md`
- `docs/`
- `prompts/`
- `package.json`
- `server/`
- `.env.example`

**Outcome:**

Project documentation, prompt records, and screenshots are available.

**Verification:**

Documentation files were reviewed. GitHub publication and live deployment are pending.

## 5. Prompt Improvement Techniques Used

The following prompt engineering techniques were applied or documented during the development process:

### 5.1 Clear Instructions

Prompts describe a specific task instead of giving vague instructions.

### 5.2 Contextual Instructions

Relevant technologies, source files, and existing project behavior are included.

### 5.3 Task Decomposition

Large requirements are divided into smaller tasks such as frontend development, backend APIs, database operations, and CRM functionality.

### 5.4 Iterative Refinement

Initial prompts are improved by adding missing requirements and constraints.

### 5.5 Output Verification

AI suggestions are reviewed and checked against actual implementation and testing results.

### 5.6 Constraint-Based Prompting

Prompts specify that existing architecture and unrelated features should be preserved when fixing a particular issue.

## 6. AI Output Evaluation

AI-generated responses should be evaluated before their implementation is accepted.

The following evaluation criteria are used:

| Evaluation Criteria | Description |
|---|---|
| Relevance | Does the response solve the requested problem? |
| Accuracy | Is the suggested code technically appropriate? |
| Context Awareness | Does it follow the existing project structure? |
| Completeness | Does it address the important requirements? |
| Security | Does it consider data validation and privacy? |
| Maintainability | Is the solution understandable and maintainable? |
| Verification | Can the result be tested? |

## 7. Project Verification Checklist

The following checklist identifies the functionality that must be verified before final submission.

- [ ] Homepage displays correctly.
- [ ] Product catalog loads correctly.
- [ ] Product search works.
- [ ] Category filtering works.
- [ ] Product details display correctly.
- [ ] Products can be added to the cart.
- [ ] Cart quantity can be changed.
- [ ] Subtotal and total calculations are correct.
- [ ] Checkout creates an order.
- [ ] Order confirmation is displayed.
- [ ] Inventory updates after checkout.
- [ ] Admin authentication works.
- [ ] Unauthorized admin requests are rejected.
- [ ] Customer directory works.
- [ ] Order management works.
- [ ] Order status can be updated.
- [ ] Environment secrets are excluded from GitHub.
- [ ] Customer demo data is anonymized.
- [ ] Production build completes successfully.

## 8. Limitations and Future Improvements

The current project focuses on essential e-commerce and mini CRM functionality.

Possible future improvements include:

- Real payment gateway integration.
- Customer registration and login.
- Email notifications.
- Advanced CRM reporting.
- More detailed sales analytics.
- Automated end-to-end testing.
- Improved inventory alerts.
- Production-grade deployment and database hosting.

These are potential future improvements and are not claimed as completed features.

## 9. Conclusion

AI-assisted development helped organize the NEXUS-COMMERCE project, plan its features, improve implementation, investigate errors, and prepare documentation.

Prompt Engineering helped create clearer instructions, while iterative refinement helped add missing requirements and constraints.

The final quality of an AI-assisted solution depends on reviewing the generated code, understanding its behavior, and verifying the implementation.

NEXUS-COMMERCE demonstrates how structured prompting and AI-assisted problem-solving can support the development of a practical e-commerce application with a Mini CRM system.
