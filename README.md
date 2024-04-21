# Advertisers Manager

This project is a simple advertiser management app built with the latest version of Angular. The allows the user to view the list of advertisers and to create a new advertiser.

## Features

- Fetches advertisers from the provided API endpoint
- Displays advertisers in a table
- Opens a dialog to allow the user to add a new advertiser

## Instructions

1. Clone the GitHub repository to your local machine
2. Navigate to the project directory
3. Run `npm install` to install the necessary dependencies
4. Run `ng serve` to start a local development server
5. Open your browser and navigate to http://localhost:4200/

## Development Process

1. Scaffolded app with Angular CLI
1. Created feature folder for advertisers. This should allow codebase to grow and accomodate more features.
1. Installed Angular Material to display table data.
1. Added a dumb component for displaying the the new advertiser form in a dialog
1. Added a smart component for displaying the list of advertiser, fetching data from service and launching dialog
1. Used service to fetch and store advertisers in a BehaviorSubject, which smart component subscribes to.
1. Created very basic unit tests for the advertiser-list component. With more time would have added tests for service and improve code coverage
1. Added very basic validation. Ideally need stricter rules and better messages for validation errors.
1. NOT IMPLEMENTED: Ngrx for state management. Felt like overkill so went for simpler BehaviourSubject
