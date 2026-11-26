# Code quality and maintainability improvement plan

## Purpose

Make the proof of concept easier to read, change, and review without changing learner-facing behavior.

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

## Epic 01: `magic/script.js` decomposition

### CQ-001. Audit `magic/script.js` decomposition in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. `magic/script.js` decomposition
- Why now: a broad extraction can break implicit coupling.
- Scope: Trace mode methods, audio state, quiz setup, and shadowing state in `magic/script.js`. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-002. Define the outcome and measurement for `magic/script.js` decomposition

- Priority: P0
- Effort: S
- Depends on: CQ-001
- Epic: 01. `magic/script.js` decomposition
- Why now: a broad extraction can break implicit coupling.
- Scope: Write the intended result in plain language so that a maintainer can find the owner of each behavior in one pass. Choose one observable measure based on this target: no module exceeds an agreed size budget and each public behavior has one owner.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-003. Design the data and state contract for `magic/script.js` decomposition

- Priority: P0
- Effort: M
- Depends on: CQ-002
- Epic: 01. `magic/script.js` decomposition
- Why now: a broad extraction can break implicit coupling.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in mode methods, audio state, quiz setup, and shadowing state in `magic/script.js`. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-004. Prototype `magic/script.js` decomposition behind `ff_script_decomposition`

- Priority: P2
- Effort: M
- Depends on: CQ-003
- Epic: 01. `magic/script.js` decomposition
- Why now: a broad extraction can break implicit coupling.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that a broad extraction can break implicit coupling.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_script_decomposition

### CQ-005. Implement the foundation for `magic/script.js` decomposition

- Priority: P2
- Effort: L
- Depends on: CQ-004
- Epic: 01. `magic/script.js` decomposition
- Why now: a broad extraction can break implicit coupling.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-006. Implement the core behavior for `magic/script.js` decomposition

- Priority: P1
- Effort: L
- Depends on: CQ-005
- Epic: 01. `magic/script.js` decomposition
- Why now: a broad extraction can break implicit coupling.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: a maintainer can find the owner of each behavior in one pass. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_script_decomposition

### CQ-007. Add edge states and failure handling for `magic/script.js` decomposition

- Priority: P2
- Effort: M
- Depends on: CQ-006
- Epic: 01. `magic/script.js` decomposition
- Why now: a broad extraction can break implicit coupling.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to mode methods, audio state, quiz setup, and shadowing state in `magic/script.js`.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-008. Verify `magic/script.js` decomposition with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: CQ-007
- Epic: 01. `magic/script.js` decomposition
- Why now: a broad extraction can break implicit coupling.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-009. Document rollout, cost, and operations for `magic/script.js` decomposition

- Priority: P2
- Effort: S
- Depends on: CQ-008
- Epic: 01. `magic/script.js` decomposition
- Why now: a broad extraction can break implicit coupling.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when `magic/script.js` decomposition uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-010. Measure and decide the future of `magic/script.js` decomposition

- Priority: P2
- Effort: S
- Depends on: CQ-009
- Epic: 01. `magic/script.js` decomposition
- Why now: a broad extraction can break implicit coupling.
- Scope: Compare the observed result with the target from the outcome task: no module exceeds an agreed size budget and each public behavior has one owner. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_script_decomposition

## Epic 02: duplicated and implicit state cleanup

### CQ-011. Audit duplicated and implicit state cleanup in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. duplicated and implicit state cleanup
- Why now: hidden dependencies may survive the cleanup.
- Scope: Trace `playDelay`, mode flags, recording state, quiz state, and session indexes. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-012. Define the outcome and measurement for duplicated and implicit state cleanup

- Priority: P0
- Effort: S
- Depends on: CQ-011
- Epic: 02. duplicated and implicit state cleanup
- Why now: hidden dependencies may survive the cleanup.
- Scope: Write the intended result in plain language so that state transitions become predictable and reviewable. Choose one observable measure based on this target: no duplicate keys or mutually inconsistent booleans remain.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-013. Design the data and state contract for duplicated and implicit state cleanup

- Priority: P0
- Effort: M
- Depends on: CQ-012
- Epic: 02. duplicated and implicit state cleanup
- Why now: hidden dependencies may survive the cleanup.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `playDelay`, mode flags, recording state, quiz state, and session indexes. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-014. Prototype duplicated and implicit state cleanup behind `ff_state_deduplication`

- Priority: P2
- Effort: M
- Depends on: CQ-013
- Epic: 02. duplicated and implicit state cleanup
- Why now: hidden dependencies may survive the cleanup.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that hidden dependencies may survive the cleanup.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_state_deduplication

### CQ-015. Implement the foundation for duplicated and implicit state cleanup

- Priority: P2
- Effort: L
- Depends on: CQ-014
- Epic: 02. duplicated and implicit state cleanup
- Why now: hidden dependencies may survive the cleanup.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-016. Implement the core behavior for duplicated and implicit state cleanup

- Priority: P1
- Effort: L
- Depends on: CQ-015
- Epic: 02. duplicated and implicit state cleanup
- Why now: hidden dependencies may survive the cleanup.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: state transitions become predictable and reviewable. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_state_deduplication

### CQ-017. Add edge states and failure handling for duplicated and implicit state cleanup

- Priority: P2
- Effort: M
- Depends on: CQ-016
- Epic: 02. duplicated and implicit state cleanup
- Why now: hidden dependencies may survive the cleanup.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `playDelay`, mode flags, recording state, quiz state, and session indexes.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-018. Verify duplicated and implicit state cleanup with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: CQ-017
- Epic: 02. duplicated and implicit state cleanup
- Why now: hidden dependencies may survive the cleanup.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-019. Document rollout, cost, and operations for duplicated and implicit state cleanup

- Priority: P2
- Effort: S
- Depends on: CQ-018
- Epic: 02. duplicated and implicit state cleanup
- Why now: hidden dependencies may survive the cleanup.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when duplicated and implicit state cleanup uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-020. Measure and decide the future of duplicated and implicit state cleanup

- Priority: P2
- Effort: S
- Depends on: CQ-019
- Epic: 02. duplicated and implicit state cleanup
- Why now: hidden dependencies may survive the cleanup.
- Scope: Compare the observed result with the target from the outcome task: no duplicate keys or mutually inconsistent booleans remain. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_state_deduplication

## Epic 03: lint and formatting baseline

### CQ-021. Audit lint and formatting baseline in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. lint and formatting baseline
- Why now: the first baseline may create a large formatting diff.
- Scope: Trace JavaScript, HTML, CSS, and shell scripts. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-022. Define the outcome and measurement for lint and formatting baseline

- Priority: P2
- Effort: S
- Depends on: CQ-021
- Epic: 03. lint and formatting baseline
- Why now: the first baseline may create a large formatting diff.
- Scope: Write the intended result in plain language so that every change receives the same mechanical checks. Choose one observable measure based on this target: `npm run lint` and `npm run format:check` run locally and in CI.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-023. Design the data and state contract for lint and formatting baseline

- Priority: P1
- Effort: M
- Depends on: CQ-022
- Epic: 03. lint and formatting baseline
- Why now: the first baseline may create a large formatting diff.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in JavaScript, HTML, CSS, and shell scripts. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-024. Prototype lint and formatting baseline behind `ff_lint_format`

- Priority: P2
- Effort: M
- Depends on: CQ-023
- Epic: 03. lint and formatting baseline
- Why now: the first baseline may create a large formatting diff.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the first baseline may create a large formatting diff.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_lint_format

### CQ-025. Implement the foundation for lint and formatting baseline

- Priority: P2
- Effort: L
- Depends on: CQ-024
- Epic: 03. lint and formatting baseline
- Why now: the first baseline may create a large formatting diff.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-026. Implement the core behavior for lint and formatting baseline

- Priority: P1
- Effort: L
- Depends on: CQ-025
- Epic: 03. lint and formatting baseline
- Why now: the first baseline may create a large formatting diff.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: every change receives the same mechanical checks. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_lint_format

### CQ-027. Add edge states and failure handling for lint and formatting baseline

- Priority: P2
- Effort: M
- Depends on: CQ-026
- Epic: 03. lint and formatting baseline
- Why now: the first baseline may create a large formatting diff.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to JavaScript, HTML, CSS, and shell scripts.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-028. Verify lint and formatting baseline with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: CQ-027
- Epic: 03. lint and formatting baseline
- Why now: the first baseline may create a large formatting diff.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-029. Document rollout, cost, and operations for lint and formatting baseline

- Priority: P2
- Effort: S
- Depends on: CQ-028
- Epic: 03. lint and formatting baseline
- Why now: the first baseline may create a large formatting diff.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when lint and formatting baseline uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-030. Measure and decide the future of lint and formatting baseline

- Priority: P2
- Effort: S
- Depends on: CQ-029
- Epic: 03. lint and formatting baseline
- Why now: the first baseline may create a large formatting diff.
- Scope: Compare the observed result with the target from the outcome task: `npm run lint` and `npm run format:check` run locally and in CI. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_lint_format

## Epic 04: naming and file organization

### CQ-031. Audit naming and file organization in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. naming and file organization
- Why now: renames can break deployment and Capacitor paths.
- Scope: Trace `magic/`, `utils/`, `scripts/`, assets, and generated native files. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-032. Define the outcome and measurement for naming and file organization

- Priority: P2
- Effort: S
- Depends on: CQ-031
- Epic: 04. naming and file organization
- Why now: renames can break deployment and Capacitor paths.
- Scope: Write the intended result in plain language so that a new maintainer can predict where a file belongs. Choose one observable measure based on this target: each top-level directory has a written ownership rule.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-033. Design the data and state contract for naming and file organization

- Priority: P1
- Effort: M
- Depends on: CQ-032
- Epic: 04. naming and file organization
- Why now: renames can break deployment and Capacitor paths.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `magic/`, `utils/`, `scripts/`, assets, and generated native files. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-034. Prototype naming and file organization behind `ff_naming_organization`

- Priority: P2
- Effort: M
- Depends on: CQ-033
- Epic: 04. naming and file organization
- Why now: renames can break deployment and Capacitor paths.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that renames can break deployment and Capacitor paths.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_naming_organization

### CQ-035. Implement the foundation for naming and file organization

- Priority: P2
- Effort: L
- Depends on: CQ-034
- Epic: 04. naming and file organization
- Why now: renames can break deployment and Capacitor paths.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-036. Implement the core behavior for naming and file organization

- Priority: P1
- Effort: L
- Depends on: CQ-035
- Epic: 04. naming and file organization
- Why now: renames can break deployment and Capacitor paths.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: a new maintainer can predict where a file belongs. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_naming_organization

### CQ-037. Add edge states and failure handling for naming and file organization

- Priority: P2
- Effort: M
- Depends on: CQ-036
- Epic: 04. naming and file organization
- Why now: renames can break deployment and Capacitor paths.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `magic/`, `utils/`, `scripts/`, assets, and generated native files.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-038. Verify naming and file organization with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: CQ-037
- Epic: 04. naming and file organization
- Why now: renames can break deployment and Capacitor paths.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-039. Document rollout, cost, and operations for naming and file organization

- Priority: P2
- Effort: S
- Depends on: CQ-038
- Epic: 04. naming and file organization
- Why now: renames can break deployment and Capacitor paths.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when naming and file organization uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-040. Measure and decide the future of naming and file organization

- Priority: P2
- Effort: S
- Depends on: CQ-039
- Epic: 04. naming and file organization
- Why now: renames can break deployment and Capacitor paths.
- Scope: Compare the observed result with the target from the outcome task: each top-level directory has a written ownership rule. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_naming_organization

## Epic 05: word-data validation

### CQ-041. Audit word-data validation in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. word-data validation
- Why now: strict validation may expose many existing data defects.
- Scope: Trace `magic/words_data.js` and the matching audio and image files. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-042. Define the outcome and measurement for word-data validation

- Priority: P2
- Effort: S
- Depends on: CQ-041
- Epic: 05. word-data validation
- Why now: strict validation may expose many existing data defects.
- Scope: Write the intended result in plain language so that bad content fails before it reaches a learner. Choose one observable measure based on this target: all 414 entries validate against one schema.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-043. Design the data and state contract for word-data validation

- Priority: P1
- Effort: M
- Depends on: CQ-042
- Epic: 05. word-data validation
- Why now: strict validation may expose many existing data defects.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `magic/words_data.js` and the matching audio and image files. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-044. Prototype word-data validation behind `ff_word_data_validation`

- Priority: P2
- Effort: M
- Depends on: CQ-043
- Epic: 05. word-data validation
- Why now: strict validation may expose many existing data defects.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that strict validation may expose many existing data defects.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_word_data_validation

### CQ-045. Implement the foundation for word-data validation

- Priority: P2
- Effort: L
- Depends on: CQ-044
- Epic: 05. word-data validation
- Why now: strict validation may expose many existing data defects.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-046. Implement the core behavior for word-data validation

- Priority: P1
- Effort: L
- Depends on: CQ-045
- Epic: 05. word-data validation
- Why now: strict validation may expose many existing data defects.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: bad content fails before it reaches a learner. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_word_data_validation

### CQ-047. Add edge states and failure handling for word-data validation

- Priority: P2
- Effort: M
- Depends on: CQ-046
- Epic: 05. word-data validation
- Why now: strict validation may expose many existing data defects.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `magic/words_data.js` and the matching audio and image files.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-048. Verify word-data validation with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: CQ-047
- Epic: 05. word-data validation
- Why now: strict validation may expose many existing data defects.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-049. Document rollout, cost, and operations for word-data validation

- Priority: P2
- Effort: S
- Depends on: CQ-048
- Epic: 05. word-data validation
- Why now: strict validation may expose many existing data defects.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when word-data validation uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-050. Measure and decide the future of word-data validation

- Priority: P2
- Effort: S
- Depends on: CQ-049
- Epic: 05. word-data validation
- Why now: strict validation may expose many existing data defects.
- Scope: Compare the observed result with the target from the outcome task: all 414 entries validate against one schema. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_word_data_validation

## Epic 06: audio playback lifecycle quality

### CQ-051. Audit audio playback lifecycle quality in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. audio playback lifecycle quality
- Why now: browser and native behavior differ.
- Scope: Trace `playActiveWord`, `playWebAudio`, `stopPlayback`, and NativeAudio fallback paths. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-052. Define the outcome and measurement for audio playback lifecycle quality

- Priority: P2
- Effort: S
- Depends on: CQ-051
- Epic: 06. audio playback lifecycle quality
- Why now: browser and native behavior differ.
- Scope: Write the intended result in plain language so that audio does not overlap, leak, or strand session state. Choose one observable measure based on this target: every playback path has a defined start, stop, completion, and error path.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-053. Design the data and state contract for audio playback lifecycle quality

- Priority: P1
- Effort: M
- Depends on: CQ-052
- Epic: 06. audio playback lifecycle quality
- Why now: browser and native behavior differ.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `playActiveWord`, `playWebAudio`, `stopPlayback`, and NativeAudio fallback paths. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-054. Prototype audio playback lifecycle quality behind `ff_audio_lifecycle`

- Priority: P2
- Effort: M
- Depends on: CQ-053
- Epic: 06. audio playback lifecycle quality
- Why now: browser and native behavior differ.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that browser and native behavior differ.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_audio_lifecycle

### CQ-055. Implement the foundation for audio playback lifecycle quality

- Priority: P2
- Effort: L
- Depends on: CQ-054
- Epic: 06. audio playback lifecycle quality
- Why now: browser and native behavior differ.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-056. Implement the core behavior for audio playback lifecycle quality

- Priority: P1
- Effort: L
- Depends on: CQ-055
- Epic: 06. audio playback lifecycle quality
- Why now: browser and native behavior differ.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: audio does not overlap, leak, or strand session state. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_audio_lifecycle

### CQ-057. Add edge states and failure handling for audio playback lifecycle quality

- Priority: P2
- Effort: M
- Depends on: CQ-056
- Epic: 06. audio playback lifecycle quality
- Why now: browser and native behavior differ.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `playActiveWord`, `playWebAudio`, `stopPlayback`, and NativeAudio fallback paths.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-058. Verify audio playback lifecycle quality with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: CQ-057
- Epic: 06. audio playback lifecycle quality
- Why now: browser and native behavior differ.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-059. Document rollout, cost, and operations for audio playback lifecycle quality

- Priority: P2
- Effort: S
- Depends on: CQ-058
- Epic: 06. audio playback lifecycle quality
- Why now: browser and native behavior differ.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when audio playback lifecycle quality uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-060. Measure and decide the future of audio playback lifecycle quality

- Priority: P2
- Effort: S
- Depends on: CQ-059
- Epic: 06. audio playback lifecycle quality
- Why now: browser and native behavior differ.
- Scope: Compare the observed result with the target from the outcome task: every playback path has a defined start, stop, completion, and error path. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_audio_lifecycle

## Epic 07: speech synthesis lifecycle quality

### CQ-061. Audit speech synthesis lifecycle quality in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. speech synthesis lifecycle quality
- Why now: voices vary across devices and browsers.
- Scope: Trace `speak` and browser voice selection. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-062. Define the outcome and measurement for speech synthesis lifecycle quality

- Priority: P2
- Effort: S
- Depends on: CQ-061
- Epic: 07. speech synthesis lifecycle quality
- Why now: voices vary across devices and browsers.
- Scope: Write the intended result in plain language so that spoken feedback is consistent and cancellable. Choose one observable measure based on this target: speech never overlaps reference audio unless the design says so.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-063. Design the data and state contract for speech synthesis lifecycle quality

- Priority: P2
- Effort: M
- Depends on: CQ-062
- Epic: 07. speech synthesis lifecycle quality
- Why now: voices vary across devices and browsers.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `speak` and browser voice selection. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-064. Prototype speech synthesis lifecycle quality behind `ff_speech_synthesis_lifecycle`

- Priority: P2
- Effort: M
- Depends on: CQ-063
- Epic: 07. speech synthesis lifecycle quality
- Why now: voices vary across devices and browsers.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that voices vary across devices and browsers.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_speech_synthesis_lifecycle

### CQ-065. Implement the foundation for speech synthesis lifecycle quality

- Priority: P2
- Effort: L
- Depends on: CQ-064
- Epic: 07. speech synthesis lifecycle quality
- Why now: voices vary across devices and browsers.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-066. Implement the core behavior for speech synthesis lifecycle quality

- Priority: P2
- Effort: L
- Depends on: CQ-065
- Epic: 07. speech synthesis lifecycle quality
- Why now: voices vary across devices and browsers.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: spoken feedback is consistent and cancellable. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_speech_synthesis_lifecycle

### CQ-067. Add edge states and failure handling for speech synthesis lifecycle quality

- Priority: P2
- Effort: M
- Depends on: CQ-066
- Epic: 07. speech synthesis lifecycle quality
- Why now: voices vary across devices and browsers.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `speak` and browser voice selection.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-068. Verify speech synthesis lifecycle quality with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: CQ-067
- Epic: 07. speech synthesis lifecycle quality
- Why now: voices vary across devices and browsers.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-069. Document rollout, cost, and operations for speech synthesis lifecycle quality

- Priority: P2
- Effort: S
- Depends on: CQ-068
- Epic: 07. speech synthesis lifecycle quality
- Why now: voices vary across devices and browsers.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when speech synthesis lifecycle quality uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-070. Measure and decide the future of speech synthesis lifecycle quality

- Priority: P2
- Effort: S
- Depends on: CQ-069
- Epic: 07. speech synthesis lifecycle quality
- Why now: voices vary across devices and browsers.
- Scope: Compare the observed result with the target from the outcome task: speech never overlaps reference audio unless the design says so. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_speech_synthesis_lifecycle

## Epic 08: quiz and recall logic readability

### CQ-071. Audit quiz and recall logic readability in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. quiz and recall logic readability
- Why now: small regressions can hide in score and reveal timing.
- Scope: Trace `setupQuiz`, classifier choices, answer handlers, and recall reveal logic. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-072. Define the outcome and measurement for quiz and recall logic readability

- Priority: P2
- Effort: S
- Depends on: CQ-071
- Epic: 08. quiz and recall logic readability
- Why now: small regressions can hide in score and reveal timing.
- Scope: Write the intended result in plain language so that quiz behavior can be changed without reading unrelated playback code. Choose one observable measure based on this target: choice generation and scoring have isolated pure functions.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-073. Design the data and state contract for quiz and recall logic readability

- Priority: P2
- Effort: M
- Depends on: CQ-072
- Epic: 08. quiz and recall logic readability
- Why now: small regressions can hide in score and reveal timing.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `setupQuiz`, classifier choices, answer handlers, and recall reveal logic. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-074. Prototype quiz and recall logic readability behind `ff_quiz_logic_readability`

- Priority: P2
- Effort: M
- Depends on: CQ-073
- Epic: 08. quiz and recall logic readability
- Why now: small regressions can hide in score and reveal timing.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that small regressions can hide in score and reveal timing.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_quiz_logic_readability

### CQ-075. Implement the foundation for quiz and recall logic readability

- Priority: P2
- Effort: L
- Depends on: CQ-074
- Epic: 08. quiz and recall logic readability
- Why now: small regressions can hide in score and reveal timing.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-076. Implement the core behavior for quiz and recall logic readability

- Priority: P2
- Effort: L
- Depends on: CQ-075
- Epic: 08. quiz and recall logic readability
- Why now: small regressions can hide in score and reveal timing.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: quiz behavior can be changed without reading unrelated playback code. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_quiz_logic_readability

### CQ-077. Add edge states and failure handling for quiz and recall logic readability

- Priority: P2
- Effort: M
- Depends on: CQ-076
- Epic: 08. quiz and recall logic readability
- Why now: small regressions can hide in score and reveal timing.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `setupQuiz`, classifier choices, answer handlers, and recall reveal logic.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-078. Verify quiz and recall logic readability with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: CQ-077
- Epic: 08. quiz and recall logic readability
- Why now: small regressions can hide in score and reveal timing.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-079. Document rollout, cost, and operations for quiz and recall logic readability

- Priority: P2
- Effort: S
- Depends on: CQ-078
- Epic: 08. quiz and recall logic readability
- Why now: small regressions can hide in score and reveal timing.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when quiz and recall logic readability uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-080. Measure and decide the future of quiz and recall logic readability

- Priority: P2
- Effort: S
- Depends on: CQ-079
- Epic: 08. quiz and recall logic readability
- Why now: small regressions can hide in score and reveal timing.
- Scope: Compare the observed result with the target from the outcome task: choice generation and scoring have isolated pure functions. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_quiz_logic_readability

## Epic 09: inline style reduction

### CQ-081. Audit inline style reduction in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. inline style reduction
- Why now: visual regressions can appear during extraction.
- Scope: Trace `magic/index.html` inline styles and `magic/style.css`. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-082. Define the outcome and measurement for inline style reduction

- Priority: P2
- Effort: S
- Depends on: CQ-081
- Epic: 09. inline style reduction
- Why now: visual regressions can appear during extraction.
- Scope: Write the intended result in plain language so that visual changes happen in one styling system. Choose one observable measure based on this target: inline styles remain only when they encode dynamic values.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-083. Design the data and state contract for inline style reduction

- Priority: P2
- Effort: M
- Depends on: CQ-082
- Epic: 09. inline style reduction
- Why now: visual regressions can appear during extraction.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `magic/index.html` inline styles and `magic/style.css`. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-084. Prototype inline style reduction behind `ff_inline_style_reduction`

- Priority: P2
- Effort: M
- Depends on: CQ-083
- Epic: 09. inline style reduction
- Why now: visual regressions can appear during extraction.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that visual regressions can appear during extraction.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_inline_style_reduction

### CQ-085. Implement the foundation for inline style reduction

- Priority: P2
- Effort: L
- Depends on: CQ-084
- Epic: 09. inline style reduction
- Why now: visual regressions can appear during extraction.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-086. Implement the core behavior for inline style reduction

- Priority: P2
- Effort: L
- Depends on: CQ-085
- Epic: 09. inline style reduction
- Why now: visual regressions can appear during extraction.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: visual changes happen in one styling system. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_inline_style_reduction

### CQ-087. Add edge states and failure handling for inline style reduction

- Priority: P2
- Effort: M
- Depends on: CQ-086
- Epic: 09. inline style reduction
- Why now: visual regressions can appear during extraction.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `magic/index.html` inline styles and `magic/style.css`.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-088. Verify inline style reduction with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: CQ-087
- Epic: 09. inline style reduction
- Why now: visual regressions can appear during extraction.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-089. Document rollout, cost, and operations for inline style reduction

- Priority: P2
- Effort: S
- Depends on: CQ-088
- Epic: 09. inline style reduction
- Why now: visual regressions can appear during extraction.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when inline style reduction uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-090. Measure and decide the future of inline style reduction

- Priority: P2
- Effort: S
- Depends on: CQ-089
- Epic: 09. inline style reduction
- Why now: visual regressions can appear during extraction.
- Scope: Compare the observed result with the target from the outcome task: inline styles remain only when they encode dynamic values. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_inline_style_reduction

## Epic 10: maintainability measurement

### CQ-091. Audit maintainability measurement in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. maintainability measurement
- Why now: metrics can reward the wrong behavior if they become targets.
- Scope: Trace file size, coupling, duplication, and dependency freshness. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-092. Define the outcome and measurement for maintainability measurement

- Priority: P2
- Effort: S
- Depends on: CQ-091
- Epic: 10. maintainability measurement
- Why now: metrics can reward the wrong behavior if they become targets.
- Scope: Write the intended result in plain language so that the project can detect complexity growth before it becomes painful. Choose one observable measure based on this target: a quarterly report tracks a small set of agreed metrics.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-093. Design the data and state contract for maintainability measurement

- Priority: P2
- Effort: M
- Depends on: CQ-092
- Epic: 10. maintainability measurement
- Why now: metrics can reward the wrong behavior if they become targets.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in file size, coupling, duplication, and dependency freshness. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-094. Prototype maintainability measurement behind `ff_maintainability_metrics`

- Priority: P2
- Effort: M
- Depends on: CQ-093
- Epic: 10. maintainability measurement
- Why now: metrics can reward the wrong behavior if they become targets.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that metrics can reward the wrong behavior if they become targets.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_maintainability_metrics

### CQ-095. Implement the foundation for maintainability measurement

- Priority: P2
- Effort: L
- Depends on: CQ-094
- Epic: 10. maintainability measurement
- Why now: metrics can reward the wrong behavior if they become targets.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-096. Implement the core behavior for maintainability measurement

- Priority: P2
- Effort: L
- Depends on: CQ-095
- Epic: 10. maintainability measurement
- Why now: metrics can reward the wrong behavior if they become targets.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the project can detect complexity growth before it becomes painful. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_maintainability_metrics

### CQ-097. Add edge states and failure handling for maintainability measurement

- Priority: P2
- Effort: M
- Depends on: CQ-096
- Epic: 10. maintainability measurement
- Why now: metrics can reward the wrong behavior if they become targets.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to file size, coupling, duplication, and dependency freshness.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-098. Verify maintainability measurement with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: CQ-097
- Epic: 10. maintainability measurement
- Why now: metrics can reward the wrong behavior if they become targets.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-099. Document rollout, cost, and operations for maintainability measurement

- Priority: P2
- Effort: S
- Depends on: CQ-098
- Epic: 10. maintainability measurement
- Why now: metrics can reward the wrong behavior if they become targets.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when maintainability measurement uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### CQ-100. Measure and decide the future of maintainability measurement

- Priority: P2
- Effort: S
- Depends on: CQ-099
- Epic: 10. maintainability measurement
- Why now: metrics can reward the wrong behavior if they become targets.
- Scope: Compare the observed result with the target from the outcome task: a quarterly report tracks a small set of agreed metrics. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_maintainability_metrics

## Conflicts and feature-flag strategies

### Conflict 1: Single-file Vue versus modular source

| Option | Pros | Cons |
|---|---|---|
| Keep the single-file proof-of-concept shape | No build step is required; deployment stays close to the current static copy; small fixes remain easy to locate by searching one file | State and behavior stay coupled; tests are hard to write; review diffs become noisy |
| Move logic into modules | Modules create clear ownership; pure logic becomes testable; mode-specific changes stay isolated | A bundler or module loading strategy is required; legacy deployment scripts must change |

Feature-flag or coexistence plan: Use `ff_module_shell` to mount either the legacy script or the modular shell while migration proceeds.

### Conflict 2: Strict data validation versus permissive legacy data

| Option | Pros | Cons |
|---|---|---|
| Keep permissive parsing | Existing content keeps loading; no content freeze is required; learners are not blocked by minor metadata gaps | Bad tones, missing classifiers, and missing assets can fail deep inside a session |
| Validate strictly at load time | Defects appear early with precise filenames; generated content stays consistent; tests become simpler | The first validation run may block many entries until the data is repaired |

Feature-flag or coexistence plan: Use `ff_strict_word_schema` so validation can run in report-only mode before it becomes blocking.

### Conflict 3: Large-formatting pass versus incremental formatting

| Option | Pros | Cons |
|---|---|---|
| Format the whole codebase once | The baseline becomes clean immediately; future diffs are smaller; lint rules mean the same thing everywhere | The diff is large and hard to review; open branches may conflict |
| Format only touched files | Reviews stay narrow; migration risk is low; open branches survive | The repository keeps two styles for a long time; lint noise continues |

Feature-flag or coexistence plan: Use a lint configuration that enforces changed files now and tracks a shrinking allowlist for legacy files.

## Third-party service cost policy

No service is required. Use local open-source linters and formatters.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
