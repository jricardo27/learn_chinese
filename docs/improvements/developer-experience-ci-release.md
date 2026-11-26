# Developer experience, CI/CD, and release engineering improvement plan

## Purpose

Make setup, verification, deployment, dependency updates, and releases repeatable enough that maintenance does not depend on memory.

## Current proof-of-concept signals

- The web app is a Vue 3 proof of concept loaded from a CDN in `magic/index.html`.
- `magic/script.js` holds most state, mode logic, audio playback, recording, pitch comparison, and quiz behavior in one file.
- `magic/words_data.js` maps 414 image filenames to Hanzi, Pinyin, English, categories, tones, and classifiers.
- `magic/audio/` and `magic/images/` each contain 414 assets, so offline behavior and asset weight matter.
- Capacitor targets iOS and Android, while `magic/deploy.sh` force-pushes a static build to GitHub Pages.
- The package test script is a placeholder, so every improvement task must define its own behavioral verification.

## Operating constraints

- Default to local files, browser APIs, open-source software, GitHub Pages, and GitHub Actions. Use a third-party service only when it has a renewable free tier that covers the expected usage. If no renewable free tier exists, write a cost-benefit analysis before adoption and keep a free alternative.
- Do not implement these tasks as one project. Select a small slice, prove it, and review the result before expanding scope.
- Keep learner-facing behavior unchanged unless the task explicitly changes it and the verification covers the change.
- Treat every task as a proposal. Delete or rewrite tasks that stop serving learners or maintainers.

## How to read the tasks

The area is grouped into 10 epics. Each epic has 10 tasks that move from evidence, outcome, design, prototype, implementation, edge cases, verification, rollout, and review. This structure keeps the 100 tasks detailed without pretending that every item is equally urgent.

## Tasks

## Epic 01: repository layout cleanup

### DX-001. Audit repository layout cleanup in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. repository layout cleanup
- Why now: moving files can break scripts and history.
- Scope: Trace root files, `magic/`, `utils/`, `tmp/`, generated native files, and stale workflows. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-002. Define the outcome and measurement for repository layout cleanup

- Priority: P0
- Effort: S
- Depends on: DX-001
- Epic: 01. repository layout cleanup
- Why now: moving files can break scripts and history.
- Scope: Write the intended result in plain language so that the repository structure communicates what belongs where. Choose one observable measure based on this target: each directory has an owner and generated-or-source status.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-003. Design the data and state contract for repository layout cleanup

- Priority: P0
- Effort: M
- Depends on: DX-002
- Epic: 01. repository layout cleanup
- Why now: moving files can break scripts and history.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in root files, `magic/`, `utils/`, `tmp/`, generated native files, and stale workflows. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-004. Prototype repository layout cleanup behind `ff_repo_layout`

- Priority: P2
- Effort: M
- Depends on: DX-003
- Epic: 01. repository layout cleanup
- Why now: moving files can break scripts and history.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that moving files can break scripts and history.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_repo_layout

### DX-005. Implement the foundation for repository layout cleanup

- Priority: P2
- Effort: L
- Depends on: DX-004
- Epic: 01. repository layout cleanup
- Why now: moving files can break scripts and history.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-006. Implement the core behavior for repository layout cleanup

- Priority: P1
- Effort: L
- Depends on: DX-005
- Epic: 01. repository layout cleanup
- Why now: moving files can break scripts and history.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the repository structure communicates what belongs where. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_repo_layout

### DX-007. Add edge states and failure handling for repository layout cleanup

- Priority: P2
- Effort: M
- Depends on: DX-006
- Epic: 01. repository layout cleanup
- Why now: moving files can break scripts and history.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to root files, `magic/`, `utils/`, `tmp/`, generated native files, and stale workflows.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-008. Verify repository layout cleanup with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: DX-007
- Epic: 01. repository layout cleanup
- Why now: moving files can break scripts and history.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-009. Document rollout, cost, and operations for repository layout cleanup

- Priority: P2
- Effort: S
- Depends on: DX-008
- Epic: 01. repository layout cleanup
- Why now: moving files can break scripts and history.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when repository layout cleanup uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-010. Measure and decide the future of repository layout cleanup

- Priority: P2
- Effort: S
- Depends on: DX-009
- Epic: 01. repository layout cleanup
- Why now: moving files can break scripts and history.
- Scope: Compare the observed result with the target from the outcome task: each directory has an owner and generated-or-source status. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_repo_layout

## Epic 02: package manager consistency

### DX-011. Audit package manager consistency in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. package manager consistency
- Why now: contributors may use different local tooling.
- Scope: Trace `package-lock.json`, `pnpm-lock.yaml`, npm scripts, and Node version. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-012. Define the outcome and measurement for package manager consistency

- Priority: P0
- Effort: S
- Depends on: DX-011
- Epic: 02. package manager consistency
- Why now: contributors may use different local tooling.
- Scope: Write the intended result in plain language so that installs are reproducible. Choose one observable measure based on this target: one package manager and one Node version are documented and enforced.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-013. Design the data and state contract for package manager consistency

- Priority: P0
- Effort: M
- Depends on: DX-012
- Epic: 02. package manager consistency
- Why now: contributors may use different local tooling.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `package-lock.json`, `pnpm-lock.yaml`, npm scripts, and Node version. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-014. Prototype package manager consistency behind `ff_package_manager_consistency`

- Priority: P2
- Effort: M
- Depends on: DX-013
- Epic: 02. package manager consistency
- Why now: contributors may use different local tooling.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that contributors may use different local tooling.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_package_manager_consistency

### DX-015. Implement the foundation for package manager consistency

- Priority: P2
- Effort: L
- Depends on: DX-014
- Epic: 02. package manager consistency
- Why now: contributors may use different local tooling.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-016. Implement the core behavior for package manager consistency

- Priority: P1
- Effort: L
- Depends on: DX-015
- Epic: 02. package manager consistency
- Why now: contributors may use different local tooling.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: installs are reproducible. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_package_manager_consistency

### DX-017. Add edge states and failure handling for package manager consistency

- Priority: P2
- Effort: M
- Depends on: DX-016
- Epic: 02. package manager consistency
- Why now: contributors may use different local tooling.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `package-lock.json`, `pnpm-lock.yaml`, npm scripts, and Node version.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-018. Verify package manager consistency with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: DX-017
- Epic: 02. package manager consistency
- Why now: contributors may use different local tooling.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-019. Document rollout, cost, and operations for package manager consistency

- Priority: P2
- Effort: S
- Depends on: DX-018
- Epic: 02. package manager consistency
- Why now: contributors may use different local tooling.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when package manager consistency uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-020. Measure and decide the future of package manager consistency

- Priority: P2
- Effort: S
- Depends on: DX-019
- Epic: 02. package manager consistency
- Why now: contributors may use different local tooling.
- Scope: Compare the observed result with the target from the outcome task: one package manager and one Node version are documented and enforced. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_package_manager_consistency

## Epic 03: unified verification command

### DX-021. Audit unified verification command in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. unified verification command
- Why now: mobile checks may be too slow for every pull request.
- Scope: Trace lint, data validation, unit tests, browser tests, build, and mobile checks. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-022. Define the outcome and measurement for unified verification command

- Priority: P2
- Effort: S
- Depends on: DX-021
- Epic: 03. unified verification command
- Why now: mobile checks may be too slow for every pull request.
- Scope: Write the intended result in plain language so that maintainers run one trustworthy command before review. Choose one observable measure based on this target: `npm run verify` has a documented contract.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-023. Design the data and state contract for unified verification command

- Priority: P1
- Effort: M
- Depends on: DX-022
- Epic: 03. unified verification command
- Why now: mobile checks may be too slow for every pull request.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in lint, data validation, unit tests, browser tests, build, and mobile checks. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-024. Prototype unified verification command behind `ff_verify_command`

- Priority: P2
- Effort: M
- Depends on: DX-023
- Epic: 03. unified verification command
- Why now: mobile checks may be too slow for every pull request.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that mobile checks may be too slow for every pull request.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_verify_command

### DX-025. Implement the foundation for unified verification command

- Priority: P2
- Effort: L
- Depends on: DX-024
- Epic: 03. unified verification command
- Why now: mobile checks may be too slow for every pull request.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-026. Implement the core behavior for unified verification command

- Priority: P1
- Effort: L
- Depends on: DX-025
- Epic: 03. unified verification command
- Why now: mobile checks may be too slow for every pull request.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: maintainers run one trustworthy command before review. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_verify_command

### DX-027. Add edge states and failure handling for unified verification command

- Priority: P2
- Effort: M
- Depends on: DX-026
- Epic: 03. unified verification command
- Why now: mobile checks may be too slow for every pull request.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to lint, data validation, unit tests, browser tests, build, and mobile checks.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-028. Verify unified verification command with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: DX-027
- Epic: 03. unified verification command
- Why now: mobile checks may be too slow for every pull request.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-029. Document rollout, cost, and operations for unified verification command

- Priority: P2
- Effort: S
- Depends on: DX-028
- Epic: 03. unified verification command
- Why now: mobile checks may be too slow for every pull request.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when unified verification command uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-030. Measure and decide the future of unified verification command

- Priority: P2
- Effort: S
- Depends on: DX-029
- Epic: 03. unified verification command
- Why now: mobile checks may be too slow for every pull request.
- Scope: Compare the observed result with the target from the outcome task: `npm run verify` has a documented contract. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_verify_command

## Epic 04: web CI pipeline

### DX-031. Audit web CI pipeline in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. web CI pipeline
- Why now: GitHub Actions usage must fit the free tier for the repository.
- Scope: Trace install, lint, test, build, content validation, and artifact upload. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-032. Define the outcome and measurement for web CI pipeline

- Priority: P2
- Effort: S
- Depends on: DX-031
- Epic: 04. web CI pipeline
- Why now: GitHub Actions usage must fit the free tier for the repository.
- Scope: Write the intended result in plain language so that web regressions are caught on every pull request. Choose one observable measure based on this target: CI uses the same commands as local verification.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-033. Design the data and state contract for web CI pipeline

- Priority: P1
- Effort: M
- Depends on: DX-032
- Epic: 04. web CI pipeline
- Why now: GitHub Actions usage must fit the free tier for the repository.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in install, lint, test, build, content validation, and artifact upload. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-034. Prototype web CI pipeline behind `ff_web_ci`

- Priority: P2
- Effort: M
- Depends on: DX-033
- Epic: 04. web CI pipeline
- Why now: GitHub Actions usage must fit the free tier for the repository.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that GitHub Actions usage must fit the free tier for the repository.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_web_ci

### DX-035. Implement the foundation for web CI pipeline

- Priority: P2
- Effort: L
- Depends on: DX-034
- Epic: 04. web CI pipeline
- Why now: GitHub Actions usage must fit the free tier for the repository.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-036. Implement the core behavior for web CI pipeline

- Priority: P1
- Effort: L
- Depends on: DX-035
- Epic: 04. web CI pipeline
- Why now: GitHub Actions usage must fit the free tier for the repository.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: web regressions are caught on every pull request. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_web_ci

### DX-037. Add edge states and failure handling for web CI pipeline

- Priority: P2
- Effort: M
- Depends on: DX-036
- Epic: 04. web CI pipeline
- Why now: GitHub Actions usage must fit the free tier for the repository.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to install, lint, test, build, content validation, and artifact upload.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-038. Verify web CI pipeline with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: DX-037
- Epic: 04. web CI pipeline
- Why now: GitHub Actions usage must fit the free tier for the repository.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-039. Document rollout, cost, and operations for web CI pipeline

- Priority: P2
- Effort: S
- Depends on: DX-038
- Epic: 04. web CI pipeline
- Why now: GitHub Actions usage must fit the free tier for the repository.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when web CI pipeline uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-040. Measure and decide the future of web CI pipeline

- Priority: P2
- Effort: S
- Depends on: DX-039
- Epic: 04. web CI pipeline
- Why now: GitHub Actions usage must fit the free tier for the repository.
- Scope: Compare the observed result with the target from the outcome task: CI uses the same commands as local verification. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_web_ci

## Epic 05: mobile CI pipeline

### DX-041. Audit mobile CI pipeline in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. mobile CI pipeline
- Why now: macOS runners and signing can exceed free constraints.
- Scope: Trace Capacitor sync, Android build, iOS build constraints, and signing. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-042. Define the outcome and measurement for mobile CI pipeline

- Priority: P2
- Effort: S
- Depends on: DX-041
- Epic: 05. mobile CI pipeline
- Why now: macOS runners and signing can exceed free constraints.
- Scope: Write the intended result in plain language so that mobile build breakage is visible before release. Choose one observable measure based on this target: Android CI builds from a clean checkout and iOS constraints are documented.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-043. Design the data and state contract for mobile CI pipeline

- Priority: P1
- Effort: M
- Depends on: DX-042
- Epic: 05. mobile CI pipeline
- Why now: macOS runners and signing can exceed free constraints.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in Capacitor sync, Android build, iOS build constraints, and signing. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-044. Prototype mobile CI pipeline behind `ff_mobile_ci`

- Priority: P2
- Effort: M
- Depends on: DX-043
- Epic: 05. mobile CI pipeline
- Why now: macOS runners and signing can exceed free constraints.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that macOS runners and signing can exceed free constraints.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_mobile_ci

### DX-045. Implement the foundation for mobile CI pipeline

- Priority: P2
- Effort: L
- Depends on: DX-044
- Epic: 05. mobile CI pipeline
- Why now: macOS runners and signing can exceed free constraints.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-046. Implement the core behavior for mobile CI pipeline

- Priority: P1
- Effort: L
- Depends on: DX-045
- Epic: 05. mobile CI pipeline
- Why now: macOS runners and signing can exceed free constraints.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: mobile build breakage is visible before release. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_mobile_ci

### DX-047. Add edge states and failure handling for mobile CI pipeline

- Priority: P2
- Effort: M
- Depends on: DX-046
- Epic: 05. mobile CI pipeline
- Why now: macOS runners and signing can exceed free constraints.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to Capacitor sync, Android build, iOS build constraints, and signing.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-048. Verify mobile CI pipeline with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: DX-047
- Epic: 05. mobile CI pipeline
- Why now: macOS runners and signing can exceed free constraints.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-049. Document rollout, cost, and operations for mobile CI pipeline

- Priority: P2
- Effort: S
- Depends on: DX-048
- Epic: 05. mobile CI pipeline
- Why now: macOS runners and signing can exceed free constraints.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when mobile CI pipeline uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-050. Measure and decide the future of mobile CI pipeline

- Priority: P2
- Effort: S
- Depends on: DX-049
- Epic: 05. mobile CI pipeline
- Why now: macOS runners and signing can exceed free constraints.
- Scope: Compare the observed result with the target from the outcome task: Android CI builds from a clean checkout and iOS constraints are documented. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_mobile_ci

## Epic 06: preview deployments

### DX-051. Audit preview deployments in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. preview deployments
- Why now: public previews expose unreleased content.
- Scope: Trace pull request previews, static hosting, and cleanup. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-052. Define the outcome and measurement for preview deployments

- Priority: P2
- Effort: S
- Depends on: DX-051
- Epic: 06. preview deployments
- Why now: public previews expose unreleased content.
- Scope: Write the intended result in plain language so that reviewers can try changes without pulling locally. Choose one observable measure based on this target: every pull request can produce a preview or clear reason none is needed.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-053. Design the data and state contract for preview deployments

- Priority: P1
- Effort: M
- Depends on: DX-052
- Epic: 06. preview deployments
- Why now: public previews expose unreleased content.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in pull request previews, static hosting, and cleanup. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-054. Prototype preview deployments behind `ff_preview_deployments`

- Priority: P2
- Effort: M
- Depends on: DX-053
- Epic: 06. preview deployments
- Why now: public previews expose unreleased content.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that public previews expose unreleased content.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_preview_deployments

### DX-055. Implement the foundation for preview deployments

- Priority: P2
- Effort: L
- Depends on: DX-054
- Epic: 06. preview deployments
- Why now: public previews expose unreleased content.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-056. Implement the core behavior for preview deployments

- Priority: P1
- Effort: L
- Depends on: DX-055
- Epic: 06. preview deployments
- Why now: public previews expose unreleased content.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: reviewers can try changes without pulling locally. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_preview_deployments

### DX-057. Add edge states and failure handling for preview deployments

- Priority: P2
- Effort: M
- Depends on: DX-056
- Epic: 06. preview deployments
- Why now: public previews expose unreleased content.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to pull request previews, static hosting, and cleanup.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-058. Verify preview deployments with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: DX-057
- Epic: 06. preview deployments
- Why now: public previews expose unreleased content.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-059. Document rollout, cost, and operations for preview deployments

- Priority: P2
- Effort: S
- Depends on: DX-058
- Epic: 06. preview deployments
- Why now: public previews expose unreleased content.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when preview deployments uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-060. Measure and decide the future of preview deployments

- Priority: P2
- Effort: S
- Depends on: DX-059
- Epic: 06. preview deployments
- Why now: public previews expose unreleased content.
- Scope: Compare the observed result with the target from the outcome task: every pull request can produce a preview or clear reason none is needed. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_preview_deployments

## Epic 07: release process

### DX-061. Audit release process in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. release process
- Why now: the current `deploy.sh` force-pushes generated content.
- Scope: Trace versioning, release notes, web deploy, mobile build, rollback, and post-release checks. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-062. Define the outcome and measurement for release process

- Priority: P2
- Effort: S
- Depends on: DX-061
- Epic: 07. release process
- Why now: the current `deploy.sh` force-pushes generated content.
- Scope: Write the intended result in plain language so that releases become repeatable. Choose one observable measure based on this target: a checklist or automation covers each release step.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-063. Design the data and state contract for release process

- Priority: P2
- Effort: M
- Depends on: DX-062
- Epic: 07. release process
- Why now: the current `deploy.sh` force-pushes generated content.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in versioning, release notes, web deploy, mobile build, rollback, and post-release checks. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-064. Prototype release process behind `ff_release_process`

- Priority: P2
- Effort: M
- Depends on: DX-063
- Epic: 07. release process
- Why now: the current `deploy.sh` force-pushes generated content.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the current `deploy.sh` force-pushes generated content.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_release_process

### DX-065. Implement the foundation for release process

- Priority: P2
- Effort: L
- Depends on: DX-064
- Epic: 07. release process
- Why now: the current `deploy.sh` force-pushes generated content.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-066. Implement the core behavior for release process

- Priority: P2
- Effort: L
- Depends on: DX-065
- Epic: 07. release process
- Why now: the current `deploy.sh` force-pushes generated content.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: releases become repeatable. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_release_process

### DX-067. Add edge states and failure handling for release process

- Priority: P2
- Effort: M
- Depends on: DX-066
- Epic: 07. release process
- Why now: the current `deploy.sh` force-pushes generated content.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to versioning, release notes, web deploy, mobile build, rollback, and post-release checks.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-068. Verify release process with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: DX-067
- Epic: 07. release process
- Why now: the current `deploy.sh` force-pushes generated content.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-069. Document rollout, cost, and operations for release process

- Priority: P2
- Effort: S
- Depends on: DX-068
- Epic: 07. release process
- Why now: the current `deploy.sh` force-pushes generated content.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when release process uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-070. Measure and decide the future of release process

- Priority: P2
- Effort: S
- Depends on: DX-069
- Epic: 07. release process
- Why now: the current `deploy.sh` force-pushes generated content.
- Scope: Compare the observed result with the target from the outcome task: a checklist or automation covers each release step. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_release_process

## Epic 08: dependency update process

### DX-071. Audit dependency update process in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. dependency update process
- Why now: automatic updates can break native builds.
- Scope: Trace npm, Capacitor, GitHub Actions, Python tools, and native dependencies. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-072. Define the outcome and measurement for dependency update process

- Priority: P2
- Effort: S
- Depends on: DX-071
- Epic: 08. dependency update process
- Why now: automatic updates can break native builds.
- Scope: Write the intended result in plain language so that updates happen deliberately instead of reactively. Choose one observable measure based on this target: an update cadence and compatibility matrix exist.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-073. Design the data and state contract for dependency update process

- Priority: P2
- Effort: M
- Depends on: DX-072
- Epic: 08. dependency update process
- Why now: automatic updates can break native builds.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in npm, Capacitor, GitHub Actions, Python tools, and native dependencies. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-074. Prototype dependency update process behind `ff_dependency_updates`

- Priority: P2
- Effort: M
- Depends on: DX-073
- Epic: 08. dependency update process
- Why now: automatic updates can break native builds.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that automatic updates can break native builds.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_dependency_updates

### DX-075. Implement the foundation for dependency update process

- Priority: P2
- Effort: L
- Depends on: DX-074
- Epic: 08. dependency update process
- Why now: automatic updates can break native builds.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-076. Implement the core behavior for dependency update process

- Priority: P2
- Effort: L
- Depends on: DX-075
- Epic: 08. dependency update process
- Why now: automatic updates can break native builds.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: updates happen deliberately instead of reactively. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_dependency_updates

### DX-077. Add edge states and failure handling for dependency update process

- Priority: P2
- Effort: M
- Depends on: DX-076
- Epic: 08. dependency update process
- Why now: automatic updates can break native builds.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to npm, Capacitor, GitHub Actions, Python tools, and native dependencies.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-078. Verify dependency update process with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: DX-077
- Epic: 08. dependency update process
- Why now: automatic updates can break native builds.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-079. Document rollout, cost, and operations for dependency update process

- Priority: P2
- Effort: S
- Depends on: DX-078
- Epic: 08. dependency update process
- Why now: automatic updates can break native builds.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when dependency update process uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-080. Measure and decide the future of dependency update process

- Priority: P2
- Effort: S
- Depends on: DX-079
- Epic: 08. dependency update process
- Why now: automatic updates can break native builds.
- Scope: Compare the observed result with the target from the outcome task: an update cadence and compatibility matrix exist. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_dependency_updates

## Epic 09: code review and ownership

### DX-081. Audit code review and ownership in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. code review and ownership
- Why now: a solo maintainer still needs checklists rather than mandatory approvals.
- Scope: Trace pull request template, ownership rules, review checklist, and generated files. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-082. Define the outcome and measurement for code review and ownership

- Priority: P2
- Effort: S
- Depends on: DX-081
- Epic: 09. code review and ownership
- Why now: a solo maintainer still needs checklists rather than mandatory approvals.
- Scope: Write the intended result in plain language so that reviewers know what to inspect and what to skip. Choose one observable measure based on this target: the review process distinguishes source, generated, docs, and data changes.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-083. Design the data and state contract for code review and ownership

- Priority: P2
- Effort: M
- Depends on: DX-082
- Epic: 09. code review and ownership
- Why now: a solo maintainer still needs checklists rather than mandatory approvals.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in pull request template, ownership rules, review checklist, and generated files. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-084. Prototype code review and ownership behind `ff_review_ownership`

- Priority: P2
- Effort: M
- Depends on: DX-083
- Epic: 09. code review and ownership
- Why now: a solo maintainer still needs checklists rather than mandatory approvals.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that a solo maintainer still needs checklists rather than mandatory approvals.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_review_ownership

### DX-085. Implement the foundation for code review and ownership

- Priority: P2
- Effort: L
- Depends on: DX-084
- Epic: 09. code review and ownership
- Why now: a solo maintainer still needs checklists rather than mandatory approvals.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-086. Implement the core behavior for code review and ownership

- Priority: P2
- Effort: L
- Depends on: DX-085
- Epic: 09. code review and ownership
- Why now: a solo maintainer still needs checklists rather than mandatory approvals.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: reviewers know what to inspect and what to skip. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_review_ownership

### DX-087. Add edge states and failure handling for code review and ownership

- Priority: P2
- Effort: M
- Depends on: DX-086
- Epic: 09. code review and ownership
- Why now: a solo maintainer still needs checklists rather than mandatory approvals.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to pull request template, ownership rules, review checklist, and generated files.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-088. Verify code review and ownership with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: DX-087
- Epic: 09. code review and ownership
- Why now: a solo maintainer still needs checklists rather than mandatory approvals.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-089. Document rollout, cost, and operations for code review and ownership

- Priority: P2
- Effort: S
- Depends on: DX-088
- Epic: 09. code review and ownership
- Why now: a solo maintainer still needs checklists rather than mandatory approvals.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when code review and ownership uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-090. Measure and decide the future of code review and ownership

- Priority: P2
- Effort: S
- Depends on: DX-089
- Epic: 09. code review and ownership
- Why now: a solo maintainer still needs checklists rather than mandatory approvals.
- Scope: Compare the observed result with the target from the outcome task: the review process distinguishes source, generated, docs, and data changes. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_review_ownership

## Epic 10: environment and secrets management

### DX-091. Audit environment and secrets management in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. environment and secrets management
- Why now: client-side configuration must never carry secrets.
- Scope: Trace `.env`, local development, CI secrets, service credentials, and documentation. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-092. Define the outcome and measurement for environment and secrets management

- Priority: P2
- Effort: S
- Depends on: DX-091
- Epic: 10. environment and secrets management
- Why now: client-side configuration must never carry secrets.
- Scope: Write the intended result in plain language so that setup is secure and reproducible. Choose one observable measure based on this target: every required variable has an example, owner, scope, and rotation note.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-093. Design the data and state contract for environment and secrets management

- Priority: P2
- Effort: M
- Depends on: DX-092
- Epic: 10. environment and secrets management
- Why now: client-side configuration must never carry secrets.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `.env`, local development, CI secrets, service credentials, and documentation. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-094. Prototype environment and secrets management behind `ff_environment_secrets`

- Priority: P2
- Effort: M
- Depends on: DX-093
- Epic: 10. environment and secrets management
- Why now: client-side configuration must never carry secrets.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that client-side configuration must never carry secrets.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_environment_secrets

### DX-095. Implement the foundation for environment and secrets management

- Priority: P2
- Effort: L
- Depends on: DX-094
- Epic: 10. environment and secrets management
- Why now: client-side configuration must never carry secrets.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-096. Implement the core behavior for environment and secrets management

- Priority: P2
- Effort: L
- Depends on: DX-095
- Epic: 10. environment and secrets management
- Why now: client-side configuration must never carry secrets.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: setup is secure and reproducible. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_environment_secrets

### DX-097. Add edge states and failure handling for environment and secrets management

- Priority: P2
- Effort: M
- Depends on: DX-096
- Epic: 10. environment and secrets management
- Why now: client-side configuration must never carry secrets.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `.env`, local development, CI secrets, service credentials, and documentation.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-098. Verify environment and secrets management with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: DX-097
- Epic: 10. environment and secrets management
- Why now: client-side configuration must never carry secrets.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-099. Document rollout, cost, and operations for environment and secrets management

- Priority: P2
- Effort: S
- Depends on: DX-098
- Epic: 10. environment and secrets management
- Why now: client-side configuration must never carry secrets.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when environment and secrets management uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DX-100. Measure and decide the future of environment and secrets management

- Priority: P2
- Effort: S
- Depends on: DX-099
- Epic: 10. environment and secrets management
- Why now: client-side configuration must never carry secrets.
- Scope: Compare the observed result with the target from the outcome task: every required variable has an example, owner, scope, and rotation note. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_environment_secrets

## Conflicts and feature-flag strategies

### Conflict 1: Fast deploy script versus reviewed CI deployment

| Option | Pros | Cons |
|---|---|---|
| Keep the direct deploy script | Deployment is simple and matches the current proof of concept | Force-pushed generated output bypasses review and can publish untested assets |
| Use CI deployment | Every deploy follows the same verified path and leaves an auditable run | CI setup takes time and uses Actions minutes |

Feature-flag or coexistence plan: Keep manual deploy as an emergency path behind documentation, but make CI the default.

### Conflict 2: npm versus pnpm

| Option | Pros | Cons |
|---|---|---|
| Use npm | It is standard, already represented by `package-lock.json`, and requires no extra install | Installs can be slower and disk use higher |
| Use pnpm | Installs are efficient and monorepo support is strong | Contributors need another tool and existing lockfiles must migrate |

Feature-flag or coexistence plan: Choose one package manager and encode it in `packageManager` plus CI rather than documenting both.

### Conflict 3: Full mobile CI versus release-only mobile builds

| Option | Pros | Cons |
|---|---|---|
| Run mobile builds on every pull request | Breakage is caught early | macOS and Android build time can exceed free or reasonable CI budgets |
| Run mobile builds before release | Routine pull requests stay fast and cheap | Mobile breakage is discovered later |

Feature-flag or coexistence plan: Run web checks on every pull request and mobile builds on release candidates or workflow dispatch.

## Third-party service cost policy

Use GitHub Actions within the repository's free allowance and local open-source tooling. Paid CI minutes, signing services, or hosted build services need cost-benefit analysis.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
