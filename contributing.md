# Welcome to the Expo Stack contributing guide

Thank you for investing your time to contribute to Create Expo Stack!

In this guide, you will get an overview of the contribution workflow from opening an issue to creating, reviewing, and merging a PR.

## New contributor guide

Use this documentation and [](https://link.excalidraw.com/l/398AFcdY0wd/1GY4R99h31c) to gain an understanding of how Create Expo Stack works and how to contribute to the project.

## What can I contribute to?

Before delving deeper on the collaborarion worflow, let's talk about what kind of contributions can be made. Make sure to refer to this [architectural diagram](https://link.excalidraw.com/l/398AFcdY0wd/1GY4R99h31c) to understand how the CLI, installers and template scaffolding works in `create-expo-stack`.

There are three main things you can usually contribute to:

- **Docs**: Anything that would improve the documentation for Expo Stack (typo corrections, fact checking, benchmarks, updates, and/or guides).

- **CLI**: If you would like to add a currently unsupported feature (a new styling library, auth providers, and/or a new CLI flag), you'll probably be submitting a new template, generator, and/or new CLI prompts.

>Keep in mind, that you should not change the underlying dependencies that handle a specific part of the stack (eg.: you should not change an existing template for a configuration you are trying to introduce as it may have downstream effects on any existing configurations).

- **Landing page**: Occasionally, the [landing page](https://expostack.dev) needs to be updated with new testimonials, a new terminal recording, and/or new configurations that we support.

- **Bug fixes/reports**: If you think you've found a bug or some unexpected behavior in the CLI application or the scaffolded apps, you're welcome to raise an issue and/or PR with a bug description and/or fix.

Ideas for improving the overall architecture of the CLI app are always be welcome, but we ask that you raise an issue and/or a discussion with an overview of the proposed ideas first, in order to ensure a proper debate over the proposal.

Be sure to follow the templates for new issues and pull requests, when applicable.

## Contribution workflow

### Making changes locally

This project uses Bun, and should be run with Node.js on the latest available LTS version. Ensure you have them properly setup on your development environment before continuing.

```shell
$ git clone https://github.com/danstepanov/create-expo-stack

$ cd create-expo-stack
```

The Expo Stack homepage and documentation source-code can be found in the `/www` and `/docs` directories, respectively. The create-expo-stack application can be found in the `/cli` directory.

Install all the workspace dependencies with: `bun install` on the project root.

To quickly run the documentation website after installing all dependencies:

```shell
$ cd docs
$ bun start
```

To quickly run the landing page website after installing all dependencies:

```shell
$ cd www
$ bun start
```

<!-- To quickly setup `create-expo-stack` for local testing, you'll need to link a local version to run on your machine: -->

To quickly setup `create-expo-stack` for local testing, it's recommended that you use the linking feature from package managers to create a global exectutable of the package: 

```shell
$ cd cli
$ bun run build

# NPM linking
$ npm link

# Yarn linking
$ yarn link

# PNPM linking
$ pnpm link --global
```

After linking, make sure to restart the terminal session or resource the shell profile. Ex.: `source ~/.zshrc`.

You can check that the linking was performed correctly with `which create-expo-stack`, which should return the path to the global executable. If this returns `create-expo-stack not found`, this means that the linking has either failed, or you have a misconfigure `PATH` variable for your package manager's global installs.

```shell
$ which create-expo-stack
# Example, linked with PNPM on macOS.: /Users/<username>/Library/pnpm/create-expo-stack
```

Now you can run your own local version of create-expo-stack via `create-expo-stack`, anywhere on your machine. Here is the format for running a CLI command:

```shell
$ create-expo-stack <PROJECT_NAME> <OPTIONS>
```

> Note: Linking via Bun is not possible. While Bun does provide a linking feature ([see here](https://bun.sh/docs/cli/link)), it does not seem to expose the executable binary like the other three package managers. If you know how to do this, please let us know!

From here, any changes to the `/cli` source-code will reflect the behavior of the `create-expo-stack` binary. We recommend that you set up a `create-expo-stack-apps` directory (or a similar directory) where you can securely scaffold expo apps and test prompt combinations.

### Make your changes

Before committing your changes, or before wrapping up your branch for a PR, you should run `bunx changeset` and follow the instructions to provide a summary or summaries of the changes you're providing, in order to provide our changelog with information about your contributions.

Once you've made your changes and tested that it works locally, run the tests using `bun test` in the `/cli` directory. You should also add a test to cover your own contribution, if relevant. These tests take a while to run (we're working on this).

If you've provided the relevant changeset summaries and the tests pass, then you can open a PR against the `main` branch of the source repo.

> **_TODO:_** Add template for pull requests and issues

#### Issues running `bun run changeset`

If you encountered the following error when running `bun run changeset`:

```sh
% bunx changeset
🦋  error Error: Failed to find where HEAD diverged from main. Does main exist?
🦋  error     at getDivergedCommit (/home/me/git/danstepanov/create-expo-stack/node_modules/@changesets/git/dist/changesets-git.cjs.js:66:11)
🦋  error     at async getChangedFilesSince (/home/me/git/danstepanov/create-expo-stack/node_modules/@changesets/git/dist/changesets-git.cjs.js:198:22)
🦋  error     at async Object.getChangedPackagesSinceRef (/home/me/git/danstepanov/create-expo-stack/node_modules/@changesets/git/dist/changesets-git.cjs.js:239:24)
🦋  error     at async add (/home/me/git/danstepanov/create-expo-stack/node_modules/@changesets/cli/dist/changesets-cli.cjs.js:500:29)
🦋  error     at async run (/home/me/git/danstepanov/create-expo-stack/node_modules/@changesets/cli/dist/changesets-cli.cjs.js:1304:5)
```

This likely means you forked and/or cloned the repository before we changed the default branch from `beta` to `main`.

To resolve this error, you'll need the `main` branch locally:

1. Check the output of `git remote -v`. If you see a git URL for upstream (i.e. `danstepanov/create-expo-stack`), skip to step 4.
2. Add the upstream remote to your local git repository: `git remote add upstream git@github.com:danstepanov/create-expo-stack.git`
3. Fetch branch information from upstream: `git fetch upstream`
4. Check out `main` locally: `git checkout main`

## CLI project structure

### Tests (`./__tests__`)
* Tests to check every iteration of the CLI, using every kind of package manager
* [These aren't perfect atm](https://github.com/danstepanov/create-expo-stack/issues/18)


### Commands (``./cli/src/commands``)
* There is currently only one command, `create-expo-stack`. The function representing this command roughly breaks down into the following steps:
    1) Show the “help” view if that option was passed in
    2) Render the ASCII art title
    3) Set the default CLI options
    4) Check for options passed in that would skip the CLI prompts, such as:
    * User wants to use an opinionated stack like Ignite
    * User wants to use the default configuration
    * User wants to initialize a blank typescript template
    * User wants to run in non-interactive mode
        * Running the tests for create-expo-stack uses non-interactive mode
    5) Run the CLI prompts (optional)
        * Return object that conveys user specifications, overwriting default CLI options
    6) Assign project name based on whether user passed one in
    7) Assign packages based on CLI results
    8) Assign relevant variables to be passed to EJS files based on user specified configurations
    9) Configure project files
    * Represented by `configureProjectFiles.ts` in `./cli/src/utilities/`
    * Add the base project files as well as any additional project-dependent files based on user specifications
    10) Generate project
    * Represented by `generateProjectFiles.ts` in `./cli/src/utilities/`
    * Using the files from step (9), the variables from step (8), and  the CLI results, generate the Expo project
    11) Print results of CLI 

### Templates (``./cli/src/templates``)
* Collection of EJS files to be modified, as necessary, and converted to .ts files during the file configuration process.
* Directories
    * Base
        * Contains base files included in all Expo projects
    * Packages
        * Contains files pertaining to specific configurations

### Utilities (``./cli/src/utilities``)
* An assortment of helper functions and abstracted chunks of functionality to support the `create-expo-stack` command.

### Entry point (``./cli/src/cli.ts``)
* Entry point for create-expo-stack

### Constants
* Constant values used throughout the codebase, including default configurations.

### Types (``./cli/src/types.ts``)
* Assorted types

### Unused directories or ones you should not pay attention to
* `./cli/src/docs`
* `./.github`

## Debugging

When debugging, it can be useful to place a console log of the error in the the try catch block of `./cli/src/commands/create-expo-stack.ts`. This should give you a hint as to what is going wrong.
