import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';

function MyChatComponent() {
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);
  const user = localStorage.getItem('username');
  const url = "https://api.talkjs.com/v1/tWWjpWJv/users/"+JSON.parse(user);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));
    var currentUser;

    if (talkLoaded) {
      fetch(url, {
        headers: {
            'Authorization': `Bearer sk_test_k8p8zNNQmwjqINnzBNE2MEC47YRm7vQN`
      }}).then((response) => response.json()).then((json) => {
      if(json){
         console.log(json);
      
         currentUser = new Talk.User({
          id:user,
          name: json.name,
          email: json.email,
          photoUrl: json.photoUrl,
          welcomeMessage: json.welcomeMessage,
          role: json.role,
        });

        const otherUser = new Talk.User({
          id: 'Admin123',
          name: 'Pawsome Admin',
          email: 'pawsome@gmail.com',
          photoUrl: '/test.jpg',
          welcomeMessage: 'Hey, admin here!',
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
      // console.log(json)
      });

      
    }
  }, [talkLoaded]);

  return(
  <div> 
    <h4 style={{padding:'8px'}}>Chat section</h4>
    {talkLoaded == false ? <label>Loading your chat ...</label> : null}
    <div ref={chatboxEl} className="chatbox-container" style={{height:'500px'}}/> 
    </div>
  );
}

export default MyChatComponent;
