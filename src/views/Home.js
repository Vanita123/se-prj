import React from 'react';
// import Talk from 'talkjs';
// import sections
import Chat from './Chat';
import Hero from '../components/sections/Hero';
import FeaturesSplit from '../components/sections/FeaturesSplit';
// import { useEffect, useState } from 'react';

// import Talk from 'talkjs';
// import { useEffect, useState, useRef } from 'react';

/*function MyChatComponent() {
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: '1',
        name: 'Henry Mill',
        email: 'henrymill@example.com',
        photoUrl: 'henry.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const otherUser = new Talk.User({
        id: '2',
        name: 'Jessica Wells',
        email: 'jessicawells@example.com',
        photoUrl: 'jessica.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const session = new Talk.Session({
        appId: tmDZAcFZ,
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded]);

  return <div ref={chatboxEl} />;
}*/

const Home = () => {
  localStorage.clear();

  return (
    <>
      <Hero className="illustration-section-01" />
      
      <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />

      {/* <FormLabel children = {<h4>Chat Widget</h4>} labelHidden = {false} id = {'login'}/> */}
      <Chat></Chat>
     
    </>


  );
}

export default Home;
//export default MyChatComponent;