---
number: 3
category: AI
question: What happens when AI makes the wrong work faster?
summary: AI can accelerate individual activities without improving end-to-end delivery, and may increase pressure on downstream constraints. Ask what your next constraint would be if implementation time halved tomorrow.
coreIdea: AI may accelerate individual activities without improving end-to-end delivery, potentially increasing pressure on downstream constraints.
opening:
  - The pitch for most AI tooling is that it makes a particular activity faster. Code is written faster. Documents are drafted faster. Tickets are triaged faster.
  - That is often true, and it is worth asking what happens to the rest of the system when it is.
exercise:
  prompt: If AI halved the time spent implementing a change tomorrow, what would become your next constraint?
  notes:
    - Be specific. Which queue grows? Which review backlog doubles? Which team is suddenly asked for twice as many decisions?
    - Then ask what that constraint would need in order to keep up — more people, a different process, a clearer boundary, or less work arriving in the first place.
    - Notice whether the constraint you land on is something AI can help with, or something that needs a structural change.
followUp:
  question: Is the work being accelerated the work your users most need done — and how would you know?
  note: Speeding up delivery of the wrong thing is still a cost. The question of what to build is upstream of the question of how fast to build it.
resource:
  name: "Flow Awareness: Preparing for AI"
  url: https://www.richallen.info/flow-awareness-sessions
  description: Short sessions that help a leadership team see where its constraints actually sit before adding acceleration, so that AI lands somewhere useful.
---

Consider a delivery process in which implementing a change takes a week, waiting for review takes a week, and waiting for a release window takes two more. Halving implementation time saves half a week out of four. That is a real gain, but it is not the fourfold improvement the demo implied, and it tends to come with a side effect: the reviewers now receive twice as much to review, and their queue grows.

This is the basic shape of the question. Any system has constraints, places where work accumulates because capacity is lower than demand. Speeding up an activity that is not the constraint does not increase the throughput of the whole. It increases the pile in front of the constraint. If the constraint is a review step, an approval board, a platform team or a shared environment, then faster implementation can make the end-to-end experience worse, not better, because more work is now waiting and the people at the constraint are under more pressure.

None of this is an argument against AI. It is an argument for thinking about the wider system before deciding where to apply it. The organisations that benefit most from acceleration will be the ones whose structure lets accelerated work actually reach users.

## Coordination and cognitive load

Two things deserve particular attention. The first is coordination. If a change requires several teams to agree before it can ship, the agreement is the constraint, and no amount of faster drafting will move it. Reducing the number of teams that need to be involved, or making their interactions more routine, does.

The second is cognitive load. Generating more output does not reduce the amount a team has to understand, maintain and be responsible for. It can increase it. A team already stretched across too many systems does not become less stretched because the code arrives faster. The limiting factor becomes the team's ability to understand what it now owns.

So the useful question is not whether AI makes something faster. It almost certainly does. The useful question is what the system does with that speed, and whether the structure around the work is ready to turn it into value.
