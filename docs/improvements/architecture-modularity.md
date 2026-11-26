# Architecture and modularity improvement plan

## Purpose

Give the app explicit boundaries so learning modes, audio, content, persistence, and native shells can evolve independently.

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

## Epic 01: learning-domain model

### AR-001. Audit learning-domain model in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. learning-domain model
- Why now: the current app stores these concepts implicitly in Vue state.
- Scope: Trace word, session, attempt, mode, score, and mastery concepts. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-002. Define the outcome and measurement for learning-domain model

- Priority: P0
- Effort: S
- Depends on: AR-001
- Epic: 01. learning-domain model
- Why now: the current app stores these concepts implicitly in Vue state.
- Scope: Write the intended result in plain language so that product logic uses the same nouns everywhere. Choose one observable measure based on this target: one written domain model names every core entity and invariant.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-003. Design the data and state contract for learning-domain model

- Priority: P0
- Effort: M
- Depends on: AR-002
- Epic: 01. learning-domain model
- Why now: the current app stores these concepts implicitly in Vue state.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in word, session, attempt, mode, score, and mastery concepts. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-004. Prototype learning-domain model behind `ff_domain_model`

- Priority: P2
- Effort: M
- Depends on: AR-003
- Epic: 01. learning-domain model
- Why now: the current app stores these concepts implicitly in Vue state.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the current app stores these concepts implicitly in Vue state.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_domain_model

### AR-005. Implement the foundation for learning-domain model

- Priority: P2
- Effort: L
- Depends on: AR-004
- Epic: 01. learning-domain model
- Why now: the current app stores these concepts implicitly in Vue state.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-006. Implement the core behavior for learning-domain model

- Priority: P1
- Effort: L
- Depends on: AR-005
- Epic: 01. learning-domain model
- Why now: the current app stores these concepts implicitly in Vue state.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: product logic uses the same nouns everywhere. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_domain_model

### AR-007. Add edge states and failure handling for learning-domain model

- Priority: P2
- Effort: M
- Depends on: AR-006
- Epic: 01. learning-domain model
- Why now: the current app stores these concepts implicitly in Vue state.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to word, session, attempt, mode, score, and mastery concepts.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-008. Verify learning-domain model with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: AR-007
- Epic: 01. learning-domain model
- Why now: the current app stores these concepts implicitly in Vue state.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-009. Document rollout, cost, and operations for learning-domain model

- Priority: P2
- Effort: S
- Depends on: AR-008
- Epic: 01. learning-domain model
- Why now: the current app stores these concepts implicitly in Vue state.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when learning-domain model uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-010. Measure and decide the future of learning-domain model

- Priority: P2
- Effort: S
- Depends on: AR-009
- Epic: 01. learning-domain model
- Why now: the current app stores these concepts implicitly in Vue state.
- Scope: Compare the observed result with the target from the outcome task: one written domain model names every core entity and invariant. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_domain_model

## Epic 02: mode registry

### AR-011. Audit mode registry in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. mode registry
- Why now: a registry can become another god object if it absorbs behavior.
- Scope: Trace the seven learning modes and their settings. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-012. Define the outcome and measurement for mode registry

- Priority: P0
- Effort: S
- Depends on: AR-011
- Epic: 02. mode registry
- Why now: a registry can become another god object if it absorbs behavior.
- Scope: Write the intended result in plain language so that adding a mode becomes a registry entry instead of a cross-file conditional chain. Choose one observable measure based on this target: mode metadata, guards, and defaults live in one table.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-013. Design the data and state contract for mode registry

- Priority: P0
- Effort: M
- Depends on: AR-012
- Epic: 02. mode registry
- Why now: a registry can become another god object if it absorbs behavior.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in the seven learning modes and their settings. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-014. Prototype mode registry behind `ff_mode_registry`

- Priority: P2
- Effort: M
- Depends on: AR-013
- Epic: 02. mode registry
- Why now: a registry can become another god object if it absorbs behavior.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that a registry can become another god object if it absorbs behavior.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_mode_registry

### AR-015. Implement the foundation for mode registry

- Priority: P2
- Effort: L
- Depends on: AR-014
- Epic: 02. mode registry
- Why now: a registry can become another god object if it absorbs behavior.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-016. Implement the core behavior for mode registry

- Priority: P1
- Effort: L
- Depends on: AR-015
- Epic: 02. mode registry
- Why now: a registry can become another god object if it absorbs behavior.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: adding a mode becomes a registry entry instead of a cross-file conditional chain. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_mode_registry

### AR-017. Add edge states and failure handling for mode registry

- Priority: P2
- Effort: M
- Depends on: AR-016
- Epic: 02. mode registry
- Why now: a registry can become another god object if it absorbs behavior.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to the seven learning modes and their settings.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-018. Verify mode registry with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: AR-017
- Epic: 02. mode registry
- Why now: a registry can become another god object if it absorbs behavior.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-019. Document rollout, cost, and operations for mode registry

- Priority: P2
- Effort: S
- Depends on: AR-018
- Epic: 02. mode registry
- Why now: a registry can become another god object if it absorbs behavior.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when mode registry uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-020. Measure and decide the future of mode registry

- Priority: P2
- Effort: S
- Depends on: AR-019
- Epic: 02. mode registry
- Why now: a registry can become another god object if it absorbs behavior.
- Scope: Compare the observed result with the target from the outcome task: mode metadata, guards, and defaults live in one table. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_mode_registry

## Epic 03: shadowing state machine

### AR-021. Audit shadowing state machine in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. shadowing state machine
- Why now: the current implementation uses several mutable fields.
- Scope: Trace idle, recording, playback, comparing, mastered, failed, and retry states. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-022. Define the outcome and measurement for shadowing state machine

- Priority: P2
- Effort: S
- Depends on: AR-021
- Epic: 03. shadowing state machine
- Why now: the current implementation uses several mutable fields.
- Scope: Write the intended result in plain language so that the shadowing flow becomes explicit and testable. Choose one observable measure based on this target: every state transition has one named event and one owner.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-023. Design the data and state contract for shadowing state machine

- Priority: P1
- Effort: M
- Depends on: AR-022
- Epic: 03. shadowing state machine
- Why now: the current implementation uses several mutable fields.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in idle, recording, playback, comparing, mastered, failed, and retry states. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-024. Prototype shadowing state machine behind `ff_shadowing_state_machine`

- Priority: P2
- Effort: M
- Depends on: AR-023
- Epic: 03. shadowing state machine
- Why now: the current implementation uses several mutable fields.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the current implementation uses several mutable fields.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_shadowing_state_machine

### AR-025. Implement the foundation for shadowing state machine

- Priority: P2
- Effort: L
- Depends on: AR-024
- Epic: 03. shadowing state machine
- Why now: the current implementation uses several mutable fields.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-026. Implement the core behavior for shadowing state machine

- Priority: P1
- Effort: L
- Depends on: AR-025
- Epic: 03. shadowing state machine
- Why now: the current implementation uses several mutable fields.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the shadowing flow becomes explicit and testable. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_shadowing_state_machine

### AR-027. Add edge states and failure handling for shadowing state machine

- Priority: P2
- Effort: M
- Depends on: AR-026
- Epic: 03. shadowing state machine
- Why now: the current implementation uses several mutable fields.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to idle, recording, playback, comparing, mastered, failed, and retry states.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-028. Verify shadowing state machine with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: AR-027
- Epic: 03. shadowing state machine
- Why now: the current implementation uses several mutable fields.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-029. Document rollout, cost, and operations for shadowing state machine

- Priority: P2
- Effort: S
- Depends on: AR-028
- Epic: 03. shadowing state machine
- Why now: the current implementation uses several mutable fields.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when shadowing state machine uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-030. Measure and decide the future of shadowing state machine

- Priority: P2
- Effort: S
- Depends on: AR-029
- Epic: 03. shadowing state machine
- Why now: the current implementation uses several mutable fields.
- Scope: Compare the observed result with the target from the outcome task: every state transition has one named event and one owner. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_shadowing_state_machine

## Epic 04: audio boundary

### AR-031. Audit audio boundary in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. audio boundary
- Why now: native and browser capabilities do not exactly match.
- Scope: Trace web audio, native audio, speech synthesis, and microphone capture. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-032. Define the outcome and measurement for audio boundary

- Priority: P2
- Effort: S
- Depends on: AR-031
- Epic: 04. audio boundary
- Why now: native and browser capabilities do not exactly match.
- Scope: Write the intended result in plain language so that UI code does not know which audio backend is active. Choose one observable measure based on this target: audio commands and events have one interface.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-033. Design the data and state contract for audio boundary

- Priority: P1
- Effort: M
- Depends on: AR-032
- Epic: 04. audio boundary
- Why now: native and browser capabilities do not exactly match.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in web audio, native audio, speech synthesis, and microphone capture. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-034. Prototype audio boundary behind `ff_boundary_audio`

- Priority: P2
- Effort: M
- Depends on: AR-033
- Epic: 04. audio boundary
- Why now: native and browser capabilities do not exactly match.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that native and browser capabilities do not exactly match.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_boundary_audio

### AR-035. Implement the foundation for audio boundary

- Priority: P2
- Effort: L
- Depends on: AR-034
- Epic: 04. audio boundary
- Why now: native and browser capabilities do not exactly match.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-036. Implement the core behavior for audio boundary

- Priority: P1
- Effort: L
- Depends on: AR-035
- Epic: 04. audio boundary
- Why now: native and browser capabilities do not exactly match.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: UI code does not know which audio backend is active. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_boundary_audio

### AR-037. Add edge states and failure handling for audio boundary

- Priority: P2
- Effort: M
- Depends on: AR-036
- Epic: 04. audio boundary
- Why now: native and browser capabilities do not exactly match.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to web audio, native audio, speech synthesis, and microphone capture.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-038. Verify audio boundary with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: AR-037
- Epic: 04. audio boundary
- Why now: native and browser capabilities do not exactly match.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-039. Document rollout, cost, and operations for audio boundary

- Priority: P2
- Effort: S
- Depends on: AR-038
- Epic: 04. audio boundary
- Why now: native and browser capabilities do not exactly match.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when audio boundary uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-040. Measure and decide the future of audio boundary

- Priority: P2
- Effort: S
- Depends on: AR-039
- Epic: 04. audio boundary
- Why now: native and browser capabilities do not exactly match.
- Scope: Compare the observed result with the target from the outcome task: audio commands and events have one interface. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_boundary_audio

## Epic 05: navigation and session state

### AR-041. Audit navigation and session state in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. navigation and session state
- Why now: the existing implementation uses several flags and indexes.
- Scope: Trace home, welcome, browse, active session, summary, and retry flows. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-042. Define the outcome and measurement for navigation and session state

- Priority: P2
- Effort: S
- Depends on: AR-041
- Epic: 05. navigation and session state
- Why now: the existing implementation uses several flags and indexes.
- Scope: Write the intended result in plain language so that navigation can be deep-linked and restored. Choose one observable measure based on this target: the current screen derives from one explicit state value.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-043. Design the data and state contract for navigation and session state

- Priority: P1
- Effort: M
- Depends on: AR-042
- Epic: 05. navigation and session state
- Why now: the existing implementation uses several flags and indexes.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in home, welcome, browse, active session, summary, and retry flows. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-044. Prototype navigation and session state behind `ff_navigation_state`

- Priority: P2
- Effort: M
- Depends on: AR-043
- Epic: 05. navigation and session state
- Why now: the existing implementation uses several flags and indexes.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the existing implementation uses several flags and indexes.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_navigation_state

### AR-045. Implement the foundation for navigation and session state

- Priority: P2
- Effort: L
- Depends on: AR-044
- Epic: 05. navigation and session state
- Why now: the existing implementation uses several flags and indexes.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-046. Implement the core behavior for navigation and session state

- Priority: P1
- Effort: L
- Depends on: AR-045
- Epic: 05. navigation and session state
- Why now: the existing implementation uses several flags and indexes.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: navigation can be deep-linked and restored. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_navigation_state

### AR-047. Add edge states and failure handling for navigation and session state

- Priority: P2
- Effort: M
- Depends on: AR-046
- Epic: 05. navigation and session state
- Why now: the existing implementation uses several flags and indexes.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to home, welcome, browse, active session, summary, and retry flows.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-048. Verify navigation and session state with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: AR-047
- Epic: 05. navigation and session state
- Why now: the existing implementation uses several flags and indexes.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-049. Document rollout, cost, and operations for navigation and session state

- Priority: P2
- Effort: S
- Depends on: AR-048
- Epic: 05. navigation and session state
- Why now: the existing implementation uses several flags and indexes.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when navigation and session state uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-050. Measure and decide the future of navigation and session state

- Priority: P2
- Effort: S
- Depends on: AR-049
- Epic: 05. navigation and session state
- Why now: the existing implementation uses several flags and indexes.
- Scope: Compare the observed result with the target from the outcome task: the current screen derives from one explicit state value. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_navigation_state

## Epic 06: Vue component decomposition

### AR-051. Audit Vue component decomposition in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. Vue component decomposition
- Why now: component extraction can pass too much state through props.
- Scope: Trace header, mobile menu, mode cards, word cards, session controls, and summary modal. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-052. Define the outcome and measurement for Vue component decomposition

- Priority: P2
- Effort: S
- Depends on: AR-051
- Epic: 06. Vue component decomposition
- Why now: component extraction can pass too much state through props.
- Scope: Write the intended result in plain language so that UI ownership matches what the learner sees. Choose one observable measure based on this target: each visible region has one component contract.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-053. Design the data and state contract for Vue component decomposition

- Priority: P1
- Effort: M
- Depends on: AR-052
- Epic: 06. Vue component decomposition
- Why now: component extraction can pass too much state through props.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in header, mobile menu, mode cards, word cards, session controls, and summary modal. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-054. Prototype Vue component decomposition behind `ff_component_decomposition`

- Priority: P2
- Effort: M
- Depends on: AR-053
- Epic: 06. Vue component decomposition
- Why now: component extraction can pass too much state through props.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that component extraction can pass too much state through props.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_component_decomposition

### AR-055. Implement the foundation for Vue component decomposition

- Priority: P2
- Effort: L
- Depends on: AR-054
- Epic: 06. Vue component decomposition
- Why now: component extraction can pass too much state through props.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-056. Implement the core behavior for Vue component decomposition

- Priority: P1
- Effort: L
- Depends on: AR-055
- Epic: 06. Vue component decomposition
- Why now: component extraction can pass too much state through props.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: UI ownership matches what the learner sees. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_component_decomposition

### AR-057. Add edge states and failure handling for Vue component decomposition

- Priority: P2
- Effort: M
- Depends on: AR-056
- Epic: 06. Vue component decomposition
- Why now: component extraction can pass too much state through props.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to header, mobile menu, mode cards, word cards, session controls, and summary modal.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-058. Verify Vue component decomposition with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: AR-057
- Epic: 06. Vue component decomposition
- Why now: component extraction can pass too much state through props.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-059. Document rollout, cost, and operations for Vue component decomposition

- Priority: P2
- Effort: S
- Depends on: AR-058
- Epic: 06. Vue component decomposition
- Why now: component extraction can pass too much state through props.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when Vue component decomposition uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-060. Measure and decide the future of Vue component decomposition

- Priority: P2
- Effort: S
- Depends on: AR-059
- Epic: 06. Vue component decomposition
- Why now: component extraction can pass too much state through props.
- Scope: Compare the observed result with the target from the outcome task: each visible region has one component contract. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_component_decomposition

## Epic 07: service abstraction layer

### AR-061. Audit service abstraction layer in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. service abstraction layer
- Why now: over-abstracting can hide simple browser APIs.
- Scope: Trace speech, recording, persistence, analytics, and feature flags. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-062. Define the outcome and measurement for service abstraction layer

- Priority: P2
- Effort: S
- Depends on: AR-061
- Epic: 07. service abstraction layer
- Why now: over-abstracting can hide simple browser APIs.
- Scope: Write the intended result in plain language so that services can be replaced without rewriting modes. Choose one observable measure based on this target: each service has a small interface and a local implementation.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-063. Design the data and state contract for service abstraction layer

- Priority: P2
- Effort: M
- Depends on: AR-062
- Epic: 07. service abstraction layer
- Why now: over-abstracting can hide simple browser APIs.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in speech, recording, persistence, analytics, and feature flags. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-064. Prototype service abstraction layer behind `ff_service_abstractions`

- Priority: P2
- Effort: M
- Depends on: AR-063
- Epic: 07. service abstraction layer
- Why now: over-abstracting can hide simple browser APIs.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that over-abstracting can hide simple browser APIs.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_service_abstractions

### AR-065. Implement the foundation for service abstraction layer

- Priority: P2
- Effort: L
- Depends on: AR-064
- Epic: 07. service abstraction layer
- Why now: over-abstracting can hide simple browser APIs.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-066. Implement the core behavior for service abstraction layer

- Priority: P2
- Effort: L
- Depends on: AR-065
- Epic: 07. service abstraction layer
- Why now: over-abstracting can hide simple browser APIs.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: services can be replaced without rewriting modes. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_service_abstractions

### AR-067. Add edge states and failure handling for service abstraction layer

- Priority: P2
- Effort: M
- Depends on: AR-066
- Epic: 07. service abstraction layer
- Why now: over-abstracting can hide simple browser APIs.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to speech, recording, persistence, analytics, and feature flags.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-068. Verify service abstraction layer with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: AR-067
- Epic: 07. service abstraction layer
- Why now: over-abstracting can hide simple browser APIs.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-069. Document rollout, cost, and operations for service abstraction layer

- Priority: P2
- Effort: S
- Depends on: AR-068
- Epic: 07. service abstraction layer
- Why now: over-abstracting can hide simple browser APIs.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when service abstraction layer uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-070. Measure and decide the future of service abstraction layer

- Priority: P2
- Effort: S
- Depends on: AR-069
- Epic: 07. service abstraction layer
- Why now: over-abstracting can hide simple browser APIs.
- Scope: Compare the observed result with the target from the outcome task: each service has a small interface and a local implementation. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_service_abstractions

## Epic 08: content data pipeline

### AR-071. Audit content data pipeline in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. content data pipeline
- Why now: generated data can drift from source data without checks.
- Scope: Trace `words_data.js`, validation, normalization, and generated runtime data. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-072. Define the outcome and measurement for content data pipeline

- Priority: P2
- Effort: S
- Depends on: AR-071
- Epic: 08. content data pipeline
- Why now: generated data can drift from source data without checks.
- Scope: Write the intended result in plain language so that content enters the app through one validated pipeline. Choose one observable measure based on this target: every word has one normalized representation before Vue receives it.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-073. Design the data and state contract for content data pipeline

- Priority: P2
- Effort: M
- Depends on: AR-072
- Epic: 08. content data pipeline
- Why now: generated data can drift from source data without checks.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `words_data.js`, validation, normalization, and generated runtime data. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-074. Prototype content data pipeline behind `ff_data_pipeline`

- Priority: P2
- Effort: M
- Depends on: AR-073
- Epic: 08. content data pipeline
- Why now: generated data can drift from source data without checks.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that generated data can drift from source data without checks.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_data_pipeline

### AR-075. Implement the foundation for content data pipeline

- Priority: P2
- Effort: L
- Depends on: AR-074
- Epic: 08. content data pipeline
- Why now: generated data can drift from source data without checks.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-076. Implement the core behavior for content data pipeline

- Priority: P2
- Effort: L
- Depends on: AR-075
- Epic: 08. content data pipeline
- Why now: generated data can drift from source data without checks.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: content enters the app through one validated pipeline. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_data_pipeline

### AR-077. Add edge states and failure handling for content data pipeline

- Priority: P2
- Effort: M
- Depends on: AR-076
- Epic: 08. content data pipeline
- Why now: generated data can drift from source data without checks.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `words_data.js`, validation, normalization, and generated runtime data.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-078. Verify content data pipeline with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: AR-077
- Epic: 08. content data pipeline
- Why now: generated data can drift from source data without checks.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-079. Document rollout, cost, and operations for content data pipeline

- Priority: P2
- Effort: S
- Depends on: AR-078
- Epic: 08. content data pipeline
- Why now: generated data can drift from source data without checks.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when content data pipeline uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-080. Measure and decide the future of content data pipeline

- Priority: P2
- Effort: S
- Depends on: AR-079
- Epic: 08. content data pipeline
- Why now: generated data can drift from source data without checks.
- Scope: Compare the observed result with the target from the outcome task: every word has one normalized representation before Vue receives it. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_data_pipeline

## Epic 09: feature-flag architecture

### AR-081. Audit feature-flag architecture in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. feature-flag architecture
- Why now: too many flags can multiply test cases.
- Scope: Trace experimental modes, service-backed features, and migration paths. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-082. Define the outcome and measurement for feature-flag architecture

- Priority: P2
- Effort: S
- Depends on: AR-081
- Epic: 09. feature-flag architecture
- Why now: too many flags can multiply test cases.
- Scope: Write the intended result in plain language so that risky changes can ship disabled and roll back without a revert. Choose one observable measure based on this target: flags have owner, expiry, default, and telemetry metadata.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-083. Design the data and state contract for feature-flag architecture

- Priority: P2
- Effort: M
- Depends on: AR-082
- Epic: 09. feature-flag architecture
- Why now: too many flags can multiply test cases.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in experimental modes, service-backed features, and migration paths. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-084. Prototype feature-flag architecture behind `ff_feature_flag_system`

- Priority: P2
- Effort: M
- Depends on: AR-083
- Epic: 09. feature-flag architecture
- Why now: too many flags can multiply test cases.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that too many flags can multiply test cases.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_feature_flag_system

### AR-085. Implement the foundation for feature-flag architecture

- Priority: P2
- Effort: L
- Depends on: AR-084
- Epic: 09. feature-flag architecture
- Why now: too many flags can multiply test cases.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-086. Implement the core behavior for feature-flag architecture

- Priority: P2
- Effort: L
- Depends on: AR-085
- Epic: 09. feature-flag architecture
- Why now: too many flags can multiply test cases.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: risky changes can ship disabled and roll back without a revert. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_feature_flag_system

### AR-087. Add edge states and failure handling for feature-flag architecture

- Priority: P2
- Effort: M
- Depends on: AR-086
- Epic: 09. feature-flag architecture
- Why now: too many flags can multiply test cases.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to experimental modes, service-backed features, and migration paths.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-088. Verify feature-flag architecture with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: AR-087
- Epic: 09. feature-flag architecture
- Why now: too many flags can multiply test cases.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-089. Document rollout, cost, and operations for feature-flag architecture

- Priority: P2
- Effort: S
- Depends on: AR-088
- Epic: 09. feature-flag architecture
- Why now: too many flags can multiply test cases.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when feature-flag architecture uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-090. Measure and decide the future of feature-flag architecture

- Priority: P2
- Effort: S
- Depends on: AR-089
- Epic: 09. feature-flag architecture
- Why now: too many flags can multiply test cases.
- Scope: Compare the observed result with the target from the outcome task: flags have owner, expiry, default, and telemetry metadata. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_feature_flag_system

## Epic 10: build tooling migration path

### AR-091. Audit build tooling migration path in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. build tooling migration path
- Why now: a full framework migration would be larger than the proof of concept needs.
- Scope: Trace CDN Vue, static files, Capacitor sync, and GitHub Pages deployment. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-092. Define the outcome and measurement for build tooling migration path

- Priority: P2
- Effort: S
- Depends on: AR-091
- Epic: 10. build tooling migration path
- Why now: a full framework migration would be larger than the proof of concept needs.
- Scope: Write the intended result in plain language so that the app can adopt modules without breaking static or mobile deployment. Choose one observable measure based on this target: one build command produces web and mobile assets.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-093. Design the data and state contract for build tooling migration path

- Priority: P2
- Effort: M
- Depends on: AR-092
- Epic: 10. build tooling migration path
- Why now: a full framework migration would be larger than the proof of concept needs.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in CDN Vue, static files, Capacitor sync, and GitHub Pages deployment. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-094. Prototype build tooling migration path behind `ff_build_tooling_path`

- Priority: P2
- Effort: M
- Depends on: AR-093
- Epic: 10. build tooling migration path
- Why now: a full framework migration would be larger than the proof of concept needs.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that a full framework migration would be larger than the proof of concept needs.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_build_tooling_path

### AR-095. Implement the foundation for build tooling migration path

- Priority: P2
- Effort: L
- Depends on: AR-094
- Epic: 10. build tooling migration path
- Why now: a full framework migration would be larger than the proof of concept needs.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-096. Implement the core behavior for build tooling migration path

- Priority: P2
- Effort: L
- Depends on: AR-095
- Epic: 10. build tooling migration path
- Why now: a full framework migration would be larger than the proof of concept needs.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the app can adopt modules without breaking static or mobile deployment. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_build_tooling_path

### AR-097. Add edge states and failure handling for build tooling migration path

- Priority: P2
- Effort: M
- Depends on: AR-096
- Epic: 10. build tooling migration path
- Why now: a full framework migration would be larger than the proof of concept needs.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to CDN Vue, static files, Capacitor sync, and GitHub Pages deployment.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-098. Verify build tooling migration path with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: AR-097
- Epic: 10. build tooling migration path
- Why now: a full framework migration would be larger than the proof of concept needs.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-099. Document rollout, cost, and operations for build tooling migration path

- Priority: P2
- Effort: S
- Depends on: AR-098
- Epic: 10. build tooling migration path
- Why now: a full framework migration would be larger than the proof of concept needs.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when build tooling migration path uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AR-100. Measure and decide the future of build tooling migration path

- Priority: P2
- Effort: S
- Depends on: AR-099
- Epic: 10. build tooling migration path
- Why now: a full framework migration would be larger than the proof of concept needs.
- Scope: Compare the observed result with the target from the outcome task: one build command produces web and mobile assets. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_build_tooling_path

## Conflicts and feature-flag strategies

### Conflict 1: Framework migration versus incremental modularization

| Option | Pros | Cons |
|---|---|---|
| Migrate to a framework such as Vite plus Vue single-file components | The project gains standard module boundaries, hot reload, tests, and optimized builds | The migration touches deployment, Capacitor, tests, and every source file |
| Modularize incrementally in place | The current app keeps shipping while boundaries improve; each extraction is reviewable | Some legacy coupling remains until the migration finishes |

Feature-flag or coexistence plan: Use `ff_module_shell` for the new shell and keep the legacy shell as the fallback.

### Conflict 2: Central store versus local component state

| Option | Pros | Cons |
|---|---|---|
| Adopt a central store | Shared session state becomes consistent; cross-component updates are explicit; persistence can subscribe to one state stream | A store can become a second monolith and tempt every component to share state |
| Keep state local with typed events | Ownership stays close to the UI; fewer dependencies are required; small modes remain simple | Cross-mode progress and summary state become harder to coordinate |

Feature-flag or coexistence plan: Use `ff_session_store` only for session and progress state, not every UI value.

### Conflict 3: Feature flags versus long-lived branches

| Option | Pros | Cons |
|---|---|---|
| Use feature flags | Work can merge small and disabled; rollback is a config change; experiments can be measured | Flags require cleanup and can multiply runtime paths |
| Use long-lived branches | No runtime flag system is required; unfinished code stays out of the main branch | Branches diverge, conflicts grow, and review happens too late |

Feature-flag or coexistence plan: Store flag metadata in one registry and require an expiry task for every flag.

## Third-party service cost policy

No service is required for the architecture itself. Feature flags can start as local configuration.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
