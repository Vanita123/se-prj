import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';

function MyChatComponent() {
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const otherUser = new Talk.User({
        id: '1',
        name: 'Henry Mill',
        email: 'henrymill@example.com',
        photoUrl: '/Users/tejaswy/Desktop/se-project/src/assets/images/user1.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const currentUser = new Talk.User({
        id: 'admin',
        name: 'Pawsome admin',
        email: 'admin@pawsome.com',
        photoUrl: '../assets/images/user2.jpeg',
        welcomeMessage: 'Hello, admin here!',
        role: 'admin',
      });

      const session = new Talk.Session({
        appId: 'tWWjpWJv',
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createInbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded]);

  return <div ref={chatboxEl} className="chatbox-container" style={{height:'500px'}}/>;
}

export default MyChatComponent;