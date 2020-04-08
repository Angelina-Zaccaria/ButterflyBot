# Butterfly: rewarding students for what matters

### Problem Statement
In today's climate, there are many students getting their academic lives uprooted as they are forced to attend school from home. While this is a somewhat feasible feat for college-aged students, many young learners in elementary and middle school are struggling with not only their educational but also social lives being disrupted. For young children, being socialized is just as important to the classroom experience as their lessons are, and these skills are sometimes referred to as “soft skills.” When students are forced to learn from home, they are not receiving proper socialization and learning those “soft skills” that a classroom is able to provide. While these students are at home with their families, they may be isolated from communicating with kids of their own age and suffering from feelings of isolation.

### Bot Description
Our group is creating a reward bot through Slack. Our take on implementing this is a bot that rewards both kindness and productivity that can be implemented in schools forced to switch to online learning to promote productivity and enhance the learning and social experience for students. The bot would give rewards in the form of gold stars. Additionally, our bot will punish bad behavior by taking away stars. There will be an online platform where students can communicate and participate in discussions through various Slack channels dedicated to different functions. We plan on rewarding behavior such as answering other students’ questions that have been posted and discussion participation. Behaviour that would be punished by removing stars would be using unkind or inappropriate language.  

This would be a good solution for the current problem of schools switching to online learning to provide a fun and interactive way for students to participate in further discussion and as an additional tool for teachers. The bot primarily responds to events but has a secondary function of having a conversation with users in that it lets students know when they have gained or lost a star and allows the teacher to view the current star totals.

### Use Cases
1. A student is rewarded for participating in class
    * **Preconditions:**  
      1. The teacher pre-defines a slack channel.
    * **Main Flow:**
      1. Teacher adds bot to channel
      2. User interacts with the teacher/another student within a channel (e.g. replies to another student’s question in a thread) [S1]
      3. Bot will notify student they are being rewarded with a star in a direct message [S2]
      4. Reward progress will be displayed [S3]
    * **Subflows:**  
      [S1] Student utilizes the “@” function to directly communicate with another student  
      [S2] Bot will record the student being rewarded and update their reward status  
      [S3] The bot will update the total amount of stars that the student has  
    * **Alternate Flows:**  
      [E1] The teacher has not set up a slack channel for students to communicate with each other  
      [E2] The teacher uses “@butterfly” to add the bot to a thread if the bot is not in the entire channel (e.g. to reward students who participate in a discussion thread)  
      [E3] The teacher manually has the bot give a student a star by interacting with the bot  
2. A student is punished for their behavior
    * **Preconditions**
      1. The teacher pre-defines a slack channel for students to communicate within and adds the bot to the channel.
      2. The teacher has prefined what words are considered inappropriate 
    * **Main Flow**  
      1. The user interacts with the teacher/another student within the channel (e.g. The student replies to the teacher’s question/discussion in a thread) and performs an act that is associated with bad behavior [S1]
      2. The bot will notify the student and the teacher that a star has been taken away from the student [S2]
      3. The bot will update the total amount of stars that the student has [S3]
    * **Subflows**  
      [S1] The user utilizes the “@” function to directly communicate with either the teacher or another student and performs an act that is associated with bad behavior  
      [S2] The bot will will remove a star from the student and notify the student and the teacher that a star has been taken away from the student  
      [S3] The bot will update the total amount of stars that the student has  
    * **Alternative Flows**  
      [E1] The teacher has not set up a slack channel for students to communicate with each other  
      [E2] The teacher manually has the bot remove a star from the student

### Design Sketches
Sequence Flow:
![](DESIGN_images/sequence_flow.png)

Storyboard:
![](DESIGN_images/storyboard_v2.png)
*Updated 4/8/2020*

### Architecture Design
![](DESIGN_images/architecture_design_v2.png)
*Updated 4/8/2020*

After doing extensive preliminary research into Slack bots, we have come to the conclusion that the above architecture design would be a good place to start for Butterfly. There appears to be extensive documentation on various Slack APIs on [the Slack website](https://slack.dev/node-slack-sdk/). In the architecture design above, messages or events in the Slack workspace go to the Slack API, whether that be the Events API, Web API, or some combination of the two, and from there into Node.js hosted locally. The event trigger will interact with the Butterfly bot logic, which will evaluate whether or not the event warrants the addition or removal of a star and updates a connected Topcoder database if this is the case.

We will be using the Slack Web API and Node.js local hosting using JavaScript for the bot logic according to the instructions in [this video](https://www.youtube.com/watch?v=nyyXTIL3Hkw) and our lab assignments for this class. We would then link the bot logic to the Topcoder database to update stars.

We have a Slack workspace and bot user set up, along with some preliminary code as explained in the first video (from which we will now start over using Node.js). The main functions that our bot will need to perform are outlined in the use cases, though overall the bot will need to monitor communication in channels or threads it has been added to, parse these results to award stars based on participation, determine star removal based on inappropriate language, and send any star updates and necessary alerts to the students and the teacher. The primary information flow for these main bot functions would be the student or teacher interacting with Slack, which triggers the Slack API, which sends the data to be parsed and evaluated by the bot, which updates the database if necessary and sends the updated star totals back through these component links to the appropriate users.