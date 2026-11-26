# Accessibility and inclusive design improvement plan

## Purpose

Make Mandarin practice usable with keyboard, screen reader, low vision, reduced motion, touch, and cognitive-access needs.

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

## Epic 01: semantic structure and landmarks

### AC-001. Audit semantic structure and landmarks in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. semantic structure and landmarks
- Why now: the current interface relies heavily on divs and icons.
- Scope: Trace header, main, cards, buttons, dialogs, and status regions. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-002. Define the outcome and measurement for semantic structure and landmarks

- Priority: P0
- Effort: S
- Depends on: AC-001
- Epic: 01. semantic structure and landmarks
- Why now: the current interface relies heavily on divs and icons.
- Scope: Write the intended result in plain language so that assistive technology can navigate the app structure. Choose one observable measure based on this target: core screens expose correct landmarks and headings.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-003. Design the data and state contract for semantic structure and landmarks

- Priority: P0
- Effort: M
- Depends on: AC-002
- Epic: 01. semantic structure and landmarks
- Why now: the current interface relies heavily on divs and icons.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in header, main, cards, buttons, dialogs, and status regions. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-004. Prototype semantic structure and landmarks behind `ff_semantic_structure`

- Priority: P2
- Effort: M
- Depends on: AC-003
- Epic: 01. semantic structure and landmarks
- Why now: the current interface relies heavily on divs and icons.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that the current interface relies heavily on divs and icons.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_semantic_structure

### AC-005. Implement the foundation for semantic structure and landmarks

- Priority: P2
- Effort: L
- Depends on: AC-004
- Epic: 01. semantic structure and landmarks
- Why now: the current interface relies heavily on divs and icons.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-006. Implement the core behavior for semantic structure and landmarks

- Priority: P1
- Effort: L
- Depends on: AC-005
- Epic: 01. semantic structure and landmarks
- Why now: the current interface relies heavily on divs and icons.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: assistive technology can navigate the app structure. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_semantic_structure

### AC-007. Add edge states and failure handling for semantic structure and landmarks

- Priority: P2
- Effort: M
- Depends on: AC-006
- Epic: 01. semantic structure and landmarks
- Why now: the current interface relies heavily on divs and icons.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to header, main, cards, buttons, dialogs, and status regions.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-008. Verify semantic structure and landmarks with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: AC-007
- Epic: 01. semantic structure and landmarks
- Why now: the current interface relies heavily on divs and icons.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-009. Document rollout, cost, and operations for semantic structure and landmarks

- Priority: P2
- Effort: S
- Depends on: AC-008
- Epic: 01. semantic structure and landmarks
- Why now: the current interface relies heavily on divs and icons.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when semantic structure and landmarks uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-010. Measure and decide the future of semantic structure and landmarks

- Priority: P2
- Effort: S
- Depends on: AC-009
- Epic: 01. semantic structure and landmarks
- Why now: the current interface relies heavily on divs and icons.
- Scope: Compare the observed result with the target from the outcome task: core screens expose correct landmarks and headings. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_semantic_structure

## Epic 02: keyboard navigation

### AC-011. Audit keyboard navigation in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. keyboard navigation
- Why now: keyboard shortcuts may conflict with typing answers.
- Scope: Trace mode selection, playback controls, answers, writing input, and modal actions. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-012. Define the outcome and measurement for keyboard navigation

- Priority: P0
- Effort: S
- Depends on: AC-011
- Epic: 02. keyboard navigation
- Why now: keyboard shortcuts may conflict with typing answers.
- Scope: Write the intended result in plain language so that a keyboard-only learner can complete a session. Choose one observable measure based on this target: every interactive element is reachable and operable.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-013. Design the data and state contract for keyboard navigation

- Priority: P0
- Effort: M
- Depends on: AC-012
- Epic: 02. keyboard navigation
- Why now: keyboard shortcuts may conflict with typing answers.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in mode selection, playback controls, answers, writing input, and modal actions. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-014. Prototype keyboard navigation behind `ff_keyboard_navigation`

- Priority: P2
- Effort: M
- Depends on: AC-013
- Epic: 02. keyboard navigation
- Why now: keyboard shortcuts may conflict with typing answers.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that keyboard shortcuts may conflict with typing answers.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_keyboard_navigation

### AC-015. Implement the foundation for keyboard navigation

- Priority: P2
- Effort: L
- Depends on: AC-014
- Epic: 02. keyboard navigation
- Why now: keyboard shortcuts may conflict with typing answers.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-016. Implement the core behavior for keyboard navigation

- Priority: P1
- Effort: L
- Depends on: AC-015
- Epic: 02. keyboard navigation
- Why now: keyboard shortcuts may conflict with typing answers.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: a keyboard-only learner can complete a session. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_keyboard_navigation

### AC-017. Add edge states and failure handling for keyboard navigation

- Priority: P2
- Effort: M
- Depends on: AC-016
- Epic: 02. keyboard navigation
- Why now: keyboard shortcuts may conflict with typing answers.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to mode selection, playback controls, answers, writing input, and modal actions.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-018. Verify keyboard navigation with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: AC-017
- Epic: 02. keyboard navigation
- Why now: keyboard shortcuts may conflict with typing answers.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-019. Document rollout, cost, and operations for keyboard navigation

- Priority: P2
- Effort: S
- Depends on: AC-018
- Epic: 02. keyboard navigation
- Why now: keyboard shortcuts may conflict with typing answers.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when keyboard navigation uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-020. Measure and decide the future of keyboard navigation

- Priority: P2
- Effort: S
- Depends on: AC-019
- Epic: 02. keyboard navigation
- Why now: keyboard shortcuts may conflict with typing answers.
- Scope: Compare the observed result with the target from the outcome task: every interactive element is reachable and operable. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_keyboard_navigation

## Epic 03: focus management

### AC-021. Audit focus management in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. focus management
- Why now: Vue conditional rendering can remove focused elements.
- Scope: Trace session summary, mode changes, mobile menu, and revealed answers. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-022. Define the outcome and measurement for focus management

- Priority: P2
- Effort: S
- Depends on: AC-021
- Epic: 03. focus management
- Why now: Vue conditional rendering can remove focused elements.
- Scope: Write the intended result in plain language so that focus never disappears or jumps unpredictably. Choose one observable measure based on this target: focus moves intentionally and returns to a sensible control.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-023. Design the data and state contract for focus management

- Priority: P1
- Effort: M
- Depends on: AC-022
- Epic: 03. focus management
- Why now: Vue conditional rendering can remove focused elements.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in session summary, mode changes, mobile menu, and revealed answers. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-024. Prototype focus management behind `ff_focus_management`

- Priority: P2
- Effort: M
- Depends on: AC-023
- Epic: 03. focus management
- Why now: Vue conditional rendering can remove focused elements.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that Vue conditional rendering can remove focused elements.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_focus_management

### AC-025. Implement the foundation for focus management

- Priority: P2
- Effort: L
- Depends on: AC-024
- Epic: 03. focus management
- Why now: Vue conditional rendering can remove focused elements.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-026. Implement the core behavior for focus management

- Priority: P1
- Effort: L
- Depends on: AC-025
- Epic: 03. focus management
- Why now: Vue conditional rendering can remove focused elements.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: focus never disappears or jumps unpredictably. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_focus_management

### AC-027. Add edge states and failure handling for focus management

- Priority: P2
- Effort: M
- Depends on: AC-026
- Epic: 03. focus management
- Why now: Vue conditional rendering can remove focused elements.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to session summary, mode changes, mobile menu, and revealed answers.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-028. Verify focus management with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: AC-027
- Epic: 03. focus management
- Why now: Vue conditional rendering can remove focused elements.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-029. Document rollout, cost, and operations for focus management

- Priority: P2
- Effort: S
- Depends on: AC-028
- Epic: 03. focus management
- Why now: Vue conditional rendering can remove focused elements.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when focus management uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-030. Measure and decide the future of focus management

- Priority: P2
- Effort: S
- Depends on: AC-029
- Epic: 03. focus management
- Why now: Vue conditional rendering can remove focused elements.
- Scope: Compare the observed result with the target from the outcome task: focus moves intentionally and returns to a sensible control. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_focus_management

## Epic 04: screen reader labels and announcements

### AC-031. Audit screen reader labels and announcements in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. screen reader labels and announcements
- Why now: too many announcements can overwhelm users.
- Scope: Trace icon buttons, scores, recording state, feedback, and progress. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-032. Define the outcome and measurement for screen reader labels and announcements

- Priority: P2
- Effort: S
- Depends on: AC-031
- Epic: 04. screen reader labels and announcements
- Why now: too many announcements can overwhelm users.
- Scope: Write the intended result in plain language so that screen reader users hear meaningful state changes. Choose one observable measure based on this target: icon-only controls have names and dynamic updates use live regions carefully.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-033. Design the data and state contract for screen reader labels and announcements

- Priority: P1
- Effort: M
- Depends on: AC-032
- Epic: 04. screen reader labels and announcements
- Why now: too many announcements can overwhelm users.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in icon buttons, scores, recording state, feedback, and progress. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-034. Prototype screen reader labels and announcements behind `ff_screen_reader_labels`

- Priority: P2
- Effort: M
- Depends on: AC-033
- Epic: 04. screen reader labels and announcements
- Why now: too many announcements can overwhelm users.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that too many announcements can overwhelm users.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_screen_reader_labels

### AC-035. Implement the foundation for screen reader labels and announcements

- Priority: P2
- Effort: L
- Depends on: AC-034
- Epic: 04. screen reader labels and announcements
- Why now: too many announcements can overwhelm users.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-036. Implement the core behavior for screen reader labels and announcements

- Priority: P1
- Effort: L
- Depends on: AC-035
- Epic: 04. screen reader labels and announcements
- Why now: too many announcements can overwhelm users.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: screen reader users hear meaningful state changes. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_screen_reader_labels

### AC-037. Add edge states and failure handling for screen reader labels and announcements

- Priority: P2
- Effort: M
- Depends on: AC-036
- Epic: 04. screen reader labels and announcements
- Why now: too many announcements can overwhelm users.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to icon buttons, scores, recording state, feedback, and progress.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-038. Verify screen reader labels and announcements with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: AC-037
- Epic: 04. screen reader labels and announcements
- Why now: too many announcements can overwhelm users.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-039. Document rollout, cost, and operations for screen reader labels and announcements

- Priority: P2
- Effort: S
- Depends on: AC-038
- Epic: 04. screen reader labels and announcements
- Why now: too many announcements can overwhelm users.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when screen reader labels and announcements uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-040. Measure and decide the future of screen reader labels and announcements

- Priority: P2
- Effort: S
- Depends on: AC-039
- Epic: 04. screen reader labels and announcements
- Why now: too many announcements can overwhelm users.
- Scope: Compare the observed result with the target from the outcome task: icon-only controls have names and dynamic updates use live regions carefully. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_screen_reader_labels

## Epic 05: color contrast and visual encoding

### AC-041. Audit color contrast and visual encoding in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. color contrast and visual encoding
- Why now: color palette changes can alter brand feel.
- Scope: Trace score colors, tone buttons, cards, overlays, and feedback. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-042. Define the outcome and measurement for color contrast and visual encoding

- Priority: P2
- Effort: S
- Depends on: AC-041
- Epic: 05. color contrast and visual encoding
- Why now: color palette changes can alter brand feel.
- Scope: Write the intended result in plain language so that information does not depend on color alone. Choose one observable measure based on this target: text and interactive indicators meet chosen contrast targets.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-043. Design the data and state contract for color contrast and visual encoding

- Priority: P1
- Effort: M
- Depends on: AC-042
- Epic: 05. color contrast and visual encoding
- Why now: color palette changes can alter brand feel.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in score colors, tone buttons, cards, overlays, and feedback. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-044. Prototype color contrast and visual encoding behind `ff_color_contrast`

- Priority: P2
- Effort: M
- Depends on: AC-043
- Epic: 05. color contrast and visual encoding
- Why now: color palette changes can alter brand feel.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that color palette changes can alter brand feel.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_color_contrast

### AC-045. Implement the foundation for color contrast and visual encoding

- Priority: P2
- Effort: L
- Depends on: AC-044
- Epic: 05. color contrast and visual encoding
- Why now: color palette changes can alter brand feel.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-046. Implement the core behavior for color contrast and visual encoding

- Priority: P1
- Effort: L
- Depends on: AC-045
- Epic: 05. color contrast and visual encoding
- Why now: color palette changes can alter brand feel.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: information does not depend on color alone. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_color_contrast

### AC-047. Add edge states and failure handling for color contrast and visual encoding

- Priority: P2
- Effort: M
- Depends on: AC-046
- Epic: 05. color contrast and visual encoding
- Why now: color palette changes can alter brand feel.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to score colors, tone buttons, cards, overlays, and feedback.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-048. Verify color contrast and visual encoding with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: AC-047
- Epic: 05. color contrast and visual encoding
- Why now: color palette changes can alter brand feel.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-049. Document rollout, cost, and operations for color contrast and visual encoding

- Priority: P2
- Effort: S
- Depends on: AC-048
- Epic: 05. color contrast and visual encoding
- Why now: color palette changes can alter brand feel.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when color contrast and visual encoding uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-050. Measure and decide the future of color contrast and visual encoding

- Priority: P2
- Effort: S
- Depends on: AC-049
- Epic: 05. color contrast and visual encoding
- Why now: color palette changes can alter brand feel.
- Scope: Compare the observed result with the target from the outcome task: text and interactive indicators meet chosen contrast targets. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_color_contrast

## Epic 06: reduced motion support

### AC-051. Audit reduced motion support in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. reduced motion support
- Why now: feedback must remain clear without animation.
- Scope: Trace animations, transitions, progress bars, contour drawing, and success feedback. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-052. Define the outcome and measurement for reduced motion support

- Priority: P2
- Effort: S
- Depends on: AC-051
- Epic: 06. reduced motion support
- Why now: feedback must remain clear without animation.
- Scope: Write the intended result in plain language so that motion-sensitive learners can use the app comfortably. Choose one observable measure based on this target: `prefers-reduced-motion` changes or disables nonessential motion.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-053. Design the data and state contract for reduced motion support

- Priority: P1
- Effort: M
- Depends on: AC-052
- Epic: 06. reduced motion support
- Why now: feedback must remain clear without animation.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in animations, transitions, progress bars, contour drawing, and success feedback. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-054. Prototype reduced motion support behind `ff_reduced_motion`

- Priority: P2
- Effort: M
- Depends on: AC-053
- Epic: 06. reduced motion support
- Why now: feedback must remain clear without animation.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that feedback must remain clear without animation.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_reduced_motion

### AC-055. Implement the foundation for reduced motion support

- Priority: P2
- Effort: L
- Depends on: AC-054
- Epic: 06. reduced motion support
- Why now: feedback must remain clear without animation.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-056. Implement the core behavior for reduced motion support

- Priority: P1
- Effort: L
- Depends on: AC-055
- Epic: 06. reduced motion support
- Why now: feedback must remain clear without animation.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: motion-sensitive learners can use the app comfortably. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_reduced_motion

### AC-057. Add edge states and failure handling for reduced motion support

- Priority: P2
- Effort: M
- Depends on: AC-056
- Epic: 06. reduced motion support
- Why now: feedback must remain clear without animation.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to animations, transitions, progress bars, contour drawing, and success feedback.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-058. Verify reduced motion support with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: AC-057
- Epic: 06. reduced motion support
- Why now: feedback must remain clear without animation.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-059. Document rollout, cost, and operations for reduced motion support

- Priority: P2
- Effort: S
- Depends on: AC-058
- Epic: 06. reduced motion support
- Why now: feedback must remain clear without animation.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when reduced motion support uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-060. Measure and decide the future of reduced motion support

- Priority: P2
- Effort: S
- Depends on: AC-059
- Epic: 06. reduced motion support
- Why now: feedback must remain clear without animation.
- Scope: Compare the observed result with the target from the outcome task: `prefers-reduced-motion` changes or disables nonessential motion. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_reduced_motion

## Epic 07: touch target sizing and spacing

### AC-061. Audit touch target sizing and spacing in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. touch target sizing and spacing
- Why now: larger targets can change dense layouts.
- Scope: Trace tone buttons, mode cards, mobile menu, playback controls, and answer buttons. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-062. Define the outcome and measurement for touch target sizing and spacing

- Priority: P2
- Effort: S
- Depends on: AC-061
- Epic: 07. touch target sizing and spacing
- Why now: larger targets can change dense layouts.
- Scope: Write the intended result in plain language so that small-screen learners can tap accurately. Choose one observable measure based on this target: targets meet a documented minimum size and spacing.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-063. Design the data and state contract for touch target sizing and spacing

- Priority: P2
- Effort: M
- Depends on: AC-062
- Epic: 07. touch target sizing and spacing
- Why now: larger targets can change dense layouts.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in tone buttons, mode cards, mobile menu, playback controls, and answer buttons. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-064. Prototype touch target sizing and spacing behind `ff_touch_targets`

- Priority: P2
- Effort: M
- Depends on: AC-063
- Epic: 07. touch target sizing and spacing
- Why now: larger targets can change dense layouts.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that larger targets can change dense layouts.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_touch_targets

### AC-065. Implement the foundation for touch target sizing and spacing

- Priority: P2
- Effort: L
- Depends on: AC-064
- Epic: 07. touch target sizing and spacing
- Why now: larger targets can change dense layouts.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-066. Implement the core behavior for touch target sizing and spacing

- Priority: P2
- Effort: L
- Depends on: AC-065
- Epic: 07. touch target sizing and spacing
- Why now: larger targets can change dense layouts.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: small-screen learners can tap accurately. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_touch_targets

### AC-067. Add edge states and failure handling for touch target sizing and spacing

- Priority: P2
- Effort: M
- Depends on: AC-066
- Epic: 07. touch target sizing and spacing
- Why now: larger targets can change dense layouts.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to tone buttons, mode cards, mobile menu, playback controls, and answer buttons.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-068. Verify touch target sizing and spacing with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: AC-067
- Epic: 07. touch target sizing and spacing
- Why now: larger targets can change dense layouts.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-069. Document rollout, cost, and operations for touch target sizing and spacing

- Priority: P2
- Effort: S
- Depends on: AC-068
- Epic: 07. touch target sizing and spacing
- Why now: larger targets can change dense layouts.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when touch target sizing and spacing uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-070. Measure and decide the future of touch target sizing and spacing

- Priority: P2
- Effort: S
- Depends on: AC-069
- Epic: 07. touch target sizing and spacing
- Why now: larger targets can change dense layouts.
- Scope: Compare the observed result with the target from the outcome task: targets meet a documented minimum size and spacing. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_touch_targets

## Epic 08: visual alternatives for audio cues

### AC-071. Audit visual alternatives for audio cues in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. visual alternatives for audio cues
- Why now: tone feedback still depends on hearing or visualization.
- Scope: Trace playback state, reference audio, success sound, and spoken feedback. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-072. Define the outcome and measurement for visual alternatives for audio cues

- Priority: P2
- Effort: S
- Depends on: AC-071
- Epic: 08. visual alternatives for audio cues
- Why now: tone feedback still depends on hearing or visualization.
- Scope: Write the intended result in plain language so that deaf and hard-of-hearing learners receive equivalent feedback. Choose one observable measure based on this target: every audio-only signal has a visible counterpart.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-073. Design the data and state contract for visual alternatives for audio cues

- Priority: P2
- Effort: M
- Depends on: AC-072
- Epic: 08. visual alternatives for audio cues
- Why now: tone feedback still depends on hearing or visualization.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in playback state, reference audio, success sound, and spoken feedback. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-074. Prototype visual alternatives for audio cues behind `ff_visual_audio_cues`

- Priority: P2
- Effort: M
- Depends on: AC-073
- Epic: 08. visual alternatives for audio cues
- Why now: tone feedback still depends on hearing or visualization.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that tone feedback still depends on hearing or visualization.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_visual_audio_cues

### AC-075. Implement the foundation for visual alternatives for audio cues

- Priority: P2
- Effort: L
- Depends on: AC-074
- Epic: 08. visual alternatives for audio cues
- Why now: tone feedback still depends on hearing or visualization.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-076. Implement the core behavior for visual alternatives for audio cues

- Priority: P2
- Effort: L
- Depends on: AC-075
- Epic: 08. visual alternatives for audio cues
- Why now: tone feedback still depends on hearing or visualization.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: deaf and hard-of-hearing learners receive equivalent feedback. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_visual_audio_cues

### AC-077. Add edge states and failure handling for visual alternatives for audio cues

- Priority: P2
- Effort: M
- Depends on: AC-076
- Epic: 08. visual alternatives for audio cues
- Why now: tone feedback still depends on hearing or visualization.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to playback state, reference audio, success sound, and spoken feedback.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-078. Verify visual alternatives for audio cues with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: AC-077
- Epic: 08. visual alternatives for audio cues
- Why now: tone feedback still depends on hearing or visualization.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-079. Document rollout, cost, and operations for visual alternatives for audio cues

- Priority: P2
- Effort: S
- Depends on: AC-078
- Epic: 08. visual alternatives for audio cues
- Why now: tone feedback still depends on hearing or visualization.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when visual alternatives for audio cues uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-080. Measure and decide the future of visual alternatives for audio cues

- Priority: P2
- Effort: S
- Depends on: AC-079
- Epic: 08. visual alternatives for audio cues
- Why now: tone feedback still depends on hearing or visualization.
- Scope: Compare the observed result with the target from the outcome task: every audio-only signal has a visible counterpart. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_visual_audio_cues

## Epic 09: accessible forms and settings

### AC-081. Audit accessible forms and settings in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. accessible forms and settings
- Why now: custom sliders and buttons need careful implementation.
- Scope: Trace volume, auto-continue, mastery threshold, tone filters, and writing target. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-082. Define the outcome and measurement for accessible forms and settings

- Priority: P2
- Effort: S
- Depends on: AC-081
- Epic: 09. accessible forms and settings
- Why now: custom sliders and buttons need careful implementation.
- Scope: Write the intended result in plain language so that settings are understandable and operable by everyone. Choose one observable measure based on this target: controls have labels, descriptions, and keyboard support.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-083. Design the data and state contract for accessible forms and settings

- Priority: P2
- Effort: M
- Depends on: AC-082
- Epic: 09. accessible forms and settings
- Why now: custom sliders and buttons need careful implementation.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in volume, auto-continue, mastery threshold, tone filters, and writing target. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-084. Prototype accessible forms and settings behind `ff_accessible_settings`

- Priority: P2
- Effort: M
- Depends on: AC-083
- Epic: 09. accessible forms and settings
- Why now: custom sliders and buttons need careful implementation.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that custom sliders and buttons need careful implementation.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_accessible_settings

### AC-085. Implement the foundation for accessible forms and settings

- Priority: P2
- Effort: L
- Depends on: AC-084
- Epic: 09. accessible forms and settings
- Why now: custom sliders and buttons need careful implementation.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-086. Implement the core behavior for accessible forms and settings

- Priority: P2
- Effort: L
- Depends on: AC-085
- Epic: 09. accessible forms and settings
- Why now: custom sliders and buttons need careful implementation.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: settings are understandable and operable by everyone. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_accessible_settings

### AC-087. Add edge states and failure handling for accessible forms and settings

- Priority: P2
- Effort: M
- Depends on: AC-086
- Epic: 09. accessible forms and settings
- Why now: custom sliders and buttons need careful implementation.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to volume, auto-continue, mastery threshold, tone filters, and writing target.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-088. Verify accessible forms and settings with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: AC-087
- Epic: 09. accessible forms and settings
- Why now: custom sliders and buttons need careful implementation.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-089. Document rollout, cost, and operations for accessible forms and settings

- Priority: P2
- Effort: S
- Depends on: AC-088
- Epic: 09. accessible forms and settings
- Why now: custom sliders and buttons need careful implementation.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when accessible forms and settings uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-090. Measure and decide the future of accessible forms and settings

- Priority: P2
- Effort: S
- Depends on: AC-089
- Epic: 09. accessible forms and settings
- Why now: custom sliders and buttons need careful implementation.
- Scope: Compare the observed result with the target from the outcome task: controls have labels, descriptions, and keyboard support. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_accessible_settings

## Epic 10: accessibility audit loop

### AC-091. Audit accessibility audit loop in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. accessibility audit loop
- Why now: a solo maintainer needs a scoped realistic checklist.
- Scope: Trace automated checks, manual keyboard passes, screen reader passes, and learner feedback. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-092. Define the outcome and measurement for accessibility audit loop

- Priority: P2
- Effort: S
- Depends on: AC-091
- Epic: 10. accessibility audit loop
- Why now: a solo maintainer needs a scoped realistic checklist.
- Scope: Write the intended result in plain language so that accessibility remains a repeated practice. Choose one observable measure based on this target: each release checklist names the required checks.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-093. Design the data and state contract for accessibility audit loop

- Priority: P2
- Effort: M
- Depends on: AC-092
- Epic: 10. accessibility audit loop
- Why now: a solo maintainer needs a scoped realistic checklist.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in automated checks, manual keyboard passes, screen reader passes, and learner feedback. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-094. Prototype accessibility audit loop behind `ff_accessibility_audit_loop`

- Priority: P2
- Effort: M
- Depends on: AC-093
- Epic: 10. accessibility audit loop
- Why now: a solo maintainer needs a scoped realistic checklist.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that a solo maintainer needs a scoped realistic checklist.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_accessibility_audit_loop

### AC-095. Implement the foundation for accessibility audit loop

- Priority: P2
- Effort: L
- Depends on: AC-094
- Epic: 10. accessibility audit loop
- Why now: a solo maintainer needs a scoped realistic checklist.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-096. Implement the core behavior for accessibility audit loop

- Priority: P2
- Effort: L
- Depends on: AC-095
- Epic: 10. accessibility audit loop
- Why now: a solo maintainer needs a scoped realistic checklist.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: accessibility remains a repeated practice. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_accessibility_audit_loop

### AC-097. Add edge states and failure handling for accessibility audit loop

- Priority: P2
- Effort: M
- Depends on: AC-096
- Epic: 10. accessibility audit loop
- Why now: a solo maintainer needs a scoped realistic checklist.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to automated checks, manual keyboard passes, screen reader passes, and learner feedback.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-098. Verify accessibility audit loop with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: AC-097
- Epic: 10. accessibility audit loop
- Why now: a solo maintainer needs a scoped realistic checklist.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-099. Document rollout, cost, and operations for accessibility audit loop

- Priority: P2
- Effort: S
- Depends on: AC-098
- Epic: 10. accessibility audit loop
- Why now: a solo maintainer needs a scoped realistic checklist.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when accessibility audit loop uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### AC-100. Measure and decide the future of accessibility audit loop

- Priority: P2
- Effort: S
- Depends on: AC-099
- Epic: 10. accessibility audit loop
- Why now: a solo maintainer needs a scoped realistic checklist.
- Scope: Compare the observed result with the target from the outcome task: each release checklist names the required checks. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_accessibility_audit_loop

## Conflicts and feature-flag strategies

### Conflict 1: Custom controls versus native controls

| Option | Pros | Cons |
|---|---|---|
| Use custom controls | Visual design can match the product exactly; complex tone selectors are flexible | Keyboard, focus, and assistive technology behavior must be recreated |
| Use native controls | Accessibility behavior comes by default; implementation is smaller; behavior is consistent across platforms | Visual design is constrained and may look less polished |

Feature-flag or coexistence plan: Use native controls first. If a custom control is needed, place it behind `ff_accessible_custom_controls` and test it with keyboard and screen reader.

### Conflict 2: Dense desktop layout versus simplified responsive layout

| Option | Pros | Cons |
|---|---|---|
| Keep dense layouts | More controls remain visible; desktop users can scan quickly | Small targets and dense groups are harder for touch, low vision, and attention |
| Use simplified responsive layouts | Targets are clearer; cognitive load drops; mobile usability improves | Some controls move into menus or secondary screens |

Feature-flag or coexistence plan: Use `ff_simplified_layout` to compare task completion and learner preference before committing.

### Conflict 3: Rich animation versus minimal motion

| Option | Pros | Cons |
|---|---|---|
| Use rich animation | Success and progress feel rewarding; state changes are visible | Motion can distract or harm motion-sensitive users; low-end devices may struggle |
| Use minimal motion | The interface is calmer, faster, and safer for motion-sensitive users | Feedback can feel flat if no replacement cue exists |

Feature-flag or coexistence plan: Respect `prefers-reduced-motion` globally and test richer motion only as an opt-in setting.

## Third-party service cost policy

Use open-source accessibility checkers and manual testing. Paid audit services are optional and need a cost-benefit analysis.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
