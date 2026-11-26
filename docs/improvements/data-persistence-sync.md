# Data model, persistence, and sync improvement plan

## Purpose

Give progress, settings, content, sessions, and future accounts a durable local-first data model with a safe path to sync.

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

## Epic 01: word schema versioning

### DP-001. Audit word schema versioning in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. word schema versioning
- Why now: filename-derived ids are fragile.
- Scope: Trace word ids, filenames, metadata, tones, classifiers, and content revisions. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-002. Define the outcome and measurement for word schema versioning

- Priority: P0
- Effort: S
- Depends on: DP-001
- Epic: 01. word schema versioning
- Why now: filename-derived ids are fragile.
- Scope: Write the intended result in plain language so that progress survives content edits. Choose one observable measure based on this target: word identity is stable even when filenames or media change.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-003. Design the data and state contract for word schema versioning

- Priority: P0
- Effort: M
- Depends on: DP-002
- Epic: 01. word schema versioning
- Why now: filename-derived ids are fragile.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in word ids, filenames, metadata, tones, classifiers, and content revisions. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-004. Prototype word schema versioning behind `ff_word_schema_versioning`

- Priority: P2
- Effort: M
- Depends on: DP-003
- Epic: 01. word schema versioning
- Why now: filename-derived ids are fragile.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that filename-derived ids are fragile.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_word_schema_versioning

### DP-005. Implement the foundation for word schema versioning

- Priority: P2
- Effort: L
- Depends on: DP-004
- Epic: 01. word schema versioning
- Why now: filename-derived ids are fragile.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-006. Implement the core behavior for word schema versioning

- Priority: P1
- Effort: L
- Depends on: DP-005
- Epic: 01. word schema versioning
- Why now: filename-derived ids are fragile.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: progress survives content edits. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_word_schema_versioning

### DP-007. Add edge states and failure handling for word schema versioning

- Priority: P2
- Effort: M
- Depends on: DP-006
- Epic: 01. word schema versioning
- Why now: filename-derived ids are fragile.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to word ids, filenames, metadata, tones, classifiers, and content revisions.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-008. Verify word schema versioning with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: DP-007
- Epic: 01. word schema versioning
- Why now: filename-derived ids are fragile.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-009. Document rollout, cost, and operations for word schema versioning

- Priority: P2
- Effort: S
- Depends on: DP-008
- Epic: 01. word schema versioning
- Why now: filename-derived ids are fragile.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when word schema versioning uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-010. Measure and decide the future of word schema versioning

- Priority: P2
- Effort: S
- Depends on: DP-009
- Epic: 01. word schema versioning
- Why now: filename-derived ids are fragile.
- Scope: Compare the observed result with the target from the outcome task: word identity is stable even when filenames or media change. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_word_schema_versioning

## Epic 02: learner progress model

### DP-011. Audit learner progress model in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. learner progress model
- Why now: current progress is mostly session-local.
- Scope: Trace attempts, mastery, review schedule, mode scores, and session completion. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-012. Define the outcome and measurement for learner progress model

- Priority: P0
- Effort: S
- Depends on: DP-011
- Epic: 02. learner progress model
- Why now: current progress is mostly session-local.
- Scope: Write the intended result in plain language so that progress can support adaptive learning. Choose one observable measure based on this target: one documented model names events, aggregates, and retention.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-013. Design the data and state contract for learner progress model

- Priority: P0
- Effort: M
- Depends on: DP-012
- Epic: 02. learner progress model
- Why now: current progress is mostly session-local.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in attempts, mastery, review schedule, mode scores, and session completion. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-014. Prototype learner progress model behind `ff_progress_model`

- Priority: P2
- Effort: M
- Depends on: DP-013
- Epic: 02. learner progress model
- Why now: current progress is mostly session-local.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that current progress is mostly session-local.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_progress_model

### DP-015. Implement the foundation for learner progress model

- Priority: P2
- Effort: L
- Depends on: DP-014
- Epic: 02. learner progress model
- Why now: current progress is mostly session-local.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-016. Implement the core behavior for learner progress model

- Priority: P1
- Effort: L
- Depends on: DP-015
- Epic: 02. learner progress model
- Why now: current progress is mostly session-local.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: progress can support adaptive learning. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_progress_model

### DP-017. Add edge states and failure handling for learner progress model

- Priority: P2
- Effort: M
- Depends on: DP-016
- Epic: 02. learner progress model
- Why now: current progress is mostly session-local.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to attempts, mastery, review schedule, mode scores, and session completion.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-018. Verify learner progress model with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: DP-017
- Epic: 02. learner progress model
- Why now: current progress is mostly session-local.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-019. Document rollout, cost, and operations for learner progress model

- Priority: P2
- Effort: S
- Depends on: DP-018
- Epic: 02. learner progress model
- Why now: current progress is mostly session-local.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when learner progress model uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-020. Measure and decide the future of learner progress model

- Priority: P2
- Effort: S
- Depends on: DP-019
- Epic: 02. learner progress model
- Why now: current progress is mostly session-local.
- Scope: Compare the observed result with the target from the outcome task: one documented model names events, aggregates, and retention. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_progress_model

## Epic 03: local storage boundary

### DP-021. Audit local storage boundary in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. local storage boundary
- Why now: localStorage is limited and synchronous.
- Scope: Trace localStorage, IndexedDB, cache storage, and native storage. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-022. Define the outcome and measurement for local storage boundary

- Priority: P2
- Effort: S
- Depends on: DP-021
- Epic: 03. local storage boundary
- Why now: localStorage is limited and synchronous.
- Scope: Write the intended result in plain language so that persistent data has a deliberate owner and migration path. Choose one observable measure based on this target: each storage technology has a written use case.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-023. Design the data and state contract for local storage boundary

- Priority: P1
- Effort: M
- Depends on: DP-022
- Epic: 03. local storage boundary
- Why now: localStorage is limited and synchronous.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in localStorage, IndexedDB, cache storage, and native storage. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-024. Prototype local storage boundary behind `ff_local_storage_boundary`

- Priority: P2
- Effort: M
- Depends on: DP-023
- Epic: 03. local storage boundary
- Why now: localStorage is limited and synchronous.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that localStorage is limited and synchronous.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_local_storage_boundary

### DP-025. Implement the foundation for local storage boundary

- Priority: P2
- Effort: L
- Depends on: DP-024
- Epic: 03. local storage boundary
- Why now: localStorage is limited and synchronous.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-026. Implement the core behavior for local storage boundary

- Priority: P1
- Effort: L
- Depends on: DP-025
- Epic: 03. local storage boundary
- Why now: localStorage is limited and synchronous.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: persistent data has a deliberate owner and migration path. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_local_storage_boundary

### DP-027. Add edge states and failure handling for local storage boundary

- Priority: P2
- Effort: M
- Depends on: DP-026
- Epic: 03. local storage boundary
- Why now: localStorage is limited and synchronous.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to localStorage, IndexedDB, cache storage, and native storage.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-028. Verify local storage boundary with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: DP-027
- Epic: 03. local storage boundary
- Why now: localStorage is limited and synchronous.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-029. Document rollout, cost, and operations for local storage boundary

- Priority: P2
- Effort: S
- Depends on: DP-028
- Epic: 03. local storage boundary
- Why now: localStorage is limited and synchronous.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when local storage boundary uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-030. Measure and decide the future of local storage boundary

- Priority: P2
- Effort: S
- Depends on: DP-029
- Epic: 03. local storage boundary
- Why now: localStorage is limited and synchronous.
- Scope: Compare the observed result with the target from the outcome task: each storage technology has a written use case. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_local_storage_boundary

## Epic 04: session state migration

### DP-031. Audit session state migration in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. session state migration
- Why now: unversioned persisted state can break silently.
- Scope: Trace settings, mode state, in-progress sessions, and schema versions. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-032. Define the outcome and measurement for session state migration

- Priority: P2
- Effort: S
- Depends on: DP-031
- Epic: 04. session state migration
- Why now: unversioned persisted state can break silently.
- Scope: Write the intended result in plain language so that app updates do not lose or corrupt learner state. Choose one observable measure based on this target: migrations are versioned and tested.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-033. Design the data and state contract for session state migration

- Priority: P1
- Effort: M
- Depends on: DP-032
- Epic: 04. session state migration
- Why now: unversioned persisted state can break silently.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in settings, mode state, in-progress sessions, and schema versions. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-034. Prototype session state migration behind `ff_session_state_migration`

- Priority: P2
- Effort: M
- Depends on: DP-033
- Epic: 04. session state migration
- Why now: unversioned persisted state can break silently.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that unversioned persisted state can break silently.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_session_state_migration

### DP-035. Implement the foundation for session state migration

- Priority: P2
- Effort: L
- Depends on: DP-034
- Epic: 04. session state migration
- Why now: unversioned persisted state can break silently.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-036. Implement the core behavior for session state migration

- Priority: P1
- Effort: L
- Depends on: DP-035
- Epic: 04. session state migration
- Why now: unversioned persisted state can break silently.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: app updates do not lose or corrupt learner state. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_session_state_migration

### DP-037. Add edge states and failure handling for session state migration

- Priority: P2
- Effort: M
- Depends on: DP-036
- Epic: 04. session state migration
- Why now: unversioned persisted state can break silently.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to settings, mode state, in-progress sessions, and schema versions.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-038. Verify session state migration with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: DP-037
- Epic: 04. session state migration
- Why now: unversioned persisted state can break silently.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-039. Document rollout, cost, and operations for session state migration

- Priority: P2
- Effort: S
- Depends on: DP-038
- Epic: 04. session state migration
- Why now: unversioned persisted state can break silently.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when session state migration uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-040. Measure and decide the future of session state migration

- Priority: P2
- Effort: S
- Depends on: DP-039
- Epic: 04. session state migration
- Why now: unversioned persisted state can break silently.
- Scope: Compare the observed result with the target from the outcome task: migrations are versioned and tested. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_session_state_migration

## Epic 05: backup, export, and import

### DP-041. Audit backup, export, and import in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. backup, export, and import
- Why now: imported data can be malformed or too large.
- Scope: Trace progress export, settings export, custom decks, and restore. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-042. Define the outcome and measurement for backup, export, and import

- Priority: P2
- Effort: S
- Depends on: DP-041
- Epic: 05. backup, export, and import
- Why now: imported data can be malformed or too large.
- Scope: Write the intended result in plain language so that learners control their data. Choose one observable measure based on this target: a documented file format can export and import local progress.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-043. Design the data and state contract for backup, export, and import

- Priority: P1
- Effort: M
- Depends on: DP-042
- Epic: 05. backup, export, and import
- Why now: imported data can be malformed or too large.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in progress export, settings export, custom decks, and restore. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-044. Prototype backup, export, and import behind `ff_backup_export_import`

- Priority: P2
- Effort: M
- Depends on: DP-043
- Epic: 05. backup, export, and import
- Why now: imported data can be malformed or too large.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that imported data can be malformed or too large.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_backup_export_import

### DP-045. Implement the foundation for backup, export, and import

- Priority: P2
- Effort: L
- Depends on: DP-044
- Epic: 05. backup, export, and import
- Why now: imported data can be malformed or too large.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-046. Implement the core behavior for backup, export, and import

- Priority: P1
- Effort: L
- Depends on: DP-045
- Epic: 05. backup, export, and import
- Why now: imported data can be malformed or too large.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners control their data. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_backup_export_import

### DP-047. Add edge states and failure handling for backup, export, and import

- Priority: P2
- Effort: M
- Depends on: DP-046
- Epic: 05. backup, export, and import
- Why now: imported data can be malformed or too large.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to progress export, settings export, custom decks, and restore.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-048. Verify backup, export, and import with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: DP-047
- Epic: 05. backup, export, and import
- Why now: imported data can be malformed or too large.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-049. Document rollout, cost, and operations for backup, export, and import

- Priority: P2
- Effort: S
- Depends on: DP-048
- Epic: 05. backup, export, and import
- Why now: imported data can be malformed or too large.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when backup, export, and import uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-050. Measure and decide the future of backup, export, and import

- Priority: P2
- Effort: S
- Depends on: DP-049
- Epic: 05. backup, export, and import
- Why now: imported data can be malformed or too large.
- Scope: Compare the observed result with the target from the outcome task: a documented file format can export and import local progress. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_backup_export_import

## Epic 06: sync conflict model

### DP-051. Audit sync conflict model in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. sync conflict model
- Why now: syncing events and derived progress can diverge.
- Scope: Trace multi-device progress, review schedules, custom decks, and last-write behavior. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-052. Define the outcome and measurement for sync conflict model

- Priority: P2
- Effort: S
- Depends on: DP-051
- Epic: 06. sync conflict model
- Why now: syncing events and derived progress can diverge.
- Scope: Write the intended result in plain language so that future sync has predictable merge behavior. Choose one observable measure based on this target: conflict rules are defined before a backend exists.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-053. Design the data and state contract for sync conflict model

- Priority: P1
- Effort: M
- Depends on: DP-052
- Epic: 06. sync conflict model
- Why now: syncing events and derived progress can diverge.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in multi-device progress, review schedules, custom decks, and last-write behavior. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-054. Prototype sync conflict model behind `ff_sync_conflict_model`

- Priority: P2
- Effort: M
- Depends on: DP-053
- Epic: 06. sync conflict model
- Why now: syncing events and derived progress can diverge.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that syncing events and derived progress can diverge.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_sync_conflict_model

### DP-055. Implement the foundation for sync conflict model

- Priority: P2
- Effort: L
- Depends on: DP-054
- Epic: 06. sync conflict model
- Why now: syncing events and derived progress can diverge.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-056. Implement the core behavior for sync conflict model

- Priority: P1
- Effort: L
- Depends on: DP-055
- Epic: 06. sync conflict model
- Why now: syncing events and derived progress can diverge.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: future sync has predictable merge behavior. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_sync_conflict_model

### DP-057. Add edge states and failure handling for sync conflict model

- Priority: P2
- Effort: M
- Depends on: DP-056
- Epic: 06. sync conflict model
- Why now: syncing events and derived progress can diverge.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to multi-device progress, review schedules, custom decks, and last-write behavior.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-058. Verify sync conflict model with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: DP-057
- Epic: 06. sync conflict model
- Why now: syncing events and derived progress can diverge.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-059. Document rollout, cost, and operations for sync conflict model

- Priority: P2
- Effort: S
- Depends on: DP-058
- Epic: 06. sync conflict model
- Why now: syncing events and derived progress can diverge.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when sync conflict model uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-060. Measure and decide the future of sync conflict model

- Priority: P2
- Effort: S
- Depends on: DP-059
- Epic: 06. sync conflict model
- Why now: syncing events and derived progress can diverge.
- Scope: Compare the observed result with the target from the outcome task: conflict rules are defined before a backend exists. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_sync_conflict_model

## Epic 07: identity separation

### DP-061. Audit identity separation in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. identity separation
- Why now: premature account coupling creates privacy and migration problems.
- Scope: Trace device identity, learner profile, authentication identity, and analytics identifiers. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-062. Define the outcome and measurement for identity separation

- Priority: P2
- Effort: S
- Depends on: DP-061
- Epic: 07. identity separation
- Why now: premature account coupling creates privacy and migration problems.
- Scope: Write the intended result in plain language so that the project does not confuse users, devices, and accounts. Choose one observable measure based on this target: one identity model states which identifiers exist and why.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-063. Design the data and state contract for identity separation

- Priority: P2
- Effort: M
- Depends on: DP-062
- Epic: 07. identity separation
- Why now: premature account coupling creates privacy and migration problems.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in device identity, learner profile, authentication identity, and analytics identifiers. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-064. Prototype identity separation behind `ff_identity_separation`

- Priority: P2
- Effort: M
- Depends on: DP-063
- Epic: 07. identity separation
- Why now: premature account coupling creates privacy and migration problems.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that premature account coupling creates privacy and migration problems.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_identity_separation

### DP-065. Implement the foundation for identity separation

- Priority: P2
- Effort: L
- Depends on: DP-064
- Epic: 07. identity separation
- Why now: premature account coupling creates privacy and migration problems.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-066. Implement the core behavior for identity separation

- Priority: P2
- Effort: L
- Depends on: DP-065
- Epic: 07. identity separation
- Why now: premature account coupling creates privacy and migration problems.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the project does not confuse users, devices, and accounts. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_identity_separation

### DP-067. Add edge states and failure handling for identity separation

- Priority: P2
- Effort: M
- Depends on: DP-066
- Epic: 07. identity separation
- Why now: premature account coupling creates privacy and migration problems.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to device identity, learner profile, authentication identity, and analytics identifiers.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-068. Verify identity separation with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: DP-067
- Epic: 07. identity separation
- Why now: premature account coupling creates privacy and migration problems.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-069. Document rollout, cost, and operations for identity separation

- Priority: P2
- Effort: S
- Depends on: DP-068
- Epic: 07. identity separation
- Why now: premature account coupling creates privacy and migration problems.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when identity separation uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-070. Measure and decide the future of identity separation

- Priority: P2
- Effort: S
- Depends on: DP-069
- Epic: 07. identity separation
- Why now: premature account coupling creates privacy and migration problems.
- Scope: Compare the observed result with the target from the outcome task: one identity model states which identifiers exist and why. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_identity_separation

## Epic 08: retention and deletion

### DP-071. Audit retention and deletion in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. retention and deletion
- Why now: deletion becomes harder once sync exists.
- Scope: Trace progress history, recordings, diagnostic logs, analytics events, and backups. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-072. Define the outcome and measurement for retention and deletion

- Priority: P2
- Effort: S
- Depends on: DP-071
- Epic: 08. retention and deletion
- Why now: deletion becomes harder once sync exists.
- Scope: Write the intended result in plain language so that data does not accumulate without a reason. Choose one observable measure based on this target: retention rules and delete paths exist per data class.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-073. Design the data and state contract for retention and deletion

- Priority: P2
- Effort: M
- Depends on: DP-072
- Epic: 08. retention and deletion
- Why now: deletion becomes harder once sync exists.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in progress history, recordings, diagnostic logs, analytics events, and backups. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-074. Prototype retention and deletion behind `ff_retention_deletion`

- Priority: P2
- Effort: M
- Depends on: DP-073
- Epic: 08. retention and deletion
- Why now: deletion becomes harder once sync exists.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that deletion becomes harder once sync exists.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_retention_deletion

### DP-075. Implement the foundation for retention and deletion

- Priority: P2
- Effort: L
- Depends on: DP-074
- Epic: 08. retention and deletion
- Why now: deletion becomes harder once sync exists.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-076. Implement the core behavior for retention and deletion

- Priority: P2
- Effort: L
- Depends on: DP-075
- Epic: 08. retention and deletion
- Why now: deletion becomes harder once sync exists.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: data does not accumulate without a reason. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_retention_deletion

### DP-077. Add edge states and failure handling for retention and deletion

- Priority: P2
- Effort: M
- Depends on: DP-076
- Epic: 08. retention and deletion
- Why now: deletion becomes harder once sync exists.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to progress history, recordings, diagnostic logs, analytics events, and backups.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-078. Verify retention and deletion with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: DP-077
- Epic: 08. retention and deletion
- Why now: deletion becomes harder once sync exists.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-079. Document rollout, cost, and operations for retention and deletion

- Priority: P2
- Effort: S
- Depends on: DP-078
- Epic: 08. retention and deletion
- Why now: deletion becomes harder once sync exists.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when retention and deletion uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-080. Measure and decide the future of retention and deletion

- Priority: P2
- Effort: S
- Depends on: DP-079
- Epic: 08. retention and deletion
- Why now: deletion becomes harder once sync exists.
- Scope: Compare the observed result with the target from the outcome task: retention rules and delete paths exist per data class. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_retention_deletion

## Epic 09: learning event schema

### DP-081. Audit learning event schema in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. learning event schema
- Why now: overly detailed events can become sensitive behavioral data.
- Scope: Trace attempt, answer, score, timestamp, mode, item version, and session id. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-082. Define the outcome and measurement for learning event schema

- Priority: P2
- Effort: S
- Depends on: DP-081
- Epic: 09. learning event schema
- Why now: overly detailed events can become sensitive behavioral data.
- Scope: Write the intended result in plain language so that learning analysis uses consistent facts. Choose one observable measure based on this target: events have a versioned schema and privacy notes.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-083. Design the data and state contract for learning event schema

- Priority: P2
- Effort: M
- Depends on: DP-082
- Epic: 09. learning event schema
- Why now: overly detailed events can become sensitive behavioral data.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in attempt, answer, score, timestamp, mode, item version, and session id. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-084. Prototype learning event schema behind `ff_event_schema`

- Priority: P2
- Effort: M
- Depends on: DP-083
- Epic: 09. learning event schema
- Why now: overly detailed events can become sensitive behavioral data.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that overly detailed events can become sensitive behavioral data.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_event_schema

### DP-085. Implement the foundation for learning event schema

- Priority: P2
- Effort: L
- Depends on: DP-084
- Epic: 09. learning event schema
- Why now: overly detailed events can become sensitive behavioral data.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-086. Implement the core behavior for learning event schema

- Priority: P2
- Effort: L
- Depends on: DP-085
- Epic: 09. learning event schema
- Why now: overly detailed events can become sensitive behavioral data.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learning analysis uses consistent facts. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_event_schema

### DP-087. Add edge states and failure handling for learning event schema

- Priority: P2
- Effort: M
- Depends on: DP-086
- Epic: 09. learning event schema
- Why now: overly detailed events can become sensitive behavioral data.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to attempt, answer, score, timestamp, mode, item version, and session id.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-088. Verify learning event schema with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: DP-087
- Epic: 09. learning event schema
- Why now: overly detailed events can become sensitive behavioral data.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-089. Document rollout, cost, and operations for learning event schema

- Priority: P2
- Effort: S
- Depends on: DP-088
- Epic: 09. learning event schema
- Why now: overly detailed events can become sensitive behavioral data.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when learning event schema uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-090. Measure and decide the future of learning event schema

- Priority: P2
- Effort: S
- Depends on: DP-089
- Epic: 09. learning event schema
- Why now: overly detailed events can become sensitive behavioral data.
- Scope: Compare the observed result with the target from the outcome task: events have a versioned schema and privacy notes. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_event_schema

## Epic 10: database selection for future sync

### DP-091. Audit database selection for future sync in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. database selection for future sync
- Why now: managed services can create cost, lock-in, or privacy obligations.
- Scope: Trace local IndexedDB, SQLite, Postgres, object storage, and free-tier managed services. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-092. Define the outcome and measurement for database selection for future sync

- Priority: P2
- Effort: S
- Depends on: DP-091
- Epic: 10. database selection for future sync
- Why now: managed services can create cost, lock-in, or privacy obligations.
- Scope: Write the intended result in plain language so that future backend choices are deliberate. Choose one observable measure based on this target: a decision record compares local-first, self-hosted, and managed options.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-093. Design the data and state contract for database selection for future sync

- Priority: P2
- Effort: M
- Depends on: DP-092
- Epic: 10. database selection for future sync
- Why now: managed services can create cost, lock-in, or privacy obligations.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in local IndexedDB, SQLite, Postgres, object storage, and free-tier managed services. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-094. Evaluate the smallest real option for database selection for future sync

- Priority: P2
- Effort: M
- Depends on: DP-093
- Epic: 10. database selection for future sync
- Why now: managed services can create cost, lock-in, or privacy obligations.
- Scope: Compare the smallest real implementation or policy choice for local IndexedDB, SQLite, Postgres, object storage, and free-tier managed services. The evaluation must expose the risk that managed services can create cost, lock-in, or privacy obligations and must use the repository cost rule.
- Acceptance criteria: The evaluation records the evidence, the rejected option, the cost decision, and whether the default is keep, revise, or discard.
- Cost and service notes: Prefer local evaluation. Use a third-party service only if it has a renewable free tier and the evaluation states the quota assumption.
- Flag or conflict notes: ff_database_selection

### DP-095. Write the decision foundation for database selection for future sync

- Priority: P2
- Effort: L
- Depends on: DP-094
- Epic: 10. database selection for future sync
- Why now: managed services can create cost, lock-in, or privacy obligations.
- Scope: Capture the options, constraints, privacy impact, cost screen, evidence gaps, rollback rule, and the smallest safe default. Keep the decision narrow enough to reverse when evidence changes.
- Acceptance criteria: The decision foundation is reviewable on its own and separates current behavior from the proposed default.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-096. Adopt the default decision for database selection for future sync

- Priority: P2
- Effort: L
- Depends on: DP-095
- Epic: 10. database selection for future sync
- Why now: managed services can create cost, lock-in, or privacy obligations.
- Scope: Write the default decision that moves the area toward this outcome: future backend choices are deliberate. Name the evidence that would reopen the decision.
- Acceptance criteria: The decision states what is adopted, what is rejected, what remains local-first, and what cost-benefit analysis is required before any paid dependency.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_database_selection

### DP-097. Document edge cases and failure handling for database selection for future sync

- Priority: P2
- Effort: M
- Depends on: DP-096
- Epic: 10. database selection for future sync
- Why now: managed services can create cost, lock-in, or privacy obligations.
- Scope: Cover missing evidence, quota exhaustion, service removal, pricing changes, privacy objections, and migration failure where they apply to local IndexedDB, SQLite, Postgres, object storage, and free-tier managed services.
- Acceptance criteria: Each relevant edge case has a fallback, an owner, and a clear rule for returning to the free local path.
- Cost and service notes: Use local analysis. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-098. Validate the decision for database selection for future sync against real constraints

- Priority: P2
- Effort: M
- Depends on: DP-097
- Epic: 10. database selection for future sync
- Why now: managed services can create cost, lock-in, or privacy obligations.
- Scope: Check the decision against the current app, the cost rule, privacy expectations, and the highest-risk failure path. Use a small real artifact or service-console check when one is available.
- Acceptance criteria: The validation names the evidence inspected, passes only when the decision still satisfies the constraints, and records any open assumption.
- Cost and service notes: Use open-source local test tooling and free service consoles. Paid validation infrastructure requires a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-099. Document rollout, cost, and operations for database selection for future sync

- Priority: P2
- Effort: S
- Depends on: DP-098
- Epic: 10. database selection for future sync
- Why now: managed services can create cost, lock-in, or privacy obligations.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when database selection for future sync uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### DP-100. Measure and decide the future of database selection for future sync

- Priority: P2
- Effort: S
- Depends on: DP-099
- Epic: 10. database selection for future sync
- Why now: managed services can create cost, lock-in, or privacy obligations.
- Scope: Compare the observed result with the target from the outcome task: a decision record compares local-first, self-hosted, and managed options. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_database_selection

## Conflicts and feature-flag strategies

### Conflict 1: localStorage versus IndexedDB

| Option | Pros | Cons |
|---|---|---|
| Use localStorage | The API is simple; settings and small flags are easy to store | Storage is synchronous, small, and unsuitable for detailed progress history |
| Use IndexedDB | Structured progress, events, and larger local data fit better | The API is verbose and needs careful migration and testing |

Feature-flag or coexistence plan: Use localStorage only for tiny settings and IndexedDB behind `ff_indexeddb_progress` for learning history.

### Conflict 2: Event sourcing versus aggregated progress

| Option | Pros | Cons |
|---|---|---|
| Store learning events | Adaptive learning and analytics can recompute history; sync conflict handling is richer | Storage and complexity grow; privacy sensitivity increases |
| Store only aggregated progress | Storage stays small; implementation is simple; less behavioral detail exists | The project loses the evidence needed for review scheduling and diagnosis |

Feature-flag or coexistence plan: Use `ff_learning_events` for a capped local event log and keep aggregates as derived state.

### Conflict 3: Managed sync versus self-hosted sync

| Option | Pros | Cons |
|---|---|---|
| Use managed sync | Operations are simpler; a free tier may cover early use; authentication may be integrated | Lock-in, quota exhaustion, and privacy constraints need review |
| Self-host sync | Data control and portability are stronger; costs can be small for a single instance | Operations, backups, security, and uptime become the maintainer's job |

Feature-flag or coexistence plan: Do not build sync until a cost-benefit analysis compares at least one renewable-free-tier managed service with a free self-hosted option.

## Third-party service cost policy

Start local-first. Neon, Supabase, Firebase, or similar services must be limited to renewable free tiers or undergo cost-benefit analysis.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
