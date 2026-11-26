# Offline, PWA, and reliability improvement plan

## Purpose

Make practice resilient to weak networks, stale deploys, interrupted audio, storage pressure, and partial failures.

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

## Epic 01: service worker strategy

### RL-001. Audit service worker strategy in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. service worker strategy
- Why now: incorrect caching can serve stale content or fill storage.
- Scope: Trace static shell, word data, images, audio, and versioned deploys. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-002. Define the outcome and measurement for service worker strategy

- Priority: P0
- Effort: S
- Depends on: RL-001
- Epic: 01. service worker strategy
- Why now: incorrect caching can serve stale content or fill storage.
- Scope: Write the intended result in plain language so that repeat visits work with little or no network. Choose one observable measure based on this target: cache rules are explicit per asset type.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-003. Design the data and state contract for service worker strategy

- Priority: P0
- Effort: M
- Depends on: RL-002
- Epic: 01. service worker strategy
- Why now: incorrect caching can serve stale content or fill storage.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in static shell, word data, images, audio, and versioned deploys. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-004. Prototype service worker strategy behind `ff_service_worker`

- Priority: P2
- Effort: M
- Depends on: RL-003
- Epic: 01. service worker strategy
- Why now: incorrect caching can serve stale content or fill storage.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that incorrect caching can serve stale content or fill storage.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_service_worker

### RL-005. Implement the foundation for service worker strategy

- Priority: P2
- Effort: L
- Depends on: RL-004
- Epic: 01. service worker strategy
- Why now: incorrect caching can serve stale content or fill storage.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-006. Implement the core behavior for service worker strategy

- Priority: P1
- Effort: L
- Depends on: RL-005
- Epic: 01. service worker strategy
- Why now: incorrect caching can serve stale content or fill storage.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: repeat visits work with little or no network. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_service_worker

### RL-007. Add edge states and failure handling for service worker strategy

- Priority: P2
- Effort: M
- Depends on: RL-006
- Epic: 01. service worker strategy
- Why now: incorrect caching can serve stale content or fill storage.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to static shell, word data, images, audio, and versioned deploys.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-008. Verify service worker strategy with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: RL-007
- Epic: 01. service worker strategy
- Why now: incorrect caching can serve stale content or fill storage.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-009. Document rollout, cost, and operations for service worker strategy

- Priority: P2
- Effort: S
- Depends on: RL-008
- Epic: 01. service worker strategy
- Why now: incorrect caching can serve stale content or fill storage.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when service worker strategy uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-010. Measure and decide the future of service worker strategy

- Priority: P2
- Effort: S
- Depends on: RL-009
- Epic: 01. service worker strategy
- Why now: incorrect caching can serve stale content or fill storage.
- Scope: Compare the observed result with the target from the outcome task: cache rules are explicit per asset type. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_service_worker

## Epic 02: offline and degraded states

### RL-011. Audit offline and degraded states in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. offline and degraded states
- Why now: the current app assumes static files exist.
- Scope: Trace startup, media playback, session progress, and settings. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-012. Define the outcome and measurement for offline and degraded states

- Priority: P0
- Effort: S
- Depends on: RL-011
- Epic: 02. offline and degraded states
- Why now: the current app assumes static files exist.
- Scope: Write the intended result in plain language so that learners know what works offline and what failed. Choose one observable measure based on this target: every network-dependent action has a visible offline result.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-013. Design the data and state contract for offline and degraded states

- Priority: P0
- Effort: M
- Depends on: RL-012
- Epic: 02. offline and degraded states
- Why now: the current app assumes static files exist.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in startup, media playback, session progress, and settings. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-014. Prototype offline and degraded states behind `ff_offline_states`

- Priority: P2
- Effort: M
- Depends on: RL-013
- Epic: 02. offline and degraded states
- Why now: the current app assumes static files exist.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the current app assumes static files exist.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_offline_states

### RL-015. Implement the foundation for offline and degraded states

- Priority: P2
- Effort: L
- Depends on: RL-014
- Epic: 02. offline and degraded states
- Why now: the current app assumes static files exist.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-016. Implement the core behavior for offline and degraded states

- Priority: P1
- Effort: L
- Depends on: RL-015
- Epic: 02. offline and degraded states
- Why now: the current app assumes static files exist.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners know what works offline and what failed. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_offline_states

### RL-017. Add edge states and failure handling for offline and degraded states

- Priority: P2
- Effort: M
- Depends on: RL-016
- Epic: 02. offline and degraded states
- Why now: the current app assumes static files exist.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to startup, media playback, session progress, and settings.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-018. Verify offline and degraded states with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: RL-017
- Epic: 02. offline and degraded states
- Why now: the current app assumes static files exist.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-019. Document rollout, cost, and operations for offline and degraded states

- Priority: P2
- Effort: S
- Depends on: RL-018
- Epic: 02. offline and degraded states
- Why now: the current app assumes static files exist.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when offline and degraded states uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-020. Measure and decide the future of offline and degraded states

- Priority: P2
- Effort: S
- Depends on: RL-019
- Epic: 02. offline and degraded states
- Why now: the current app assumes static files exist.
- Scope: Compare the observed result with the target from the outcome task: every network-dependent action has a visible offline result. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_offline_states

## Epic 03: asset integrity checks

### RL-021. Audit asset integrity checks in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. asset integrity checks
- Why now: large media sets make manual checking unrealistic.
- Scope: Trace audio files, images, generated data, and deployment copies. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-022. Define the outcome and measurement for asset integrity checks

- Priority: P2
- Effort: S
- Depends on: RL-021
- Epic: 03. asset integrity checks
- Why now: large media sets make manual checking unrealistic.
- Scope: Write the intended result in plain language so that missing media is detected before or during release. Choose one observable measure based on this target: a release check validates every referenced asset.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-023. Design the data and state contract for asset integrity checks

- Priority: P1
- Effort: M
- Depends on: RL-022
- Epic: 03. asset integrity checks
- Why now: large media sets make manual checking unrealistic.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in audio files, images, generated data, and deployment copies. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-024. Prototype asset integrity checks behind `ff_asset_integrity`

- Priority: P2
- Effort: M
- Depends on: RL-023
- Epic: 03. asset integrity checks
- Why now: large media sets make manual checking unrealistic.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that large media sets make manual checking unrealistic.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_asset_integrity

### RL-025. Implement the foundation for asset integrity checks

- Priority: P2
- Effort: L
- Depends on: RL-024
- Epic: 03. asset integrity checks
- Why now: large media sets make manual checking unrealistic.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-026. Implement the core behavior for asset integrity checks

- Priority: P1
- Effort: L
- Depends on: RL-025
- Epic: 03. asset integrity checks
- Why now: large media sets make manual checking unrealistic.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: missing media is detected before or during release. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_asset_integrity

### RL-027. Add edge states and failure handling for asset integrity checks

- Priority: P2
- Effort: M
- Depends on: RL-026
- Epic: 03. asset integrity checks
- Why now: large media sets make manual checking unrealistic.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to audio files, images, generated data, and deployment copies.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-028. Verify asset integrity checks with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: RL-027
- Epic: 03. asset integrity checks
- Why now: large media sets make manual checking unrealistic.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-029. Document rollout, cost, and operations for asset integrity checks

- Priority: P2
- Effort: S
- Depends on: RL-028
- Epic: 03. asset integrity checks
- Why now: large media sets make manual checking unrealistic.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when asset integrity checks uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-030. Measure and decide the future of asset integrity checks

- Priority: P2
- Effort: S
- Depends on: RL-029
- Epic: 03. asset integrity checks
- Why now: large media sets make manual checking unrealistic.
- Scope: Compare the observed result with the target from the outcome task: a release check validates every referenced asset. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_asset_integrity

## Epic 04: error boundaries and recovery

### RL-031. Audit error boundaries and recovery in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. error boundaries and recovery
- Why now: global handlers can hide defects if they are too broad.
- Scope: Trace Vue startup, mode rendering, media playback, and recording. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-032. Define the outcome and measurement for error boundaries and recovery

- Priority: P2
- Effort: S
- Depends on: RL-031
- Epic: 04. error boundaries and recovery
- Why now: global handlers can hide defects if they are too broad.
- Scope: Write the intended result in plain language so that one failure does not blank the whole learning session. Choose one observable measure based on this target: important failures show a recovery action and preserve safe state.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-033. Design the data and state contract for error boundaries and recovery

- Priority: P1
- Effort: M
- Depends on: RL-032
- Epic: 04. error boundaries and recovery
- Why now: global handlers can hide defects if they are too broad.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in Vue startup, mode rendering, media playback, and recording. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-034. Prototype error boundaries and recovery behind `ff_error_boundaries`

- Priority: P2
- Effort: M
- Depends on: RL-033
- Epic: 04. error boundaries and recovery
- Why now: global handlers can hide defects if they are too broad.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that global handlers can hide defects if they are too broad.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_error_boundaries

### RL-035. Implement the foundation for error boundaries and recovery

- Priority: P2
- Effort: L
- Depends on: RL-034
- Epic: 04. error boundaries and recovery
- Why now: global handlers can hide defects if they are too broad.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-036. Implement the core behavior for error boundaries and recovery

- Priority: P1
- Effort: L
- Depends on: RL-035
- Epic: 04. error boundaries and recovery
- Why now: global handlers can hide defects if they are too broad.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: one failure does not blank the whole learning session. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_error_boundaries

### RL-037. Add edge states and failure handling for error boundaries and recovery

- Priority: P2
- Effort: M
- Depends on: RL-036
- Epic: 04. error boundaries and recovery
- Why now: global handlers can hide defects if they are too broad.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to Vue startup, mode rendering, media playback, and recording.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-038. Verify error boundaries and recovery with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: RL-037
- Epic: 04. error boundaries and recovery
- Why now: global handlers can hide defects if they are too broad.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-039. Document rollout, cost, and operations for error boundaries and recovery

- Priority: P2
- Effort: S
- Depends on: RL-038
- Epic: 04. error boundaries and recovery
- Why now: global handlers can hide defects if they are too broad.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when error boundaries and recovery uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-040. Measure and decide the future of error boundaries and recovery

- Priority: P2
- Effort: S
- Depends on: RL-039
- Epic: 04. error boundaries and recovery
- Why now: global handlers can hide defects if they are too broad.
- Scope: Compare the observed result with the target from the outcome task: important failures show a recovery action and preserve safe state. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_error_boundaries

## Epic 05: playback retry and resume

### RL-041. Audit playback retry and resume in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. playback retry and resume
- Why now: automatic retry can loop forever.
- Scope: Trace network media, native plugin errors, speech synthesis, and user-initiated retry. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-042. Define the outcome and measurement for playback retry and resume

- Priority: P2
- Effort: S
- Depends on: RL-041
- Epic: 05. playback retry and resume
- Why now: automatic retry can loop forever.
- Scope: Write the intended result in plain language so that temporary media failures do not end a session. Choose one observable measure based on this target: playback errors expose retry, skip, and continue options.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-043. Design the data and state contract for playback retry and resume

- Priority: P1
- Effort: M
- Depends on: RL-042
- Epic: 05. playback retry and resume
- Why now: automatic retry can loop forever.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in network media, native plugin errors, speech synthesis, and user-initiated retry. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-044. Prototype playback retry and resume behind `ff_playback_retry`

- Priority: P2
- Effort: M
- Depends on: RL-043
- Epic: 05. playback retry and resume
- Why now: automatic retry can loop forever.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that automatic retry can loop forever.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_playback_retry

### RL-045. Implement the foundation for playback retry and resume

- Priority: P2
- Effort: L
- Depends on: RL-044
- Epic: 05. playback retry and resume
- Why now: automatic retry can loop forever.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-046. Implement the core behavior for playback retry and resume

- Priority: P1
- Effort: L
- Depends on: RL-045
- Epic: 05. playback retry and resume
- Why now: automatic retry can loop forever.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: temporary media failures do not end a session. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_playback_retry

### RL-047. Add edge states and failure handling for playback retry and resume

- Priority: P2
- Effort: M
- Depends on: RL-046
- Epic: 05. playback retry and resume
- Why now: automatic retry can loop forever.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to network media, native plugin errors, speech synthesis, and user-initiated retry.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-048. Verify playback retry and resume with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: RL-047
- Epic: 05. playback retry and resume
- Why now: automatic retry can loop forever.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-049. Document rollout, cost, and operations for playback retry and resume

- Priority: P2
- Effort: S
- Depends on: RL-048
- Epic: 05. playback retry and resume
- Why now: automatic retry can loop forever.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when playback retry and resume uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-050. Measure and decide the future of playback retry and resume

- Priority: P2
- Effort: S
- Depends on: RL-049
- Epic: 05. playback retry and resume
- Why now: automatic retry can loop forever.
- Scope: Compare the observed result with the target from the outcome task: playback errors expose retry, skip, and continue options. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_playback_retry

## Epic 06: session recovery

### RL-051. Audit session recovery in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. session recovery
- Why now: restoring stale recording state can confuse users.
- Scope: Trace active mode, word index, score, failed words, and recording state. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-052. Define the outcome and measurement for session recovery

- Priority: P2
- Effort: S
- Depends on: RL-051
- Epic: 06. session recovery
- Why now: restoring stale recording state can confuse users.
- Scope: Write the intended result in plain language so that learners can resume after reload or interruption. Choose one observable measure based on this target: restored sessions explain what was recovered.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-053. Design the data and state contract for session recovery

- Priority: P1
- Effort: M
- Depends on: RL-052
- Epic: 06. session recovery
- Why now: restoring stale recording state can confuse users.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in active mode, word index, score, failed words, and recording state. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-054. Prototype session recovery behind `ff_session_recovery`

- Priority: P2
- Effort: M
- Depends on: RL-053
- Epic: 06. session recovery
- Why now: restoring stale recording state can confuse users.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that restoring stale recording state can confuse users.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_session_recovery

### RL-055. Implement the foundation for session recovery

- Priority: P2
- Effort: L
- Depends on: RL-054
- Epic: 06. session recovery
- Why now: restoring stale recording state can confuse users.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-056. Implement the core behavior for session recovery

- Priority: P1
- Effort: L
- Depends on: RL-055
- Epic: 06. session recovery
- Why now: restoring stale recording state can confuse users.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners can resume after reload or interruption. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_session_recovery

### RL-057. Add edge states and failure handling for session recovery

- Priority: P2
- Effort: M
- Depends on: RL-056
- Epic: 06. session recovery
- Why now: restoring stale recording state can confuse users.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to active mode, word index, score, failed words, and recording state.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-058. Verify session recovery with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: RL-057
- Epic: 06. session recovery
- Why now: restoring stale recording state can confuse users.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-059. Document rollout, cost, and operations for session recovery

- Priority: P2
- Effort: S
- Depends on: RL-058
- Epic: 06. session recovery
- Why now: restoring stale recording state can confuse users.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when session recovery uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-060. Measure and decide the future of session recovery

- Priority: P2
- Effort: S
- Depends on: RL-059
- Epic: 06. session recovery
- Why now: restoring stale recording state can confuse users.
- Scope: Compare the observed result with the target from the outcome task: restored sessions explain what was recovered. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_session_recovery

## Epic 07: storage quota handling

### RL-061. Audit storage quota handling in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. storage quota handling
- Why now: browser quota behavior varies.
- Scope: Trace cached media, saved progress, and future recordings. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-062. Define the outcome and measurement for storage quota handling

- Priority: P2
- Effort: S
- Depends on: RL-061
- Epic: 07. storage quota handling
- Why now: browser quota behavior varies.
- Scope: Write the intended result in plain language so that the app degrades predictably when storage fills. Choose one observable measure based on this target: quota errors have detection, copy, and cleanup guidance.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-063. Design the data and state contract for storage quota handling

- Priority: P2
- Effort: M
- Depends on: RL-062
- Epic: 07. storage quota handling
- Why now: browser quota behavior varies.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in cached media, saved progress, and future recordings. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-064. Prototype storage quota handling behind `ff_storage_quota`

- Priority: P2
- Effort: M
- Depends on: RL-063
- Epic: 07. storage quota handling
- Why now: browser quota behavior varies.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that browser quota behavior varies.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_storage_quota

### RL-065. Implement the foundation for storage quota handling

- Priority: P2
- Effort: L
- Depends on: RL-064
- Epic: 07. storage quota handling
- Why now: browser quota behavior varies.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-066. Implement the core behavior for storage quota handling

- Priority: P2
- Effort: L
- Depends on: RL-065
- Epic: 07. storage quota handling
- Why now: browser quota behavior varies.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the app degrades predictably when storage fills. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_storage_quota

### RL-067. Add edge states and failure handling for storage quota handling

- Priority: P2
- Effort: M
- Depends on: RL-066
- Epic: 07. storage quota handling
- Why now: browser quota behavior varies.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to cached media, saved progress, and future recordings.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-068. Verify storage quota handling with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: RL-067
- Epic: 07. storage quota handling
- Why now: browser quota behavior varies.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-069. Document rollout, cost, and operations for storage quota handling

- Priority: P2
- Effort: S
- Depends on: RL-068
- Epic: 07. storage quota handling
- Why now: browser quota behavior varies.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when storage quota handling uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-070. Measure and decide the future of storage quota handling

- Priority: P2
- Effort: S
- Depends on: RL-069
- Epic: 07. storage quota handling
- Why now: browser quota behavior varies.
- Scope: Compare the observed result with the target from the outcome task: quota errors have detection, copy, and cleanup guidance. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_storage_quota

## Epic 08: update and versioning strategy

### RL-071. Audit update and versioning strategy in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. update and versioning strategy
- Why now: force-refresh behavior can interrupt active sessions.
- Scope: Trace service worker versions, static deploys, native versions, and content versions. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-072. Define the outcome and measurement for update and versioning strategy

- Priority: P2
- Effort: S
- Depends on: RL-071
- Epic: 08. update and versioning strategy
- Why now: force-refresh behavior can interrupt active sessions.
- Scope: Write the intended result in plain language so that learners receive updates without losing progress. Choose one observable measure based on this target: versioned migrations are documented and tested.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-073. Design the data and state contract for update and versioning strategy

- Priority: P2
- Effort: M
- Depends on: RL-072
- Epic: 08. update and versioning strategy
- Why now: force-refresh behavior can interrupt active sessions.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in service worker versions, static deploys, native versions, and content versions. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-074. Prototype update and versioning strategy behind `ff_update_versioning`

- Priority: P2
- Effort: M
- Depends on: RL-073
- Epic: 08. update and versioning strategy
- Why now: force-refresh behavior can interrupt active sessions.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that force-refresh behavior can interrupt active sessions.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_update_versioning

### RL-075. Implement the foundation for update and versioning strategy

- Priority: P2
- Effort: L
- Depends on: RL-074
- Epic: 08. update and versioning strategy
- Why now: force-refresh behavior can interrupt active sessions.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-076. Implement the core behavior for update and versioning strategy

- Priority: P2
- Effort: L
- Depends on: RL-075
- Epic: 08. update and versioning strategy
- Why now: force-refresh behavior can interrupt active sessions.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners receive updates without losing progress. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_update_versioning

### RL-077. Add edge states and failure handling for update and versioning strategy

- Priority: P2
- Effort: M
- Depends on: RL-076
- Epic: 08. update and versioning strategy
- Why now: force-refresh behavior can interrupt active sessions.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to service worker versions, static deploys, native versions, and content versions.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-078. Verify update and versioning strategy with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: RL-077
- Epic: 08. update and versioning strategy
- Why now: force-refresh behavior can interrupt active sessions.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-079. Document rollout, cost, and operations for update and versioning strategy

- Priority: P2
- Effort: S
- Depends on: RL-078
- Epic: 08. update and versioning strategy
- Why now: force-refresh behavior can interrupt active sessions.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when update and versioning strategy uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-080. Measure and decide the future of update and versioning strategy

- Priority: P2
- Effort: S
- Depends on: RL-079
- Epic: 08. update and versioning strategy
- Why now: force-refresh behavior can interrupt active sessions.
- Scope: Compare the observed result with the target from the outcome task: versioned migrations are documented and tested. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_update_versioning

## Epic 09: client diagnostics

### RL-081. Audit client diagnostics in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. client diagnostics
- Why now: diagnostics must avoid recordings and personal content.
- Scope: Trace console errors, media failures, permission states, and device capabilities. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-082. Define the outcome and measurement for client diagnostics

- Priority: P2
- Effort: S
- Depends on: RL-081
- Epic: 09. client diagnostics
- Why now: diagnostics must avoid recordings and personal content.
- Scope: Write the intended result in plain language so that bug reports include enough detail to reproduce failures. Choose one observable measure based on this target: a local diagnostic bundle can be copied by the learner.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-083. Design the data and state contract for client diagnostics

- Priority: P2
- Effort: M
- Depends on: RL-082
- Epic: 09. client diagnostics
- Why now: diagnostics must avoid recordings and personal content.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in console errors, media failures, permission states, and device capabilities. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-084. Prototype client diagnostics behind `ff_client_diagnostics`

- Priority: P2
- Effort: M
- Depends on: RL-083
- Epic: 09. client diagnostics
- Why now: diagnostics must avoid recordings and personal content.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that diagnostics must avoid recordings and personal content.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_client_diagnostics

### RL-085. Implement the foundation for client diagnostics

- Priority: P2
- Effort: L
- Depends on: RL-084
- Epic: 09. client diagnostics
- Why now: diagnostics must avoid recordings and personal content.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-086. Implement the core behavior for client diagnostics

- Priority: P2
- Effort: L
- Depends on: RL-085
- Epic: 09. client diagnostics
- Why now: diagnostics must avoid recordings and personal content.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: bug reports include enough detail to reproduce failures. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_client_diagnostics

### RL-087. Add edge states and failure handling for client diagnostics

- Priority: P2
- Effort: M
- Depends on: RL-086
- Epic: 09. client diagnostics
- Why now: diagnostics must avoid recordings and personal content.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to console errors, media failures, permission states, and device capabilities.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-088. Verify client diagnostics with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: RL-087
- Epic: 09. client diagnostics
- Why now: diagnostics must avoid recordings and personal content.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-089. Document rollout, cost, and operations for client diagnostics

- Priority: P2
- Effort: S
- Depends on: RL-088
- Epic: 09. client diagnostics
- Why now: diagnostics must avoid recordings and personal content.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when client diagnostics uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-090. Measure and decide the future of client diagnostics

- Priority: P2
- Effort: S
- Depends on: RL-089
- Epic: 09. client diagnostics
- Why now: diagnostics must avoid recordings and personal content.
- Scope: Compare the observed result with the target from the outcome task: a local diagnostic bundle can be copied by the learner. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_client_diagnostics

## Epic 10: reliability and chaos testing

### RL-091. Audit reliability and chaos testing in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. reliability and chaos testing
- Why now: full chaos coverage is too expensive for a proof of concept.
- Scope: Trace offline startup, slow network, missing assets, denied permissions, and interrupted sessions. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-092. Define the outcome and measurement for reliability and chaos testing

- Priority: P2
- Effort: S
- Depends on: RL-091
- Epic: 10. reliability and chaos testing
- Why now: full chaos coverage is too expensive for a proof of concept.
- Scope: Write the intended result in plain language so that known failure modes are rehearsed before users hit them. Choose one observable measure based on this target: a checklist or automated suite covers the highest-risk failures.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-093. Design the data and state contract for reliability and chaos testing

- Priority: P2
- Effort: M
- Depends on: RL-092
- Epic: 10. reliability and chaos testing
- Why now: full chaos coverage is too expensive for a proof of concept.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in offline startup, slow network, missing assets, denied permissions, and interrupted sessions. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-094. Prototype reliability and chaos testing behind `ff_reliability_testing`

- Priority: P2
- Effort: M
- Depends on: RL-093
- Epic: 10. reliability and chaos testing
- Why now: full chaos coverage is too expensive for a proof of concept.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that full chaos coverage is too expensive for a proof of concept.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_reliability_testing

### RL-095. Implement the foundation for reliability and chaos testing

- Priority: P2
- Effort: L
- Depends on: RL-094
- Epic: 10. reliability and chaos testing
- Why now: full chaos coverage is too expensive for a proof of concept.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-096. Implement the core behavior for reliability and chaos testing

- Priority: P2
- Effort: L
- Depends on: RL-095
- Epic: 10. reliability and chaos testing
- Why now: full chaos coverage is too expensive for a proof of concept.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: known failure modes are rehearsed before users hit them. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_reliability_testing

### RL-097. Add edge states and failure handling for reliability and chaos testing

- Priority: P2
- Effort: M
- Depends on: RL-096
- Epic: 10. reliability and chaos testing
- Why now: full chaos coverage is too expensive for a proof of concept.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to offline startup, slow network, missing assets, denied permissions, and interrupted sessions.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-098. Verify reliability and chaos testing with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: RL-097
- Epic: 10. reliability and chaos testing
- Why now: full chaos coverage is too expensive for a proof of concept.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-099. Document rollout, cost, and operations for reliability and chaos testing

- Priority: P2
- Effort: S
- Depends on: RL-098
- Epic: 10. reliability and chaos testing
- Why now: full chaos coverage is too expensive for a proof of concept.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when reliability and chaos testing uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### RL-100. Measure and decide the future of reliability and chaos testing

- Priority: P2
- Effort: S
- Depends on: RL-099
- Epic: 10. reliability and chaos testing
- Why now: full chaos coverage is too expensive for a proof of concept.
- Scope: Compare the observed result with the target from the outcome task: a checklist or automated suite covers the highest-risk failures. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_reliability_testing

## Conflicts and feature-flag strategies

### Conflict 1: Installable PWA versus plain static site

| Option | Pros | Cons |
|---|---|---|
| Build an installable PWA | Learners can launch the app like a native app; offline caching is explicit; repeat use is easier | Service worker correctness is hard; update bugs can be persistent; iOS support has limits |
| Remain a plain static site | Deployment stays simple; no service worker failure mode exists | Offline use and install behavior remain limited or inconsistent |

Feature-flag or coexistence plan: Use `ff_pwa` while validating cache update behavior and offline startup.

### Conflict 2: Cache-first media versus network-first media

| Option | Pros | Cons |
|---|---|---|
| Use cache-first media | Playback is fast and works offline after the first download | Storage grows and stale media can persist |
| Use network-first media | Fresh content is preferred and storage stays lower | Weak networks interrupt practice and repeat downloads cost bandwidth |

Feature-flag or coexistence plan: Use cache-first for immutable media with content hashes, and network-first only for versioned mutable data.

### Conflict 3: Automatic session restore versus explicit restart

| Option | Pros | Cons |
|---|---|---|
| Restore sessions automatically | Interrupted learners lose less progress; the app feels resilient | Stale or partially corrupt state can restore confusing sessions |
| Require explicit restart | Learners always see a clean state; implementation is simpler | Reloads lose progress and frustrate learners |

Feature-flag or coexistence plan: Use `ff_session_recovery` and show a restore prompt rather than silently restoring complex recording state.

## Third-party service cost policy

Use browser service worker APIs and local testing. No third-party service is required.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
