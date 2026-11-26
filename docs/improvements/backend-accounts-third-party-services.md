# Backend, accounts, and third-party services improvement plan

## Purpose

Decide deliberately which capabilities need a server, which can stay local, and how every service respects the free-tier constraint.

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

## Epic 01: account necessity decision

### BE-001. Audit account necessity decision in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 01. account necessity decision
- Why now: accounts create cost, security, privacy, and support obligations.
- Scope: Trace sync, personalization, social features, support, and privacy. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-002. Define the outcome and measurement for account necessity decision

- Priority: P0
- Effort: S
- Depends on: BE-001
- Epic: 01. account necessity decision
- Why now: accounts create cost, security, privacy, and support obligations.
- Scope: Write the intended result in plain language so that accounts exist only if they unlock clear learner value. Choose one observable measure based on this target: a decision record compares local-first and account-backed designs.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-003. Design the data and state contract for account necessity decision

- Priority: P0
- Effort: M
- Depends on: BE-002
- Epic: 01. account necessity decision
- Why now: accounts create cost, security, privacy, and support obligations.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in sync, personalization, social features, support, and privacy. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-004. Evaluate the smallest real option for account necessity decision

- Priority: P2
- Effort: M
- Depends on: BE-003
- Epic: 01. account necessity decision
- Why now: accounts create cost, security, privacy, and support obligations.
- Scope: Compare the smallest real implementation or policy choice for sync, personalization, social features, support, and privacy. The evaluation must expose the risk that accounts create cost, security, privacy, and support obligations and must use the repository cost rule.
- Acceptance criteria: The evaluation records the evidence, the rejected option, the cost decision, and whether the default is keep, revise, or discard.
- Cost and service notes: Prefer local evaluation. Use a third-party service only if it has a renewable free tier and the evaluation states the quota assumption.
- Flag or conflict notes: ff_account_necessity

### BE-005. Write the decision foundation for account necessity decision

- Priority: P2
- Effort: L
- Depends on: BE-004
- Epic: 01. account necessity decision
- Why now: accounts create cost, security, privacy, and support obligations.
- Scope: Capture the options, constraints, privacy impact, cost screen, evidence gaps, rollback rule, and the smallest safe default. Keep the decision narrow enough to reverse when evidence changes.
- Acceptance criteria: The decision foundation is reviewable on its own and separates current behavior from the proposed default.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-006. Adopt the default decision for account necessity decision

- Priority: P1
- Effort: L
- Depends on: BE-005
- Epic: 01. account necessity decision
- Why now: accounts create cost, security, privacy, and support obligations.
- Scope: Write the default decision that moves the area toward this outcome: accounts exist only if they unlock clear learner value. Name the evidence that would reopen the decision.
- Acceptance criteria: The decision states what is adopted, what is rejected, what remains local-first, and what cost-benefit analysis is required before any paid dependency.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: ff_account_necessity

### BE-007. Document edge cases and failure handling for account necessity decision

- Priority: P2
- Effort: M
- Depends on: BE-006
- Epic: 01. account necessity decision
- Why now: accounts create cost, security, privacy, and support obligations.
- Scope: Cover missing evidence, quota exhaustion, service removal, pricing changes, privacy objections, and migration failure where they apply to sync, personalization, social features, support, and privacy.
- Acceptance criteria: Each relevant edge case has a fallback, an owner, and a clear rule for returning to the free local path.
- Cost and service notes: Use local analysis. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-008. Validate the decision for account necessity decision against real constraints

- Priority: P0
- Effort: M
- Depends on: BE-007
- Epic: 01. account necessity decision
- Why now: accounts create cost, security, privacy, and support obligations.
- Scope: Check the decision against the current app, the cost rule, privacy expectations, and the highest-risk failure path. Use a small real artifact or service-console check when one is available.
- Acceptance criteria: The validation names the evidence inspected, passes only when the decision still satisfies the constraints, and records any open assumption.
- Cost and service notes: Use open-source local test tooling and free service consoles. Paid validation infrastructure requires a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-009. Document rollout, cost, and operations for account necessity decision

- Priority: P2
- Effort: S
- Depends on: BE-008
- Epic: 01. account necessity decision
- Why now: accounts create cost, security, privacy, and support obligations.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when account necessity decision uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-010. Measure and decide the future of account necessity decision

- Priority: P2
- Effort: S
- Depends on: BE-009
- Epic: 01. account necessity decision
- Why now: accounts create cost, security, privacy, and support obligations.
- Scope: Compare the observed result with the target from the outcome task: a decision record compares local-first and account-backed designs. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_account_necessity

## Epic 02: authentication provider selection

### BE-011. Audit authentication provider selection in the current proof of concept

- Priority: P0
- Effort: S
- Depends on: None
- Epic: 02. authentication provider selection
- Why now: client-side static apps cannot keep auth secrets locally.
- Scope: Trace email magic links, OAuth, passkeys, managed auth, and self-hosted auth. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-012. Define the outcome and measurement for authentication provider selection

- Priority: P0
- Effort: S
- Depends on: BE-011
- Epic: 02. authentication provider selection
- Why now: client-side static apps cannot keep auth secrets locally.
- Scope: Write the intended result in plain language so that future sign-in is secure and cost-controlled. Choose one observable measure based on this target: a comparison covers renewable free tier, lock-in, privacy, and implementation effort.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-013. Design the data and state contract for authentication provider selection

- Priority: P0
- Effort: M
- Depends on: BE-012
- Epic: 02. authentication provider selection
- Why now: client-side static apps cannot keep auth secrets locally.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in email magic links, OAuth, passkeys, managed auth, and self-hosted auth. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-014. Evaluate the smallest real option for authentication provider selection

- Priority: P2
- Effort: M
- Depends on: BE-013
- Epic: 02. authentication provider selection
- Why now: client-side static apps cannot keep auth secrets locally.
- Scope: Compare the smallest real implementation or policy choice for email magic links, OAuth, passkeys, managed auth, and self-hosted auth. The evaluation must expose the risk that client-side static apps cannot keep auth secrets locally and must use the repository cost rule.
- Acceptance criteria: The evaluation records the evidence, the rejected option, the cost decision, and whether the default is keep, revise, or discard.
- Cost and service notes: Prefer local evaluation. Use a third-party service only if it has a renewable free tier and the evaluation states the quota assumption.
- Flag or conflict notes: ff_auth_provider

### BE-015. Write the decision foundation for authentication provider selection

- Priority: P2
- Effort: L
- Depends on: BE-014
- Epic: 02. authentication provider selection
- Why now: client-side static apps cannot keep auth secrets locally.
- Scope: Capture the options, constraints, privacy impact, cost screen, evidence gaps, rollback rule, and the smallest safe default. Keep the decision narrow enough to reverse when evidence changes.
- Acceptance criteria: The decision foundation is reviewable on its own and separates current behavior from the proposed default.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-016. Adopt the default decision for authentication provider selection

- Priority: P1
- Effort: L
- Depends on: BE-015
- Epic: 02. authentication provider selection
- Why now: client-side static apps cannot keep auth secrets locally.
- Scope: Write the default decision that moves the area toward this outcome: future sign-in is secure and cost-controlled. Name the evidence that would reopen the decision.
- Acceptance criteria: The decision states what is adopted, what is rejected, what remains local-first, and what cost-benefit analysis is required before any paid dependency.
- Cost and service notes: Use only a service with a renewable free tier that covers the expected usage. Verify current terms before adoption and keep a local fallback.
- Flag or conflict notes: ff_auth_provider

### BE-017. Document edge cases and failure handling for authentication provider selection

- Priority: P2
- Effort: M
- Depends on: BE-016
- Epic: 02. authentication provider selection
- Why now: client-side static apps cannot keep auth secrets locally.
- Scope: Cover missing evidence, quota exhaustion, service removal, pricing changes, privacy objections, and migration failure where they apply to email magic links, OAuth, passkeys, managed auth, and self-hosted auth.
- Acceptance criteria: Each relevant edge case has a fallback, an owner, and a clear rule for returning to the free local path.
- Cost and service notes: Use local analysis. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-018. Validate the decision for authentication provider selection against real constraints

- Priority: P0
- Effort: M
- Depends on: BE-017
- Epic: 02. authentication provider selection
- Why now: client-side static apps cannot keep auth secrets locally.
- Scope: Check the decision against the current app, the cost rule, privacy expectations, and the highest-risk failure path. Use a small real artifact or service-console check when one is available.
- Acceptance criteria: The validation names the evidence inspected, passes only when the decision still satisfies the constraints, and records any open assumption.
- Cost and service notes: Use open-source local test tooling and free service consoles. Paid validation infrastructure requires a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-019. Document rollout, cost, and operations for authentication provider selection

- Priority: P2
- Effort: S
- Depends on: BE-018
- Epic: 02. authentication provider selection
- Why now: client-side static apps cannot keep auth secrets locally.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when authentication provider selection uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use only a service with a renewable free tier that covers the expected usage. Verify current terms before adoption and keep a local fallback.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-020. Measure and decide the future of authentication provider selection

- Priority: P2
- Effort: S
- Depends on: BE-019
- Epic: 02. authentication provider selection
- Why now: client-side static apps cannot keep auth secrets locally.
- Scope: Compare the observed result with the target from the outcome task: a comparison covers renewable free tier, lock-in, privacy, and implementation effort. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_auth_provider

## Epic 03: managed database selection

### BE-021. Audit managed database selection in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 03. managed database selection
- Why now: free tiers can change or become insufficient.
- Scope: Trace Neon, Supabase, Firebase, SQLite replication, and self-hosted Postgres. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-022. Define the outcome and measurement for managed database selection

- Priority: P2
- Effort: S
- Depends on: BE-021
- Epic: 03. managed database selection
- Why now: free tiers can change or become insufficient.
- Scope: Write the intended result in plain language so that future sync storage has a deliberate home. Choose one observable measure based on this target: a decision record covers free-tier renewal, egress, branching, export, and lock-in.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-023. Design the data and state contract for managed database selection

- Priority: P1
- Effort: M
- Depends on: BE-022
- Epic: 03. managed database selection
- Why now: free tiers can change or become insufficient.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in Neon, Supabase, Firebase, SQLite replication, and self-hosted Postgres. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-024. Evaluate the smallest real option for managed database selection

- Priority: P2
- Effort: M
- Depends on: BE-023
- Epic: 03. managed database selection
- Why now: free tiers can change or become insufficient.
- Scope: Compare the smallest real implementation or policy choice for Neon, Supabase, Firebase, SQLite replication, and self-hosted Postgres. The evaluation must expose the risk that free tiers can change or become insufficient and must use the repository cost rule.
- Acceptance criteria: The evaluation records the evidence, the rejected option, the cost decision, and whether the default is keep, revise, or discard.
- Cost and service notes: Prefer local evaluation. Use a third-party service only if it has a renewable free tier and the evaluation states the quota assumption.
- Flag or conflict notes: ff_managed_database

### BE-025. Write the decision foundation for managed database selection

- Priority: P2
- Effort: L
- Depends on: BE-024
- Epic: 03. managed database selection
- Why now: free tiers can change or become insufficient.
- Scope: Capture the options, constraints, privacy impact, cost screen, evidence gaps, rollback rule, and the smallest safe default. Keep the decision narrow enough to reverse when evidence changes.
- Acceptance criteria: The decision foundation is reviewable on its own and separates current behavior from the proposed default.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-026. Adopt the default decision for managed database selection

- Priority: P1
- Effort: L
- Depends on: BE-025
- Epic: 03. managed database selection
- Why now: free tiers can change or become insufficient.
- Scope: Write the default decision that moves the area toward this outcome: future sync storage has a deliberate home. Name the evidence that would reopen the decision.
- Acceptance criteria: The decision states what is adopted, what is rejected, what remains local-first, and what cost-benefit analysis is required before any paid dependency.
- Cost and service notes: Use only a service with a renewable free tier that covers the expected usage. Verify current terms before adoption and keep a local fallback.
- Flag or conflict notes: ff_managed_database

### BE-027. Document edge cases and failure handling for managed database selection

- Priority: P2
- Effort: M
- Depends on: BE-026
- Epic: 03. managed database selection
- Why now: free tiers can change or become insufficient.
- Scope: Cover missing evidence, quota exhaustion, service removal, pricing changes, privacy objections, and migration failure where they apply to Neon, Supabase, Firebase, SQLite replication, and self-hosted Postgres.
- Acceptance criteria: Each relevant edge case has a fallback, an owner, and a clear rule for returning to the free local path.
- Cost and service notes: Use local analysis. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-028. Validate the decision for managed database selection against real constraints

- Priority: P1
- Effort: M
- Depends on: BE-027
- Epic: 03. managed database selection
- Why now: free tiers can change or become insufficient.
- Scope: Check the decision against the current app, the cost rule, privacy expectations, and the highest-risk failure path. Use a small real artifact or service-console check when one is available.
- Acceptance criteria: The validation names the evidence inspected, passes only when the decision still satisfies the constraints, and records any open assumption.
- Cost and service notes: Use open-source local test tooling and free service consoles. Paid validation infrastructure requires a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-029. Document rollout, cost, and operations for managed database selection

- Priority: P2
- Effort: S
- Depends on: BE-028
- Epic: 03. managed database selection
- Why now: free tiers can change or become insufficient.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when managed database selection uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use only a service with a renewable free tier that covers the expected usage. Verify current terms before adoption and keep a local fallback.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-030. Measure and decide the future of managed database selection

- Priority: P2
- Effort: S
- Depends on: BE-029
- Epic: 03. managed database selection
- Why now: free tiers can change or become insufficient.
- Scope: Compare the observed result with the target from the outcome task: a decision record covers free-tier renewal, egress, branching, export, and lock-in. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_managed_database

## Epic 04: object storage selection

### BE-031. Audit object storage selection in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 04. object storage selection
- Why now: media storage and egress can become the largest cost.
- Scope: Trace media assets, recordings, backups, and user-generated content. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-032. Define the outcome and measurement for object storage selection

- Priority: P2
- Effort: S
- Depends on: BE-031
- Epic: 04. object storage selection
- Why now: media storage and egress can become the largest cost.
- Scope: Write the intended result in plain language so that binary data has a cost-controlled storage plan. Choose one observable measure based on this target: a comparison covers free tier, bandwidth, privacy, portability, and retention.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-033. Design the data and state contract for object storage selection

- Priority: P1
- Effort: M
- Depends on: BE-032
- Epic: 04. object storage selection
- Why now: media storage and egress can become the largest cost.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in media assets, recordings, backups, and user-generated content. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-034. Evaluate the smallest real option for object storage selection

- Priority: P2
- Effort: M
- Depends on: BE-033
- Epic: 04. object storage selection
- Why now: media storage and egress can become the largest cost.
- Scope: Compare the smallest real implementation or policy choice for media assets, recordings, backups, and user-generated content. The evaluation must expose the risk that media storage and egress can become the largest cost and must use the repository cost rule.
- Acceptance criteria: The evaluation records the evidence, the rejected option, the cost decision, and whether the default is keep, revise, or discard.
- Cost and service notes: Prefer local evaluation. Use a third-party service only if it has a renewable free tier and the evaluation states the quota assumption.
- Flag or conflict notes: ff_object_storage

### BE-035. Write the decision foundation for object storage selection

- Priority: P2
- Effort: L
- Depends on: BE-034
- Epic: 04. object storage selection
- Why now: media storage and egress can become the largest cost.
- Scope: Capture the options, constraints, privacy impact, cost screen, evidence gaps, rollback rule, and the smallest safe default. Keep the decision narrow enough to reverse when evidence changes.
- Acceptance criteria: The decision foundation is reviewable on its own and separates current behavior from the proposed default.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-036. Adopt the default decision for object storage selection

- Priority: P1
- Effort: L
- Depends on: BE-035
- Epic: 04. object storage selection
- Why now: media storage and egress can become the largest cost.
- Scope: Write the default decision that moves the area toward this outcome: binary data has a cost-controlled storage plan. Name the evidence that would reopen the decision.
- Acceptance criteria: The decision states what is adopted, what is rejected, what remains local-first, and what cost-benefit analysis is required before any paid dependency.
- Cost and service notes: Use only a service with a renewable free tier that covers the expected usage. Verify current terms before adoption and keep a local fallback.
- Flag or conflict notes: ff_object_storage

### BE-037. Document edge cases and failure handling for object storage selection

- Priority: P2
- Effort: M
- Depends on: BE-036
- Epic: 04. object storage selection
- Why now: media storage and egress can become the largest cost.
- Scope: Cover missing evidence, quota exhaustion, service removal, pricing changes, privacy objections, and migration failure where they apply to media assets, recordings, backups, and user-generated content.
- Acceptance criteria: Each relevant edge case has a fallback, an owner, and a clear rule for returning to the free local path.
- Cost and service notes: Use local analysis. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-038. Validate the decision for object storage selection against real constraints

- Priority: P1
- Effort: M
- Depends on: BE-037
- Epic: 04. object storage selection
- Why now: media storage and egress can become the largest cost.
- Scope: Check the decision against the current app, the cost rule, privacy expectations, and the highest-risk failure path. Use a small real artifact or service-console check when one is available.
- Acceptance criteria: The validation names the evidence inspected, passes only when the decision still satisfies the constraints, and records any open assumption.
- Cost and service notes: Use open-source local test tooling and free service consoles. Paid validation infrastructure requires a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-039. Document rollout, cost, and operations for object storage selection

- Priority: P2
- Effort: S
- Depends on: BE-038
- Epic: 04. object storage selection
- Why now: media storage and egress can become the largest cost.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when object storage selection uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use only a service with a renewable free tier that covers the expected usage. Verify current terms before adoption and keep a local fallback.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-040. Measure and decide the future of object storage selection

- Priority: P2
- Effort: S
- Depends on: BE-039
- Epic: 04. object storage selection
- Why now: media storage and egress can become the largest cost.
- Scope: Compare the observed result with the target from the outcome task: a comparison covers free tier, bandwidth, privacy, portability, and retention. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_object_storage

## Epic 05: sync service design

### BE-041. Audit sync service design in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 05. sync service design
- Why now: sync is a large distributed-systems feature.
- Scope: Trace progress sync, custom decks, conflict resolution, and offline-first behavior. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-042. Define the outcome and measurement for sync service design

- Priority: P2
- Effort: S
- Depends on: BE-041
- Epic: 05. sync service design
- Why now: sync is a large distributed-systems feature.
- Scope: Write the intended result in plain language so that multi-device learners keep progress without losing local control. Choose one observable measure based on this target: a sync design names data ownership, conflict rules, and failure behavior.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-043. Design the data and state contract for sync service design

- Priority: P1
- Effort: M
- Depends on: BE-042
- Epic: 05. sync service design
- Why now: sync is a large distributed-systems feature.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in progress sync, custom decks, conflict resolution, and offline-first behavior. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-044. Prototype sync service design behind `ff_sync_service`

- Priority: P2
- Effort: M
- Depends on: BE-043
- Epic: 05. sync service design
- Why now: sync is a large distributed-systems feature.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that sync is a large distributed-systems feature.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_sync_service

### BE-045. Implement the foundation for sync service design

- Priority: P2
- Effort: L
- Depends on: BE-044
- Epic: 05. sync service design
- Why now: sync is a large distributed-systems feature.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-046. Implement the core behavior for sync service design

- Priority: P1
- Effort: L
- Depends on: BE-045
- Epic: 05. sync service design
- Why now: sync is a large distributed-systems feature.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: multi-device learners keep progress without losing local control. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: ff_sync_service

### BE-047. Add edge states and failure handling for sync service design

- Priority: P2
- Effort: M
- Depends on: BE-046
- Epic: 05. sync service design
- Why now: sync is a large distributed-systems feature.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to progress sync, custom decks, conflict resolution, and offline-first behavior.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-048. Verify sync service design with behavior-focused checks

- Priority: P1
- Effort: M
- Depends on: BE-047
- Epic: 05. sync service design
- Why now: sync is a large distributed-systems feature.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-049. Document rollout, cost, and operations for sync service design

- Priority: P2
- Effort: S
- Depends on: BE-048
- Epic: 05. sync service design
- Why now: sync is a large distributed-systems feature.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when sync service design uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-050. Measure and decide the future of sync service design

- Priority: P2
- Effort: S
- Depends on: BE-049
- Epic: 05. sync service design
- Why now: sync is a large distributed-systems feature.
- Scope: Compare the observed result with the target from the outcome task: a sync design names data ownership, conflict rules, and failure behavior. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_sync_service

## Epic 06: push notification decision

### BE-051. Audit push notification decision in the current proof of concept

- Priority: P1
- Effort: S
- Depends on: None
- Epic: 06. push notification decision
- Why now: push requires service infrastructure and careful consent.
- Scope: Trace practice reminders, review prompts, permission, and platform support. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-052. Define the outcome and measurement for push notification decision

- Priority: P2
- Effort: S
- Depends on: BE-051
- Epic: 06. push notification decision
- Why now: push requires service infrastructure and careful consent.
- Scope: Write the intended result in plain language so that reminders are useful without becoming intrusive. Choose one observable measure based on this target: a decision record compares local notifications, push services, and email.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-053. Design the data and state contract for push notification decision

- Priority: P1
- Effort: M
- Depends on: BE-052
- Epic: 06. push notification decision
- Why now: push requires service infrastructure and careful consent.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in practice reminders, review prompts, permission, and platform support. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-054. Evaluate the smallest real option for push notification decision

- Priority: P2
- Effort: M
- Depends on: BE-053
- Epic: 06. push notification decision
- Why now: push requires service infrastructure and careful consent.
- Scope: Compare the smallest real implementation or policy choice for practice reminders, review prompts, permission, and platform support. The evaluation must expose the risk that push requires service infrastructure and careful consent and must use the repository cost rule.
- Acceptance criteria: The evaluation records the evidence, the rejected option, the cost decision, and whether the default is keep, revise, or discard.
- Cost and service notes: Prefer local evaluation. Use a third-party service only if it has a renewable free tier and the evaluation states the quota assumption.
- Flag or conflict notes: ff_push_notifications

### BE-055. Write the decision foundation for push notification decision

- Priority: P2
- Effort: L
- Depends on: BE-054
- Epic: 06. push notification decision
- Why now: push requires service infrastructure and careful consent.
- Scope: Capture the options, constraints, privacy impact, cost screen, evidence gaps, rollback rule, and the smallest safe default. Keep the decision narrow enough to reverse when evidence changes.
- Acceptance criteria: The decision foundation is reviewable on its own and separates current behavior from the proposed default.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-056. Adopt the default decision for push notification decision

- Priority: P1
- Effort: L
- Depends on: BE-055
- Epic: 06. push notification decision
- Why now: push requires service infrastructure and careful consent.
- Scope: Write the default decision that moves the area toward this outcome: reminders are useful without becoming intrusive. Name the evidence that would reopen the decision.
- Acceptance criteria: The decision states what is adopted, what is rejected, what remains local-first, and what cost-benefit analysis is required before any paid dependency.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: ff_push_notifications

### BE-057. Document edge cases and failure handling for push notification decision

- Priority: P2
- Effort: M
- Depends on: BE-056
- Epic: 06. push notification decision
- Why now: push requires service infrastructure and careful consent.
- Scope: Cover missing evidence, quota exhaustion, service removal, pricing changes, privacy objections, and migration failure where they apply to practice reminders, review prompts, permission, and platform support.
- Acceptance criteria: Each relevant edge case has a fallback, an owner, and a clear rule for returning to the free local path.
- Cost and service notes: Use local analysis. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-058. Validate the decision for push notification decision against real constraints

- Priority: P1
- Effort: M
- Depends on: BE-057
- Epic: 06. push notification decision
- Why now: push requires service infrastructure and careful consent.
- Scope: Check the decision against the current app, the cost rule, privacy expectations, and the highest-risk failure path. Use a small real artifact or service-console check when one is available.
- Acceptance criteria: The validation names the evidence inspected, passes only when the decision still satisfies the constraints, and records any open assumption.
- Cost and service notes: Use open-source local test tooling and free service consoles. Paid validation infrastructure requires a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-059. Document rollout, cost, and operations for push notification decision

- Priority: P2
- Effort: S
- Depends on: BE-058
- Epic: 06. push notification decision
- Why now: push requires service infrastructure and careful consent.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when push notification decision uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-060. Measure and decide the future of push notification decision

- Priority: P2
- Effort: S
- Depends on: BE-059
- Epic: 06. push notification decision
- Why now: push requires service infrastructure and careful consent.
- Scope: Compare the observed result with the target from the outcome task: a decision record compares local notifications, push services, and email. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_push_notifications

## Epic 07: crash and error reporting

### BE-061. Audit crash and error reporting in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 07. crash and error reporting
- Why now: error reports can contain sensitive context.
- Scope: Trace browser errors, native crashes, privacy, sampling, and alerting. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-062. Define the outcome and measurement for crash and error reporting

- Priority: P2
- Effort: S
- Depends on: BE-061
- Epic: 07. crash and error reporting
- Why now: error reports can contain sensitive context.
- Scope: Write the intended result in plain language so that the maintainer learns about failures before users abandon. Choose one observable measure based on this target: a comparison covers free tier, data minimization, source maps, and self-hosting.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-063. Design the data and state contract for crash and error reporting

- Priority: P2
- Effort: M
- Depends on: BE-062
- Epic: 07. crash and error reporting
- Why now: error reports can contain sensitive context.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in browser errors, native crashes, privacy, sampling, and alerting. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-064. Prototype crash and error reporting behind `ff_crash_reporting`

- Priority: P2
- Effort: M
- Depends on: BE-063
- Epic: 07. crash and error reporting
- Why now: error reports can contain sensitive context.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that error reports can contain sensitive context.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_crash_reporting

### BE-065. Implement the foundation for crash and error reporting

- Priority: P2
- Effort: L
- Depends on: BE-064
- Epic: 07. crash and error reporting
- Why now: error reports can contain sensitive context.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-066. Implement the core behavior for crash and error reporting

- Priority: P2
- Effort: L
- Depends on: BE-065
- Epic: 07. crash and error reporting
- Why now: error reports can contain sensitive context.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: the maintainer learns about failures before users abandon. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Use only a service with a renewable free tier that covers the expected usage. Verify current terms before adoption and keep a local fallback.
- Flag or conflict notes: ff_crash_reporting

### BE-067. Add edge states and failure handling for crash and error reporting

- Priority: P2
- Effort: M
- Depends on: BE-066
- Epic: 07. crash and error reporting
- Why now: error reports can contain sensitive context.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to browser errors, native crashes, privacy, sampling, and alerting.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-068. Verify crash and error reporting with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: BE-067
- Epic: 07. crash and error reporting
- Why now: error reports can contain sensitive context.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-069. Document rollout, cost, and operations for crash and error reporting

- Priority: P2
- Effort: S
- Depends on: BE-068
- Epic: 07. crash and error reporting
- Why now: error reports can contain sensitive context.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when crash and error reporting uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use only a service with a renewable free tier that covers the expected usage. Verify current terms before adoption and keep a local fallback.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-070. Measure and decide the future of crash and error reporting

- Priority: P2
- Effort: S
- Depends on: BE-069
- Epic: 07. crash and error reporting
- Why now: error reports can contain sensitive context.
- Scope: Compare the observed result with the target from the outcome task: a comparison covers free tier, data minimization, source maps, and self-hosting. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_crash_reporting

## Epic 08: email and support service decision

### BE-071. Audit email and support service decision in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 08. email and support service decision
- Why now: transactional email often becomes paid as volume grows.
- Scope: Trace feedback, account emails, support replies, and transactional mail. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-072. Define the outcome and measurement for email and support service decision

- Priority: P2
- Effort: S
- Depends on: BE-071
- Epic: 08. email and support service decision
- Why now: transactional email often becomes paid as volume grows.
- Scope: Write the intended result in plain language so that support communication has a low-cost path. Choose one observable measure based on this target: a decision record compares free tiers, deliverability, privacy, and maintenance.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-073. Design the data and state contract for email and support service decision

- Priority: P2
- Effort: M
- Depends on: BE-072
- Epic: 08. email and support service decision
- Why now: transactional email often becomes paid as volume grows.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in feedback, account emails, support replies, and transactional mail. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-074. Evaluate the smallest real option for email and support service decision

- Priority: P2
- Effort: M
- Depends on: BE-073
- Epic: 08. email and support service decision
- Why now: transactional email often becomes paid as volume grows.
- Scope: Compare the smallest real implementation or policy choice for feedback, account emails, support replies, and transactional mail. The evaluation must expose the risk that transactional email often becomes paid as volume grows and must use the repository cost rule.
- Acceptance criteria: The evaluation records the evidence, the rejected option, the cost decision, and whether the default is keep, revise, or discard.
- Cost and service notes: Prefer local evaluation. Use a third-party service only if it has a renewable free tier and the evaluation states the quota assumption.
- Flag or conflict notes: ff_email_support

### BE-075. Write the decision foundation for email and support service decision

- Priority: P2
- Effort: L
- Depends on: BE-074
- Epic: 08. email and support service decision
- Why now: transactional email often becomes paid as volume grows.
- Scope: Capture the options, constraints, privacy impact, cost screen, evidence gaps, rollback rule, and the smallest safe default. Keep the decision narrow enough to reverse when evidence changes.
- Acceptance criteria: The decision foundation is reviewable on its own and separates current behavior from the proposed default.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-076. Adopt the default decision for email and support service decision

- Priority: P2
- Effort: L
- Depends on: BE-075
- Epic: 08. email and support service decision
- Why now: transactional email often becomes paid as volume grows.
- Scope: Write the default decision that moves the area toward this outcome: support communication has a low-cost path. Name the evidence that would reopen the decision.
- Acceptance criteria: The decision states what is adopted, what is rejected, what remains local-first, and what cost-benefit analysis is required before any paid dependency.
- Cost and service notes: Use only a service with a renewable free tier that covers the expected usage. Verify current terms before adoption and keep a local fallback.
- Flag or conflict notes: ff_email_support

### BE-077. Document edge cases and failure handling for email and support service decision

- Priority: P2
- Effort: M
- Depends on: BE-076
- Epic: 08. email and support service decision
- Why now: transactional email often becomes paid as volume grows.
- Scope: Cover missing evidence, quota exhaustion, service removal, pricing changes, privacy objections, and migration failure where they apply to feedback, account emails, support replies, and transactional mail.
- Acceptance criteria: Each relevant edge case has a fallback, an owner, and a clear rule for returning to the free local path.
- Cost and service notes: Use local analysis. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-078. Validate the decision for email and support service decision against real constraints

- Priority: P2
- Effort: M
- Depends on: BE-077
- Epic: 08. email and support service decision
- Why now: transactional email often becomes paid as volume grows.
- Scope: Check the decision against the current app, the cost rule, privacy expectations, and the highest-risk failure path. Use a small real artifact or service-console check when one is available.
- Acceptance criteria: The validation names the evidence inspected, passes only when the decision still satisfies the constraints, and records any open assumption.
- Cost and service notes: Use open-source local test tooling and free service consoles. Paid validation infrastructure requires a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-079. Document rollout, cost, and operations for email and support service decision

- Priority: P2
- Effort: S
- Depends on: BE-078
- Epic: 08. email and support service decision
- Why now: transactional email often becomes paid as volume grows.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when email and support service decision uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Use only a service with a renewable free tier that covers the expected usage. Verify current terms before adoption and keep a local fallback.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-080. Measure and decide the future of email and support service decision

- Priority: P2
- Effort: S
- Depends on: BE-079
- Epic: 08. email and support service decision
- Why now: transactional email often becomes paid as volume grows.
- Scope: Compare the observed result with the target from the outcome task: a decision record compares free tiers, deliverability, privacy, and maintenance. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_email_support

## Epic 09: payments and monetization analysis

### BE-081. Audit payments and monetization analysis in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 09. payments and monetization analysis
- Why now: payments are not free even when there is no monthly fee.
- Scope: Trace donations, subscriptions, one-time purchases, app-store rules, and service fees. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-082. Define the outcome and measurement for payments and monetization analysis

- Priority: P2
- Effort: S
- Depends on: BE-081
- Epic: 09. payments and monetization analysis
- Why now: payments are not free even when there is no monthly fee.
- Scope: Write the intended result in plain language so that sustainability options are understood before building them. Choose one observable measure based on this target: a cost-benefit analysis compares fees, tax work, learner value, and maintenance.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-083. Design the data and state contract for payments and monetization analysis

- Priority: P2
- Effort: M
- Depends on: BE-082
- Epic: 09. payments and monetization analysis
- Why now: payments are not free even when there is no monthly fee.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in donations, subscriptions, one-time purchases, app-store rules, and service fees. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-084. Evaluate the smallest real option for payments and monetization analysis

- Priority: P2
- Effort: M
- Depends on: BE-083
- Epic: 09. payments and monetization analysis
- Why now: payments are not free even when there is no monthly fee.
- Scope: Compare the smallest real implementation or policy choice for donations, subscriptions, one-time purchases, app-store rules, and service fees. The evaluation must expose the risk that payments are not free even when there is no monthly fee and must use the repository cost rule.
- Acceptance criteria: The evaluation records the evidence, the rejected option, the cost decision, and whether the default is keep, revise, or discard.
- Cost and service notes: Prefer local evaluation. Use a third-party service only if it has a renewable free tier and the evaluation states the quota assumption.
- Flag or conflict notes: ff_payments_monetization

### BE-085. Write the decision foundation for payments and monetization analysis

- Priority: P2
- Effort: L
- Depends on: BE-084
- Epic: 09. payments and monetization analysis
- Why now: payments are not free even when there is no monthly fee.
- Scope: Capture the options, constraints, privacy impact, cost screen, evidence gaps, rollback rule, and the smallest safe default. Keep the decision narrow enough to reverse when evidence changes.
- Acceptance criteria: The decision foundation is reviewable on its own and separates current behavior from the proposed default.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-086. Adopt the default decision for payments and monetization analysis

- Priority: P2
- Effort: L
- Depends on: BE-085
- Epic: 09. payments and monetization analysis
- Why now: payments are not free even when there is no monthly fee.
- Scope: Write the default decision that moves the area toward this outcome: sustainability options are understood before building them. Name the evidence that would reopen the decision.
- Acceptance criteria: The decision states what is adopted, what is rejected, what remains local-first, and what cost-benefit analysis is required before any paid dependency.
- Cost and service notes: Assume that no renewable free tier exists until proven otherwise. Write a cost-benefit analysis with monthly cost, learner benefit, free alternative, and exit cost before adoption.
- Flag or conflict notes: ff_payments_monetization

### BE-087. Document edge cases and failure handling for payments and monetization analysis

- Priority: P2
- Effort: M
- Depends on: BE-086
- Epic: 09. payments and monetization analysis
- Why now: payments are not free even when there is no monthly fee.
- Scope: Cover missing evidence, quota exhaustion, service removal, pricing changes, privacy objections, and migration failure where they apply to donations, subscriptions, one-time purchases, app-store rules, and service fees.
- Acceptance criteria: Each relevant edge case has a fallback, an owner, and a clear rule for returning to the free local path.
- Cost and service notes: Use local analysis. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-088. Validate the decision for payments and monetization analysis against real constraints

- Priority: P2
- Effort: M
- Depends on: BE-087
- Epic: 09. payments and monetization analysis
- Why now: payments are not free even when there is no monthly fee.
- Scope: Check the decision against the current app, the cost rule, privacy expectations, and the highest-risk failure path. Use a small real artifact or service-console check when one is available.
- Acceptance criteria: The validation names the evidence inspected, passes only when the decision still satisfies the constraints, and records any open assumption.
- Cost and service notes: Use open-source local test tooling and free service consoles. Paid validation infrastructure requires a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-089. Document rollout, cost, and operations for payments and monetization analysis

- Priority: P2
- Effort: S
- Depends on: BE-088
- Epic: 09. payments and monetization analysis
- Why now: payments are not free even when there is no monthly fee.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when payments and monetization analysis uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Assume that no renewable free tier exists until proven otherwise. Write a cost-benefit analysis with monthly cost, learner benefit, free alternative, and exit cost before adoption.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-090. Measure and decide the future of payments and monetization analysis

- Priority: P2
- Effort: S
- Depends on: BE-089
- Epic: 09. payments and monetization analysis
- Why now: payments are not free even when there is no monthly fee.
- Scope: Compare the observed result with the target from the outcome task: a cost-benefit analysis compares fees, tax work, learner value, and maintenance. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_payments_monetization

## Epic 10: service cost governance and exit plan

### BE-091. Audit service cost governance and exit plan in the current proof of concept

- Priority: P2
- Effort: S
- Depends on: None
- Epic: 10. service cost governance and exit plan
- Why now: service pricing and terms change.
- Scope: Trace quotas, alerts, renewals, exports, backups, and vendor replacement. Record current behavior, owners, inputs, outputs, and visible failure modes before proposing a redesign.
- Acceptance criteria: A baseline note names the exact files or screens inspected, the current behavior, and at least three concrete gaps or constraints.
- Cost and service notes: No runtime change. Use local inspection and notes only.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-092. Define the outcome and measurement for service cost governance and exit plan

- Priority: P2
- Effort: S
- Depends on: BE-091
- Epic: 10. service cost governance and exit plan
- Why now: service pricing and terms change.
- Scope: Write the intended result in plain language so that free-tier usage never becomes a surprise bill or lock-in trap. Choose one observable measure based on this target: every service has an owner, quota check, export path, and replacement plan.
- Acceptance criteria: The task note states the beneficiary, the outcome, one non-goal, one metric, and the decision the metric can change.
- Cost and service notes: No service is required. Measurement design happens locally.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-093. Design the data and state contract for service cost governance and exit plan

- Priority: P2
- Effort: M
- Depends on: BE-092
- Epic: 10. service cost governance and exit plan
- Why now: service pricing and terms change.
- Scope: Name the entities, events, states, ownership, validation rules, and migration constraints involved in quotas, alerts, renewals, exports, backups, and vendor replacement. Keep the contract small enough for the proof of concept.
- Acceptance criteria: The design makes invalid states hard to represent and names the boundary where external data is validated.
- Cost and service notes: No service is required. Store the contract in local documentation or local configuration.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-094. Prototype service cost governance and exit plan behind `ff_cost_governance_exit`

- Priority: P2
- Effort: M
- Depends on: BE-093
- Epic: 10. service cost governance and exit plan
- Why now: service pricing and terms change.
- Scope: Build the smallest throwaway or feature-flagged proof that answers the main uncertainty. The prototype must expose the risk that service pricing and terms change.
- Acceptance criteria: The prototype can be switched off cleanly, and the result is recorded as keep, revise, or discard.
- Cost and service notes: Prefer local prototype code. Use a third-party service only if it has a renewable free tier and the prototype states the quota assumption.
- Flag or conflict notes: ff_cost_governance_exit

### BE-095. Implement the foundation for service cost governance and exit plan

- Priority: P2
- Effort: L
- Depends on: BE-094
- Epic: 10. service cost governance and exit plan
- Why now: service pricing and terms change.
- Scope: Create the smallest stable structure that later work can reuse. Move or rename only what the foundation needs, and keep unrelated behavior unchanged.
- Acceptance criteria: The foundation is reviewable on its own and existing learner-visible behavior remains unchanged unless the task explicitly says otherwise.
- Cost and service notes: No third-party service is required.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-096. Implement the core behavior for service cost governance and exit plan

- Priority: P2
- Effort: L
- Depends on: BE-095
- Epic: 10. service cost governance and exit plan
- Why now: service pricing and terms change.
- Scope: Implement the minimum complete behavior that moves the area toward this outcome: free-tier usage never becomes a surprise bill or lock-in trap. Keep advanced options out unless they are required for correctness.
- Acceptance criteria: The main path works end to end in the affected surface, and the feature flag or rollback path still disables it when required.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: ff_cost_governance_exit

### BE-097. Add edge states and failure handling for service cost governance and exit plan

- Priority: P2
- Effort: M
- Depends on: BE-096
- Epic: 10. service cost governance and exit plan
- Why now: service pricing and terms change.
- Scope: Cover empty input, missing data, denied permission, offline or slow operation, cancellation, and repeated use where they apply to quotas, alerts, renewals, exports, backups, and vendor replacement.
- Acceptance criteria: Each relevant edge state has a visible result, a recovery action, and no uncontrolled retry loop or duplicated audio, state, or network work.
- Cost and service notes: Use local failure simulation. Do not buy testing infrastructure for this task.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-098. Verify service cost governance and exit plan with behavior-focused checks

- Priority: P2
- Effort: M
- Depends on: BE-097
- Epic: 10. service cost governance and exit plan
- Why now: service pricing and terms change.
- Scope: Write or perform checks that observe user-visible behavior and data contracts rather than implementation details. Include the normal path and the highest-risk failure path.
- Acceptance criteria: The verification command or manual script is written down, passes against the real artifact, and fails when the behavior is removed or broken.
- Cost and service notes: Use open-source local test tooling. Device clouds or hosted testing require a cost-benefit analysis.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-099. Document rollout, cost, and operations for service cost governance and exit plan

- Priority: P2
- Effort: S
- Depends on: BE-098
- Epic: 10. service cost governance and exit plan
- Why now: service pricing and terms change.
- Scope: Document setup, rollback, ownership, privacy impact, maintenance, and service cost. Include the free-tier decision or the cost-benefit analysis when service cost governance and exit plan uses a third-party service.
- Acceptance criteria: A maintainer can operate the change without reading the implementation, and the service decision satisfies the repository cost rule.
- Cost and service notes: Prefer the free local path. Any hosted part needs renewable free-tier verification or a cost-benefit analysis before adoption.
- Flag or conflict notes: Not applicable unless a conflict section names one.

### BE-100. Measure and decide the future of service cost governance and exit plan

- Priority: P2
- Effort: S
- Depends on: BE-099
- Epic: 10. service cost governance and exit plan
- Why now: service pricing and terms change.
- Scope: Compare the observed result with the target from the outcome task: every service has an owner, quota check, export path, and replacement plan. Decide whether to keep, revise, narrow, or remove the change.
- Acceptance criteria: The decision is recorded with evidence, the flag is removed or given a new expiry date, and follow-up tasks are linked or written down.
- Cost and service notes: Use existing local or free-tier measurement. Do not add analytics only for this review.
- Flag or conflict notes: ff_cost_governance_exit

## Conflicts and feature-flag strategies

### Conflict 1: Managed backend versus local-first architecture

| Option | Pros | Cons |
|---|---|---|
| Use a managed backend | Sync, accounts, and remote analytics become easier; a free tier may cover early usage | Privacy, quotas, security, and vendor lock-in become permanent concerns |
| Stay local-first | Cost stays near zero; privacy is strong; offline behavior is natural | No automatic multi-device sync, remote backup, or aggregate analytics exists |

Feature-flag or coexistence plan: Keep local-first as default. Add backend slices behind flags such as `ff_sync_backend` only after cost-benefit analysis.

### Conflict 2: Integrated platform versus composable services

| Option | Pros | Cons |
|---|---|---|
| Use one integrated platform | Auth, database, storage, and functions are easier to connect; operational overhead is lower | Lock-in increases and one quota or outage affects many features |
| Use composable services | Each service can be replaced independently; free tiers can be chosen per capability | Integration complexity and operational surface increase |

Feature-flag or coexistence plan: Prefer the smallest number of services. Require an exit plan either way.

### Conflict 3: Free-tier dependency versus paid reliability

| Option | Pros | Cons |
|---|---|---|
| Depend on renewable free tiers | Cost stays low for a proof of concept; experimentation is possible | Quotas, support limits, and pricing changes create risk |
| Pay for reliability | Higher limits and support may reduce operational surprises | The project gains recurring cost before learner demand is proven |

Feature-flag or coexistence plan: Use free tiers for experiments. Write a cost-benefit analysis before depending on any paid tier for a core feature.

## Third-party service cost policy

This document owns the cost model. Every service decision must state renewable free-tier terms, expected usage, privacy impact, exit cost, and a free alternative.

When a service does not have a renewable free tier, the cost-benefit analysis must include monthly fixed cost, usage-based cost at expected volume, free alternative, learner or maintainer benefit, privacy cost, lock-in cost, exit cost, and the decision deadline. A free trial is not a renewable free tier.

### Cost-benefit analyses for options without a renewable free tier

| Option | Cost exposure | Benefit | Free alternative | Recommendation |
|---|---|---|---|---|
| Managed backend beyond a renewable free tier | Database, auth, storage, bandwidth, and function usage can become recurring monthly cost once free quotas are exhausted. | Reduces operational work for sync, accounts, backup, and remote progress. | Keep local-first progress and export files. Use a verified renewable free tier only for the smallest sync slice. | Pay only when active multi-device learners need sync enough to outweigh privacy work, recurring cost, and lock-in. |
| Paid object storage and egress | Storage may be cheap at first, but bandwidth and media growth can create unpredictable usage cost. | Provides durable media, backups, and user-generated asset storage. | Keep immutable lesson media in the static repository or free hosting budget and avoid uploading learner recordings. | Defer until user-generated media or backups cannot fit the free local and static-hosting path. |
| Payment processing | Processors commonly charge per transaction rather than a monthly renewable free tier. App stores can add their own fees and rules. | Could support donations, subscriptions, or one-time purchases that fund development. | Keep the app free during the proof-of-concept stage and use no payment flow. | Do not build payments until learner demand and a sustainability decision justify fees, tax work, support, and compliance. |

## Suggested sequencing

1. Complete P0 audit, outcome, design, and verification tasks before implementation tasks.
2. Choose at most one epic at a time for implementation.
3. Keep feature flags small, time-bounded, and tied to a measurement task.
4. Revisit this document after each landed slice and delete tasks that no longer earn their place.
