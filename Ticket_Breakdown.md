# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including Acceptance Criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

// BEGIN BREAKDOWN BY TK:

## 1️⃣ Ticket #1: Create new Schema and table called `CustomIDs`

### ✏️ Details

To allow Facilities to add their own `custom_id` to `Agents`, and query reports from this `custom_id`,  we need to create a new table called `CustomIDs`. 

- This new table will store the `facility_id`, `agent_id`, and allow the user to enter a `custom_id` value (INT). 
- The scope fo this task is to create the new schema and test, ensuring validations. 

Note: When the code is approved we can ship and run migrations, creating the new table in the database.

### 🔍 Acceptance Criteria

- Create new schema model with appropriiate fields
- New model includes a test, testing validations
- `custom_id` field is `INT` data type (user is only allowed to enter in numerical values and no VARCHAR)
- Validation: `custom_id` should be unique per `Facility` 
- Validation: all fields are required
- Create / Update any relevant documentation

### 📈 Point Estimate (Fibnonacci Scale)

- ***5 pts (L)***

### 💻 Implementation Details

See the fields and name below to define the new Schema:

#### `CustomIDs`

| field         | type       | description                                                                      | index? |
| ------------- | ---------- | -------------------------------------------------------------------------------- | ------ |
| `id`          | `INT`      | primary key                                                                      |        |
| `facility_id` | `INT`      | foreign key to `Facility` ( `Facilities` table )                                 | Y      |
| `agent_id`    | `INT`      | foreign key to `Agent` ( `Agents` table)                                         | Y      |
| `custom_id`   | `INT`      | custom `id` user input value provided by `Facility` to associate with an `Agent` | Y      |
| `created_at`  | `DATETIME` |                                                                                  |        |
| `updated_at`  | `DATETIME` |                                                                                  |        |

#### Validations

- All fields are required
- `custom_id` must be unique per `Facility`

#### Indexing

- Index `facility_id`, `custom_id` and `agent_id` as we'll use these frequently in queries

### 🔗 Blocking (Linked Tasks)

- Task #2
- Task #3
- Task #4
- Task #5

### 🔗 Blocked By (Linked Tasks)

- None

***

## 2️⃣ Ticket #2: Add API Endpoint to create a new `CustomIDs` record

### ✏️ Details

Create a new end point and correspoding controller logic that creates a new `CustomIDs` record.

Route: `/agent/:agent-id/update/custom-id`

- The `custom_id` from the body, along with the `facility_id` and the corresponding `agent_id` should be stored. 
- If a `CustomID` record already exists, update the `custom_id` value. 
- If the `custom_id` value is taken by another `Agent` at that `Facility`, return an error.

### 🔍 Acceptance Criteria

- New API end point (POST) is created `/agent/:agent-id/update/custom-id`
- New controller method creates new `CustomID` record in `CustomIDs`
- Authenitcation: New controller logic only proceeds if user is logged in with valid session
- New record contains user provided `custom_id`, along with corresponding `facility_id` and `agent_id`
- If a `CustomID` record already exists for a given `agent_id`, update the record to reflect the new `customer_id` value provided by the user
- If the `custom_id` is already taken by another `Agent` for the given `Facility`, return an error
- Include a test for the new controller logic, ensuring correct behavior
- Create / Update any relevant documentation

### 📈 Point Estimate (Fibon Scale)

- ***5 pts (L)***

### 💻 Implementation Details

- Right now there's no API route or end point to create the new record. 
- Create a new API endpoint: `/agent/:agent-id/update/custom-id`
- Create a new controller method that receives the `POST` request:
  - The user provided `custom_id` will be attached to the POST request body (e.g, `req.body.customId`)
  - The `agent_id` can be gathered from the `POST` parameter `:agent-id`
  - The `facility_id` can be gathered from the context of the logged in user's facility association
  - The controller logic should query for any existing `CustomID` records belonging to the supplied `agent_id` associated with a given `facility_id`
    - If no record is found, create one, return `200` HTTP response
    - If an existing record is found, update the `custom_id` value, return `200` HTTP response
    - If the `custom_id` provided is not unique for that Facility, return a `422` HTTP response with error: "Error: Custom ID is already in use."
  - Controller should have a test that ensures the above cases behave correctly

### 🔗 Blocking (Linked Tasks)

- Task #3
- Task #4
- Task #5

### 🔗 Blocked By (Linked Tasks)

- Task #1

***

## 3️⃣ Ticket #3: Add `custom_id` user input to `Agent` page

### ✏️ Details

- Add a new user number input field to the existing `Agent` page, that accepts a `custom_id`. 
- See the attached Figma design for how this field should look. 
  - The field should have a button to the right of it that upon user click, sends a `POST` request to `/agent/:agent-id/update/custom-id` with the provided value. 
- If an error is returned, please display the error (see Figma design), otherwise display success (see details below)

### 🔍 Acceptance Criteria

- New "Custom ID" field is added to the `Agent` page (`/agent/:agent-id/`) with submit button
- Includes updated Front-end tests which adds a new test case for new field and error state
- Look and feel should match Figma Design
- If success response, show "Success!" toast message
- If error response, show "Error: {$error_message}" toast response
- Empty submissions and empty string submissions are prevented
- Debounce on submit (disable button) to prevent duplicate requests
- Create / Update any relevant documentation

### 📈 Point Estimate (Fibon Scale)

- ***5 pts (L)***

### 💻 Implementation Details

- *See Figma Design* <insert-fake-link-here> for user input and error state
- Add the new field to the existing `<Agent />` view component (`Agent.jsx`)
  - Entry point: `/agent/:agent-id/`
- Ensure field is `Number` only (text/words is not allowed -- only numbers)
- Show error toast if 200 is not received: "Error: {$error_message}!"
- Show success toast if 200 is received: "Success!"

### 🔗 Blocking (Linked Tasks)

- Task #4
- Task #5

### 🔗 Blocked By (Linked Tasks)

- Task #1
- Task #2

***

## 4️⃣ Ticket #4: Update `getShiftsByFacility()` to include `custom_id` in `Agent` metdata

### ✏️ Details

We need to add the new `custom_id` value to existing reporting metadata. We need to update the following:

- `getShiftsByFacility()`

  - add `custom_id` to Agent metadata

- Update existing test case for this method, or expand test case logic

### 🔍 Acceptance Criteria

- `getShiftsByFacility()` now includes `custom_id` property on `Agent` metadata
- Test cases for `getShiftsByFacility()` have been updated
- Create / Update any relevant documentation

### 📈 Point Estimate (Fibon Scale)

- ***2 pts (S)***

### 💻 Implementation Details

- Updates to `getShiftsByFacility()`:
  - Update this method to include `custom_id` in the `Agent` metadata
  - return `null` for those agents without `CustomIDs`
- There are existing tests for this method but we'll have to update them or add new test cases to validate updated logic

### 🔗 Blocking (Linked Tasks)

- Task #5

### 🔗 Blocked By (Linked Tasks)

- Task #1
- Task #2
- Task #3

***

## Ticket #5: Update `generateReport()` to display `Agent.custom_id` in PDF output rather than `Agent.id`

### ✏️ Details

Currenty, `generateReport()` provides a PDF showing `Agent` shifts. The `id` displayed in the report is the `Agent.id`, Instead, we want to display `Agent.custom_id`, since this will be more relevant to the Facility. NOTE: We ***only display custom_id in place of id if all agents have a custom ID for that facility***. 

- Update the PDF to display the `custom_id` in the report.
- Only use `custom_id` if all the Agents have one (e.g, add a method that checks if all Agents for that facility's report have a custom_id, else default to `Agent.id`). This avoids us needing to do any backfilling for currrent report generation, and won't block the user if not all Agents have a custom_id set.
- Update existing tests

### 🔍 Acceptance Criteria

- `generateReport()` displays `custom_id` next to each Agent in PDF report ***only if all Agents have a custom_id set***
- Test cases for `generateReport()` have been updated to reflect this
- If all custom_ids for agents have been set, PDF correctly renders report with custom_ids
- If *not all** custom_ids for agents have been set, PDF defaults to primary key `id`
- Create / Update any relevant documentation

### 📈 Point Estimate (Fibonacci Scale)

- ***3 pts (M)***
- The conditional logic on displaying the custom_ids, or defauling to regular ids adds to point value here

### 💻 Implementation Details

- Updates to `generateReport()`:
  - Create a method `getAllAgentsHaveCustomID()` that loops over `Agents` for that `Facility`, and returns `true` or `false` if all agents have a custom_id set
  - If they do all have one set, update `generateReport()` to use `custom_id` rather than `id` in the output PDF
  - If the do **not** all have `custom_id` set, default to using `id`
    - NOTE: This is important so we don't have report generation errors for Facilities who have not added custom_ids to their Agents. ***The report will only reflect custom_ids if all Agents have been assigned one, else defaults to the primary key id.***
- Update tests
- End-to-end test PDF generation to confirm.

### 🔗 Blocking (Linked Tasks)

- None

### 🔗 Blocked By (Linked Tasks)

- Task #1
- Task #2
- Task #3
- Task #4


// END TICKET BREAKDOWN BY TK