# Performance and asset optimization improvement plan

## Purpose

Reduce startup cost, memory use, media weight, and interaction latency so practice stays responsive on mobile devices.

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

## Epic 01: asset inventory and compression

### PF-001. Audit asset inventory and compression in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. asset inventory and compression
- Why now: lossy compression can reduce learning-critical audio or image quality.
- Scope: Trace 414 images, 414 audio files, icons, video, and generated native assets. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-002. Define the outcome and measurement for asset inventory and compression

- Priority: P0
- Effort: S
- Depends on: PF-001
- Epic: 01. asset inventory and compression
- Why now: lossy compression can reduce learning-critical audio or image quality.
- Scope: Write the intended result in plain language so that the project knows what media costs and what can shrink. Choose one observable measure based on this target: every asset type has size, format, owner, and optimization target.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-003. Design the data and state contract for asset inventory and compression

- Priority: P0
- Effort: M
- Depends on: PF-002
- Epic: 01. asset inventory and compression
- Why now: lossy compression can reduce learning-critical audio or image quality.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in 414 images, 414 audio files, icons, video, and generated native assets. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-004. Prototype asset inventory and compression behind `ff_asset_inventory`

- Priority: P2
- Effort: M
- Depends on: PF-003
- Epic: 01. asset inventory and compression
- Why now: lossy compression can reduce learning-critical audio or image quality.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that lossy compression can reduce learning-critical audio or image quality.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_asset_inventory

### PF-005. Implement the foundation for asset inventory and compression

- Priority: P2
- Effort: L
- Depends on: PF-004
- Epic: 01. asset inventory and compression
- Why now: lossy compression can reduce learning-critical audio or image quality.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-006. Implement the core behavior for asset inventory and compression

- Priority: P1
- Effort: L
- Depends on: PF-005
- Epic: 01. asset inventory and compression
- Why now: lossy compression can reduce learning-critical audio or image quality.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the project knows what media costs and what can shrink. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_asset_inventory

### PF-007. Add edge states and failure handling for asset inventory and compression

- Priority: P2
- Effort: M
- Depends on: PF-006
- Epic: 01. asset inventory and compression
- Why now: lossy compression can reduce learning-critical audio or image quality.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to 414 images, 414 audio files, icons, video, and generated native assets.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-008. Verify asset inventory and compression with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: PF-007
- Epic: 01. asset inventory and compression
- Why now: lossy compression can reduce learning-critical audio or image quality.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-009. Document rollout, cost, and operations for asset inventory and compression

- Priority: P2
- Effort: S
- Depends on: PF-008
- Epic: 01. asset inventory and compression
- Why now: lossy compression can reduce learning-critical audio or image quality.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when asset inventory and compression uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-010. Measure and decide the future of asset inventory and compression

- Priority: P2
- Effort: S
- Depends on: PF-009
- Epic: 01. asset inventory and compression
- Why now: lossy compression can reduce learning-critical audio or image quality.
- Scope: Compare the observed result with the target from the outcome task: every asset type has size, format, owner, and optimization target. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_asset_inventory

## Epic 02: image loading strategy

### PF-011. Audit image loading strategy in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. image loading strategy
- Why now: lazy loading can cause visible pop-in during sessions.
- Scope: Trace word-card images in grid and session views. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-012. Define the outcome and measurement for image loading strategy

- Priority: P0
- Effort: S
- Depends on: PF-011
- Epic: 02. image loading strategy
- Why now: lazy loading can cause visible pop-in during sessions.
- Scope: Write the intended result in plain language so that images appear quickly without blocking interaction. Choose one observable measure based on this target: images have dimensions, lazy loading, and responsive variants where useful.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-013. Design the data and state contract for image loading strategy

- Priority: P0
- Effort: M
- Depends on: PF-012
- Epic: 02. image loading strategy
- Why now: lazy loading can cause visible pop-in during sessions.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in word-card images in grid and session views. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-014. Prototype image loading strategy behind `ff_image_strategy`

- Priority: P2
- Effort: M
- Depends on: PF-013
- Epic: 02. image loading strategy
- Why now: lazy loading can cause visible pop-in during sessions.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that lazy loading can cause visible pop-in during sessions.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_image_strategy

### PF-015. Implement the foundation for image loading strategy

- Priority: P2
- Effort: L
- Depends on: PF-014
- Epic: 02. image loading strategy
- Why now: lazy loading can cause visible pop-in during sessions.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-016. Implement the core behavior for image loading strategy

- Priority: P1
- Effort: L
- Depends on: PF-015
- Epic: 02. image loading strategy
- Why now: lazy loading can cause visible pop-in during sessions.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: images appear quickly without blocking interaction. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_image_strategy

### PF-017. Add edge states and failure handling for image loading strategy

- Priority: P2
- Effort: M
- Depends on: PF-016
- Epic: 02. image loading strategy
- Why now: lazy loading can cause visible pop-in during sessions.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to word-card images in grid and session views.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-018. Verify image loading strategy with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: PF-017
- Epic: 02. image loading strategy
- Why now: lazy loading can cause visible pop-in during sessions.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-019. Document rollout, cost, and operations for image loading strategy

- Priority: P2
- Effort: S
- Depends on: PF-018
- Epic: 02. image loading strategy
- Why now: lazy loading can cause visible pop-in during sessions.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when image loading strategy uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-020. Measure and decide the future of image loading strategy

- Priority: P2
- Effort: S
- Depends on: PF-019
- Epic: 02. image loading strategy
- Why now: lazy loading can cause visible pop-in during sessions.
- Scope: Compare the observed result with the target from the outcome task: images have dimensions, lazy loading, and responsive variants where useful. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_image_strategy

## Epic 03: audio loading strategy

### PF-021. Audit audio loading strategy in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. audio loading strategy
- Why now: offline use conflicts with small startup downloads.
- Scope: Trace preload, native assets, web audio, and reference playback. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-022. Define the outcome and measurement for audio loading strategy

- Priority: P2
- Effort: S
- Depends on: PF-021
- Epic: 03. audio loading strategy
- Why now: offline use conflicts with small startup downloads.
- Scope: Write the intended result in plain language so that audio starts quickly without downloading the whole set up front. Choose one observable measure based on this target: a policy names preload, cache, eviction, and fallback behavior.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-023. Design the data and state contract for audio loading strategy

- Priority: P1
- Effort: M
- Depends on: PF-022
- Epic: 03. audio loading strategy
- Why now: offline use conflicts with small startup downloads.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in preload, native assets, web audio, and reference playback. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-024. Prototype audio loading strategy behind `ff_audio_loading_strategy`

- Priority: P2
- Effort: M
- Depends on: PF-023
- Epic: 03. audio loading strategy
- Why now: offline use conflicts with small startup downloads.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that offline use conflicts with small startup downloads.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_audio_loading_strategy

### PF-025. Implement the foundation for audio loading strategy

- Priority: P2
- Effort: L
- Depends on: PF-024
- Epic: 03. audio loading strategy
- Why now: offline use conflicts with small startup downloads.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-026. Implement the core behavior for audio loading strategy

- Priority: P1
- Effort: L
- Depends on: PF-025
- Epic: 03. audio loading strategy
- Why now: offline use conflicts with small startup downloads.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: audio starts quickly without downloading the whole set up front. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_audio_loading_strategy

### PF-027. Add edge states and failure handling for audio loading strategy

- Priority: P2
- Effort: M
- Depends on: PF-026
- Epic: 03. audio loading strategy
- Why now: offline use conflicts with small startup downloads.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to preload, native assets, web audio, and reference playback.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-028. Verify audio loading strategy with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: PF-027
- Epic: 03. audio loading strategy
- Why now: offline use conflicts with small startup downloads.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-029. Document rollout, cost, and operations for audio loading strategy

- Priority: P2
- Effort: S
- Depends on: PF-028
- Epic: 03. audio loading strategy
- Why now: offline use conflicts with small startup downloads.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when audio loading strategy uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-030. Measure and decide the future of audio loading strategy

- Priority: P2
- Effort: S
- Depends on: PF-029
- Epic: 03. audio loading strategy
- Why now: offline use conflicts with small startup downloads.
- Scope: Compare the observed result with the target from the outcome task: a policy names preload, cache, eviction, and fallback behavior. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_audio_loading_strategy

## Epic 04: dependency weight control

### PF-031. Audit dependency weight control in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. dependency weight control
- Why now: self-hosting can improve control but adds maintenance.
- Scope: Trace CDN Vue, Font Awesome, future frameworks, and native plugins. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-032. Define the outcome and measurement for dependency weight control

- Priority: P2
- Effort: S
- Depends on: PF-031
- Epic: 04. dependency weight control
- Why now: self-hosting can improve control but adds maintenance.
- Scope: Write the intended result in plain language so that the app downloads only code it uses. Choose one observable measure based on this target: each dependency has a purpose and size budget.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-033. Design the data and state contract for dependency weight control

- Priority: P1
- Effort: M
- Depends on: PF-032
- Epic: 04. dependency weight control
- Why now: self-hosting can improve control but adds maintenance.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in CDN Vue, Font Awesome, future frameworks, and native plugins. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-034. Prototype dependency weight control behind `ff_dependency_weight`

- Priority: P2
- Effort: M
- Depends on: PF-033
- Epic: 04. dependency weight control
- Why now: self-hosting can improve control but adds maintenance.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that self-hosting can improve control but adds maintenance.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_dependency_weight

### PF-035. Implement the foundation for dependency weight control

- Priority: P2
- Effort: L
- Depends on: PF-034
- Epic: 04. dependency weight control
- Why now: self-hosting can improve control but adds maintenance.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-036. Implement the core behavior for dependency weight control

- Priority: P1
- Effort: L
- Depends on: PF-035
- Epic: 04. dependency weight control
- Why now: self-hosting can improve control but adds maintenance.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the app downloads only code it uses. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_dependency_weight

### PF-037. Add edge states and failure handling for dependency weight control

- Priority: P2
- Effort: M
- Depends on: PF-036
- Epic: 04. dependency weight control
- Why now: self-hosting can improve control but adds maintenance.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to CDN Vue, Font Awesome, future frameworks, and native plugins.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-038. Verify dependency weight control with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: PF-037
- Epic: 04. dependency weight control
- Why now: self-hosting can improve control but adds maintenance.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-039. Document rollout, cost, and operations for dependency weight control

- Priority: P2
- Effort: S
- Depends on: PF-038
- Epic: 04. dependency weight control
- Why now: self-hosting can improve control but adds maintenance.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when dependency weight control uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-040. Measure and decide the future of dependency weight control

- Priority: P2
- Effort: S
- Depends on: PF-039
- Epic: 04. dependency weight control
- Why now: self-hosting can improve control but adds maintenance.
- Scope: Compare the observed result with the target from the outcome task: each dependency has a purpose and size budget. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_dependency_weight

## Epic 05: word-grid rendering

### PF-041. Audit word-grid rendering in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. word-grid rendering
- Why now: virtualization can complicate keyboard and screen reader navigation.
- Scope: Trace `filteredWords`, large lists, card images, and search. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-042. Define the outcome and measurement for word-grid rendering

- Priority: P2
- Effort: S
- Depends on: PF-041
- Epic: 05. word-grid rendering
- Why now: virtualization can complicate keyboard and screen reader navigation.
- Scope: Write the intended result in plain language so that browsing 414 words remains smooth. Choose one observable measure based on this target: scrolling stays responsive on a low-end test device.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-043. Design the data and state contract for word-grid rendering

- Priority: P1
- Effort: M
- Depends on: PF-042
- Epic: 05. word-grid rendering
- Why now: virtualization can complicate keyboard and screen reader navigation.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in `filteredWords`, large lists, card images, and search. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-044. Prototype word-grid rendering behind `ff_grid_rendering`

- Priority: P2
- Effort: M
- Depends on: PF-043
- Epic: 05. word-grid rendering
- Why now: virtualization can complicate keyboard and screen reader navigation.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that virtualization can complicate keyboard and screen reader navigation.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_grid_rendering

### PF-045. Implement the foundation for word-grid rendering

- Priority: P2
- Effort: L
- Depends on: PF-044
- Epic: 05. word-grid rendering
- Why now: virtualization can complicate keyboard and screen reader navigation.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-046. Implement the core behavior for word-grid rendering

- Priority: P1
- Effort: L
- Depends on: PF-045
- Epic: 05. word-grid rendering
- Why now: virtualization can complicate keyboard and screen reader navigation.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: browsing 414 words remains smooth. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_grid_rendering

### PF-047. Add edge states and failure handling for word-grid rendering

- Priority: P2
- Effort: M
- Depends on: PF-046
- Epic: 05. word-grid rendering
- Why now: virtualization can complicate keyboard and screen reader navigation.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to `filteredWords`, large lists, card images, and search.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-048. Verify word-grid rendering with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: PF-047
- Epic: 05. word-grid rendering
- Why now: virtualization can complicate keyboard and screen reader navigation.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-049. Document rollout, cost, and operations for word-grid rendering

- Priority: P2
- Effort: S
- Depends on: PF-048
- Epic: 05. word-grid rendering
- Why now: virtualization can complicate keyboard and screen reader navigation.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when word-grid rendering uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-050. Measure and decide the future of word-grid rendering

- Priority: P2
- Effort: S
- Depends on: PF-049
- Epic: 05. word-grid rendering
- Why now: virtualization can complicate keyboard and screen reader navigation.
- Scope: Compare the observed result with the target from the outcome task: scrolling stays responsive on a low-end test device. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_grid_rendering

## Epic 06: startup performance

### PF-051. Audit startup performance in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. startup performance
- Why now: CDN scripts and large data files can dominate startup.
- Scope: Trace script parsing, word-data loading, first render, and asset discovery. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-052. Define the outcome and measurement for startup performance

- Priority: P2
- Effort: S
- Depends on: PF-051
- Epic: 06. startup performance
- Why now: CDN scripts and large data files can dominate startup.
- Scope: Write the intended result in plain language so that the first usable screen appears quickly. Choose one observable measure based on this target: a measured budget exists for first contentful render and time to interactive.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-053. Design the data and state contract for startup performance

- Priority: P1
- Effort: M
- Depends on: PF-052
- Epic: 06. startup performance
- Why now: CDN scripts and large data files can dominate startup.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in script parsing, word-data loading, first render, and asset discovery. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-054. Prototype startup performance behind `ff_startup_performance`

- Priority: P2
- Effort: M
- Depends on: PF-053
- Epic: 06. startup performance
- Why now: CDN scripts and large data files can dominate startup.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that CDN scripts and large data files can dominate startup.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_startup_performance

### PF-055. Implement the foundation for startup performance

- Priority: P2
- Effort: L
- Depends on: PF-054
- Epic: 06. startup performance
- Why now: CDN scripts and large data files can dominate startup.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-056. Implement the core behavior for startup performance

- Priority: P1
- Effort: L
- Depends on: PF-055
- Epic: 06. startup performance
- Why now: CDN scripts and large data files can dominate startup.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the first usable screen appears quickly. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_startup_performance

### PF-057. Add edge states and failure handling for startup performance

- Priority: P2
- Effort: M
- Depends on: PF-056
- Epic: 06. startup performance
- Why now: CDN scripts and large data files can dominate startup.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to script parsing, word-data loading, first render, and asset discovery.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-058. Verify startup performance with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: PF-057
- Epic: 06. startup performance
- Why now: CDN scripts and large data files can dominate startup.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-059. Document rollout, cost, and operations for startup performance

- Priority: P2
- Effort: S
- Depends on: PF-058
- Epic: 06. startup performance
- Why now: CDN scripts and large data files can dominate startup.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when startup performance uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-060. Measure and decide the future of startup performance

- Priority: P2
- Effort: S
- Depends on: PF-059
- Epic: 06. startup performance
- Why now: CDN scripts and large data files can dominate startup.
- Scope: Compare the observed result with the target from the outcome task: a measured budget exists for first contentful render and time to interactive. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_startup_performance

## Epic 07: memory and object lifecycle

### PF-061. Audit memory and object lifecycle in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. memory and object lifecycle
- Why now: browser and native behavior differ.
- Scope: Trace Audio objects, AudioContext, MediaRecorder, animation frames, and event listeners. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-062. Define the outcome and measurement for memory and object lifecycle

- Priority: P2
- Effort: S
- Depends on: PF-061
- Epic: 07. memory and object lifecycle
- Why now: browser and native behavior differ.
- Scope: Write the intended result in plain language so that long sessions do not grow memory or degrade. Choose one observable measure based on this target: resource creation and disposal are paired in tests.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-063. Design the data and state contract for memory and object lifecycle

- Priority: P2
- Effort: M
- Depends on: PF-062
- Epic: 07. memory and object lifecycle
- Why now: browser and native behavior differ.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in Audio objects, AudioContext, MediaRecorder, animation frames, and event listeners. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-064. Prototype memory and object lifecycle behind `ff_memory_management`

- Priority: P2
- Effort: M
- Depends on: PF-063
- Epic: 07. memory and object lifecycle
- Why now: browser and native behavior differ.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that browser and native behavior differ.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_memory_management

### PF-065. Implement the foundation for memory and object lifecycle

- Priority: P2
- Effort: L
- Depends on: PF-064
- Epic: 07. memory and object lifecycle
- Why now: browser and native behavior differ.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-066. Implement the core behavior for memory and object lifecycle

- Priority: P2
- Effort: L
- Depends on: PF-065
- Epic: 07. memory and object lifecycle
- Why now: browser and native behavior differ.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: long sessions do not grow memory or degrade. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_memory_management

### PF-067. Add edge states and failure handling for memory and object lifecycle

- Priority: P2
- Effort: M
- Depends on: PF-066
- Epic: 07. memory and object lifecycle
- Why now: browser and native behavior differ.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to Audio objects, AudioContext, MediaRecorder, animation frames, and event listeners.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-068. Verify memory and object lifecycle with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: PF-067
- Epic: 07. memory and object lifecycle
- Why now: browser and native behavior differ.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-069. Document rollout, cost, and operations for memory and object lifecycle

- Priority: P2
- Effort: S
- Depends on: PF-068
- Epic: 07. memory and object lifecycle
- Why now: browser and native behavior differ.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when memory and object lifecycle uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-070. Measure and decide the future of memory and object lifecycle

- Priority: P2
- Effort: S
- Depends on: PF-069
- Epic: 07. memory and object lifecycle
- Why now: browser and native behavior differ.
- Scope: Compare the observed result with the target from the outcome task: resource creation and disposal are paired in tests. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_memory_management

## Epic 08: cache strategy

### PF-071. Audit cache strategy in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. cache strategy
- Why now: aggressive caching can strand users on old versions.
- Scope: Trace static hosting, service worker, media assets, and versioned data. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-072. Define the outcome and measurement for cache strategy

- Priority: P2
- Effort: S
- Depends on: PF-071
- Epic: 08. cache strategy
- Why now: aggressive caching can strand users on old versions.
- Scope: Write the intended result in plain language so that repeat visits are fast without serving stale learning content. Choose one observable measure based on this target: cache lifetime and invalidation rules are written per asset type.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-073. Design the data and state contract for cache strategy

- Priority: P2
- Effort: M
- Depends on: PF-072
- Epic: 08. cache strategy
- Why now: aggressive caching can strand users on old versions.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in static hosting, service worker, media assets, and versioned data. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-074. Prototype cache strategy behind `ff_cache_strategy`

- Priority: P2
- Effort: M
- Depends on: PF-073
- Epic: 08. cache strategy
- Why now: aggressive caching can strand users on old versions.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that aggressive caching can strand users on old versions.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_cache_strategy

### PF-075. Implement the foundation for cache strategy

- Priority: P2
- Effort: L
- Depends on: PF-074
- Epic: 08. cache strategy
- Why now: aggressive caching can strand users on old versions.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-076. Implement the core behavior for cache strategy

- Priority: P2
- Effort: L
- Depends on: PF-075
- Epic: 08. cache strategy
- Why now: aggressive caching can strand users on old versions.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: repeat visits are fast without serving stale learning content. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_cache_strategy

### PF-077. Add edge states and failure handling for cache strategy

- Priority: P2
- Effort: M
- Depends on: PF-076
- Epic: 08. cache strategy
- Why now: aggressive caching can strand users on old versions.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to static hosting, service worker, media assets, and versioned data.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-078. Verify cache strategy with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: PF-077
- Epic: 08. cache strategy
- Why now: aggressive caching can strand users on old versions.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-079. Document rollout, cost, and operations for cache strategy

- Priority: P2
- Effort: S
- Depends on: PF-078
- Epic: 08. cache strategy
- Why now: aggressive caching can strand users on old versions.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when cache strategy uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-080. Measure and decide the future of cache strategy

- Priority: P2
- Effort: S
- Depends on: PF-079
- Epic: 08. cache strategy
- Why now: aggressive caching can strand users on old versions.
- Scope: Compare the observed result with the target from the outcome task: cache lifetime and invalidation rules are written per asset type. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_cache_strategy

## Epic 09: mobile performance

### PF-081. Audit mobile performance in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. mobile performance
- Why now: free testing hardware is limited.
- Scope: Trace low-end Android, iOS webview, microphone capture, and animation. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-082. Define the outcome and measurement for mobile performance

- Priority: P2
- Effort: S
- Depends on: PF-081
- Epic: 09. mobile performance
- Why now: free testing hardware is limited.
- Scope: Write the intended result in plain language so that practice remains responsive on real devices. Choose one observable measure based on this target: a device budget covers CPU, memory, startup, and audio latency.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-083. Design the data and state contract for mobile performance

- Priority: P2
- Effort: M
- Depends on: PF-082
- Epic: 09. mobile performance
- Why now: free testing hardware is limited.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in low-end Android, iOS webview, microphone capture, and animation. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-084. Prototype mobile performance behind `ff_mobile_performance`

- Priority: P2
- Effort: M
- Depends on: PF-083
- Epic: 09. mobile performance
- Why now: free testing hardware is limited.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that free testing hardware is limited.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_mobile_performance

### PF-085. Implement the foundation for mobile performance

- Priority: P2
- Effort: L
- Depends on: PF-084
- Epic: 09. mobile performance
- Why now: free testing hardware is limited.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-086. Implement the core behavior for mobile performance

- Priority: P2
- Effort: L
- Depends on: PF-085
- Epic: 09. mobile performance
- Why now: free testing hardware is limited.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: practice remains responsive on real devices. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_mobile_performance

### PF-087. Add edge states and failure handling for mobile performance

- Priority: P2
- Effort: M
- Depends on: PF-086
- Epic: 09. mobile performance
- Why now: free testing hardware is limited.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to low-end Android, iOS webview, microphone capture, and animation.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-088. Verify mobile performance with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: PF-087
- Epic: 09. mobile performance
- Why now: free testing hardware is limited.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-089. Document rollout, cost, and operations for mobile performance

- Priority: P2
- Effort: S
- Depends on: PF-088
- Epic: 09. mobile performance
- Why now: free testing hardware is limited.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when mobile performance uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-090. Measure and decide the future of mobile performance

- Priority: P2
- Effort: S
- Depends on: PF-089
- Epic: 09. mobile performance
- Why now: free testing hardware is limited.
- Scope: Compare the observed result with the target from the outcome task: a device budget covers CPU, memory, startup, and audio latency. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_mobile_performance

## Epic 10: performance budgets and monitoring

### PF-091. Audit performance budgets and monitoring in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. performance budgets and monitoring
- Why now: numbers need repeatable measurement conditions.
- Scope: Trace bundle size, asset size, startup timing, interaction latency, and memory. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-092. Define the outcome and measurement for performance budgets and monitoring

- Priority: P2
- Effort: S
- Depends on: PF-091
- Epic: 10. performance budgets and monitoring
- Why now: numbers need repeatable measurement conditions.
- Scope: Write the intended result in plain language so that performance regressions are visible before release. Choose one observable measure based on this target: CI or release checks compare current values against budgets.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-093. Design the data and state contract for performance budgets and monitoring

- Priority: P2
- Effort: M
- Depends on: PF-092
- Epic: 10. performance budgets and monitoring
- Why now: numbers need repeatable measurement conditions.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in bundle size, asset size, startup timing, interaction latency, and memory. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-094. Prototype performance budgets and monitoring behind `ff_performance_budgets`

- Priority: P2
- Effort: M
- Depends on: PF-093
- Epic: 10. performance budgets and monitoring
- Why now: numbers need repeatable measurement conditions.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that numbers need repeatable measurement conditions.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_performance_budgets

### PF-095. Implement the foundation for performance budgets and monitoring

- Priority: P2
- Effort: L
- Depends on: PF-094
- Epic: 10. performance budgets and monitoring
- Why now: numbers need repeatable measurement conditions.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-096. Implement the core behavior for performance budgets and monitoring

- Priority: P2
- Effort: L
- Depends on: PF-095
- Epic: 10. performance budgets and monitoring
- Why now: numbers need repeatable measurement conditions.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: performance regressions are visible before release. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_performance_budgets

### PF-097. Add edge states and failure handling for performance budgets and monitoring

- Priority: P2
- Effort: M
- Depends on: PF-096
- Epic: 10. performance budgets and monitoring
- Why now: numbers need repeatable measurement conditions.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to bundle size, asset size, startup timing, interaction latency, and memory.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-098. Verify performance budgets and monitoring with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: PF-097
- Epic: 10. performance budgets and monitoring
- Why now: numbers need repeatable measurement conditions.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-099. Document rollout, cost, and operations for performance budgets and monitoring

- Priority: P2
- Effort: S
- Depends on: PF-098
- Epic: 10. performance budgets and monitoring
- Why now: numbers need repeatable measurement conditions.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when performance budgets and monitoring uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### PF-100. Measure and decide the future of performance budgets and monitoring

- Priority: P2
- Effort: S
- Depends on: PF-099
- Epic: 10. performance budgets and monitoring
- Why now: numbers need repeatable measurement conditions.
- Scope: Compare the observed result with the target from the outcome task: CI or release checks compare current values against budgets. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_performance_budgets

## Conflicts and feature-flag strategies

### Conflict 1: Offline preloading versus small startup download

| Option | Pros | Cons |
|---|---|---|
| Preload media aggressively | Practice feels instant after startup; offline sessions avoid network failures | Startup cost grows; storage use grows; learners may download media they never use |
| Load media on demand | Startup stays small; storage stays low; unused content is never fetched | Network latency can interrupt practice; offline behavior becomes less reliable |

Feature-flag or coexistence plan: Use `ff_media_preload` with per-mode preload settings and measure completion against download cost.

### Conflict 2: Lossless versus lossy media optimization

| Option | Pros | Cons |
|---|---|---|
| Use lossless optimization | Quality is preserved; learners hear and see the original content | Savings are limited; mobile downloads remain heavy |
| Use lossy optimization | File sizes can drop significantly; startup and offline install improve | Poor settings can remove tone detail or make images harder to interpret |

Feature-flag or coexistence plan: Use a reviewable encoding preset and a sample approval step before batch conversion.

### Conflict 3: Virtualized grid versus simple grid

| Option | Pros | Cons |
|---|---|---|
| Virtualize the grid | Large lists render fewer nodes and scroll more smoothly | Accessibility, browser find-in-page, and layout complexity become harder |
| Keep a simple grid | Implementation stays simple and all content is in the document | Rendering hundreds of cards can cost memory and scrolling performance |

Feature-flag or coexistence plan: Use `ff_virtual_grid` only after measuring a real performance problem on target devices.

## Third-party service cost policy

Use local open-source compression, Lighthouse, and browser tooling. Paid device performance services need a cost-benefit analysis.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
