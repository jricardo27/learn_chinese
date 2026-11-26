# Testing and quality assurance improvement plan

## Purpose

Build a practical test pyramid that proves learner-visible behavior before architectural or pedagogical changes land.

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

## Epic 01: browser smoke harness

### QA-001. Audit browser smoke harness in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. browser smoke harness
- Why now: the current package has no real test script.
- Scope: Trace home screen, mode start, word loading, and basic playback. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-002. Define the outcome and measurement for browser smoke harness

- Priority: P0
- Effort: S
- Depends on: QA-001
- Epic: 01. browser smoke harness
- Why now: the current package has no real test script.
- Scope: Write the intended result in plain language so that every pull request can prove that the app still starts. Choose one observable measure based on this target: one command runs a browser smoke test against the static app.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-003. Design the data and state contract for browser smoke harness

- Priority: P0
- Effort: M
- Depends on: QA-002
- Epic: 01. browser smoke harness
- Why now: the current package has no real test script.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in home screen, mode start, word loading, and basic playback. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-004. Prototype browser smoke harness behind `ff_smoke_harness`

- Priority: P2
- Effort: M
- Depends on: QA-003
- Epic: 01. browser smoke harness
- Why now: the current package has no real test script.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the current package has no real test script.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_smoke_harness

### QA-005. Implement the foundation for browser smoke harness

- Priority: P2
- Effort: L
- Depends on: QA-004
- Epic: 01. browser smoke harness
- Why now: the current package has no real test script.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-006. Implement the core behavior for browser smoke harness

- Priority: P1
- Effort: L
- Depends on: QA-005
- Epic: 01. browser smoke harness
- Why now: the current package has no real test script.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: every pull request can prove that the app still starts. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_smoke_harness

### QA-007. Add edge states and failure handling for browser smoke harness

- Priority: P2
- Effort: M
- Depends on: QA-006
- Epic: 01. browser smoke harness
- Why now: the current package has no real test script.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to home screen, mode start, word loading, and basic playback.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-008. Verify browser smoke harness with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: QA-007
- Epic: 01. browser smoke harness
- Why now: the current package has no real test script.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-009. Document rollout, cost, and operations for browser smoke harness

- Priority: P2
- Effort: S
- Depends on: QA-008
- Epic: 01. browser smoke harness
- Why now: the current package has no real test script.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when browser smoke harness uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-010. Measure and decide the future of browser smoke harness

- Priority: P2
- Effort: S
- Depends on: QA-009
- Epic: 01. browser smoke harness
- Why now: the current package has no real test script.
- Scope: Compare the observed result with the target from the outcome task: one command runs a browser smoke test against the static app. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_smoke_harness

## Epic 02: data transformation unit tests

### QA-011. Audit data transformation unit tests in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. data transformation unit tests
- Why now: current logic is embedded in Vue computed state.
- Scope: Trace word loading, tone filtering, classifier mapping, and shuffle behavior. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-012. Define the outcome and measurement for data transformation unit tests

- Priority: P0
- Effort: S
- Depends on: QA-011
- Epic: 02. data transformation unit tests
- Why now: current logic is embedded in Vue computed state.
- Scope: Write the intended result in plain language so that pure logic can change without manual retesting. Choose one observable measure based on this target: critical transforms have deterministic tests.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-013. Design the data and state contract for data transformation unit tests

- Priority: P0
- Effort: M
- Depends on: QA-012
- Epic: 02. data transformation unit tests
- Why now: current logic is embedded in Vue computed state.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in word loading, tone filtering, classifier mapping, and shuffle behavior. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-014. Prototype data transformation unit tests behind `ff_data_transform_tests`

- Priority: P2
- Effort: M
- Depends on: QA-013
- Epic: 02. data transformation unit tests
- Why now: current logic is embedded in Vue computed state.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that current logic is embedded in Vue computed state.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_data_transform_tests

### QA-015. Implement the foundation for data transformation unit tests

- Priority: P2
- Effort: L
- Depends on: QA-014
- Epic: 02. data transformation unit tests
- Why now: current logic is embedded in Vue computed state.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-016. Implement the core behavior for data transformation unit tests

- Priority: P1
- Effort: L
- Depends on: QA-015
- Epic: 02. data transformation unit tests
- Why now: current logic is embedded in Vue computed state.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: pure logic can change without manual retesting. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_data_transform_tests

### QA-017. Add edge states and failure handling for data transformation unit tests

- Priority: P2
- Effort: M
- Depends on: QA-016
- Epic: 02. data transformation unit tests
- Why now: current logic is embedded in Vue computed state.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to word loading, tone filtering, classifier mapping, and shuffle behavior.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-018. Verify data transformation unit tests with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: QA-017
- Epic: 02. data transformation unit tests
- Why now: current logic is embedded in Vue computed state.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-019. Document rollout, cost, and operations for data transformation unit tests

- Priority: P2
- Effort: S
- Depends on: QA-018
- Epic: 02. data transformation unit tests
- Why now: current logic is embedded in Vue computed state.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when data transformation unit tests uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-020. Measure and decide the future of data transformation unit tests

- Priority: P2
- Effort: S
- Depends on: QA-019
- Epic: 02. data transformation unit tests
- Why now: current logic is embedded in Vue computed state.
- Scope: Compare the observed result with the target from the outcome task: critical transforms have deterministic tests. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_data_transform_tests

## Epic 03: mode component tests

### QA-021. Audit mode component tests in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. mode component tests
- Why now: component boundaries do not yet exist.
- Scope: Trace recall, standard, quiz, writing, classifier, tone practice, and shadowing. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-022. Define the outcome and measurement for mode component tests

- Priority: P2
- Effort: S
- Depends on: QA-021
- Epic: 03. mode component tests
- Why now: component boundaries do not yet exist.
- Scope: Write the intended result in plain language so that each mode keeps its contract when shared code changes. Choose one observable measure based on this target: every mode has at least one behavior test.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-023. Design the data and state contract for mode component tests

- Priority: P1
- Effort: M
- Depends on: QA-022
- Epic: 03. mode component tests
- Why now: component boundaries do not yet exist.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in recall, standard, quiz, writing, classifier, tone practice, and shadowing. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-024. Prototype mode component tests behind `ff_mode_component_tests`

- Priority: P2
- Effort: M
- Depends on: QA-023
- Epic: 03. mode component tests
- Why now: component boundaries do not yet exist.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that component boundaries do not yet exist.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_mode_component_tests

### QA-025. Implement the foundation for mode component tests

- Priority: P2
- Effort: L
- Depends on: QA-024
- Epic: 03. mode component tests
- Why now: component boundaries do not yet exist.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-026. Implement the core behavior for mode component tests

- Priority: P1
- Effort: L
- Depends on: QA-025
- Epic: 03. mode component tests
- Why now: component boundaries do not yet exist.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: each mode keeps its contract when shared code changes. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_mode_component_tests

### QA-027. Add edge states and failure handling for mode component tests

- Priority: P2
- Effort: M
- Depends on: QA-026
- Epic: 03. mode component tests
- Why now: component boundaries do not yet exist.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to recall, standard, quiz, writing, classifier, tone practice, and shadowing.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-028. Verify mode component tests with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: QA-027
- Epic: 03. mode component tests
- Why now: component boundaries do not yet exist.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-029. Document rollout, cost, and operations for mode component tests

- Priority: P2
- Effort: S
- Depends on: QA-028
- Epic: 03. mode component tests
- Why now: component boundaries do not yet exist.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when mode component tests uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-030. Measure and decide the future of mode component tests

- Priority: P2
- Effort: S
- Depends on: QA-029
- Epic: 03. mode component tests
- Why now: component boundaries do not yet exist.
- Scope: Compare the observed result with the target from the outcome task: every mode has at least one behavior test. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_mode_component_tests

## Epic 04: audio playback test doubles

### QA-031. Audit audio playback test doubles in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. audio playback test doubles
- Why now: browser APIs behave differently across platforms.
- Scope: Trace HTMLAudio, NativeAudio, speech synthesis, and MediaRecorder. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-032. Define the outcome and measurement for audio playback test doubles

- Priority: P2
- Effort: S
- Depends on: QA-031
- Epic: 04. audio playback test doubles
- Why now: browser APIs behave differently across platforms.
- Scope: Write the intended result in plain language so that tests can cover audio flows without sound or devices. Choose one observable measure based on this target: audio interfaces have controllable fakes.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-033. Design the data and state contract for audio playback test doubles

- Priority: P1
- Effort: M
- Depends on: QA-032
- Epic: 04. audio playback test doubles
- Why now: browser APIs behave differently across platforms.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in HTMLAudio, NativeAudio, speech synthesis, and MediaRecorder. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-034. Prototype audio playback test doubles behind `ff_audio_mocks`

- Priority: P2
- Effort: M
- Depends on: QA-033
- Epic: 04. audio playback test doubles
- Why now: browser APIs behave differently across platforms.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that browser APIs behave differently across platforms.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_audio_mocks

### QA-035. Implement the foundation for audio playback test doubles

- Priority: P2
- Effort: L
- Depends on: QA-034
- Epic: 04. audio playback test doubles
- Why now: browser APIs behave differently across platforms.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-036. Implement the core behavior for audio playback test doubles

- Priority: P1
- Effort: L
- Depends on: QA-035
- Epic: 04. audio playback test doubles
- Why now: browser APIs behave differently across platforms.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: tests can cover audio flows without sound or devices. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_audio_mocks

### QA-037. Add edge states and failure handling for audio playback test doubles

- Priority: P2
- Effort: M
- Depends on: QA-036
- Epic: 04. audio playback test doubles
- Why now: browser APIs behave differently across platforms.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to HTMLAudio, NativeAudio, speech synthesis, and MediaRecorder.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-038. Verify audio playback test doubles with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: QA-037
- Epic: 04. audio playback test doubles
- Why now: browser APIs behave differently across platforms.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-039. Document rollout, cost, and operations for audio playback test doubles

- Priority: P2
- Effort: S
- Depends on: QA-038
- Epic: 04. audio playback test doubles
- Why now: browser APIs behave differently across platforms.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when audio playback test doubles uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-040. Measure and decide the future of audio playback test doubles

- Priority: P2
- Effort: S
- Depends on: QA-039
- Epic: 04. audio playback test doubles
- Why now: browser APIs behave differently across platforms.
- Scope: Compare the observed result with the target from the outcome task: audio interfaces have controllable fakes. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_audio_mocks

## Epic 05: shadowing behavior tests

### QA-041. Audit shadowing behavior tests in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. shadowing behavior tests
- Why now: pitch analysis needs deterministic fixtures.
- Scope: Trace recording, retry, scoring, mastery threshold, and session summary. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-042. Define the outcome and measurement for shadowing behavior tests

- Priority: P2
- Effort: S
- Depends on: QA-041
- Epic: 05. shadowing behavior tests
- Why now: pitch analysis needs deterministic fixtures.
- Scope: Write the intended result in plain language so that tone practice improvements do not regress the core loop. Choose one observable measure based on this target: state transitions and scoring rules have behavior tests.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-043. Design the data and state contract for shadowing behavior tests

- Priority: P1
- Effort: M
- Depends on: QA-042
- Epic: 05. shadowing behavior tests
- Why now: pitch analysis needs deterministic fixtures.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in recording, retry, scoring, mastery threshold, and session summary. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-044. Prototype shadowing behavior tests behind `ff_shadowing_tests`

- Priority: P2
- Effort: M
- Depends on: QA-043
- Epic: 05. shadowing behavior tests
- Why now: pitch analysis needs deterministic fixtures.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that pitch analysis needs deterministic fixtures.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_shadowing_tests

### QA-045. Implement the foundation for shadowing behavior tests

- Priority: P2
- Effort: L
- Depends on: QA-044
- Epic: 05. shadowing behavior tests
- Why now: pitch analysis needs deterministic fixtures.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-046. Implement the core behavior for shadowing behavior tests

- Priority: P1
- Effort: L
- Depends on: QA-045
- Epic: 05. shadowing behavior tests
- Why now: pitch analysis needs deterministic fixtures.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: tone practice improvements do not regress the core loop. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_shadowing_tests

### QA-047. Add edge states and failure handling for shadowing behavior tests

- Priority: P2
- Effort: M
- Depends on: QA-046
- Epic: 05. shadowing behavior tests
- Why now: pitch analysis needs deterministic fixtures.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to recording, retry, scoring, mastery threshold, and session summary.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-048. Verify shadowing behavior tests with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: QA-047
- Epic: 05. shadowing behavior tests
- Why now: pitch analysis needs deterministic fixtures.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-049. Document rollout, cost, and operations for shadowing behavior tests

- Priority: P2
- Effort: S
- Depends on: QA-048
- Epic: 05. shadowing behavior tests
- Why now: pitch analysis needs deterministic fixtures.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when shadowing behavior tests uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-050. Measure and decide the future of shadowing behavior tests

- Priority: P2
- Effort: S
- Depends on: QA-049
- Epic: 05. shadowing behavior tests
- Why now: pitch analysis needs deterministic fixtures.
- Scope: Compare the observed result with the target from the outcome task: state transitions and scoring rules have behavior tests. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_shadowing_tests

## Epic 06: visual regression coverage

### QA-051. Audit visual regression coverage in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. visual regression coverage
- Why now: visual tests can become flaky without stable assets.
- Scope: Trace home, welcome, word cards, summary modal, and mobile layouts. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-052. Define the outcome and measurement for visual regression coverage

- Priority: P2
- Effort: S
- Depends on: QA-051
- Epic: 06. visual regression coverage
- Why now: visual tests can become flaky without stable assets.
- Scope: Write the intended result in plain language so that UI refactoring does not silently shift the learning interface. Choose one observable measure based on this target: key breakpoints have baseline screenshots.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-053. Design the data and state contract for visual regression coverage

- Priority: P1
- Effort: M
- Depends on: QA-052
- Epic: 06. visual regression coverage
- Why now: visual tests can become flaky without stable assets.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in home, welcome, word cards, summary modal, and mobile layouts. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-054. Prototype visual regression coverage behind `ff_visual_regression`

- Priority: P2
- Effort: M
- Depends on: QA-053
- Epic: 06. visual regression coverage
- Why now: visual tests can become flaky without stable assets.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that visual tests can become flaky without stable assets.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_visual_regression

### QA-055. Implement the foundation for visual regression coverage

- Priority: P2
- Effort: L
- Depends on: QA-054
- Epic: 06. visual regression coverage
- Why now: visual tests can become flaky without stable assets.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-056. Implement the core behavior for visual regression coverage

- Priority: P1
- Effort: L
- Depends on: QA-055
- Epic: 06. visual regression coverage
- Why now: visual tests can become flaky without stable assets.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: UI refactoring does not silently shift the learning interface. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_visual_regression

### QA-057. Add edge states and failure handling for visual regression coverage

- Priority: P2
- Effort: M
- Depends on: QA-056
- Epic: 06. visual regression coverage
- Why now: visual tests can become flaky without stable assets.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to home, welcome, word cards, summary modal, and mobile layouts.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-058. Verify visual regression coverage with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: QA-057
- Epic: 06. visual regression coverage
- Why now: visual tests can become flaky without stable assets.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-059. Document rollout, cost, and operations for visual regression coverage

- Priority: P2
- Effort: S
- Depends on: QA-058
- Epic: 06. visual regression coverage
- Why now: visual tests can become flaky without stable assets.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when visual regression coverage uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-060. Measure and decide the future of visual regression coverage

- Priority: P2
- Effort: S
- Depends on: QA-059
- Epic: 06. visual regression coverage
- Why now: visual tests can become flaky without stable assets.
- Scope: Compare the observed result with the target from the outcome task: key breakpoints have baseline screenshots. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_visual_regression

## Epic 07: mobile test matrix

### QA-061. Audit mobile test matrix in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. mobile test matrix
- Why now: device access is limited on a free budget.
- Scope: Trace Android, iOS, browsers, microphone permission, and native audio. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-062. Define the outcome and measurement for mobile test matrix

- Priority: P2
- Effort: S
- Depends on: QA-061
- Epic: 07. mobile test matrix
- Why now: device access is limited on a free budget.
- Scope: Write the intended result in plain language so that mobile-specific regressions are found before release. Choose one observable measure based on this target: a documented matrix names manual and automated coverage.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-063. Design the data and state contract for mobile test matrix

- Priority: P2
- Effort: M
- Depends on: QA-062
- Epic: 07. mobile test matrix
- Why now: device access is limited on a free budget.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in Android, iOS, browsers, microphone permission, and native audio. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-064. Prototype mobile test matrix behind `ff_mobile_test_matrix`

- Priority: P2
- Effort: M
- Depends on: QA-063
- Epic: 07. mobile test matrix
- Why now: device access is limited on a free budget.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that device access is limited on a free budget.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_mobile_test_matrix

### QA-065. Implement the foundation for mobile test matrix

- Priority: P2
- Effort: L
- Depends on: QA-064
- Epic: 07. mobile test matrix
- Why now: device access is limited on a free budget.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-066. Implement the core behavior for mobile test matrix

- Priority: P2
- Effort: L
- Depends on: QA-065
- Epic: 07. mobile test matrix
- Why now: device access is limited on a free budget.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: mobile-specific regressions are found before release. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: ff_mobile_test_matrix

### QA-067. Add edge states and failure handling for mobile test matrix

- Priority: P2
- Effort: M
- Depends on: QA-066
- Epic: 07. mobile test matrix
- Why now: device access is limited on a free budget.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to Android, iOS, browsers, microphone permission, and native audio.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-068. Verify mobile test matrix with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: QA-067
- Epic: 07. mobile test matrix
- Why now: device access is limited on a free budget.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-069. Document rollout, cost, and operations for mobile test matrix

- Priority: P2
- Effort: S
- Depends on: QA-068
- Epic: 07. mobile test matrix
- Why now: device access is limited on a free budget.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when mobile test matrix uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-070. Measure and decide the future of mobile test matrix

- Priority: P2
- Effort: S
- Depends on: QA-069
- Epic: 07. mobile test matrix
- Why now: device access is limited on a free budget.
- Scope: Compare the observed result with the target from the outcome task: a documented matrix names manual and automated coverage. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_mobile_test_matrix

## Epic 08: accessibility test automation

### QA-071. Audit accessibility test automation in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. accessibility test automation
- Why now: automated tools cannot prove a good screen reader experience.
- Scope: Trace keyboard flow, semantics, contrast, and screen reader labels. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-072. Define the outcome and measurement for accessibility test automation

- Priority: P2
- Effort: S
- Depends on: QA-071
- Epic: 08. accessibility test automation
- Why now: automated tools cannot prove a good screen reader experience.
- Scope: Write the intended result in plain language so that accessibility regressions fail in CI. Choose one observable measure based on this target: automated checks cover core screens and manual checks cover the rest.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-073. Design the data and state contract for accessibility test automation

- Priority: P2
- Effort: M
- Depends on: QA-072
- Epic: 08. accessibility test automation
- Why now: automated tools cannot prove a good screen reader experience.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in keyboard flow, semantics, contrast, and screen reader labels. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-074. Prototype accessibility test automation behind `ff_accessibility_test_automation`

- Priority: P2
- Effort: M
- Depends on: QA-073
- Epic: 08. accessibility test automation
- Why now: automated tools cannot prove a good screen reader experience.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that automated tools cannot prove a good screen reader experience.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_accessibility_test_automation

### QA-075. Implement the foundation for accessibility test automation

- Priority: P2
- Effort: L
- Depends on: QA-074
- Epic: 08. accessibility test automation
- Why now: automated tools cannot prove a good screen reader experience.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-076. Implement the core behavior for accessibility test automation

- Priority: P2
- Effort: L
- Depends on: QA-075
- Epic: 08. accessibility test automation
- Why now: automated tools cannot prove a good screen reader experience.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: accessibility regressions fail in CI. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_accessibility_test_automation

### QA-077. Add edge states and failure handling for accessibility test automation

- Priority: P2
- Effort: M
- Depends on: QA-076
- Epic: 08. accessibility test automation
- Why now: automated tools cannot prove a good screen reader experience.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to keyboard flow, semantics, contrast, and screen reader labels.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-078. Verify accessibility test automation with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: QA-077
- Epic: 08. accessibility test automation
- Why now: automated tools cannot prove a good screen reader experience.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-079. Document rollout, cost, and operations for accessibility test automation

- Priority: P2
- Effort: S
- Depends on: QA-078
- Epic: 08. accessibility test automation
- Why now: automated tools cannot prove a good screen reader experience.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when accessibility test automation uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-080. Measure and decide the future of accessibility test automation

- Priority: P2
- Effort: S
- Depends on: QA-079
- Epic: 08. accessibility test automation
- Why now: automated tools cannot prove a good screen reader experience.
- Scope: Compare the observed result with the target from the outcome task: automated checks cover core screens and manual checks cover the rest. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_accessibility_test_automation

## Epic 09: content validation tests

### QA-081. Audit content validation tests in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. content validation tests
- Why now: the first run may expose many pre-existing defects.
- Scope: Trace word schema, media presence, tone arrays, classifiers, and category names. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-082. Define the outcome and measurement for content validation tests

- Priority: P2
- Effort: S
- Depends on: QA-081
- Epic: 09. content validation tests
- Why now: the first run may expose many pre-existing defects.
- Scope: Write the intended result in plain language so that bad content fails before deployment. Choose one observable measure based on this target: CI validates all content and asset references.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-083. Design the data and state contract for content validation tests

- Priority: P2
- Effort: M
- Depends on: QA-082
- Epic: 09. content validation tests
- Why now: the first run may expose many pre-existing defects.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in word schema, media presence, tone arrays, classifiers, and category names. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-084. Prototype content validation tests behind `ff_content_validation_tests`

- Priority: P2
- Effort: M
- Depends on: QA-083
- Epic: 09. content validation tests
- Why now: the first run may expose many pre-existing defects.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the first run may expose many pre-existing defects.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_content_validation_tests

### QA-085. Implement the foundation for content validation tests

- Priority: P2
- Effort: L
- Depends on: QA-084
- Epic: 09. content validation tests
- Why now: the first run may expose many pre-existing defects.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-086. Implement the core behavior for content validation tests

- Priority: P2
- Effort: L
- Depends on: QA-085
- Epic: 09. content validation tests
- Why now: the first run may expose many pre-existing defects.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: bad content fails before deployment. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_content_validation_tests

### QA-087. Add edge states and failure handling for content validation tests

- Priority: P2
- Effort: M
- Depends on: QA-086
- Epic: 09. content validation tests
- Why now: the first run may expose many pre-existing defects.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to word schema, media presence, tone arrays, classifiers, and category names.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-088. Verify content validation tests with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: QA-087
- Epic: 09. content validation tests
- Why now: the first run may expose many pre-existing defects.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-089. Document rollout, cost, and operations for content validation tests

- Priority: P2
- Effort: S
- Depends on: QA-088
- Epic: 09. content validation tests
- Why now: the first run may expose many pre-existing defects.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when content validation tests uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-090. Measure and decide the future of content validation tests

- Priority: P2
- Effort: S
- Depends on: QA-089
- Epic: 09. content validation tests
- Why now: the first run may expose many pre-existing defects.
- Scope: Compare the observed result with the target from the outcome task: CI validates all content and asset references. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_content_validation_tests

## Epic 10: CI quality gates

### QA-091. Audit CI quality gates in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. CI quality gates
- Why now: GitHub Actions minutes and mobile build time need budgeting.
- Scope: Trace pull requests, static checks, tests, builds, and deploy previews. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-092. Define the outcome and measurement for CI quality gates

- Priority: P2
- Effort: S
- Depends on: QA-091
- Epic: 10. CI quality gates
- Why now: GitHub Actions minutes and mobile build time need budgeting.
- Scope: Write the intended result in plain language so that the main branch stays releasable. Choose one observable measure based on this target: CI runs the same commands a maintainer can run locally.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-093. Design the data and state contract for CI quality gates

- Priority: P2
- Effort: M
- Depends on: QA-092
- Epic: 10. CI quality gates
- Why now: GitHub Actions minutes and mobile build time need budgeting.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in pull requests, static checks, tests, builds, and deploy previews. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-094. Prototype CI quality gates behind `ff_ci_quality_gates`

- Priority: P2
- Effort: M
- Depends on: QA-093
- Epic: 10. CI quality gates
- Why now: GitHub Actions minutes and mobile build time need budgeting.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that GitHub Actions minutes and mobile build time need budgeting.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_ci_quality_gates

### QA-095. Implement the foundation for CI quality gates

- Priority: P2
- Effort: L
- Depends on: QA-094
- Epic: 10. CI quality gates
- Why now: GitHub Actions minutes and mobile build time need budgeting.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-096. Implement the core behavior for CI quality gates

- Priority: P2
- Effort: L
- Depends on: QA-095
- Epic: 10. CI quality gates
- Why now: GitHub Actions minutes and mobile build time need budgeting.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the main branch stays releasable. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_ci_quality_gates

### QA-097. Add edge states and failure handling for CI quality gates

- Priority: P2
- Effort: M
- Depends on: QA-096
- Epic: 10. CI quality gates
- Why now: GitHub Actions minutes and mobile build time need budgeting.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to pull requests, static checks, tests, builds, and deploy previews.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-098. Verify CI quality gates with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: QA-097
- Epic: 10. CI quality gates
- Why now: GitHub Actions minutes and mobile build time need budgeting.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-099. Document rollout, cost, and operations for CI quality gates

- Priority: P2
- Effort: S
- Depends on: QA-098
- Epic: 10. CI quality gates
- Why now: GitHub Actions minutes and mobile build time need budgeting.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when CI quality gates uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### QA-100. Measure and decide the future of CI quality gates

- Priority: P2
- Effort: S
- Depends on: QA-099
- Epic: 10. CI quality gates
- Why now: GitHub Actions minutes and mobile build time need budgeting.
- Scope: Compare the observed result with the target from the outcome task: CI runs the same commands a maintainer can run locally. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_ci_quality_gates

## Conflicts and feature-flag strategies

### Conflict 1: End-to-end tests versus unit tests first

| Option | Pros | Cons |
|---|---|---|
| Start with end-to-end tests | They prove real user behavior; a small number covers the whole proof of concept; no refactoring is required | They are slower and can be flaky; failures are harder to localize |
| Start with unit tests | They are fast and precise; they support refactoring; failures point at logic | They cannot prove that the current monolith wires behavior correctly |

Feature-flag or coexistence plan: Use both behind one `npm run verify` command, with smoke end-to-end tests first and unit extraction after.

### Conflict 2: Real devices versus browser emulation

| Option | Pros | Cons |
|---|---|---|
| Use real devices | Microphone, audio, safe areas, and performance are realistic | Device labs cost money or require owned hardware; automation is slower |
| Use browser emulation | Tests are free, fast, and easy to run in CI | Native audio, microphone prompts, and mobile browser differences can be missed |

Feature-flag or coexistence plan: Use free local emulation in CI and a manual real-device release checklist. Consider a paid device cloud only after a cost-benefit analysis.

### Conflict 3: Visual snapshots versus manual visual review

| Option | Pros | Cons |
|---|---|---|
| Use visual snapshots | Small pixel changes are caught automatically; refactors become safer | Snapshots need stable fonts, images, and animations; noise can erode trust |
| Use manual visual review | No test infrastructure is required; human judgment catches design quality | Review is inconsistent and easy to skip under time pressure |

Feature-flag or coexistence plan: Use snapshots behind `ff_visual_regression` for stable pages and keep manual review for interaction quality.

## Third-party service cost policy

Use Playwright, Vitest, or another open-source local runner. Browser-device cloud services need a cost-benefit analysis unless a renewable free tier covers the matrix.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

### Cost-benefit analyses for options without a renewable free tier

| Option | Cost exposure | Benefit | Free alternative | Recommendation |
|---|---|---|---|---|
| Hosted browser or device cloud | Most services use subscriptions or usage billing after a trial. The proof of concept should not depend on them by default. | Provides broad browser and device coverage without buying hardware. | Use local Playwright browsers, Android emulator, iOS simulator, and owned devices. | Use only for a release-critical matrix when local coverage misses a high-risk device class. |
| Paid visual regression service | Hosted visual review commonly becomes paid as screenshot volume grows. | Can reduce review work and manage baselines across browsers. | Use local screenshot comparison with fixed fonts, deterministic data, and a small page set. | Defer until visual regression volume makes local review unreliable. |

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
