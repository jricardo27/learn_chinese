# Internationalization and localization improvement plan

## Purpose

Separate interface language from learning content so the app can serve more learners and support Chinese text correctly.

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

## Epic 01: interface string extraction

### I18-001. Audit interface string extraction in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. interface string extraction
- Why now: current strings are embedded in templates and JavaScript.
- Scope: Trace mode titles, buttons, settings, feedback, errors, and onboarding copy. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-002. Define the outcome and measurement for interface string extraction

- Priority: P0
- Effort: S
- Depends on: I18-001
- Epic: 01. interface string extraction
- Why now: current strings are embedded in templates and JavaScript.
- Scope: Write the intended result in plain language so that interface copy can be translated without code edits. Choose one observable measure based on this target: all learner-facing strings live in one message catalog.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-003. Design the data and state contract for interface string extraction

- Priority: P0
- Effort: M
- Depends on: I18-002
- Epic: 01. interface string extraction
- Why now: current strings are embedded in templates and JavaScript.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in mode titles, buttons, settings, feedback, errors, and onboarding copy. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-004. Prototype interface string extraction behind `ff_string_extraction`

- Priority: P2
- Effort: M
- Depends on: I18-003
- Epic: 01. interface string extraction
- Why now: current strings are embedded in templates and JavaScript.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that current strings are embedded in templates and JavaScript.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_string_extraction

### I18-005. Implement the foundation for interface string extraction

- Priority: P2
- Effort: L
- Depends on: I18-004
- Epic: 01. interface string extraction
- Why now: current strings are embedded in templates and JavaScript.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-006. Implement the core behavior for interface string extraction

- Priority: P1
- Effort: L
- Depends on: I18-005
- Epic: 01. interface string extraction
- Why now: current strings are embedded in templates and JavaScript.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: interface copy can be translated without code edits. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_string_extraction

### I18-007. Add edge states and failure handling for interface string extraction

- Priority: P2
- Effort: M
- Depends on: I18-006
- Epic: 01. interface string extraction
- Why now: current strings are embedded in templates and JavaScript.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to mode titles, buttons, settings, feedback, errors, and onboarding copy.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-008. Verify interface string extraction with behavior-focused checks

- Priority: P0
- Effort: M
- Depends on: I18-007
- Epic: 01. interface string extraction
- Why now: current strings are embedded in templates and JavaScript.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-009. Document rollout, cost, and operations for interface string extraction

- Priority: P2
- Effort: S
- Depends on: I18-008
- Epic: 01. interface string extraction
- Why now: current strings are embedded in templates and JavaScript.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when interface string extraction uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-010. Measure and decide the future of interface string extraction

- Priority: P2
- Effort: S
- Depends on: I18-009
- Epic: 01. interface string extraction
- Why now: current strings are embedded in templates and JavaScript.
- Scope: Compare the observed result with the target from the outcome task: all learner-facing strings live in one message catalog. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_string_extraction

## Epic 02: locale framework selection

### I18-011. Audit locale framework selection in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. locale framework selection
- Why now: full i18n libraries may exceed proof-of-concept needs.
- Scope: Trace Vue i18n or lightweight local message lookup. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-012. Define the outcome and measurement for locale framework selection

- Priority: P0
- Effort: S
- Depends on: I18-011
- Epic: 02. locale framework selection
- Why now: full i18n libraries may exceed proof-of-concept needs.
- Scope: Write the intended result in plain language so that the project chooses the smallest capable localization layer. Choose one observable measure based on this target: a decision record compares bundle cost, pluralization, and formatting.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-013. Design the data and state contract for locale framework selection

- Priority: P0
- Effort: M
- Depends on: I18-012
- Epic: 02. locale framework selection
- Why now: full i18n libraries may exceed proof-of-concept needs.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in Vue i18n or lightweight local message lookup. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-014. Evaluate the smallest real option for locale framework selection

- Priority: P2
- Effort: M
- Depends on: I18-013
- Epic: 02. locale framework selection
- Why now: full i18n libraries may exceed proof-of-concept needs.
- Scope: Compare the smallest real implementation or policy choice for Vue i18n or lightweight local message lookup. The evaluation must expose the risk that full i18n libraries may exceed proof-of-concept needs and must use the repository cost rule.
- Acceptance criteria: The evaluation records the evidence, the rejected option, the cost decision, and whether the default is keep, revise, or discard.
- Cost and service notes: Prefer local evaluation. Use a third-party service only if it has a renewable free tier and the evaluation states the quota assumption.
- Flag or conflict notes: ff_locale_framework

### I18-015. Write the decision foundation for locale framework selection

- Priority: P2
- Effort: L
- Depends on: I18-014
- Epic: 02. locale framework selection
- Why now: full i18n libraries may exceed proof-of-concept needs.
- Scope: Capture the options, constraints, privacy impact, cost screen, evidence gaps, rollback rule, and the smallest safe default. Keep the decision narrow enough to reverse when evidence changes.
- Acceptance criteria: The decision foundation is reviewable on its own and separates current behavior from the proposed default.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-016. Adopt the default decision for locale framework selection

- Priority: P1
- Effort: L
- Depends on: I18-015
- Epic: 02. locale framework selection
- Why now: full i18n libraries may exceed proof-of-concept needs.
- Scope: Write the default decision that moves the area toward this outcome: the project chooses the smallest capable localization layer. Name the evidence that would reopen the decision.
- Acceptance criteria: The decision states what is adopted, what is rejected, what remains local-first, and what cost-benefit analysis is required before any paid dependency.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_locale_framework

### I18-017. Document edge cases and failure handling for locale framework selection

- Priority: P2
- Effort: M
- Depends on: I18-016
- Epic: 02. locale framework selection
- Why now: full i18n libraries may exceed proof-of-concept needs.
- Scope: Cover missing evidence, quota exhaustion, service removal, pricing changes, privacy objections, and migration failure where they apply to Vue i18n or lightweight local message lookup.
- Acceptance criteria: Each relevant edge case has a fallback, an owner, and a clear rule for returning to the free local path.
- Cost and service notes: Use local analysis. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-018. Validate the decision for locale framework selection against real constraints

- Priority: P0
- Effort: M
- Depends on: I18-017
- Epic: 02. locale framework selection
- Why now: full i18n libraries may exceed proof-of-concept needs.
- Scope: Check the decision against the current app, the cost rule, privacy expectations, and the highest-risk failure path. Use a small real artifact or service-console check when one is available.
- Acceptance criteria: The validation names the evidence inspected, passes only when the decision still satisfies the constraints, and records any open assumption.
- Cost and service notes: Use open-source local test tooling and free service consoles. Paid validation infrastructure requires a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-019. Document rollout, cost, and operations for locale framework selection

- Priority: P2
- Effort: S
- Depends on: I18-018
- Epic: 02. locale framework selection
- Why now: full i18n libraries may exceed proof-of-concept needs.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when locale framework selection uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-020. Measure and decide the future of locale framework selection

- Priority: P2
- Effort: S
- Depends on: I18-019
- Epic: 02. locale framework selection
- Why now: full i18n libraries may exceed proof-of-concept needs.
- Scope: Compare the observed result with the target from the outcome task: a decision record compares bundle cost, pluralization, and formatting. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_locale_framework

## Epic 03: interface language strategy

### I18-021. Audit interface language strategy in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. interface language strategy
- Why now: Chinese UI for beginners may require simpler copy.
- Scope: Trace English-first UI, Chinese UI, heritage learners, and beginner readability. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-022. Define the outcome and measurement for interface language strategy

- Priority: P2
- Effort: S
- Depends on: I18-021
- Epic: 03. interface language strategy
- Why now: Chinese UI for beginners may require simpler copy.
- Scope: Write the intended result in plain language so that the project knows who each interface language serves. Choose one observable measure based on this target: a written strategy names supported locales and fallback order.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-023. Design the data and state contract for interface language strategy

- Priority: P1
- Effort: M
- Depends on: I18-022
- Epic: 03. interface language strategy
- Why now: Chinese UI for beginners may require simpler copy.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in English-first UI, Chinese UI, heritage learners, and beginner readability. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-024. Prototype interface language strategy behind `ff_interface_language_strategy`

- Priority: P2
- Effort: M
- Depends on: I18-023
- Epic: 03. interface language strategy
- Why now: Chinese UI for beginners may require simpler copy.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that Chinese UI for beginners may require simpler copy.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_interface_language_strategy

### I18-025. Implement the foundation for interface language strategy

- Priority: P2
- Effort: L
- Depends on: I18-024
- Epic: 03. interface language strategy
- Why now: Chinese UI for beginners may require simpler copy.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-026. Implement the core behavior for interface language strategy

- Priority: P1
- Effort: L
- Depends on: I18-025
- Epic: 03. interface language strategy
- Why now: Chinese UI for beginners may require simpler copy.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the project knows who each interface language serves. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_interface_language_strategy

### I18-027. Add edge states and failure handling for interface language strategy

- Priority: P2
- Effort: M
- Depends on: I18-026
- Epic: 03. interface language strategy
- Why now: Chinese UI for beginners may require simpler copy.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to English-first UI, Chinese UI, heritage learners, and beginner readability.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-028. Verify interface language strategy with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: I18-027
- Epic: 03. interface language strategy
- Why now: Chinese UI for beginners may require simpler copy.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-029. Document rollout, cost, and operations for interface language strategy

- Priority: P2
- Effort: S
- Depends on: I18-028
- Epic: 03. interface language strategy
- Why now: Chinese UI for beginners may require simpler copy.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when interface language strategy uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-030. Measure and decide the future of interface language strategy

- Priority: P2
- Effort: S
- Depends on: I18-029
- Epic: 03. interface language strategy
- Why now: Chinese UI for beginners may require simpler copy.
- Scope: Compare the observed result with the target from the outcome task: a written strategy names supported locales and fallback order. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_interface_language_strategy

## Epic 04: pluralization and grammar rules

### I18-031. Audit pluralization and grammar rules in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. pluralization and grammar rules
- Why now: Chinese classifiers make naive concatenation unsafe.
- Scope: Trace counts, classifiers, measure words, and locale-specific sentence structure. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-032. Define the outcome and measurement for pluralization and grammar rules

- Priority: P2
- Effort: S
- Depends on: I18-031
- Epic: 04. pluralization and grammar rules
- Why now: Chinese classifiers make naive concatenation unsafe.
- Scope: Write the intended result in plain language so that translated strings remain grammatically correct. Choose one observable measure based on this target: message format supports plural and classifier-aware cases.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-033. Design the data and state contract for pluralization and grammar rules

- Priority: P1
- Effort: M
- Depends on: I18-032
- Epic: 04. pluralization and grammar rules
- Why now: Chinese classifiers make naive concatenation unsafe.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in counts, classifiers, measure words, and locale-specific sentence structure. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-034. Prototype pluralization and grammar rules behind `ff_pluralization_grammar`

- Priority: P2
- Effort: M
- Depends on: I18-033
- Epic: 04. pluralization and grammar rules
- Why now: Chinese classifiers make naive concatenation unsafe.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that Chinese classifiers make naive concatenation unsafe.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_pluralization_grammar

### I18-035. Implement the foundation for pluralization and grammar rules

- Priority: P2
- Effort: L
- Depends on: I18-034
- Epic: 04. pluralization and grammar rules
- Why now: Chinese classifiers make naive concatenation unsafe.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-036. Implement the core behavior for pluralization and grammar rules

- Priority: P1
- Effort: L
- Depends on: I18-035
- Epic: 04. pluralization and grammar rules
- Why now: Chinese classifiers make naive concatenation unsafe.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: translated strings remain grammatically correct. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_pluralization_grammar

### I18-037. Add edge states and failure handling for pluralization and grammar rules

- Priority: P2
- Effort: M
- Depends on: I18-036
- Epic: 04. pluralization and grammar rules
- Why now: Chinese classifiers make naive concatenation unsafe.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to counts, classifiers, measure words, and locale-specific sentence structure.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-038. Verify pluralization and grammar rules with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: I18-037
- Epic: 04. pluralization and grammar rules
- Why now: Chinese classifiers make naive concatenation unsafe.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-039. Document rollout, cost, and operations for pluralization and grammar rules

- Priority: P2
- Effort: S
- Depends on: I18-038
- Epic: 04. pluralization and grammar rules
- Why now: Chinese classifiers make naive concatenation unsafe.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when pluralization and grammar rules uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-040. Measure and decide the future of pluralization and grammar rules

- Priority: P2
- Effort: S
- Depends on: I18-039
- Epic: 04. pluralization and grammar rules
- Why now: Chinese classifiers make naive concatenation unsafe.
- Scope: Compare the observed result with the target from the outcome task: message format supports plural and classifier-aware cases. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_pluralization_grammar

## Epic 05: input method support

### I18-041. Audit input method support in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. input method support
- Why now: browser composition behavior varies.
- Scope: Trace Pinyin typing, Hanzi input, composition events, keyboards, and autocorrect. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-042. Define the outcome and measurement for input method support

- Priority: P2
- Effort: S
- Depends on: I18-041
- Epic: 05. input method support
- Why now: browser composition behavior varies.
- Scope: Write the intended result in plain language so that writing practice works with real input methods. Choose one observable measure based on this target: IME composition does not trigger premature answer checks.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-043. Design the data and state contract for input method support

- Priority: P1
- Effort: M
- Depends on: I18-042
- Epic: 05. input method support
- Why now: browser composition behavior varies.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in Pinyin typing, Hanzi input, composition events, keyboards, and autocorrect. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-044. Prototype input method support behind `ff_input_methods`

- Priority: P2
- Effort: M
- Depends on: I18-043
- Epic: 05. input method support
- Why now: browser composition behavior varies.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that browser composition behavior varies.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_input_methods

### I18-045. Implement the foundation for input method support

- Priority: P2
- Effort: L
- Depends on: I18-044
- Epic: 05. input method support
- Why now: browser composition behavior varies.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-046. Implement the core behavior for input method support

- Priority: P1
- Effort: L
- Depends on: I18-045
- Epic: 05. input method support
- Why now: browser composition behavior varies.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: writing practice works with real input methods. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_input_methods

### I18-047. Add edge states and failure handling for input method support

- Priority: P2
- Effort: M
- Depends on: I18-046
- Epic: 05. input method support
- Why now: browser composition behavior varies.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to Pinyin typing, Hanzi input, composition events, keyboards, and autocorrect.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-048. Verify input method support with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: I18-047
- Epic: 05. input method support
- Why now: browser composition behavior varies.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-049. Document rollout, cost, and operations for input method support

- Priority: P2
- Effort: S
- Depends on: I18-048
- Epic: 05. input method support
- Why now: browser composition behavior varies.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when input method support uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-050. Measure and decide the future of input method support

- Priority: P2
- Effort: S
- Depends on: I18-049
- Epic: 05. input method support
- Why now: browser composition behavior varies.
- Scope: Compare the observed result with the target from the outcome task: IME composition does not trigger premature answer checks. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_input_methods

## Epic 06: Chinese font rendering

### I18-051. Audit Chinese font rendering in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. Chinese font rendering
- Why now: bundled fonts can be large and licensed.
- Scope: Trace system fonts, font fallbacks, Pinyin diacritics, and mobile webviews. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-052. Define the outcome and measurement for Chinese font rendering

- Priority: P2
- Effort: S
- Depends on: I18-051
- Epic: 06. Chinese font rendering
- Why now: bundled fonts can be large and licensed.
- Scope: Write the intended result in plain language so that Hanzi and tone marks render consistently. Choose one observable measure based on this target: font stacks and rendering checks cover target platforms.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-053. Design the data and state contract for Chinese font rendering

- Priority: P1
- Effort: M
- Depends on: I18-052
- Epic: 06. Chinese font rendering
- Why now: bundled fonts can be large and licensed.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in system fonts, font fallbacks, Pinyin diacritics, and mobile webviews. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-054. Prototype Chinese font rendering behind `ff_font_rendering`

- Priority: P2
- Effort: M
- Depends on: I18-053
- Epic: 06. Chinese font rendering
- Why now: bundled fonts can be large and licensed.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that bundled fonts can be large and licensed.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_font_rendering

### I18-055. Implement the foundation for Chinese font rendering

- Priority: P2
- Effort: L
- Depends on: I18-054
- Epic: 06. Chinese font rendering
- Why now: bundled fonts can be large and licensed.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-056. Implement the core behavior for Chinese font rendering

- Priority: P1
- Effort: L
- Depends on: I18-055
- Epic: 06. Chinese font rendering
- Why now: bundled fonts can be large and licensed.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: Hanzi and tone marks render consistently. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_font_rendering

### I18-057. Add edge states and failure handling for Chinese font rendering

- Priority: P2
- Effort: M
- Depends on: I18-056
- Epic: 06. Chinese font rendering
- Why now: bundled fonts can be large and licensed.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to system fonts, font fallbacks, Pinyin diacritics, and mobile webviews.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-058. Verify Chinese font rendering with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: I18-057
- Epic: 06. Chinese font rendering
- Why now: bundled fonts can be large and licensed.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-059. Document rollout, cost, and operations for Chinese font rendering

- Priority: P2
- Effort: S
- Depends on: I18-058
- Epic: 06. Chinese font rendering
- Why now: bundled fonts can be large and licensed.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when Chinese font rendering uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-060. Measure and decide the future of Chinese font rendering

- Priority: P2
- Effort: S
- Depends on: I18-059
- Epic: 06. Chinese font rendering
- Why now: bundled fonts can be large and licensed.
- Scope: Compare the observed result with the target from the outcome task: font stacks and rendering checks cover target platforms. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_font_rendering

## Epic 07: locale-sensitive formatting

### I18-061. Audit locale-sensitive formatting in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. locale-sensitive formatting
- Why now: learning content may need fixed formatting independent of UI locale.
- Scope: Trace dates, numbers, progress, percentages, and streaks. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-062. Define the outcome and measurement for locale-sensitive formatting

- Priority: P2
- Effort: S
- Depends on: I18-061
- Epic: 07. locale-sensitive formatting
- Why now: learning content may need fixed formatting independent of UI locale.
- Scope: Write the intended result in plain language so that displayed values match the learner's locale. Choose one observable measure based on this target: formatting uses platform locale APIs rather than string concatenation.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-063. Design the data and state contract for locale-sensitive formatting

- Priority: P2
- Effort: M
- Depends on: I18-062
- Epic: 07. locale-sensitive formatting
- Why now: learning content may need fixed formatting independent of UI locale.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in dates, numbers, progress, percentages, and streaks. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-064. Prototype locale-sensitive formatting behind `ff_locale_formatting`

- Priority: P2
- Effort: M
- Depends on: I18-063
- Epic: 07. locale-sensitive formatting
- Why now: learning content may need fixed formatting independent of UI locale.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that learning content may need fixed formatting independent of UI locale.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_locale_formatting

### I18-065. Implement the foundation for locale-sensitive formatting

- Priority: P2
- Effort: L
- Depends on: I18-064
- Epic: 07. locale-sensitive formatting
- Why now: learning content may need fixed formatting independent of UI locale.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-066. Implement the core behavior for locale-sensitive formatting

- Priority: P2
- Effort: L
- Depends on: I18-065
- Epic: 07. locale-sensitive formatting
- Why now: learning content may need fixed formatting independent of UI locale.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: displayed values match the learner's locale. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_locale_formatting

### I18-067. Add edge states and failure handling for locale-sensitive formatting

- Priority: P2
- Effort: M
- Depends on: I18-066
- Epic: 07. locale-sensitive formatting
- Why now: learning content may need fixed formatting independent of UI locale.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to dates, numbers, progress, percentages, and streaks.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-068. Verify locale-sensitive formatting with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: I18-067
- Epic: 07. locale-sensitive formatting
- Why now: learning content may need fixed formatting independent of UI locale.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-069. Document rollout, cost, and operations for locale-sensitive formatting

- Priority: P2
- Effort: S
- Depends on: I18-068
- Epic: 07. locale-sensitive formatting
- Why now: learning content may need fixed formatting independent of UI locale.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when locale-sensitive formatting uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-070. Measure and decide the future of locale-sensitive formatting

- Priority: P2
- Effort: S
- Depends on: I18-069
- Epic: 07. locale-sensitive formatting
- Why now: learning content may need fixed formatting independent of UI locale.
- Scope: Compare the observed result with the target from the outcome task: formatting uses platform locale APIs rather than string concatenation. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_locale_formatting

## Epic 08: localization workflow

### I18-071. Audit localization workflow in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. localization workflow
- Why now: volunteer translation quality needs review.
- Scope: Trace message extraction, translator review, missing keys, and fallback. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-072. Define the outcome and measurement for localization workflow

- Priority: P2
- Effort: S
- Depends on: I18-071
- Epic: 08. localization workflow
- Why now: volunteer translation quality needs review.
- Scope: Write the intended result in plain language so that translations can be contributed safely. Choose one observable measure based on this target: missing and stale translations fail or report in CI.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-073. Design the data and state contract for localization workflow

- Priority: P2
- Effort: M
- Depends on: I18-072
- Epic: 08. localization workflow
- Why now: volunteer translation quality needs review.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in message extraction, translator review, missing keys, and fallback. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-074. Prototype localization workflow behind `ff_localization_workflow`

- Priority: P2
- Effort: M
- Depends on: I18-073
- Epic: 08. localization workflow
- Why now: volunteer translation quality needs review.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that volunteer translation quality needs review.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_localization_workflow

### I18-075. Implement the foundation for localization workflow

- Priority: P2
- Effort: L
- Depends on: I18-074
- Epic: 08. localization workflow
- Why now: volunteer translation quality needs review.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-076. Implement the core behavior for localization workflow

- Priority: P2
- Effort: L
- Depends on: I18-075
- Epic: 08. localization workflow
- Why now: volunteer translation quality needs review.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: translations can be contributed safely. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: ff_localization_workflow

### I18-077. Add edge states and failure handling for localization workflow

- Priority: P2
- Effort: M
- Depends on: I18-076
- Epic: 08. localization workflow
- Why now: volunteer translation quality needs review.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to message extraction, translator review, missing keys, and fallback.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-078. Verify localization workflow with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: I18-077
- Epic: 08. localization workflow
- Why now: volunteer translation quality needs review.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-079. Document rollout, cost, and operations for localization workflow

- Priority: P2
- Effort: S
- Depends on: I18-078
- Epic: 08. localization workflow
- Why now: volunteer translation quality needs review.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when localization workflow uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-080. Measure and decide the future of localization workflow

- Priority: P2
- Effort: S
- Depends on: I18-079
- Epic: 08. localization workflow
- Why now: volunteer translation quality needs review.
- Scope: Compare the observed result with the target from the outcome task: missing and stale translations fail or report in CI. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_localization_workflow

## Epic 09: localized learning content

### I18-081. Audit localized learning content in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. localized learning content
- Why now: translation quality affects learning directly.
- Scope: Trace English definitions, future native-language hints, examples, and explanations. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-082. Define the outcome and measurement for localized learning content

- Priority: P2
- Effort: S
- Depends on: I18-081
- Epic: 09. localized learning content
- Why now: translation quality affects learning directly.
- Scope: Write the intended result in plain language so that learning content can support more than English-speaking learners. Choose one observable measure based on this target: content model separates target language, instruction language, and metadata.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-083. Design the data and state contract for localized learning content

- Priority: P2
- Effort: M
- Depends on: I18-082
- Epic: 09. localized learning content
- Why now: translation quality affects learning directly.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in English definitions, future native-language hints, examples, and explanations. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-084. Prototype localized learning content behind `ff_localized_learning_content`

- Priority: P2
- Effort: M
- Depends on: I18-083
- Epic: 09. localized learning content
- Why now: translation quality affects learning directly.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that translation quality affects learning directly.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_localized_learning_content

### I18-085. Implement the foundation for localized learning content

- Priority: P2
- Effort: L
- Depends on: I18-084
- Epic: 09. localized learning content
- Why now: translation quality affects learning directly.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-086. Implement the core behavior for localized learning content

- Priority: P2
- Effort: L
- Depends on: I18-085
- Epic: 09. localized learning content
- Why now: translation quality affects learning directly.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: learning content can support more than English-speaking learners. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_localized_learning_content

### I18-087. Add edge states and failure handling for localized learning content

- Priority: P2
- Effort: M
- Depends on: I18-086
- Epic: 09. localized learning content
- Why now: translation quality affects learning directly.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to English definitions, future native-language hints, examples, and explanations.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-088. Verify localized learning content with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: I18-087
- Epic: 09. localized learning content
- Why now: translation quality affects learning directly.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-089. Document rollout, cost, and operations for localized learning content

- Priority: P2
- Effort: S
- Depends on: I18-088
- Epic: 09. localized learning content
- Why now: translation quality affects learning directly.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when localized learning content uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-090. Measure and decide the future of localized learning content

- Priority: P2
- Effort: S
- Depends on: I18-089
- Epic: 09. localized learning content
- Why now: translation quality affects learning directly.
- Scope: Compare the observed result with the target from the outcome task: content model separates target language, instruction language, and metadata. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_localized_learning_content

## Epic 10: locale testing

### I18-091. Audit locale testing in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. locale testing
- Why now: manual multilingual review requires contributor access.
- Scope: Trace pseudo-localization, Chinese text expansion, IME tests, and screen reader behavior. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-092. Define the outcome and measurement for locale testing

- Priority: P2
- Effort: S
- Depends on: I18-091
- Epic: 10. locale testing
- Why now: manual multilingual review requires contributor access.
- Scope: Write the intended result in plain language so that localization defects are found before release. Choose one observable measure based on this target: locale checks are part of the release matrix.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-093. Design the data and state contract for locale testing

- Priority: P2
- Effort: M
- Depends on: I18-092
- Epic: 10. locale testing
- Why now: manual multilingual review requires contributor access.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in pseudo-localization, Chinese text expansion, IME tests, and screen reader behavior. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-094. Prototype locale testing behind `ff_locale_testing`

- Priority: P2
- Effort: M
- Depends on: I18-093
- Epic: 10. locale testing
- Why now: manual multilingual review requires contributor access.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that manual multilingual review requires contributor access.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_locale_testing

### I18-095. Implement the foundation for locale testing

- Priority: P2
- Effort: L
- Depends on: I18-094
- Epic: 10. locale testing
- Why now: manual multilingual review requires contributor access.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-096. Implement the core behavior for locale testing

- Priority: P2
- Effort: L
- Depends on: I18-095
- Epic: 10. locale testing
- Why now: manual multilingual review requires contributor access.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: localization defects are found before release. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: ff_locale_testing

### I18-097. Add edge states and failure handling for locale testing

- Priority: P2
- Effort: M
- Depends on: I18-096
- Epic: 10. locale testing
- Why now: manual multilingual review requires contributor access.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to pseudo-localization, Chinese text expansion, IME tests, and screen reader behavior.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-098. Verify locale testing with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: I18-097
- Epic: 10. locale testing
- Why now: manual multilingual review requires contributor access.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-099. Document rollout, cost, and operations for locale testing

- Priority: P2
- Effort: S
- Depends on: I18-098
- Epic: 10. locale testing
- Why now: manual multilingual review requires contributor access.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when locale testing uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use local files, browser APIs, or open-source tooling. No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### I18-100. Measure and decide the future of locale testing

- Priority: P2
- Effort: S
- Depends on: I18-099
- Epic: 10. locale testing
- Why now: manual multilingual review requires contributor access.
- Scope: Compare the observed result with the target from the outcome task: locale checks are part of the release matrix. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_locale_testing

## Conflicts and feature-flag strategies

### Conflict 1: Full i18n library versus lightweight message catalog

| Option | Pros | Cons |
|---|---|---|
| Adopt a full i18n library | Pluralization, interpolation, and locale utilities are mature | Bundle size and setup increase for a small app |
| Use a lightweight message catalog | Implementation stays small and local | Complex pluralization and formatting may need reinvention |

Feature-flag or coexistence plan: Use a lightweight catalog first behind `ff_i18n_catalog`, and adopt a full library only when requirements prove it.

### Conflict 2: English-only interface versus multilingual interface

| Option | Pros | Cons |
|---|---|---|
| Keep English-only interface | Scope stays small; copy is easier to maintain | Learners with weaker English face an extra barrier |
| Support multilingual interface | More learners can use the app; instructions become clearer | Translation, testing, and maintenance increase |

Feature-flag or coexistence plan: Extract strings first, then add one high-value locale behind `ff_locale_es` or another learner-driven flag.

### Conflict 3: Bundled fonts versus system fonts

| Option | Pros | Cons |
|---|---|---|
| Bundle fonts | Rendering is more consistent across devices | Font files can be large and licensing must be reviewed |
| Use system fonts | Download size stays low and native rendering is familiar | Appearance and diacritic rendering vary by platform |

Feature-flag or coexistence plan: Use system fonts first. Consider a licensed subset font only after measuring rendering defects.

## Third-party service cost policy

Use open-source i18n tooling and volunteer review. Translation management services need renewable free-tier verification or cost-benefit analysis.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

### Cost-benefit analyses for options without a renewable free tier

| Option | Cost exposure | Benefit | Free alternative | Recommendation |
|---|---|---|---|---|
| Hosted translation management beyond a renewable free tier | Hosted translation platforms can charge by seats, strings, or projects. | Provides translator workflow, review history, and machine translation integrations. | Use versioned message files, pull request review, and volunteer or maintainer review. | Defer until multilingual contribution volume makes file-based review unmanageable. |
| Paid professional translation | Translation is usually priced per word or project rather than as a renewable free tier. | Can improve accuracy and learner trust for high-impact interface copy. | Start with community review and clear glossary rules. | Consider a small paid review only for core onboarding and safety copy after the first target locale is chosen. |

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
