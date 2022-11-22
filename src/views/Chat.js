/*import Talk from 'talkjs';
 import { useEffect, useState, useRef } from 'react';
 //import { useEffect, useState } from 'react';

function Chat() {
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
        appId: 'tmDZAcFZ',
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

import Talk from "talkjs";
import { useEffect, useRef, useState } from "react";
import "../styles/style.css";

export function Chat() {
  const [talkLoaded, markTalkLoaded] = useState(false);
  Talk.ready.then(() => markTalkLoaded(true));

  useEffect(() => {
    if (talkLoaded) {
      console.log("effect: create session");
      const currentUser = new Talk.User({
        id: "1632",
        name: "Kate Smith",
        email: "katesmith@example.com",
        photoUrl: "kate.jpeg",
        welcomeMessage: "Hey there!",
        role: "default"
      });
      const session = new Talk.Session({
        appId: "tmDZAcFZ",
        me: currentUser,
        signature: 'sk_test_FUcKVq3r0Uq1OqP06bcvJr1CNZ5qhApN'
      });

      const conversation = session.getOrCreateConversation("235465768");
      conversation.setParticipant(currentUser);
      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => {
        console.log("cleanup: destroy session");
        //chatbox.destroy();
        session.destroy();
      };
    }
  }, [talkLoaded]);

  console.log("render");

  const chatboxEl = useRef();
  const [width, setWidth] = useState(300);
  return (
    <>
      <button onClick={() => setWidth(width + 10)}>
        Change state (rerender)
      </button>
      <br />
      <br />
      <div ref={chatboxEl} style={{ height: 400, width }} />
    </>
  );
}
export default function App() {
  const [key, setKey] = useState(1);

  return (
    <div className="App">
      <button onClick={() => setKey(key + 1)}>
        Change key (remount component)
      </button>
      <br />
      <br />
      <Chat key={key} />
    </div>
  );
}

