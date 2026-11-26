# User experience and visual design improvement plan

## Purpose

Make the learning loop clear, calm, responsive, and rewarding while reducing mode and control complexity.

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

## Epic 01: core learning loop clarity

### UX-001. Audit core learning loop clarity in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. core learning loop clarity
- Why now: the current interface exposes many controls at once.
- Scope: Trace choose mode, start session, practice, receive feedback, review, and continue. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-002. Define the outcome and measurement for core learning loop clarity

- Priority: P0
- Effort: S
- Depends on: UX-001
- Epic: 01. core learning loop clarity
- Why now: the current interface exposes many controls at once.
- Scope: Write the intended result in plain language so that learners always know the next useful action. Choose one observable measure based on this target: each mode has one primary action and one visible progress signal.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-003. Design the data and state contract for core learning loop clarity

- Priority: P0
- Effort: M
- Depends on: UX-002
- Epic: 01. core learning loop clarity
- Why now: the current interface exposes many controls at once.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in choose mode, start session, practice, receive feedback, review, and continue. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-004. Prototype core learning loop clarity behind `ff_core_loop`

- Priority: P2
- Effort: M
- Depends on: UX-003
- Epic: 01. core learning loop clarity
- Why now: the current interface exposes many controls at once.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the current interface exposes many controls at once.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_core_loop

### UX-005. Implement the foundation for core learning loop clarity

- Priority: P2
- Effort: L
- Depends on: UX-004
- Epic: 01. core learning loop clarity
- Why now: the current interface exposes many controls at once.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-006. Implement the core behavior for core learning loop clarity

- Priority: P1
- Effort: L
- Depends on: UX-005
- Epic: 01. core learning loop clarity
- Why now: the current interface exposes many controls at once.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners always know the next useful action. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_core_loop

### UX-007. Add edge states and failure handling for core learning loop clarity

- Priority: P2
- Effort: M
- Depends on: UX-006
- Epic: 01. core learning loop clarity
- Why now: the current interface exposes many controls at once.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to choose mode, start session, practice, receive feedback, review, and continue.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-008. Verify core learning loop clarity with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: UX-007
- Epic: 01. core learning loop clarity
- Why now: the current interface exposes many controls at once.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-009. Document rollout, cost, and operations for core learning loop clarity

- Priority: P2
- Effort: S
- Depends on: UX-008
- Epic: 01. core learning loop clarity
- Why now: the current interface exposes many controls at once.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when core learning loop clarity uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-010. Measure and decide the future of core learning loop clarity

- Priority: P2
- Effort: S
- Depends on: UX-009
- Epic: 01. core learning loop clarity
- Why now: the current interface exposes many controls at once.
- Scope: Compare the observed result with the target from the outcome task: each mode has one primary action and one visible progress signal. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_core_loop

## Epic 02: home and mode discovery

### UX-011. Audit home and mode discovery in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. home and mode discovery
- Why now: too much explanatory copy can clutter the home screen.
- Scope: Trace mode cards, descriptions, prerequisites, and recommended next mode. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-012. Define the outcome and measurement for home and mode discovery

- Priority: P0
- Effort: S
- Depends on: UX-011
- Epic: 02. home and mode discovery
- Why now: too much explanatory copy can clutter the home screen.
- Scope: Write the intended result in plain language so that new learners can choose a mode without trial and error. Choose one observable measure based on this target: each card explains the skill, time cost, and required input.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-013. Design the data and state contract for home and mode discovery

- Priority: P0
- Effort: M
- Depends on: UX-012
- Epic: 02. home and mode discovery
- Why now: too much explanatory copy can clutter the home screen.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in mode cards, descriptions, prerequisites, and recommended next mode. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-014. Prototype home and mode discovery behind `ff_home_discovery`

- Priority: P2
- Effort: M
- Depends on: UX-013
- Epic: 02. home and mode discovery
- Why now: too much explanatory copy can clutter the home screen.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that too much explanatory copy can clutter the home screen.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_home_discovery

### UX-015. Implement the foundation for home and mode discovery

- Priority: P2
- Effort: L
- Depends on: UX-014
- Epic: 02. home and mode discovery
- Why now: too much explanatory copy can clutter the home screen.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-016. Implement the core behavior for home and mode discovery

- Priority: P1
- Effort: L
- Depends on: UX-015
- Epic: 02. home and mode discovery
- Why now: too much explanatory copy can clutter the home screen.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: new learners can choose a mode without trial and error. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_home_discovery

### UX-017. Add edge states and failure handling for home and mode discovery

- Priority: P2
- Effort: M
- Depends on: UX-016
- Epic: 02. home and mode discovery
- Why now: too much explanatory copy can clutter the home screen.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to mode cards, descriptions, prerequisites, and recommended next mode.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-018. Verify home and mode discovery with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: UX-017
- Epic: 02. home and mode discovery
- Why now: too much explanatory copy can clutter the home screen.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-019. Document rollout, cost, and operations for home and mode discovery

- Priority: P2
- Effort: S
- Depends on: UX-018
- Epic: 02. home and mode discovery
- Why now: too much explanatory copy can clutter the home screen.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when home and mode discovery uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-020. Measure and decide the future of home and mode discovery

- Priority: P2
- Effort: S
- Depends on: UX-019
- Epic: 02. home and mode discovery
- Why now: too much explanatory copy can clutter the home screen.
- Scope: Compare the observed result with the target from the outcome task: each card explains the skill, time cost, and required input. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_home_discovery

## Epic 03: session control consistency

### UX-021. Audit session control consistency in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. session control consistency
- Why now: mode-specific needs may require controlled variation.
- Scope: Trace play, pause, next, retry, record, compare, reveal, and exit. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-022. Define the outcome and measurement for session control consistency

- Priority: P2
- Effort: S
- Depends on: UX-021
- Epic: 03. session control consistency
- Why now: mode-specific needs may require controlled variation.
- Scope: Write the intended result in plain language so that controls behave consistently across modes. Choose one observable measure based on this target: the same action uses the same position, label, and keyboard behavior.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-023. Design the data and state contract for session control consistency

- Priority: P1
- Effort: M
- Depends on: UX-022
- Epic: 03. session control consistency
- Why now: mode-specific needs may require controlled variation.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in play, pause, next, retry, record, compare, reveal, and exit. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-024. Prototype session control consistency behind `ff_session_controls`

- Priority: P2
- Effort: M
- Depends on: UX-023
- Epic: 03. session control consistency
- Why now: mode-specific needs may require controlled variation.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that mode-specific needs may require controlled variation.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_session_controls

### UX-025. Implement the foundation for session control consistency

- Priority: P2
- Effort: L
- Depends on: UX-024
- Epic: 03. session control consistency
- Why now: mode-specific needs may require controlled variation.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-026. Implement the core behavior for session control consistency

- Priority: P1
- Effort: L
- Depends on: UX-025
- Epic: 03. session control consistency
- Why now: mode-specific needs may require controlled variation.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: controls behave consistently across modes. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_session_controls

### UX-027. Add edge states and failure handling for session control consistency

- Priority: P2
- Effort: M
- Depends on: UX-026
- Epic: 03. session control consistency
- Why now: mode-specific needs may require controlled variation.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to play, pause, next, retry, record, compare, reveal, and exit.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-028. Verify session control consistency with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: UX-027
- Epic: 03. session control consistency
- Why now: mode-specific needs may require controlled variation.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-029. Document rollout, cost, and operations for session control consistency

- Priority: P2
- Effort: S
- Depends on: UX-028
- Epic: 03. session control consistency
- Why now: mode-specific needs may require controlled variation.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when session control consistency uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-030. Measure and decide the future of session control consistency

- Priority: P2
- Effort: S
- Depends on: UX-029
- Epic: 03. session control consistency
- Why now: mode-specific needs may require controlled variation.
- Scope: Compare the observed result with the target from the outcome task: the same action uses the same position, label, and keyboard behavior. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_session_controls

## Epic 04: feedback and success states

### UX-031. Audit feedback and success states in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. feedback and success states
- Why now: over-celebrating can interrupt practice.
- Scope: Trace correct answers, wrong answers, mastery, retry, completion, and celebration. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-032. Define the outcome and measurement for feedback and success states

- Priority: P2
- Effort: S
- Depends on: UX-031
- Epic: 04. feedback and success states
- Why now: over-celebrating can interrupt practice.
- Scope: Write the intended result in plain language so that feedback is immediate and understandable. Choose one observable measure based on this target: every outcome has visual feedback and a next action.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-033. Design the data and state contract for feedback and success states

- Priority: P1
- Effort: M
- Depends on: UX-032
- Epic: 04. feedback and success states
- Why now: over-celebrating can interrupt practice.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in correct answers, wrong answers, mastery, retry, completion, and celebration. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-034. Prototype feedback and success states behind `ff_feedback_success_states`

- Priority: P2
- Effort: M
- Depends on: UX-033
- Epic: 04. feedback and success states
- Why now: over-celebrating can interrupt practice.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that over-celebrating can interrupt practice.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_feedback_success_states

### UX-035. Implement the foundation for feedback and success states

- Priority: P2
- Effort: L
- Depends on: UX-034
- Epic: 04. feedback and success states
- Why now: over-celebrating can interrupt practice.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-036. Implement the core behavior for feedback and success states

- Priority: P1
- Effort: L
- Depends on: UX-035
- Epic: 04. feedback and success states
- Why now: over-celebrating can interrupt practice.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: feedback is immediate and understandable. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_feedback_success_states

### UX-037. Add edge states and failure handling for feedback and success states

- Priority: P2
- Effort: M
- Depends on: UX-036
- Epic: 04. feedback and success states
- Why now: over-celebrating can interrupt practice.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to correct answers, wrong answers, mastery, retry, completion, and celebration.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-038. Verify feedback and success states with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: UX-037
- Epic: 04. feedback and success states
- Why now: over-celebrating can interrupt practice.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-039. Document rollout, cost, and operations for feedback and success states

- Priority: P2
- Effort: S
- Depends on: UX-038
- Epic: 04. feedback and success states
- Why now: over-celebrating can interrupt practice.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when feedback and success states uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-040. Measure and decide the future of feedback and success states

- Priority: P2
- Effort: S
- Depends on: UX-039
- Epic: 04. feedback and success states
- Why now: over-celebrating can interrupt practice.
- Scope: Compare the observed result with the target from the outcome task: every outcome has visual feedback and a next action. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_feedback_success_states

## Epic 05: empty, error, and loading states

### UX-041. Audit empty, error, and loading states in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. empty, error, and loading states
- Why now: generic error copy does not help recovery.
- Scope: Trace no search results, missing media, denied microphone, loading words, and failed sessions. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-042. Define the outcome and measurement for empty, error, and loading states

- Priority: P2
- Effort: S
- Depends on: UX-041
- Epic: 05. empty, error, and loading states
- Why now: generic error copy does not help recovery.
- Scope: Write the intended result in plain language so that the interface never leaves learners guessing. Choose one observable measure based on this target: each state has copy, cause, and recovery action.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-043. Design the data and state contract for empty, error, and loading states

- Priority: P1
- Effort: M
- Depends on: UX-042
- Epic: 05. empty, error, and loading states
- Why now: generic error copy does not help recovery.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in no search results, missing media, denied microphone, loading words, and failed sessions. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-044. Prototype empty, error, and loading states behind `ff_empty_error_loading`

- Priority: P2
- Effort: M
- Depends on: UX-043
- Epic: 05. empty, error, and loading states
- Why now: generic error copy does not help recovery.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that generic error copy does not help recovery.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_empty_error_loading

### UX-045. Implement the foundation for empty, error, and loading states

- Priority: P2
- Effort: L
- Depends on: UX-044
- Epic: 05. empty, error, and loading states
- Why now: generic error copy does not help recovery.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-046. Implement the core behavior for empty, error, and loading states

- Priority: P1
- Effort: L
- Depends on: UX-045
- Epic: 05. empty, error, and loading states
- Why now: generic error copy does not help recovery.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the interface never leaves learners guessing. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_empty_error_loading

### UX-047. Add edge states and failure handling for empty, error, and loading states

- Priority: P2
- Effort: M
- Depends on: UX-046
- Epic: 05. empty, error, and loading states
- Why now: generic error copy does not help recovery.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to no search results, missing media, denied microphone, loading words, and failed sessions.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-048. Verify empty, error, and loading states with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: UX-047
- Epic: 05. empty, error, and loading states
- Why now: generic error copy does not help recovery.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-049. Document rollout, cost, and operations for empty, error, and loading states

- Priority: P2
- Effort: S
- Depends on: UX-048
- Epic: 05. empty, error, and loading states
- Why now: generic error copy does not help recovery.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when empty, error, and loading states uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-050. Measure and decide the future of empty, error, and loading states

- Priority: P2
- Effort: S
- Depends on: UX-049
- Epic: 05. empty, error, and loading states
- Why now: generic error copy does not help recovery.
- Scope: Compare the observed result with the target from the outcome task: each state has copy, cause, and recovery action. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_empty_error_loading

## Epic 06: responsive layout

### UX-051. Audit responsive layout in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. responsive layout
- Why now: small screens cannot show every control at once.
- Scope: Trace desktop grid, tablet, phone, sticky header, and safe areas. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-052. Define the outcome and measurement for responsive layout

- Priority: P2
- Effort: S
- Depends on: UX-051
- Epic: 06. responsive layout
- Why now: small screens cannot show every control at once.
- Scope: Write the intended result in plain language so that practice works comfortably across screen sizes. Choose one observable measure based on this target: core flows pass a documented breakpoint matrix.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-053. Design the data and state contract for responsive layout

- Priority: P1
- Effort: M
- Depends on: UX-052
- Epic: 06. responsive layout
- Why now: small screens cannot show every control at once.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in desktop grid, tablet, phone, sticky header, and safe areas. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-054. Prototype responsive layout behind `ff_responsive_layout`

- Priority: P2
- Effort: M
- Depends on: UX-053
- Epic: 06. responsive layout
- Why now: small screens cannot show every control at once.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that small screens cannot show every control at once.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_responsive_layout

### UX-055. Implement the foundation for responsive layout

- Priority: P2
- Effort: L
- Depends on: UX-054
- Epic: 06. responsive layout
- Why now: small screens cannot show every control at once.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-056. Implement the core behavior for responsive layout

- Priority: P1
- Effort: L
- Depends on: UX-055
- Epic: 06. responsive layout
- Why now: small screens cannot show every control at once.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: practice works comfortably across screen sizes. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_responsive_layout

### UX-057. Add edge states and failure handling for responsive layout

- Priority: P2
- Effort: M
- Depends on: UX-056
- Epic: 06. responsive layout
- Why now: small screens cannot show every control at once.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to desktop grid, tablet, phone, sticky header, and safe areas.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-058. Verify responsive layout with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: UX-057
- Epic: 06. responsive layout
- Why now: small screens cannot show every control at once.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-059. Document rollout, cost, and operations for responsive layout

- Priority: P2
- Effort: S
- Depends on: UX-058
- Epic: 06. responsive layout
- Why now: small screens cannot show every control at once.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when responsive layout uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-060. Measure and decide the future of responsive layout

- Priority: P2
- Effort: S
- Depends on: UX-059
- Epic: 06. responsive layout
- Why now: small screens cannot show every control at once.
- Scope: Compare the observed result with the target from the outcome task: core flows pass a documented breakpoint matrix. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_responsive_layout

## Epic 07: visual hierarchy and typography

### UX-061. Audit visual hierarchy and typography in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. visual hierarchy and typography
- Why now: large Hanzi and Pinyin can crowd cards.
- Scope: Trace headings, Hanzi, Pinyin, English, metadata, controls, and scores. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-062. Define the outcome and measurement for visual hierarchy and typography

- Priority: P2
- Effort: S
- Depends on: UX-061
- Epic: 07. visual hierarchy and typography
- Why now: large Hanzi and Pinyin can crowd cards.
- Scope: Write the intended result in plain language so that the most important learning information stands out. Choose one observable measure based on this target: a type and spacing scale governs learning content.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-063. Design the data and state contract for visual hierarchy and typography

- Priority: P2
- Effort: M
- Depends on: UX-062
- Epic: 07. visual hierarchy and typography
- Why now: large Hanzi and Pinyin can crowd cards.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in headings, Hanzi, Pinyin, English, metadata, controls, and scores. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-064. Prototype visual hierarchy and typography behind `ff_visual_hierarchy`

- Priority: P2
- Effort: M
- Depends on: UX-063
- Epic: 07. visual hierarchy and typography
- Why now: large Hanzi and Pinyin can crowd cards.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that large Hanzi and Pinyin can crowd cards.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_visual_hierarchy

### UX-065. Implement the foundation for visual hierarchy and typography

- Priority: P2
- Effort: L
- Depends on: UX-064
- Epic: 07. visual hierarchy and typography
- Why now: large Hanzi and Pinyin can crowd cards.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-066. Implement the core behavior for visual hierarchy and typography

- Priority: P2
- Effort: L
- Depends on: UX-065
- Epic: 07. visual hierarchy and typography
- Why now: large Hanzi and Pinyin can crowd cards.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the most important learning information stands out. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_visual_hierarchy

### UX-067. Add edge states and failure handling for visual hierarchy and typography

- Priority: P2
- Effort: M
- Depends on: UX-066
- Epic: 07. visual hierarchy and typography
- Why now: large Hanzi and Pinyin can crowd cards.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to headings, Hanzi, Pinyin, English, metadata, controls, and scores.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-068. Verify visual hierarchy and typography with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: UX-067
- Epic: 07. visual hierarchy and typography
- Why now: large Hanzi and Pinyin can crowd cards.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-069. Document rollout, cost, and operations for visual hierarchy and typography

- Priority: P2
- Effort: S
- Depends on: UX-068
- Epic: 07. visual hierarchy and typography
- Why now: large Hanzi and Pinyin can crowd cards.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when visual hierarchy and typography uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-070. Measure and decide the future of visual hierarchy and typography

- Priority: P2
- Effort: S
- Depends on: UX-069
- Epic: 07. visual hierarchy and typography
- Why now: large Hanzi and Pinyin can crowd cards.
- Scope: Compare the observed result with the target from the outcome task: a type and spacing scale governs learning content. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_visual_hierarchy

## Epic 08: theme and dark mode

### UX-071. Audit theme and dark mode in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. theme and dark mode
- Why now: dark images and overlays need separate review.
- Scope: Trace colors, contrast, focus states, images, and persistent preference. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-072. Define the outcome and measurement for theme and dark mode

- Priority: P2
- Effort: S
- Depends on: UX-071
- Epic: 08. theme and dark mode
- Why now: dark images and overlays need separate review.
- Scope: Write the intended result in plain language so that learners can use a comfortable theme. Choose one observable measure based on this target: theme switching does not reduce contrast or hide feedback.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-073. Design the data and state contract for theme and dark mode

- Priority: P2
- Effort: M
- Depends on: UX-072
- Epic: 08. theme and dark mode
- Why now: dark images and overlays need separate review.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in colors, contrast, focus states, images, and persistent preference. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-074. Prototype theme and dark mode behind `ff_theme_dark_mode`

- Priority: P2
- Effort: M
- Depends on: UX-073
- Epic: 08. theme and dark mode
- Why now: dark images and overlays need separate review.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that dark images and overlays need separate review.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_theme_dark_mode

### UX-075. Implement the foundation for theme and dark mode

- Priority: P2
- Effort: L
- Depends on: UX-074
- Epic: 08. theme and dark mode
- Why now: dark images and overlays need separate review.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-076. Implement the core behavior for theme and dark mode

- Priority: P2
- Effort: L
- Depends on: UX-075
- Epic: 08. theme and dark mode
- Why now: dark images and overlays need separate review.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners can use a comfortable theme. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_theme_dark_mode

### UX-077. Add edge states and failure handling for theme and dark mode

- Priority: P2
- Effort: M
- Depends on: UX-076
- Epic: 08. theme and dark mode
- Why now: dark images and overlays need separate review.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to colors, contrast, focus states, images, and persistent preference.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-078. Verify theme and dark mode with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: UX-077
- Epic: 08. theme and dark mode
- Why now: dark images and overlays need separate review.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-079. Document rollout, cost, and operations for theme and dark mode

- Priority: P2
- Effort: S
- Depends on: UX-078
- Epic: 08. theme and dark mode
- Why now: dark images and overlays need separate review.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when theme and dark mode uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-080. Measure and decide the future of theme and dark mode

- Priority: P2
- Effort: S
- Depends on: UX-079
- Epic: 08. theme and dark mode
- Why now: dark images and overlays need separate review.
- Scope: Compare the observed result with the target from the outcome task: theme switching does not reduce contrast or hide feedback. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_theme_dark_mode

## Epic 09: image style consistency

### UX-081. Audit image style consistency in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. image style consistency
- Why now: batch-generated images may vary widely.
- Scope: Trace 414 word images, aspect ratio, visual complexity, and cultural representation. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-082. Define the outcome and measurement for image style consistency

- Priority: P2
- Effort: S
- Depends on: UX-081
- Epic: 09. image style consistency
- Why now: batch-generated images may vary widely.
- Scope: Write the intended result in plain language so that images support recognition rather than distract. Choose one observable measure based on this target: an image review checklist covers consistency and learning value.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-083. Design the data and state contract for image style consistency

- Priority: P2
- Effort: M
- Depends on: UX-082
- Epic: 09. image style consistency
- Why now: batch-generated images may vary widely.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in 414 word images, aspect ratio, visual complexity, and cultural representation. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-084. Prototype image style consistency behind `ff_image_consistency`

- Priority: P2
- Effort: M
- Depends on: UX-083
- Epic: 09. image style consistency
- Why now: batch-generated images may vary widely.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that batch-generated images may vary widely.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_image_consistency

### UX-085. Implement the foundation for image style consistency

- Priority: P2
- Effort: L
- Depends on: UX-084
- Epic: 09. image style consistency
- Why now: batch-generated images may vary widely.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-086. Implement the core behavior for image style consistency

- Priority: P2
- Effort: L
- Depends on: UX-085
- Epic: 09. image style consistency
- Why now: batch-generated images may vary widely.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: images support recognition rather than distract. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_image_consistency

### UX-087. Add edge states and failure handling for image style consistency

- Priority: P2
- Effort: M
- Depends on: UX-086
- Epic: 09. image style consistency
- Why now: batch-generated images may vary widely.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to 414 word images, aspect ratio, visual complexity, and cultural representation.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-088. Verify image style consistency with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: UX-087
- Epic: 09. image style consistency
- Why now: batch-generated images may vary widely.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-089. Document rollout, cost, and operations for image style consistency

- Priority: P2
- Effort: S
- Depends on: UX-088
- Epic: 09. image style consistency
- Why now: batch-generated images may vary widely.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when image style consistency uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-090. Measure and decide the future of image style consistency

- Priority: P2
- Effort: S
- Depends on: UX-089
- Epic: 09. image style consistency
- Why now: batch-generated images may vary widely.
- Scope: Compare the observed result with the target from the outcome task: an image review checklist covers consistency and learning value. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_image_consistency

## Epic 10: usability testing loop

### UX-091. Audit usability testing loop in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. usability testing loop
- Why now: recruiting learners may be difficult on a free budget.
- Scope: Trace first-use, session completion, mode selection, error recovery, and mobile use. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-092. Define the outcome and measurement for usability testing loop

- Priority: P2
- Effort: S
- Depends on: UX-091
- Epic: 10. usability testing loop
- Why now: recruiting learners may be difficult on a free budget.
- Scope: Write the intended result in plain language so that design decisions come from observed behavior. Choose one observable measure based on this target: a repeatable lightweight test script exists.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-093. Design the data and state contract for usability testing loop

- Priority: P2
- Effort: M
- Depends on: UX-092
- Epic: 10. usability testing loop
- Why now: recruiting learners may be difficult on a free budget.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in first-use, session completion, mode selection, error recovery, and mobile use. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-094. Prototype usability testing loop behind `ff_usability_testing`

- Priority: P2
- Effort: M
- Depends on: UX-093
- Epic: 10. usability testing loop
- Why now: recruiting learners may be difficult on a free budget.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that recruiting learners may be difficult on a free budget.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_usability_testing

### UX-095. Implement the foundation for usability testing loop

- Priority: P2
- Effort: L
- Depends on: UX-094
- Epic: 10. usability testing loop
- Why now: recruiting learners may be difficult on a free budget.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-096. Implement the core behavior for usability testing loop

- Priority: P2
- Effort: L
- Depends on: UX-095
- Epic: 10. usability testing loop
- Why now: recruiting learners may be difficult on a free budget.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: design decisions come from observed behavior. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: ff_usability_testing

### UX-097. Add edge states and failure handling for usability testing loop

- Priority: P2
- Effort: M
- Depends on: UX-096
- Epic: 10. usability testing loop
- Why now: recruiting learners may be difficult on a free budget.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to first-use, session completion, mode selection, error recovery, and mobile use.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-098. Verify usability testing loop with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: UX-097
- Epic: 10. usability testing loop
- Why now: recruiting learners may be difficult on a free budget.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-099. Document rollout, cost, and operations for usability testing loop

- Priority: P2
- Effort: S
- Depends on: UX-098
- Epic: 10. usability testing loop
- Why now: recruiting learners may be difficult on a free budget.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when usability testing loop uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### UX-100. Measure and decide the future of usability testing loop

- Priority: P2
- Effort: S
- Depends on: UX-099
- Epic: 10. usability testing loop
- Why now: recruiting learners may be difficult on a free budget.
- Scope: Compare the observed result with the target from the outcome task: a repeatable lightweight test script exists. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_usability_testing

## Conflicts and feature-flag strategies

### Conflict 1: Power-user controls versus simplified defaults

| Option | Pros | Cons |
|---|---|---|
| Expose many controls | Learners can tune practice deeply; existing functionality remains visible | Cognitive load rises and primary actions become harder to find |
| Use simplified defaults | The core loop is clearer and new learners start faster | Advanced learners may feel constrained |

Feature-flag or coexistence plan: Use `ff_advanced_controls` to hide advanced settings by default while keeping them discoverable.

### Conflict 2: Card grid browsing versus guided session-first flow

| Option | Pros | Cons |
|---|---|---|
| Keep card browsing prominent | Learners can explore all content freely; teachers can inspect material | Choice can overwhelm new learners and delay practice |
| Use guided session-first flow | Learners enter practice quickly and receive a sequence | Free exploration becomes less visible |

Feature-flag or coexistence plan: Use `ff_guided_start` while retaining a browse link in secondary navigation.

### Conflict 3: Playful visual design versus minimal study design

| Option | Pros | Cons |
|---|---|---|
| Use playful visuals | The app feels approachable and rewarding; progress moments can be memorable | Visual noise can distract from Hanzi, Pinyin, and tone feedback |
| Use minimal study visuals | Attention stays on learning content; accessibility and performance are easier | The product can feel plain or less motivating |

Feature-flag or coexistence plan: Use playful motion and illustration only at completion moments behind `ff_celebration_style`.

## Third-party service cost policy

Use local design tooling, browser tests, and free user-research methods. Paid participant recruitment or design software needs cost-benefit analysis.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
