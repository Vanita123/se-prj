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
         console.log(JSON.parse(user));
      
         currentUser = new Talk.User({
          id:JSON.parse(user),
          name: json.name,
          email: json.email,
          photoUrl: json.photoUrl,
          welcomeMessage: json.welcomeMessage,
          role: json.role,
        });

        console.log(currentUser);

        // const currentUser = new Talk.User({
        //   id:'DanielR8186',
        //   name: 'Daniel Ricardo',
        //   email:'DanielR@gmail.com',
        //   photoUrl: '/test.jpg',
        //   welcomeMessage: 'Hey, Daniel here!',
        //   role: 'owner',
        // });

        // const otherUser = new Talk.User({
        //   id:'Brown7612',
        //   name: 'Adam Brown',
        //   email:'Brown@gmail.com',
        //   photoUrl: '/test.jpg',
        //   welcomeMessage: 'Hey, Adam here!',
        //   role: 'owner',
        // });

        // const otherUser = new Talk.User({
        //   id:'alse7656',
        //   name: 'Alse Queen',
        //   email:"alse@gmail.com",
        //   photoUrl: '/test.jpg',
        //   welcomeMessage: 'Hey, Alse here!',
        //   role: 'renter',
        // });

        // const otherUser = new Talk.User({
        //   id:'EsterJ3006',
        //   name: 'Ester Jackson',
        //   email:'EsterJ@gmail.com',
        //   photoUrl: '/test.jpg',
        //   welcomeMessage: 'Hey, Ester here!',
        //   role: 'renter',
        // });
        var otherUser;
        if(JSON.parse(user)!='Admin123'){
          otherUser = new Talk.User({
            id:'Admin123',
            name: 'Pawsome Admin',
            email:'pawsome@gmail.com',
            photoUrl: '/test.jpg',
            welcomeMessage: 'Hey, Admin here!let me know if you have any issues.',
            role: 'admin',
          });
        }
        else{
          otherUser = new Talk.User({
          id:'Brown7612',
          name: 'Adam Brown',
          email:'Brown@gmail.com',
          photoUrl: '/test.jpg',
          welcomeMessage: 'Hey, Adam here!',
          role: 'owner',
        });
        }
        
  
        // const session2 = new Talk.Session({
        //   appId: 'tWWjpWJv',
        //   me: otherUser,
        // });
  
        // const conversationId2 = Talk.oneOnOneId(otherUser,currentUser);
        // const conversation2 = session2.getOrCreateConversation(conversationId2);
        // conversation2.setParticipant(currentUser);
        // conversation2.setParticipant(otherUser);
        // session2.createInbox();

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
    <h4 style={{padding:'8px'}}>Chat section of {user}</h4>
    {talkLoaded == false ? <label>Loading your chat ...</label> : null}
    <div ref={chatboxEl} className="chatbox-container" style={{height:'500px'}}/> 
    </div>
  );
}

export default MyChatComponent;
<<<<<<< HEAD
=======
/**
 * delete conv - d0b9c8c38dfab5d0b605 (Daniel,Ester), 63529d324e6c8c267a9e (Daniel - Alse)
 */
>>>>>>> scratch/sprint5
