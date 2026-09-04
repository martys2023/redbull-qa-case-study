# Login Page — Test Plan

## Scope
Testing the login functionality of the dashboard.

## Priority
High — login is a dependency for all other functionality.

## Test Cases

| ID | Description | Steps | Expected Result | Actual Result | Status | Notes |
|----|-------------|-------|-----------------|---------------|--------|-------|
| TC01 | Valid login | 1. Navigate to /login 2. Enter valid username 3. Enter valid password 4. Click login | User is redirected to /secure | As expected | ✅ Automated | |
| TC02 | Invalid username | 1. Navigate to /login 2. Enter invalid username 3. Enter valid password 4. Click login | Page displays 'Your username is invalid!' | As expected | ✅ Automated | App validates username before password |
| TC03 | Invalid password | 1. Navigate to /login 2. Enter valid username 3. Enter invalid password 4. Click login | Page displays 'Your password is invalid!' | As expected | ✅ Automated | |
| TC04 | Empty username | 1. Navigate to /login 2. Leave username blank 3. Enter valid password 4. Click login | Page displays 'Your username is invalid!' | As expected | 📋 Manual | |
| TC05 | Empty password | 1. Navigate to /login 2. Enter valid username 3. Leave password blank 4. Click login | Page displays 'Your password is invalid!' | As expected | 📋 Manual | |
| TC06 | Both fields empty | 1. Navigate to /login 2. Click login without entering anything | Page displays 'Your username is invalid!' | As expected | 📋 Manual | App displays username error first — password is not validated independently |

# Tables Page — Test Plan

## Scope
Testing the functionality of the tables display page.

## Priority
High — this is the entirety of the mock dashboard right now.

## Test Cases
| ID | Description | Steps | Expected Result | Actual Result | Status | Notes |
|----|-------------|-------|-----------------|---------------|--------|-------|
| TC07 | Correct table rendering | 1. Navigate to /tables | Table displays with 6 correctly labeled columns: 'Last Name', 'First Name', 'Email', 'Due', 'Web Site', 'Action', and at least 1 row of data | | 📋 Manual | |
| TC08 | Edit/delete gap | 1. Navigate to /tables 2. Click 'edit' button on a row in the table 3. Click 'delete' button on a row in the table | Expect the edit button click to prompt the user to change entries of the given row in the table, and the delete button to remove the row from the table | The buttons don't do anything. Clicking them only redirects to /tables#edit and /tables#delete (respectively) but they do NOT change the table at all | 🐛 Bug | Core functionality missing |
| TC09 | Check valid Email column | 1. Navigate to /tables | Table should display a valid email address (of the form string@validwebsite.ending) in Email column | Emails are valid | 📋 Manual | |
| TC10 | Check valid Due column| 1. Navigate to /tables | Table should display a '$' followed by a number with two decimal points in Due column | Values are valid | 📋 Manual | |
| TC11 | Check valid Web Site column | 