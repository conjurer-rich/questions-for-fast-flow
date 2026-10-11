---
number: 2
category: Teams
question: Are your teams organised around value or dependencies?
accent: ochre
summary: Team boundaries often reflect historical structures, reporting lines or technology rather than how user needs are met. Pick one important need and count the teams that must coordinate to meet it.
coreIdea: Team boundaries often reflect historical structures, reporting relationships or technology rather than how user needs are met.
opening:
  - Ask how a team came to have its current shape and you will usually hear a story about a reorganisation, a merger, a technology choice or a manager who used to run both halves.
  - You will rarely hear a story about a user.
exercise:
  prompt: Pick one important user need. How many teams must coordinate to meet it, and where do those interactions create delays?
  notes:
    - Start from the need, not from the org chart. Name the user and what they are trying to achieve.
    - List the capabilities required to meet that need, then the team that stewards each one. Draw the lines between them.
    - Look at the lines. Which interactions happen routinely and smoothly? Which require escalation, scheduling or negotiation every time?
followUp:
  question: For the interactions that cause the most delay, is the dependency really necessary, or is it a side effect of where a boundary happened to be drawn?
  note: Some dependencies are essential and worth investing in. Others exist only because two closely related capabilities were split between teams for reasons nobody remembers.
resource:
  name: User Needs Mapping
  url: https://userneedsmapping.com
  description: A visual method for linking users, their needs, the capabilities that meet them and the teams that steward those capabilities, so that team boundaries can be discussed in terms of value rather than history.
---

Team boundaries are one of the most consequential design decisions an organisation makes, and one of the least deliberately designed. Most boundaries are inherited. They reflect how the company was structured when a product was first built, which systems happened to be bought from which vendor, or who reported to whom at the time of the last reshuffle.

That history is not wrong in itself. The problem is what it does to flow. When a user need cuts across several teams, meeting it requires those teams to coordinate: to agree priorities, align release schedules, share context and wait for each other. Every boundary the work crosses is a place where it can stall. If the boundaries were drawn around technology or reporting lines, the work will cross many of them.

Organising around value means starting from a different place. Who are the users? What do they need? Which capabilities are required to meet those needs? And which teams steward those capabilities? Working through those questions in order, rather than starting from the teams that already exist, often reveals that the dependencies people complain about are not inevitable. They are the shadow of a boundary that could be in a different place.

## Stewardship, not ownership

It helps to talk about teams stewarding capabilities rather than owning them. Ownership implies exclusive control and a hard edge. Stewardship implies responsibility for the health and evolution of something that other teams also rely on. Most capabilities in a real organisation are stewarded by one team and depended on by several, and that is a perfectly healthy arrangement when the interactions are well understood and well supported.

This is also why the aim is not to eliminate dependencies. Some are essential: a platform team stewarding shared infrastructure, a specialist team stewarding a hard domain. The question is whether each dependency exists because it genuinely makes sense, or because of a boundary nobody has looked at in years. The first kind deserves investment. The second kind deserves a conversation.
