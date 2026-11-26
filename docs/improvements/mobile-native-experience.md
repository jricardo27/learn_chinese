# Mobile native experience improvement plan

## Purpose

Make the Capacitor app feel deliberate on iOS and Android instead of behaving like a repackaged browser page.

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

## Epic 01: Capacitor configuration ownership

### MN-001. Audit Capacitor configuration ownership in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. Capacitor configuration ownership
- Why now: generated native files can hide manual changes.
- Scope: Trace `capacitor.config.json`, sync script, app id, plugin versions, and webDir. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-002. Define the outcome and measurement for Capacitor configuration ownership

- Priority: P0
- Effort: S
- Depends on: MN-001
- Epic: 01. Capacitor configuration ownership
- Why now: generated native files can hide manual changes.
- Scope: Write the intended result in plain language so that native behavior is reproducible and documented. Choose one observable measure based on this target: one command syncs web assets and validates config.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-003. Design the data and state contract for Capacitor configuration ownership

- Priority: P0
- Effort: M
- Depends on: MN-002
- Epic: 01. Capacitor configuration ownership
- Why now: generated native files can hide manual changes.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `capacitor.config.json`, sync script, app id, plugin versions, and webDir. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-004. Prototype Capacitor configuration ownership behind `ff_capacitor_config`

- Priority: P2
- Effort: M
- Depends on: MN-003
- Epic: 01. Capacitor configuration ownership
- Why now: generated native files can hide manual changes.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that generated native files can hide manual changes.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_capacitor_config

### MN-005. Implement the foundation for Capacitor configuration ownership

- Priority: P2
- Effort: L
- Depends on: MN-004
- Epic: 01. Capacitor configuration ownership
- Why now: generated native files can hide manual changes.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-006. Implement the core behavior for Capacitor configuration ownership

- Priority: P1
- Effort: L
- Depends on: MN-005
- Epic: 01. Capacitor configuration ownership
- Why now: generated native files can hide manual changes.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: native behavior is reproducible and documented. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_capacitor_config

### MN-007. Add edge states and failure handling for Capacitor configuration ownership

- Priority: P2
- Effort: M
- Depends on: MN-006
- Epic: 01. Capacitor configuration ownership
- Why now: generated native files can hide manual changes.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `capacitor.config.json`, sync script, app id, plugin versions, and webDir.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-008. Verify Capacitor configuration ownership with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: MN-007
- Epic: 01. Capacitor configuration ownership
- Why now: generated native files can hide manual changes.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-009. Document rollout, cost, and operations for Capacitor configuration ownership

- Priority: P2
- Effort: S
- Depends on: MN-008
- Epic: 01. Capacitor configuration ownership
- Why now: generated native files can hide manual changes.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when Capacitor configuration ownership uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-010. Measure and decide the future of Capacitor configuration ownership

- Priority: P2
- Effort: S
- Depends on: MN-009
- Epic: 01. Capacitor configuration ownership
- Why now: generated native files can hide manual changes.
- Scope: Compare the observed result with the target from the outcome task: one command syncs web assets and validates config. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_capacitor_config

## Epic 02: native audio behavior

### MN-011. Audit native audio behavior in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. native audio behavior
- Why now: plugin APIs differ from HTMLAudio.
- Scope: Trace `@capacitor-community/native-audio`, web fallback, volume, completion, and interruption handling. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-012. Define the outcome and measurement for native audio behavior

- Priority: P0
- Effort: S
- Depends on: MN-011
- Epic: 02. native audio behavior
- Why now: plugin APIs differ from HTMLAudio.
- Scope: Write the intended result in plain language so that playback is reliable in native shells. Choose one observable measure based on this target: play, stop, completion, and interruptions behave consistently.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-013. Design the data and state contract for native audio behavior

- Priority: P0
- Effort: M
- Depends on: MN-012
- Epic: 02. native audio behavior
- Why now: plugin APIs differ from HTMLAudio.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `@capacitor-community/native-audio`, web fallback, volume, completion, and interruption handling. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-014. Prototype native audio behavior behind `ff_native_audio_experience`

- Priority: P2
- Effort: M
- Depends on: MN-013
- Epic: 02. native audio behavior
- Why now: plugin APIs differ from HTMLAudio.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that plugin APIs differ from HTMLAudio.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_native_audio_experience

### MN-015. Implement the foundation for native audio behavior

- Priority: P2
- Effort: L
- Depends on: MN-014
- Epic: 02. native audio behavior
- Why now: plugin APIs differ from HTMLAudio.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-016. Implement the core behavior for native audio behavior

- Priority: P1
- Effort: L
- Depends on: MN-015
- Epic: 02. native audio behavior
- Why now: plugin APIs differ from HTMLAudio.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: playback is reliable in native shells. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_native_audio_experience

### MN-017. Add edge states and failure handling for native audio behavior

- Priority: P2
- Effort: M
- Depends on: MN-016
- Epic: 02. native audio behavior
- Why now: plugin APIs differ from HTMLAudio.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `@capacitor-community/native-audio`, web fallback, volume, completion, and interruption handling.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-018. Verify native audio behavior with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: MN-017
- Epic: 02. native audio behavior
- Why now: plugin APIs differ from HTMLAudio.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-019. Document rollout, cost, and operations for native audio behavior

- Priority: P2
- Effort: S
- Depends on: MN-018
- Epic: 02. native audio behavior
- Why now: plugin APIs differ from HTMLAudio.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when native audio behavior uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-020. Measure and decide the future of native audio behavior

- Priority: P2
- Effort: S
- Depends on: MN-019
- Epic: 02. native audio behavior
- Why now: plugin APIs differ from HTMLAudio.
- Scope: Compare the observed result with the target from the outcome task: play, stop, completion, and interruptions behave consistently. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_native_audio_experience

## Epic 03: microphone permission flow

### MN-021. Audit microphone permission flow in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. microphone permission flow
- Why now: iOS and Android permission models differ.
- Scope: Trace first use, denied state, settings recovery, and session retry. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-022. Define the outcome and measurement for microphone permission flow

- Priority: P2
- Effort: S
- Depends on: MN-021
- Epic: 03. microphone permission flow
- Why now: iOS and Android permission models differ.
- Scope: Write the intended result in plain language so that learners understand and can recover from permission states. Choose one observable measure based on this target: every permission state has copy and a next action.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-023. Design the data and state contract for microphone permission flow

- Priority: P1
- Effort: M
- Depends on: MN-022
- Epic: 03. microphone permission flow
- Why now: iOS and Android permission models differ.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in first use, denied state, settings recovery, and session retry. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-024. Prototype microphone permission flow behind `ff_microphone_permission_flow`

- Priority: P2
- Effort: M
- Depends on: MN-023
- Epic: 03. microphone permission flow
- Why now: iOS and Android permission models differ.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that iOS and Android permission models differ.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_microphone_permission_flow

### MN-025. Implement the foundation for microphone permission flow

- Priority: P2
- Effort: L
- Depends on: MN-024
- Epic: 03. microphone permission flow
- Why now: iOS and Android permission models differ.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-026. Implement the core behavior for microphone permission flow

- Priority: P1
- Effort: L
- Depends on: MN-025
- Epic: 03. microphone permission flow
- Why now: iOS and Android permission models differ.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners understand and can recover from permission states. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_microphone_permission_flow

### MN-027. Add edge states and failure handling for microphone permission flow

- Priority: P2
- Effort: M
- Depends on: MN-026
- Epic: 03. microphone permission flow
- Why now: iOS and Android permission models differ.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to first use, denied state, settings recovery, and session retry.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-028. Verify microphone permission flow with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: MN-027
- Epic: 03. microphone permission flow
- Why now: iOS and Android permission models differ.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-029. Document rollout, cost, and operations for microphone permission flow

- Priority: P2
- Effort: S
- Depends on: MN-028
- Epic: 03. microphone permission flow
- Why now: iOS and Android permission models differ.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when microphone permission flow uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-030. Measure and decide the future of microphone permission flow

- Priority: P2
- Effort: S
- Depends on: MN-029
- Epic: 03. microphone permission flow
- Why now: iOS and Android permission models differ.
- Scope: Compare the observed result with the target from the outcome task: every permission state has copy and a next action. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_microphone_permission_flow

## Epic 04: Android build reproducibility

### MN-031. Audit Android build reproducibility in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. Android build reproducibility
- Why now: local machine setup can drift.
- Scope: Trace Gradle files, Java version, SDK versions, and debug APK output. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-032. Define the outcome and measurement for Android build reproducibility

- Priority: P2
- Effort: S
- Depends on: MN-031
- Epic: 04. Android build reproducibility
- Why now: local machine setup can drift.
- Scope: Write the intended result in plain language so that a maintainer can reproduce the Android build. Choose one observable measure based on this target: a clean checkout builds with documented versions.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-033. Design the data and state contract for Android build reproducibility

- Priority: P1
- Effort: M
- Depends on: MN-032
- Epic: 04. Android build reproducibility
- Why now: local machine setup can drift.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in Gradle files, Java version, SDK versions, and debug APK output. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-034. Prototype Android build reproducibility behind `ff_android_build_reproducibility`

- Priority: P2
- Effort: M
- Depends on: MN-033
- Epic: 04. Android build reproducibility
- Why now: local machine setup can drift.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that local machine setup can drift.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_android_build_reproducibility

### MN-035. Implement the foundation for Android build reproducibility

- Priority: P2
- Effort: L
- Depends on: MN-034
- Epic: 04. Android build reproducibility
- Why now: local machine setup can drift.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-036. Implement the core behavior for Android build reproducibility

- Priority: P1
- Effort: L
- Depends on: MN-035
- Epic: 04. Android build reproducibility
- Why now: local machine setup can drift.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: a maintainer can reproduce the Android build. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_android_build_reproducibility

### MN-037. Add edge states and failure handling for Android build reproducibility

- Priority: P2
- Effort: M
- Depends on: MN-036
- Epic: 04. Android build reproducibility
- Why now: local machine setup can drift.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to Gradle files, Java version, SDK versions, and debug APK output.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-038. Verify Android build reproducibility with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: MN-037
- Epic: 04. Android build reproducibility
- Why now: local machine setup can drift.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-039. Document rollout, cost, and operations for Android build reproducibility

- Priority: P2
- Effort: S
- Depends on: MN-038
- Epic: 04. Android build reproducibility
- Why now: local machine setup can drift.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when Android build reproducibility uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-040. Measure and decide the future of Android build reproducibility

- Priority: P2
- Effort: S
- Depends on: MN-039
- Epic: 04. Android build reproducibility
- Why now: local machine setup can drift.
- Scope: Compare the observed result with the target from the outcome task: a clean checkout builds with documented versions. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_android_build_reproducibility

## Epic 05: iOS signing and free-account workflow

### MN-041. Audit iOS signing and free-account workflow in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. iOS signing and free-account workflow
- Why now: Apple distribution has no renewable free tier.
- Scope: Trace Xcode signing, seven-day free provisioning, device trust, and release constraints. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-042. Define the outcome and measurement for iOS signing and free-account workflow

- Priority: P2
- Effort: S
- Depends on: MN-041
- Epic: 05. iOS signing and free-account workflow
- Why now: Apple distribution has no renewable free tier.
- Scope: Write the intended result in plain language so that a maintainer can run the app on a personal device without confusion. Choose one observable measure based on this target: the docs distinguish free local testing from paid distribution.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-043. Design the data and state contract for iOS signing and free-account workflow

- Priority: P1
- Effort: M
- Depends on: MN-042
- Epic: 05. iOS signing and free-account workflow
- Why now: Apple distribution has no renewable free tier.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in Xcode signing, seven-day free provisioning, device trust, and release constraints. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-044. Prototype iOS signing and free-account workflow behind `ff_ios_signing_docs`

- Priority: P2
- Effort: M
- Depends on: MN-043
- Epic: 05. iOS signing and free-account workflow
- Why now: Apple distribution has no renewable free tier.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that Apple distribution has no renewable free tier.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_ios_signing_docs

### MN-045. Implement the foundation for iOS signing and free-account workflow

- Priority: P2
- Effort: L
- Depends on: MN-044
- Epic: 05. iOS signing and free-account workflow
- Why now: Apple distribution has no renewable free tier.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-046. Implement the core behavior for iOS signing and free-account workflow

- Priority: P1
- Effort: L
- Depends on: MN-045
- Epic: 05. iOS signing and free-account workflow
- Why now: Apple distribution has no renewable free tier.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: a maintainer can run the app on a personal device without confusion. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Assume that no renewable free tier exists until proven otherwise. Write a cost-benefit analysis with monthly cost, learner benefit, free alternative, and exit cost before adoption.
- Flag or conflict notes: ff_ios_signing_docs

### MN-047. Add edge states and failure handling for iOS signing and free-account workflow

- Priority: P2
- Effort: M
- Depends on: MN-046
- Epic: 05. iOS signing and free-account workflow
- Why now: Apple distribution has no renewable free tier.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to Xcode signing, seven-day free provisioning, device trust, and release constraints.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-048. Verify iOS signing and free-account workflow with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: MN-047
- Epic: 05. iOS signing and free-account workflow
- Why now: Apple distribution has no renewable free tier.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-049. Document rollout, cost, and operations for iOS signing and free-account workflow

- Priority: P2
- Effort: S
- Depends on: MN-048
- Epic: 05. iOS signing and free-account workflow
- Why now: Apple distribution has no renewable free tier.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when iOS signing and free-account workflow uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Assume that no renewable free tier exists until proven otherwise. Write a cost-benefit analysis with monthly cost, learner benefit, free alternative, and exit cost before adoption.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-050. Measure and decide the future of iOS signing and free-account workflow

- Priority: P2
- Effort: S
- Depends on: MN-049
- Epic: 05. iOS signing and free-account workflow
- Why now: Apple distribution has no renewable free tier.
- Scope: Compare the observed result with the target from the outcome task: the docs distinguish free local testing from paid distribution. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_ios_signing_docs

## Epic 06: mobile navigation and safe areas

### MN-051. Audit mobile navigation and safe areas in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. mobile navigation and safe areas
- Why now: small layout defects vary by device.
- Scope: Trace viewport fit, sticky header, mobile menu, notches, and gesture areas. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-052. Define the outcome and measurement for mobile navigation and safe areas

- Priority: P2
- Effort: S
- Depends on: MN-051
- Epic: 06. mobile navigation and safe areas
- Why now: small layout defects vary by device.
- Scope: Write the intended result in plain language so that controls remain visible and tappable on real phones. Choose one observable measure based on this target: core screens avoid clipped or overlapping controls.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-053. Design the data and state contract for mobile navigation and safe areas

- Priority: P1
- Effort: M
- Depends on: MN-052
- Epic: 06. mobile navigation and safe areas
- Why now: small layout defects vary by device.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in viewport fit, sticky header, mobile menu, notches, and gesture areas. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-054. Prototype mobile navigation and safe areas behind `ff_mobile_navigation_safe_area`

- Priority: P2
- Effort: M
- Depends on: MN-053
- Epic: 06. mobile navigation and safe areas
- Why now: small layout defects vary by device.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that small layout defects vary by device.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_mobile_navigation_safe_area

### MN-055. Implement the foundation for mobile navigation and safe areas

- Priority: P2
- Effort: L
- Depends on: MN-054
- Epic: 06. mobile navigation and safe areas
- Why now: small layout defects vary by device.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-056. Implement the core behavior for mobile navigation and safe areas

- Priority: P1
- Effort: L
- Depends on: MN-055
- Epic: 06. mobile navigation and safe areas
- Why now: small layout defects vary by device.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: controls remain visible and tappable on real phones. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_mobile_navigation_safe_area

### MN-057. Add edge states and failure handling for mobile navigation and safe areas

- Priority: P2
- Effort: M
- Depends on: MN-056
- Epic: 06. mobile navigation and safe areas
- Why now: small layout defects vary by device.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to viewport fit, sticky header, mobile menu, notches, and gesture areas.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-058. Verify mobile navigation and safe areas with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: MN-057
- Epic: 06. mobile navigation and safe areas
- Why now: small layout defects vary by device.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-059. Document rollout, cost, and operations for mobile navigation and safe areas

- Priority: P2
- Effort: S
- Depends on: MN-058
- Epic: 06. mobile navigation and safe areas
- Why now: small layout defects vary by device.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when mobile navigation and safe areas uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-060. Measure and decide the future of mobile navigation and safe areas

- Priority: P2
- Effort: S
- Depends on: MN-059
- Epic: 06. mobile navigation and safe areas
- Why now: small layout defects vary by device.
- Scope: Compare the observed result with the target from the outcome task: core screens avoid clipped or overlapping controls. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_mobile_navigation_safe_area

## Epic 07: native feedback and haptics

### MN-061. Audit native feedback and haptics in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. native feedback and haptics
- Why now: excess haptics can annoy users.
- Scope: Trace success, failure, recording state, and completion feedback. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-062. Define the outcome and measurement for native feedback and haptics

- Priority: P2
- Effort: S
- Depends on: MN-061
- Epic: 07. native feedback and haptics
- Why now: excess haptics can annoy users.
- Scope: Write the intended result in plain language so that feedback feels immediate without relying only on sound. Choose one observable measure based on this target: important events have visual and optional tactile feedback.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-063. Design the data and state contract for native feedback and haptics

- Priority: P2
- Effort: M
- Depends on: MN-062
- Epic: 07. native feedback and haptics
- Why now: excess haptics can annoy users.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in success, failure, recording state, and completion feedback. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-064. Prototype native feedback and haptics behind `ff_native_feedback`

- Priority: P2
- Effort: M
- Depends on: MN-063
- Epic: 07. native feedback and haptics
- Why now: excess haptics can annoy users.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that excess haptics can annoy users.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_native_feedback

### MN-065. Implement the foundation for native feedback and haptics

- Priority: P2
- Effort: L
- Depends on: MN-064
- Epic: 07. native feedback and haptics
- Why now: excess haptics can annoy users.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-066. Implement the core behavior for native feedback and haptics

- Priority: P2
- Effort: L
- Depends on: MN-065
- Epic: 07. native feedback and haptics
- Why now: excess haptics can annoy users.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: feedback feels immediate without relying only on sound. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_native_feedback

### MN-067. Add edge states and failure handling for native feedback and haptics

- Priority: P2
- Effort: M
- Depends on: MN-066
- Epic: 07. native feedback and haptics
- Why now: excess haptics can annoy users.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to success, failure, recording state, and completion feedback.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-068. Verify native feedback and haptics with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: MN-067
- Epic: 07. native feedback and haptics
- Why now: excess haptics can annoy users.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-069. Document rollout, cost, and operations for native feedback and haptics

- Priority: P2
- Effort: S
- Depends on: MN-068
- Epic: 07. native feedback and haptics
- Why now: excess haptics can annoy users.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when native feedback and haptics uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-070. Measure and decide the future of native feedback and haptics

- Priority: P2
- Effort: S
- Depends on: MN-069
- Epic: 07. native feedback and haptics
- Why now: excess haptics can annoy users.
- Scope: Compare the observed result with the target from the outcome task: important events have visual and optional tactile feedback. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_native_feedback

## Epic 08: background and lock-screen behavior

### MN-071. Audit background and lock-screen behavior in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. background and lock-screen behavior
- Why now: mobile operating systems limit webview behavior.
- Scope: Trace audio session lifecycle, interruptions, recording state, and resume. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-072. Define the outcome and measurement for background and lock-screen behavior

- Priority: P2
- Effort: S
- Depends on: MN-071
- Epic: 08. background and lock-screen behavior
- Why now: mobile operating systems limit webview behavior.
- Scope: Write the intended result in plain language so that the app recovers predictably when interrupted. Choose one observable measure based on this target: backgrounding and returning never duplicate audio or corrupt a session.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-073. Design the data and state contract for background and lock-screen behavior

- Priority: P2
- Effort: M
- Depends on: MN-072
- Epic: 08. background and lock-screen behavior
- Why now: mobile operating systems limit webview behavior.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in audio session lifecycle, interruptions, recording state, and resume. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-074. Prototype background and lock-screen behavior behind `ff_background_lockscreen`

- Priority: P2
- Effort: M
- Depends on: MN-073
- Epic: 08. background and lock-screen behavior
- Why now: mobile operating systems limit webview behavior.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that mobile operating systems limit webview behavior.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_background_lockscreen

### MN-075. Implement the foundation for background and lock-screen behavior

- Priority: P2
- Effort: L
- Depends on: MN-074
- Epic: 08. background and lock-screen behavior
- Why now: mobile operating systems limit webview behavior.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-076. Implement the core behavior for background and lock-screen behavior

- Priority: P2
- Effort: L
- Depends on: MN-075
- Epic: 08. background and lock-screen behavior
- Why now: mobile operating systems limit webview behavior.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the app recovers predictably when interrupted. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_background_lockscreen

### MN-077. Add edge states and failure handling for background and lock-screen behavior

- Priority: P2
- Effort: M
- Depends on: MN-076
- Epic: 08. background and lock-screen behavior
- Why now: mobile operating systems limit webview behavior.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to audio session lifecycle, interruptions, recording state, and resume.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-078. Verify background and lock-screen behavior with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: MN-077
- Epic: 08. background and lock-screen behavior
- Why now: mobile operating systems limit webview behavior.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-079. Document rollout, cost, and operations for background and lock-screen behavior

- Priority: P2
- Effort: S
- Depends on: MN-078
- Epic: 08. background and lock-screen behavior
- Why now: mobile operating systems limit webview behavior.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when background and lock-screen behavior uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-080. Measure and decide the future of background and lock-screen behavior

- Priority: P2
- Effort: S
- Depends on: MN-079
- Epic: 08. background and lock-screen behavior
- Why now: mobile operating systems limit webview behavior.
- Scope: Compare the observed result with the target from the outcome task: backgrounding and returning never duplicate audio or corrupt a session. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_background_lockscreen

## Epic 09: icons and splash assets

### MN-081. Audit icons and splash assets in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. icons and splash assets
- Why now: generated assets can be accidentally edited or left stale.
- Scope: Trace `assets/`, `icons/`, generated iOS and Android resources. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-082. Define the outcome and measurement for icons and splash assets

- Priority: P2
- Effort: S
- Depends on: MN-081
- Epic: 09. icons and splash assets
- Why now: generated assets can be accidentally edited or left stale.
- Scope: Write the intended result in plain language so that the installed app looks intentional. Choose one observable measure based on this target: all required icon and splash sizes generate from reviewed source assets.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-083. Design the data and state contract for icons and splash assets

- Priority: P2
- Effort: M
- Depends on: MN-082
- Epic: 09. icons and splash assets
- Why now: generated assets can be accidentally edited or left stale.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `assets/`, `icons/`, generated iOS and Android resources. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-084. Prototype icons and splash assets behind `ff_icons_splash`

- Priority: P2
- Effort: M
- Depends on: MN-083
- Epic: 09. icons and splash assets
- Why now: generated assets can be accidentally edited or left stale.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that generated assets can be accidentally edited or left stale.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_icons_splash

### MN-085. Implement the foundation for icons and splash assets

- Priority: P2
- Effort: L
- Depends on: MN-084
- Epic: 09. icons and splash assets
- Why now: generated assets can be accidentally edited or left stale.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-086. Implement the core behavior for icons and splash assets

- Priority: P2
- Effort: L
- Depends on: MN-085
- Epic: 09. icons and splash assets
- Why now: generated assets can be accidentally edited or left stale.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the installed app looks intentional. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_icons_splash

### MN-087. Add edge states and failure handling for icons and splash assets

- Priority: P2
- Effort: M
- Depends on: MN-086
- Epic: 09. icons and splash assets
- Why now: generated assets can be accidentally edited or left stale.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `assets/`, `icons/`, generated iOS and Android resources.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-088. Verify icons and splash assets with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: MN-087
- Epic: 09. icons and splash assets
- Why now: generated assets can be accidentally edited or left stale.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-089. Document rollout, cost, and operations for icons and splash assets

- Priority: P2
- Effort: S
- Depends on: MN-088
- Epic: 09. icons and splash assets
- Why now: generated assets can be accidentally edited or left stale.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when icons and splash assets uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-090. Measure and decide the future of icons and splash assets

- Priority: P2
- Effort: S
- Depends on: MN-089
- Epic: 09. icons and splash assets
- Why now: generated assets can be accidentally edited or left stale.
- Scope: Compare the observed result with the target from the outcome task: all required icon and splash sizes generate from reviewed source assets. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_icons_splash

## Epic 10: mobile release process

### MN-091. Audit mobile release process in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. mobile release process
- Why now: store distribution introduces nonfree developer account costs.
- Scope: Trace device testing, version codes, signing, store requirements, and rollback. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-092. Define the outcome and measurement for mobile release process

- Priority: P2
- Effort: S
- Depends on: MN-091
- Epic: 10. mobile release process
- Why now: store distribution introduces nonfree developer account costs.
- Scope: Write the intended result in plain language so that mobile releases are repeatable rather than improvised. Choose one observable measure based on this target: a release checklist covers build, test, install, and rollback.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-093. Design the data and state contract for mobile release process

- Priority: P2
- Effort: M
- Depends on: MN-092
- Epic: 10. mobile release process
- Why now: store distribution introduces nonfree developer account costs.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in device testing, version codes, signing, store requirements, and rollback. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-094. Prototype mobile release process behind `ff_mobile_release_process`

- Priority: P2
- Effort: M
- Depends on: MN-093
- Epic: 10. mobile release process
- Why now: store distribution introduces nonfree developer account costs.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that store distribution introduces nonfree developer account costs.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_mobile_release_process

### MN-095. Implement the foundation for mobile release process

- Priority: P2
- Effort: L
- Depends on: MN-094
- Epic: 10. mobile release process
- Why now: store distribution introduces nonfree developer account costs.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-096. Implement the core behavior for mobile release process

- Priority: P2
- Effort: L
- Depends on: MN-095
- Epic: 10. mobile release process
- Why now: store distribution introduces nonfree developer account costs.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: mobile releases are repeatable rather than improvised. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_mobile_release_process

### MN-097. Add edge states and failure handling for mobile release process

- Priority: P2
- Effort: M
- Depends on: MN-096
- Epic: 10. mobile release process
- Why now: store distribution introduces nonfree developer account costs.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to device testing, version codes, signing, store requirements, and rollback.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-098. Verify mobile release process with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: MN-097
- Epic: 10. mobile release process
- Why now: store distribution introduces nonfree developer account costs.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-099. Document rollout, cost, and operations for mobile release process

- Priority: P2
- Effort: S
- Depends on: MN-098
- Epic: 10. mobile release process
- Why now: store distribution introduces nonfree developer account costs.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when mobile release process uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### MN-100. Measure and decide the future of mobile release process

- Priority: P2
- Effort: S
- Depends on: MN-099
- Epic: 10. mobile release process
- Why now: store distribution introduces nonfree developer account costs.
- Scope: Compare the observed result with the target from the outcome task: a release checklist covers build, test, install, and rollback. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_mobile_release_process

## Conflicts and feature-flag strategies

### Conflict 1: Native plugins versus web APIs

| Option | Pros | Cons |
|---|---|---|
| Use native plugins | Native audio and permissions can integrate with platform behavior more accurately | Plugins add dependency, build, and maintenance cost; web and native behavior can diverge |
| Use web APIs | One implementation serves web and mobile; testing is simpler; fewer dependencies are needed | Some mobile behaviors are limited or inconsistent in a webview |

Feature-flag or coexistence plan: Use the service-boundary flag `ff_native_audio` so web audio remains the fallback while native behavior is verified.

### Conflict 2: Free local testing versus paid store distribution

| Option | Pros | Cons |
|---|---|---|
| Use free local testing | No recurring distribution cost is required on Android; iOS can use a free Apple ID for short-lived local installs | iOS provisioning expires quickly; there is no store presence or simple user install path |
| Pay for store distribution | Users can install updates normally; signing and distribution become manageable | Apple distribution has an annual fee rather than a renewable monthly free tier; store review adds process |

Feature-flag or coexistence plan: Document a cost-benefit analysis before any paid account. Keep local testing as the default until learner demand justifies distribution.

### Conflict 3: Capacitor wrapper versus native rebuild

| Option | Pros | Cons |
|---|---|---|
| Keep Capacitor | Existing web code remains useful; one codebase covers web and mobile; iteration is cheaper | Some interactions retain webview constraints and plugin complexity |
| Rebuild natively | Platform behavior, performance, and audio integration can be more precise | Cost and maintenance rise sharply; web and mobile implementations diverge |

Feature-flag or coexistence plan: Do not rebuild by default. Prototype any native-only capability behind `ff_native_shell` and compare learner value before committing.

## Third-party service cost policy

Capacitor is open source. Apple distribution and some device-testing services lack renewable free tiers, so they require cost-benefit analysis.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

### Cost-benefit analyses for options without a renewable free tier

| Option | Cost exposure | Benefit | Free alternative | Recommendation |
|---|---|---|---|---|
| [Apple Developer Program](https://developer.apple.com/programs/) | Apple lists a US$99 annual membership. It renews annually, not as a renewable monthly free tier. | Enables App Store distribution, TestFlight, and normal installation for external learners. | Use web deployment, Android local installs, and free Apple ID local testing while accepting short-lived iOS provisioning. | Defer until external iOS learners need managed installs. Re-evaluate when a release candidate exists. |
| [Google Play full distribution](https://support.google.com/googleplay/android-developer/answer/6112435) | Google lists a US$25 one-time registration fee. It is not a monthly renewable free tier, but the cost is fixed and low. | Enables broad Android distribution through Google Play. | Use local APK installs or the limited-distribution path where eligible, then verify current Play Console terms. | Defer until Android learners outside the maintainer's devices need store distribution. |
| Hosted mobile device cloud | Pricing is usually subscription or usage based after any trial. A trial does not satisfy the renewable-free-tier rule. | Expands real-device coverage for microphone, audio, safe-area, and performance defects. | Use browser emulation, owned devices, simulator, and a manual release checklist. | Do not adopt by default. Consider a one-month paid run only before a public mobile release if defect risk justifies the cost. |

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
