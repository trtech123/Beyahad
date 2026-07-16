# Shalom-Bayit AI Detection & Reinforcement — Design Specification

**Date:** 2026-07-16
**Status:** Approved
**Scope:** Full feature spec (detection mechanism, data model, cross-partner flow, UI, edge cases, testing)

## Overview

A marriage/relationship coaching feature for Beyahad. Each spouse has a private AI coach reachable through three input channels: chat, journaling, and optional conversation-transcript review. The AI detects **relationship-helpful moments** in what a spouse says and:

1. **Reinforces in the moment** — acknowledges the moment and coaches follow-through.
2. **Saves it to the Relationship Bank** — a private-by-default collection of moments.
3. **Helps the other side implement it** — the partner's own AI coach receives anonymized coaching signals (automatic, safe by design), and specific moments can be explicitly shared as "gift moments."

The mechanism is fully symmetric: both spouses get the same coach, detection, bank, and signals. "Husband" in examples is interchangeable with either partner.

Hebrew-first: all prompts, detection, and UI must work in Hebrew (RTL) and English.

## Detection Categories

The AI detects exactly five categories of relationship-helpful moments:

| Category | Definition | Example |
|---|---|---|
| **Appreciation** | Gratitude or admiration for the partner | "She held everything together this week" |
| **Commitment** | A concrete intention to change behavior | "I'll put my phone away at dinner" |
| **Insight** | Self-awareness about one's own pattern | "I get defensive when she criticizes" |
| **Empathy** | Seeing the partner's perspective | "She must be exhausted, no wonder she snapped" |
| **Repair attempt** | Willingness to apologize or reconcile after conflict | "I want to make things right about last night" |

## Detection Mechanism

One detection contract, invoked in two modes.

### Structured output contract

Every detection call emits:

```json
{
  "detections": [
    {
      "category": "appreciation | commitment | insight | empathy | repair",
      "quote": "verbatim text from the user's input",
      "summary": "one-line neutral summary of the moment",
      "confidence": 0.0,
      "suggested_action": "optional concrete follow-through suggestion"
    }
  ]
}
```

- Detections with `confidence >= threshold` (initial: 0.75, tunable) are saved to the bank.
- Detections below threshold are silently dropped — never surfaced to the user.

### Chat channel (inline mode)

The coaching AI (Claude) replies to the user AND emits the `detections[]` block in the same call, via tool-use / structured output. There is no separate classification pipeline for chat.

- The visible reply weaves in reinforcement naturally — never robotic ("DETECTED: appreciation"). Example: user says "I'll come home earlier on Fridays" → AI responds warmly, makes it concrete ("what would earlier look like this Friday — 5pm? Before candle lighting?"), and the detection is saved in the background.
- A subtle inline card appears in the chat marking the saved moment ("נשמר לבנק הזוגי"), with a share button when the category permits explicit sharing.

### Journal channel (review mode)

On journal-entry save, the same detection contract runs once over the full entry, same output schema. Detected moments surface as cards after save.

### Transcript channel (review mode)

The user records or uploads a couple conversation.

- **Dual consent to record is required** — an explicit gate before any recording/upload is processed. Both partners must have the transcript feature enabled in couple settings.
- Pipeline: audio → transcription (Whisper or device speech-to-text) → speaker segmentation → each spouse's own segments run through review mode.
- **Only the uploading user's own detected moments enter their bank.** The partner's speech is never analyzed on the uploader's behalf; the partner's segments are analyzed only into the partner's own bank, and only because they are a consenting, linked account.

## Relationship Bank — Data Model

Supabase (PostgreSQL + RLS), consistent with the existing Beyahad backend.

### Tables

**`couples`**
- `id`, `user_a_id`, `user_b_id`
- `status`: `invited | active | unlinked`
- Consent flags: `auto_signals_enabled` (per user), `transcript_enabled` (per user)

**`moments`**
- `id`, `user_id`, `couple_id`
- `category`: `appreciation | commitment | insight | empathy | repair`
- `quote`, `summary`
- `source`: `chat | journal | transcript`
- `confidence`
- `shared` (bool), `share_status`: `null | offered | shared | declined`
- `created_at`

**`commitments`** (extends a Commitment-category moment)
- `moment_id` (FK)
- `action_text`, `target_behavior`
- `check_in_cadence` (e.g., weekly)
- `status`: `active | kept | lapsed`
- `streak` (int)

**`partner_signals`** (anonymized cues delivered to the partner's AI context)
- `id`, `couple_id`, `to_user_id`
- `signal_type`: `effort_area | acknowledgment_prompt`
- `theme`: coarse-grained topic, e.g. "presence at dinner" — **never raw quotes**
- `created_at`, `consumed_at`

### RLS policies

- A user sees only their own `moments`.
- A `moments` row with `share_status = shared` is additionally readable by the partner.
- `partner_signals` are readable only by `to_user_id` (injected into that user's AI context, not shown as raw data).
- All couple-scoped rows require an `active` couple link.

## Cross-Partner Flow & Consent

### Automatic signals (safe by design)

- When a **Commitment** moment is saved, a theme-level signal goes to the partner's AI: e.g., "your partner is working on presence at dinner — if you notice effort there, acknowledging it helps."
- Signals never contain quotes or identifiable phrasing.
- **Insight and Repair moments generate NO automatic signals** — too vulnerable. They stay entirely private unless explicitly shared.
- Appreciation and Empathy moments generate no automatic signals either; Appreciation flows only via explicit share. (Automatic signals are Commitment-only.)
- Either partner can disable auto-signals for their own outgoing moments in couple settings.

### Explicit shares ("gift moments")

- For **Appreciation** moments (primary case; other categories may be offered where clearly safe), the AI asks: "Want to share this with her?"
- On approval, the partner receives it as a gift-moment notification/card in their inbox.
- Nothing is ever shared without a per-item, explicit approval.

### Couple linking

- One spouse invites via link/code; both must accept before any couple features activate.
- Either partner can unlink at any time: signals stop immediately, pending signals/shares are discarded, each bank stays private to its owner.

## Reinforcement & Implementation Help

**In the moment (detecting side):**
- The AI acknowledges the moment and makes it concrete: turns a vague commitment into a specific, near-term action.

**Commitments get follow-through:**
- Check-in cadence: the AI proactively asks at the next relevant check-in ("how did Friday dinner go?").
- Status tracking: `active → kept` (increments streak) or `lapsed`.
- Lapsed ≠ shame: the AI reframes and re-plans rather than criticizing.

**Partner-side coaching (receiving side):**
- The partner's AI uses incoming signals to coach receiving well: noticing effort, naming it, not sabotaging it ("if he shows up on time Friday, name it — reinforcement works both ways").

**Progress view:**
- Each user sees their own bank grouped by category, commitment streaks, and themes over time.

## UI Screens

Within the existing Beyahad Expo app (Hebrew RTL, warm-paper design system, Frank Ruhl Libre / Assistant typography):

1. **Coach chat** — main AI conversation. Detected moments appear as subtle inline cards with an optional share button.
2. **Journal** — daily reflection entry; detected moments surface as cards after save.
3. **Relationship Bank** — moments list/grid filtered by category; a Commitments tab with status and streaks.
4. **Gift-moments inbox** — shared appreciations received from the partner.
5. **Couple settings** — link/unlink partner, consent toggles (auto-signals, transcript feature).
6. **Transcript capture** — record or upload, dual-consent gate, processing state, results.

## Error Handling & Edge Cases

- **False positives:** user can dismiss/delete any moment; a dismissed moment feeds nothing cross-partner (any already-sent signal derived from it is revoked if unconsumed).
- **Low-confidence detections:** silently dropped, never surfaced.
- **Abuse/safety:** if input suggests abuse or crisis, the detection pipeline yields entirely to a safety response (resources, no gamification, no reinforcement framing) and **no signals are sent to the partner**.
- **Partner unlinked mid-flight:** pending signals and unaccepted shares are discarded.
- **Offline journal entries:** queued locally, detection runs on sync.
- **Transcript with only one consenting account:** processing is refused at the gate.

## Testing

- **Detection quality:** a golden set of Hebrew and English utterances per category — positive and hard-negative examples (e.g., sarcastic "appreciation", complaints phrased as insights) — evaluated against the detection prompt; threshold tuned on this set.
- **RLS:** partner cannot read private moments; unshared moments never cross; signals readable only by recipient.
- **Consent flows:** no signals before both partners accept the link; none after unlink; transcript processing blocked without dual consent.
- **Commitment lifecycle:** check-in scheduling, streak increment on kept, lapse handling.

## Out of Scope (this spec)

- Matching/community features of the existing Beyahad app (unchanged).
- Therapist/human-coach escalation beyond the safety response.
- Multi-language beyond Hebrew and English.
