# Audio, speech, and tone analysis improvement plan

## Purpose

Make reference audio, recording, pitch analysis, and feedback accurate enough that learners can trust the shadowing loop.

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

## Epic 01: reference audio quality

### AU-001. Audit reference audio quality in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. reference audio quality
- Why now: batch generation may hide bad files.
- Scope: Trace 414 MP3 files, loudness, noise, clipping, pronunciation, and consistency. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-002. Define the outcome and measurement for reference audio quality

- Priority: P0
- Effort: S
- Depends on: AU-001
- Epic: 01. reference audio quality
- Why now: batch generation may hide bad files.
- Scope: Write the intended result in plain language so that learners imitate clean and consistent models. Choose one observable measure based on this target: every reference file passes loudness, silence, clipping, and duration checks.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-003. Design the data and state contract for reference audio quality

- Priority: P0
- Effort: M
- Depends on: AU-002
- Epic: 01. reference audio quality
- Why now: batch generation may hide bad files.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in 414 MP3 files, loudness, noise, clipping, pronunciation, and consistency. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-004. Prototype reference audio quality behind `ff_reference_audio_quality`

- Priority: P2
- Effort: M
- Depends on: AU-003
- Epic: 01. reference audio quality
- Why now: batch generation may hide bad files.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that batch generation may hide bad files.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_reference_audio_quality

### AU-005. Implement the foundation for reference audio quality

- Priority: P2
- Effort: L
- Depends on: AU-004
- Epic: 01. reference audio quality
- Why now: batch generation may hide bad files.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-006. Implement the core behavior for reference audio quality

- Priority: P1
- Effort: L
- Depends on: AU-005
- Epic: 01. reference audio quality
- Why now: batch generation may hide bad files.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners imitate clean and consistent models. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_reference_audio_quality

### AU-007. Add edge states and failure handling for reference audio quality

- Priority: P2
- Effort: M
- Depends on: AU-006
- Epic: 01. reference audio quality
- Why now: batch generation may hide bad files.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to 414 MP3 files, loudness, noise, clipping, pronunciation, and consistency.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-008. Verify reference audio quality with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: AU-007
- Epic: 01. reference audio quality
- Why now: batch generation may hide bad files.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-009. Document rollout, cost, and operations for reference audio quality

- Priority: P2
- Effort: S
- Depends on: AU-008
- Epic: 01. reference audio quality
- Why now: batch generation may hide bad files.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when reference audio quality uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-010. Measure and decide the future of reference audio quality

- Priority: P2
- Effort: S
- Depends on: AU-009
- Epic: 01. reference audio quality
- Why now: batch generation may hide bad files.
- Scope: Compare the observed result with the target from the outcome task: every reference file passes loudness, silence, clipping, and duration checks. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_reference_audio_quality

## Epic 02: pitch extraction accuracy

### AU-011. Audit pitch extraction accuracy in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. pitch extraction accuracy
- Why now: pitch tracking tonal speech is technically hard.
- Scope: Trace `detectPitch`, autocorrelation or related logic, silence, noise, and octave errors. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-012. Define the outcome and measurement for pitch extraction accuracy

- Priority: P0
- Effort: S
- Depends on: AU-011
- Epic: 02. pitch extraction accuracy
- Why now: pitch tracking tonal speech is technically hard.
- Scope: Write the intended result in plain language so that tone feedback reflects the learner's actual pitch. Choose one observable measure based on this target: test fixtures cover clean speech, noise, silence, and octave jumps.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-013. Design the data and state contract for pitch extraction accuracy

- Priority: P0
- Effort: M
- Depends on: AU-012
- Epic: 02. pitch extraction accuracy
- Why now: pitch tracking tonal speech is technically hard.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `detectPitch`, autocorrelation or related logic, silence, noise, and octave errors. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-014. Prototype pitch extraction accuracy behind `ff_pitch_extraction_accuracy`

- Priority: P2
- Effort: M
- Depends on: AU-013
- Epic: 02. pitch extraction accuracy
- Why now: pitch tracking tonal speech is technically hard.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that pitch tracking tonal speech is technically hard.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_pitch_extraction_accuracy

### AU-015. Implement the foundation for pitch extraction accuracy

- Priority: P2
- Effort: L
- Depends on: AU-014
- Epic: 02. pitch extraction accuracy
- Why now: pitch tracking tonal speech is technically hard.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-016. Implement the core behavior for pitch extraction accuracy

- Priority: P1
- Effort: L
- Depends on: AU-015
- Epic: 02. pitch extraction accuracy
- Why now: pitch tracking tonal speech is technically hard.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: tone feedback reflects the learner's actual pitch. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_pitch_extraction_accuracy

### AU-017. Add edge states and failure handling for pitch extraction accuracy

- Priority: P2
- Effort: M
- Depends on: AU-016
- Epic: 02. pitch extraction accuracy
- Why now: pitch tracking tonal speech is technically hard.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `detectPitch`, autocorrelation or related logic, silence, noise, and octave errors.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-018. Verify pitch extraction accuracy with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: AU-017
- Epic: 02. pitch extraction accuracy
- Why now: pitch tracking tonal speech is technically hard.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-019. Document rollout, cost, and operations for pitch extraction accuracy

- Priority: P2
- Effort: S
- Depends on: AU-018
- Epic: 02. pitch extraction accuracy
- Why now: pitch tracking tonal speech is technically hard.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when pitch extraction accuracy uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-020. Measure and decide the future of pitch extraction accuracy

- Priority: P2
- Effort: S
- Depends on: AU-019
- Epic: 02. pitch extraction accuracy
- Why now: pitch tracking tonal speech is technically hard.
- Scope: Compare the observed result with the target from the outcome task: test fixtures cover clean speech, noise, silence, and octave jumps. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_pitch_extraction_accuracy

## Epic 03: noise and microphone variability

### AU-021. Audit noise and microphone variability in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. noise and microphone variability
- Why now: aggressive filtering can remove useful speech signal.
- Scope: Trace background noise, laptop microphones, phone microphones, and gain differences. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-022. Define the outcome and measurement for noise and microphone variability

- Priority: P2
- Effort: S
- Depends on: AU-021
- Epic: 03. noise and microphone variability
- Why now: aggressive filtering can remove useful speech signal.
- Scope: Write the intended result in plain language so that feedback remains useful in normal environments. Choose one observable measure based on this target: the app detects low-quality input and explains how to improve it.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-023. Design the data and state contract for noise and microphone variability

- Priority: P1
- Effort: M
- Depends on: AU-022
- Epic: 03. noise and microphone variability
- Why now: aggressive filtering can remove useful speech signal.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in background noise, laptop microphones, phone microphones, and gain differences. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-024. Prototype noise and microphone variability behind `ff_noise_handling`

- Priority: P2
- Effort: M
- Depends on: AU-023
- Epic: 03. noise and microphone variability
- Why now: aggressive filtering can remove useful speech signal.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that aggressive filtering can remove useful speech signal.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_noise_handling

### AU-025. Implement the foundation for noise and microphone variability

- Priority: P2
- Effort: L
- Depends on: AU-024
- Epic: 03. noise and microphone variability
- Why now: aggressive filtering can remove useful speech signal.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-026. Implement the core behavior for noise and microphone variability

- Priority: P1
- Effort: L
- Depends on: AU-025
- Epic: 03. noise and microphone variability
- Why now: aggressive filtering can remove useful speech signal.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: feedback remains useful in normal environments. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_noise_handling

### AU-027. Add edge states and failure handling for noise and microphone variability

- Priority: P2
- Effort: M
- Depends on: AU-026
- Epic: 03. noise and microphone variability
- Why now: aggressive filtering can remove useful speech signal.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to background noise, laptop microphones, phone microphones, and gain differences.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-028. Verify noise and microphone variability with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: AU-027
- Epic: 03. noise and microphone variability
- Why now: aggressive filtering can remove useful speech signal.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-029. Document rollout, cost, and operations for noise and microphone variability

- Priority: P2
- Effort: S
- Depends on: AU-028
- Epic: 03. noise and microphone variability
- Why now: aggressive filtering can remove useful speech signal.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when noise and microphone variability uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-030. Measure and decide the future of noise and microphone variability

- Priority: P2
- Effort: S
- Depends on: AU-029
- Epic: 03. noise and microphone variability
- Why now: aggressive filtering can remove useful speech signal.
- Scope: Compare the observed result with the target from the outcome task: the app detects low-quality input and explains how to improve it. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_noise_handling

## Epic 04: recording format compatibility

### AU-031. Audit recording format compatibility in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. recording format compatibility
- Why now: Safari and mobile webviews often differ.
- Scope: Trace webm, mp4, MediaRecorder support, native capture, and sample rates. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-032. Define the outcome and measurement for recording format compatibility

- Priority: P2
- Effort: S
- Depends on: AU-031
- Epic: 04. recording format compatibility
- Why now: Safari and mobile webviews often differ.
- Scope: Write the intended result in plain language so that recording works across supported browsers and devices. Choose one observable measure based on this target: capability detection selects a supported format with fallback behavior.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-033. Design the data and state contract for recording format compatibility

- Priority: P1
- Effort: M
- Depends on: AU-032
- Epic: 04. recording format compatibility
- Why now: Safari and mobile webviews often differ.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in webm, mp4, MediaRecorder support, native capture, and sample rates. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-034. Prototype recording format compatibility behind `ff_recording_compatibility`

- Priority: P2
- Effort: M
- Depends on: AU-033
- Epic: 04. recording format compatibility
- Why now: Safari and mobile webviews often differ.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that Safari and mobile webviews often differ.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_recording_compatibility

### AU-035. Implement the foundation for recording format compatibility

- Priority: P2
- Effort: L
- Depends on: AU-034
- Epic: 04. recording format compatibility
- Why now: Safari and mobile webviews often differ.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-036. Implement the core behavior for recording format compatibility

- Priority: P1
- Effort: L
- Depends on: AU-035
- Epic: 04. recording format compatibility
- Why now: Safari and mobile webviews often differ.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: recording works across supported browsers and devices. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_recording_compatibility

### AU-037. Add edge states and failure handling for recording format compatibility

- Priority: P2
- Effort: M
- Depends on: AU-036
- Epic: 04. recording format compatibility
- Why now: Safari and mobile webviews often differ.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to webm, mp4, MediaRecorder support, native capture, and sample rates.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-038. Verify recording format compatibility with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: AU-037
- Epic: 04. recording format compatibility
- Why now: Safari and mobile webviews often differ.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-039. Document rollout, cost, and operations for recording format compatibility

- Priority: P2
- Effort: S
- Depends on: AU-038
- Epic: 04. recording format compatibility
- Why now: Safari and mobile webviews often differ.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when recording format compatibility uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-040. Measure and decide the future of recording format compatibility

- Priority: P2
- Effort: S
- Depends on: AU-039
- Epic: 04. recording format compatibility
- Why now: Safari and mobile webviews often differ.
- Scope: Compare the observed result with the target from the outcome task: capability detection selects a supported format with fallback behavior. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_recording_compatibility

## Epic 05: tone score explainability

### AU-041. Audit tone score explainability in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. tone score explainability
- Why now: a single score can hide timing and contour differences.
- Scope: Trace overall score, contour comparison, threshold, and generated feedback. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-042. Define the outcome and measurement for tone score explainability

- Priority: P2
- Effort: S
- Depends on: AU-041
- Epic: 05. tone score explainability
- Why now: a single score can hide timing and contour differences.
- Scope: Write the intended result in plain language so that learners understand why they received a score. Choose one observable measure based on this target: feedback references the contour region or tone feature that drove the result.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-043. Design the data and state contract for tone score explainability

- Priority: P1
- Effort: M
- Depends on: AU-042
- Epic: 05. tone score explainability
- Why now: a single score can hide timing and contour differences.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in overall score, contour comparison, threshold, and generated feedback. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-044. Prototype tone score explainability behind `ff_tone_score_explainability`

- Priority: P2
- Effort: M
- Depends on: AU-043
- Epic: 05. tone score explainability
- Why now: a single score can hide timing and contour differences.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that a single score can hide timing and contour differences.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_tone_score_explainability

### AU-045. Implement the foundation for tone score explainability

- Priority: P2
- Effort: L
- Depends on: AU-044
- Epic: 05. tone score explainability
- Why now: a single score can hide timing and contour differences.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-046. Implement the core behavior for tone score explainability

- Priority: P1
- Effort: L
- Depends on: AU-045
- Epic: 05. tone score explainability
- Why now: a single score can hide timing and contour differences.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners understand why they received a score. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_tone_score_explainability

### AU-047. Add edge states and failure handling for tone score explainability

- Priority: P2
- Effort: M
- Depends on: AU-046
- Epic: 05. tone score explainability
- Why now: a single score can hide timing and contour differences.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to overall score, contour comparison, threshold, and generated feedback.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-048. Verify tone score explainability with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: AU-047
- Epic: 05. tone score explainability
- Why now: a single score can hide timing and contour differences.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-049. Document rollout, cost, and operations for tone score explainability

- Priority: P2
- Effort: S
- Depends on: AU-048
- Epic: 05. tone score explainability
- Why now: a single score can hide timing and contour differences.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when tone score explainability uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-050. Measure and decide the future of tone score explainability

- Priority: P2
- Effort: S
- Depends on: AU-049
- Epic: 05. tone score explainability
- Why now: a single score can hide timing and contour differences.
- Scope: Compare the observed result with the target from the outcome task: feedback references the contour region or tone feature that drove the result. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_tone_score_explainability

## Epic 06: TTS voice selection and fallback

### AU-051. Audit TTS voice selection and fallback in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. TTS voice selection and fallback
- Why now: browser voice availability cannot be controlled.
- Scope: Trace `speechSynthesis`, zh-CN voices, rate, pitch, and platform variation. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-052. Define the outcome and measurement for TTS voice selection and fallback

- Priority: P2
- Effort: S
- Depends on: AU-051
- Epic: 06. TTS voice selection and fallback
- Why now: browser voice availability cannot be controlled.
- Scope: Write the intended result in plain language so that spoken support is consistent when reference audio is unavailable. Choose one observable measure based on this target: voice selection has deterministic fallback behavior.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-053. Design the data and state contract for TTS voice selection and fallback

- Priority: P1
- Effort: M
- Depends on: AU-052
- Epic: 06. TTS voice selection and fallback
- Why now: browser voice availability cannot be controlled.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `speechSynthesis`, zh-CN voices, rate, pitch, and platform variation. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-054. Evaluate the smallest real option for TTS voice selection and fallback

- Priority: P2
- Effort: M
- Depends on: AU-053
- Epic: 06. TTS voice selection and fallback
- Why now: browser voice availability cannot be controlled.
- Scope: Compare the smallest real implementation or policy choice for `speechSynthesis`, zh-CN voices, rate, pitch, and platform variation. The evaluation must expose the risk that browser voice availability cannot be controlled and must use the repository cost rule.
- Acceptance criteria: The evaluation records the evidence, the rejected option, the cost decision, and whether the default is keep, revise, or discard.
- Cost and service notes: Prefer local evaluation. Use a third-party service only if it has a renewable free tier and the evaluation states the quota assumption.
- Flag or conflict notes: ff_tts_voice_selection

### AU-055. Write the decision foundation for TTS voice selection and fallback

- Priority: P2
- Effort: L
- Depends on: AU-054
- Epic: 06. TTS voice selection and fallback
- Why now: browser voice availability cannot be controlled.
- Scope: Capture the options, constraints, privacy impact, cost screen, evidence gaps, rollback rule, and the smallest safe default. Keep the decision narrow enough to reverse when evidence changes.
- Acceptance criteria: The decision foundation is reviewable on its own and separates current behavior from the proposed default.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-056. Adopt the default decision for TTS voice selection and fallback

- Priority: P1
- Effort: L
- Depends on: AU-055
- Epic: 06. TTS voice selection and fallback
- Why now: browser voice availability cannot be controlled.
- Scope: Write the default decision that moves the area toward this outcome: spoken support is consistent when reference audio is unavailable. Name the evidence that would reopen the decision.
- Acceptance criteria: The decision states what is adopted, what is rejected, what remains local-first, and what cost-benefit analysis is required before any paid dependency.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_tts_voice_selection

### AU-057. Document edge cases and failure handling for TTS voice selection and fallback

- Priority: P2
- Effort: M
- Depends on: AU-056
- Epic: 06. TTS voice selection and fallback
- Why now: browser voice availability cannot be controlled.
- Scope: Cover missing evidence, quota exhaustion, service removal, pricing changes, privacy objections, and migration failure where they apply to `speechSynthesis`, zh-CN voices, rate, pitch, and platform variation.
- Acceptance criteria: Each relevant edge case has a fallback, an owner, and a clear rule for returning to the free local path.
- Cost and service notes: Use local analysis. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-058. Validate the decision for TTS voice selection and fallback against real constraints

- Priority: P1
- Effort: M
- Depends on: AU-057
- Epic: 06. TTS voice selection and fallback
- Why now: browser voice availability cannot be controlled.
- Scope: Check the decision against the current app, the cost rule, privacy expectations, and the highest-risk failure path. Use a small real artifact or service-console check when one is available.
- Acceptance criteria: The validation names the evidence inspected, passes only when the decision still satisfies the constraints, and records any open assumption.
- Cost and service notes: Use open-source local test tooling and free service consoles. Paid validation infrastructure requires a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-059. Document rollout, cost, and operations for TTS voice selection and fallback

- Priority: P2
- Effort: S
- Depends on: AU-058
- Epic: 06. TTS voice selection and fallback
- Why now: browser voice availability cannot be controlled.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when TTS voice selection and fallback uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-060. Measure and decide the future of TTS voice selection and fallback

- Priority: P2
- Effort: S
- Depends on: AU-059
- Epic: 06. TTS voice selection and fallback
- Why now: browser voice availability cannot be controlled.
- Scope: Compare the observed result with the target from the outcome task: voice selection has deterministic fallback behavior. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_tts_voice_selection

## Epic 07: audio synchronization

### AU-061. Audit audio synchronization in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. audio synchronization
- Why now: current callbacks and timers may overlap.
- Scope: Trace reference playback, user playback, comparison, auto-continue, and cancellation. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-062. Define the outcome and measurement for audio synchronization

- Priority: P2
- Effort: S
- Depends on: AU-061
- Epic: 07. audio synchronization
- Why now: current callbacks and timers may overlap.
- Scope: Write the intended result in plain language so that audio events do not overlap or race. Choose one observable measure based on this target: a sequence diagram and tests cover playback ordering.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-063. Design the data and state contract for audio synchronization

- Priority: P2
- Effort: M
- Depends on: AU-062
- Epic: 07. audio synchronization
- Why now: current callbacks and timers may overlap.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in reference playback, user playback, comparison, auto-continue, and cancellation. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-064. Prototype audio synchronization behind `ff_audio_synchronization`

- Priority: P2
- Effort: M
- Depends on: AU-063
- Epic: 07. audio synchronization
- Why now: current callbacks and timers may overlap.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that current callbacks and timers may overlap.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_audio_synchronization

### AU-065. Implement the foundation for audio synchronization

- Priority: P2
- Effort: L
- Depends on: AU-064
- Epic: 07. audio synchronization
- Why now: current callbacks and timers may overlap.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-066. Implement the core behavior for audio synchronization

- Priority: P2
- Effort: L
- Depends on: AU-065
- Epic: 07. audio synchronization
- Why now: current callbacks and timers may overlap.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: audio events do not overlap or race. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_audio_synchronization

### AU-067. Add edge states and failure handling for audio synchronization

- Priority: P2
- Effort: M
- Depends on: AU-066
- Epic: 07. audio synchronization
- Why now: current callbacks and timers may overlap.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to reference playback, user playback, comparison, auto-continue, and cancellation.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-068. Verify audio synchronization with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: AU-067
- Epic: 07. audio synchronization
- Why now: current callbacks and timers may overlap.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-069. Document rollout, cost, and operations for audio synchronization

- Priority: P2
- Effort: S
- Depends on: AU-068
- Epic: 07. audio synchronization
- Why now: current callbacks and timers may overlap.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when audio synchronization uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-070. Measure and decide the future of audio synchronization

- Priority: P2
- Effort: S
- Depends on: AU-069
- Epic: 07. audio synchronization
- Why now: current callbacks and timers may overlap.
- Scope: Compare the observed result with the target from the outcome task: a sequence diagram and tests cover playback ordering. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_audio_synchronization

## Epic 08: tone contour visualization

### AU-071. Audit tone contour visualization in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. tone contour visualization
- Why now: visual charts need a nonvisual equivalent.
- Scope: Trace canvas drawing, reference contour, user contour, and accessible alternatives. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-072. Define the outcome and measurement for tone contour visualization

- Priority: P2
- Effort: S
- Depends on: AU-071
- Epic: 08. tone contour visualization
- Why now: visual charts need a nonvisual equivalent.
- Scope: Write the intended result in plain language so that learners can see the difference they are trying to correct. Choose one observable measure based on this target: the chart labels tones, time, and mismatch regions.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-073. Design the data and state contract for tone contour visualization

- Priority: P2
- Effort: M
- Depends on: AU-072
- Epic: 08. tone contour visualization
- Why now: visual charts need a nonvisual equivalent.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in canvas drawing, reference contour, user contour, and accessible alternatives. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-074. Prototype tone contour visualization behind `ff_contour_visualization`

- Priority: P2
- Effort: M
- Depends on: AU-073
- Epic: 08. tone contour visualization
- Why now: visual charts need a nonvisual equivalent.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that visual charts need a nonvisual equivalent.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_contour_visualization

### AU-075. Implement the foundation for tone contour visualization

- Priority: P2
- Effort: L
- Depends on: AU-074
- Epic: 08. tone contour visualization
- Why now: visual charts need a nonvisual equivalent.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-076. Implement the core behavior for tone contour visualization

- Priority: P2
- Effort: L
- Depends on: AU-075
- Epic: 08. tone contour visualization
- Why now: visual charts need a nonvisual equivalent.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learners can see the difference they are trying to correct. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_contour_visualization

### AU-077. Add edge states and failure handling for tone contour visualization

- Priority: P2
- Effort: M
- Depends on: AU-076
- Epic: 08. tone contour visualization
- Why now: visual charts need a nonvisual equivalent.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to canvas drawing, reference contour, user contour, and accessible alternatives.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-078. Verify tone contour visualization with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: AU-077
- Epic: 08. tone contour visualization
- Why now: visual charts need a nonvisual equivalent.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-079. Document rollout, cost, and operations for tone contour visualization

- Priority: P2
- Effort: S
- Depends on: AU-078
- Epic: 08. tone contour visualization
- Why now: visual charts need a nonvisual equivalent.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when tone contour visualization uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-080. Measure and decide the future of tone contour visualization

- Priority: P2
- Effort: S
- Depends on: AU-079
- Epic: 08. tone contour visualization
- Why now: visual charts need a nonvisual equivalent.
- Scope: Compare the observed result with the target from the outcome task: the chart labels tones, time, and mismatch regions. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_contour_visualization

## Epic 09: speech benchmark corpus

### AU-081. Audit speech benchmark corpus in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. speech benchmark corpus
- Why now: collecting or licensing speech data requires consent and provenance.
- Scope: Trace recorded samples, expected tones, noise variants, and scoring fixtures. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-082. Define the outcome and measurement for speech benchmark corpus

- Priority: P2
- Effort: S
- Depends on: AU-081
- Epic: 09. speech benchmark corpus
- Why now: collecting or licensing speech data requires consent and provenance.
- Scope: Write the intended result in plain language so that algorithm changes can be compared objectively. Choose one observable measure based on this target: a versioned fixture set covers the five tones and common sequences.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-083. Design the data and state contract for speech benchmark corpus

- Priority: P2
- Effort: M
- Depends on: AU-082
- Epic: 09. speech benchmark corpus
- Why now: collecting or licensing speech data requires consent and provenance.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in recorded samples, expected tones, noise variants, and scoring fixtures. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-084. Prototype speech benchmark corpus behind `ff_benchmark_corpus`

- Priority: P2
- Effort: M
- Depends on: AU-083
- Epic: 09. speech benchmark corpus
- Why now: collecting or licensing speech data requires consent and provenance.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that collecting or licensing speech data requires consent and provenance.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_benchmark_corpus

### AU-085. Implement the foundation for speech benchmark corpus

- Priority: P2
- Effort: L
- Depends on: AU-084
- Epic: 09. speech benchmark corpus
- Why now: collecting or licensing speech data requires consent and provenance.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-086. Implement the core behavior for speech benchmark corpus

- Priority: P2
- Effort: L
- Depends on: AU-085
- Epic: 09. speech benchmark corpus
- Why now: collecting or licensing speech data requires consent and provenance.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: algorithm changes can be compared objectively. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_benchmark_corpus

### AU-087. Add edge states and failure handling for speech benchmark corpus

- Priority: P2
- Effort: M
- Depends on: AU-086
- Epic: 09. speech benchmark corpus
- Why now: collecting or licensing speech data requires consent and provenance.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to recorded samples, expected tones, noise variants, and scoring fixtures.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-088. Verify speech benchmark corpus with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: AU-087
- Epic: 09. speech benchmark corpus
- Why now: collecting or licensing speech data requires consent and provenance.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-089. Document rollout, cost, and operations for speech benchmark corpus

- Priority: P2
- Effort: S
- Depends on: AU-088
- Epic: 09. speech benchmark corpus
- Why now: collecting or licensing speech data requires consent and provenance.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when speech benchmark corpus uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-090. Measure and decide the future of speech benchmark corpus

- Priority: P2
- Effort: S
- Depends on: AU-089
- Epic: 09. speech benchmark corpus
- Why now: collecting or licensing speech data requires consent and provenance.
- Scope: Compare the observed result with the target from the outcome task: a versioned fixture set covers the five tones and common sequences. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_benchmark_corpus

## Epic 10: analysis execution choice

### AU-091. Audit analysis execution choice in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. analysis execution choice
- Why now: cloud analysis conflicts with privacy and cost constraints.
- Scope: Trace on-device analysis, native processing, and optional cloud analysis. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-092. Define the outcome and measurement for analysis execution choice

- Priority: P2
- Effort: S
- Depends on: AU-091
- Epic: 10. analysis execution choice
- Why now: cloud analysis conflicts with privacy and cost constraints.
- Scope: Write the intended result in plain language so that the project chooses where analysis runs using evidence. Choose one observable measure based on this target: accuracy, latency, privacy, cost, and offline behavior are compared.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-093. Design the data and state contract for analysis execution choice

- Priority: P2
- Effort: M
- Depends on: AU-092
- Epic: 10. analysis execution choice
- Why now: cloud analysis conflicts with privacy and cost constraints.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in on-device analysis, native processing, and optional cloud analysis. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-094. Evaluate the smallest real option for analysis execution choice

- Priority: P2
- Effort: M
- Depends on: AU-093
- Epic: 10. analysis execution choice
- Why now: cloud analysis conflicts with privacy and cost constraints.
- Scope: Compare the smallest real implementation or policy choice for on-device analysis, native processing, and optional cloud analysis. The evaluation must expose the risk that cloud analysis conflicts with privacy and cost constraints and must use the repository cost rule.
- Acceptance criteria: The evaluation records the evidence, the rejected option, the cost decision, and whether the default is keep, revise, or discard.
- Cost and service notes: Prefer local evaluation. Use a third-party service only if it has a renewable free tier and the evaluation states the quota assumption.
- Flag or conflict notes: ff_analysis_execution_choice

### AU-095. Write the decision foundation for analysis execution choice

- Priority: P2
- Effort: L
- Depends on: AU-094
- Epic: 10. analysis execution choice
- Why now: cloud analysis conflicts with privacy and cost constraints.
- Scope: Capture the options, constraints, privacy impact, cost screen, evidence gaps, rollback rule, and the smallest safe default. Keep the decision narrow enough to reverse when evidence changes.
- Acceptance criteria: The decision foundation is reviewable on its own and separates current behavior from the proposed default.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-096. Adopt the default decision for analysis execution choice

- Priority: P2
- Effort: L
- Depends on: AU-095
- Epic: 10. analysis execution choice
- Why now: cloud analysis conflicts with privacy and cost constraints.
- Scope: Write the default decision that moves the area toward this outcome: the project chooses where analysis runs using evidence. Name the evidence that would reopen the decision.
- Acceptance criteria: The decision states what is adopted, what is rejected, what remains local-first, and what cost-benefit analysis is required before any paid dependency.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: ff_analysis_execution_choice

### AU-097. Document edge cases and failure handling for analysis execution choice

- Priority: P2
- Effort: M
- Depends on: AU-096
- Epic: 10. analysis execution choice
- Why now: cloud analysis conflicts with privacy and cost constraints.
- Scope: Cover missing evidence, quota exhaustion, service removal, pricing changes, privacy objections, and migration failure where they apply to on-device analysis, native processing, and optional cloud analysis.
- Acceptance criteria: Each relevant edge case has a fallback, an owner, and a clear rule for returning to the free local path.
- Cost and service notes: Use local analysis. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-098. Validate the decision for analysis execution choice against real constraints

- Priority: P2
- Effort: M
- Depends on: AU-097
- Epic: 10. analysis execution choice
- Why now: cloud analysis conflicts with privacy and cost constraints.
- Scope: Check the decision against the current app, the cost rule, privacy expectations, and the highest-risk failure path. Use a small real artifact or service-console check when one is available.
- Acceptance criteria: The validation names the evidence inspected, passes only when the decision still satisfies the constraints, and records any open assumption.
- Cost and service notes: Use open-source local test tooling and free service consoles. Paid validation infrastructure requires a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-099. Document rollout, cost, and operations for analysis execution choice

- Priority: P2
- Effort: S
- Depends on: AU-098
- Epic: 10. analysis execution choice
- Why now: cloud analysis conflicts with privacy and cost constraints.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when analysis execution choice uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AU-100. Measure and decide the future of analysis execution choice

- Priority: P2
- Effort: S
- Depends on: AU-099
- Epic: 10. analysis execution choice
- Why now: cloud analysis conflicts with privacy and cost constraints.
- Scope: Compare the observed result with the target from the outcome task: accuracy, latency, privacy, cost, and offline behavior are compared. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_analysis_execution_choice

## Conflicts and feature-flag strategies

### Conflict 1: On-device analysis versus cloud speech analysis

| Option | Pros | Cons |
|---|---|---|
| Analyze on device | Audio stays private; offline use continues; no recurring speech-service bill exists | Implementation is hard; accuracy may be lower; older devices may struggle |
| Analyze in the cloud | Managed models may improve recognition or scoring; less DSP code is needed | A renewable free tier may not cover audio volume; uploads require consent; offline behavior degrades |

Feature-flag or coexistence plan: Keep on-device analysis as default. Use `ff_cloud_speech` only after a cost-benefit analysis proves learner benefit.

### Conflict 2: Exact pitch matching versus tolerant contour feedback

| Option | Pros | Cons |
|---|---|---|
| Require exact pitch matching | The target is clear and measurement is simple | Learner pitch ranges differ; exact matching can penalize correct tones |
| Use tolerant contour feedback | Tone shape and relative movement matter more than absolute pitch | Tolerance is harder to explain and calibrate |

Feature-flag or coexistence plan: Use `ff_pitch_tolerance` and evaluate against a labeled benchmark corpus.

### Conflict 3: Real-time feedback versus post-recording feedback

| Option | Pros | Cons |
|---|---|---|
| Use real-time feedback | Learners can correct themselves immediately | Noise, latency, and visual complexity increase; implementation is harder |
| Use post-recording feedback | Analysis is simpler and more stable; feedback can be clearer | Learners receive correction later and may repeat errors during recording |

Feature-flag or coexistence plan: Use post-recording feedback first. Prototype real-time feedback behind `ff_realtime_tone` and compare learning value.

## Third-party service cost policy

Start with Web Audio and open-source analysis. Cloud speech services need renewable free-tier verification or a cost-benefit analysis.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

### Cost-benefit analyses for options without a renewable free tier

| Option | Cost exposure | Benefit | Free alternative | Recommendation |
|---|---|---|---|---|
| Cloud speech recognition or pronunciation assessment | Audio-minute pricing can grow with practice volume, and free tiers may be limited or temporary. | May improve recognition or scoring quality without maintaining signal-processing code. | Use local pitch analysis, explicit quality warnings, and human review of benchmark recordings. | Do not integrate until a benchmark proves enough learner benefit to justify privacy review and recurring cost. |
| Commercial benchmark speech corpus | Licensing can require payment or restrictive terms rather than a renewable free tier. | Provides labeled examples that improve algorithm evaluation. | Collect a small consent-based local fixture set and use openly licensed data where license terms are clear. | Defer unless the benchmark cannot represent the tones and noise conditions needed for evaluation. |

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
