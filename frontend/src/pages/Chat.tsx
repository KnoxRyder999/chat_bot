import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { ChatItem } from '../components/ChatItem';
import { useAuth } from '../context/AuthContext';
import { sendChatRequest } from '../helpers/api-communicator';
import { Message } from '../types/Message';

// to be erase ...
const testMessages: Message[] = [
  {
    // id: '512d6734-691d-4bdb-b208-cc25d587bafc',
    role: 'user',
    content: 'Could you give me an example of Javascript?',
    // _id: '66758d7a1efed38e8ef7de57',
  },
  {
    // id: '512d6734-691d-4bdb-b208-cc25d587bafc',
    role: 'assistant',
    content:
      'Sure! Here is an example of a simple Javascript code that creates an alert box when a button is clicked:\n\n```\n<!DOCTYPE html>\n<html>\n<body>\n\n<h2>Click the button to display an alert box</h2>\n\n<button onclick="myFunction()">Click me</button>\n\n<script>\nfunction myFunction() {\n  alert("Hello! This is an alert box!");\n}\n</script>\n\n</body>\n</html>\n``` \n\nIn this example, when the button is clicked, the `myFunction()` function is triggered, which creates an alert box with the message "Hello! This is an alert box!".',
    // _id: '66758d7d1efed38e8ef7de58',
  },
  {
    // id: '512d6734-691d-4bdb-b208-cc25d587bafc',
    role: 'user',
    content: 'an other example of Typescript?',
    // _id: '667591761efed38e8ef7de6f',
  },
  {
    // id: '512d6734-691d-4bdb-b208-cc25d587bafc',
    role: 'assistant',
    content:
      "Sure, here is another example of TypeScript code:\n\n```typescript\n// Define a class named 'Person'\nclass Person {\n  private name: string;\n  private age: number;\n\n  constructor(name: string, age: number) {\n    this.name = name;\n    this.age = age;\n  }\n\n  sayHello() {\n    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);\n  }\n}\n\n// Create a new instance of the 'Person' class\nconst person1 = new Person('John', 30);\n\n// Call the 'sayHello' method on the 'person1' instance\nperson1.sayHello();\n```\n\nIn this example, we define a class named 'Person' with private properties 'name' and 'age'. We create a constructor method to instantiate the class with a name and age. We also define a method 'sayHello' to log a message with the person's name and age. Finally, we create a new instance of the 'Person' class, call the 'sayHello' method on the instance, and output the message to the console.",
    // _id: '6675917d1efed38e8ef7de70',
  },
  {
    // id: '512d6734-691d-4bdb-b208-cc25d587bafc',
    role: 'user',
    content: "Peux tu m'expliquer qui était l'écrivaine Anne Pons ?",
    // _id: '667594711efed38e8ef7de81',
  },
  {
    // id: '512d6734-691d-4bdb-b208-cc25d587bafc',
    role: 'assistant',
    content:
      'Anne Pons est une écrivaine française contemporaine, née en 1965. Elle est notamment connue pour ses romans et ses nouvelles qui explorent les thèmes de la famille, de la mémoire et de l\'identité. Ses oeuvres, souvent empreintes de mélancolie et de nostalgie, sont très appréciées pour leur style poétique et leur profondeur psychologique. Anne Pons a publié plusieurs ouvrages, parmi lesquels "Chapitres de l\'oubli" et "Les jours sans faille".',
    // _id: '667594741efed38e8ef7de82',
  },
  {
    // id: '512d6734-691d-4bdb-b208-cc25d587bafc',
    role: 'user',
    content: 'écris moi un example de code en Javascript',
    // _id: '6675c1941efed38e8ef7deb5',
  },
  {
    // id: '512d6734-691d-4bdb-b208-cc25d587bafc',
    role: 'assistant',
    content:
      "Bien sûr ! Voici un exemple de code en JavaScript qui affiche un message d'alerte lorsque la page est chargée :\n\n```javascript\ndocument.addEventListener('DOMContentLoaded', function() {\n  alert('Bonjour, bienvenue sur notre site !');\n});\n```\n\nCe code écoute l'événement `DOMContentLoaded` (qui est déclenché lorsque la page est entièrement chargée) et affiche ensuite une alerte avec le message \"Bonjour, bienvenue sur notre site !\".",
    // _id: '6675c1961efed38e8ef7deb6',
  },
];

export const Chat = ({}) => {
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chats, setChats] = useState<Message[]>(testMessages);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;

    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }

    const newMessage: Message = { role: 'user', content };
    setChats((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChats([...chatData.chats]);
  };

  // useLayoutEffect(() => {
  //   if (auth?.isLoggedIn && auth.user) {
  //     toast.loading('Loading Chats', { id: 'loadChats' });
  //     getUserChats()
  //       .then((data) => {
  //         setChats([...data.chats]);
  //         toast.success('Successfully loaded chats', { id: 'loadChats' });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error('Loading Failed', { id: 'loadChats' });
  //       });
  //   }
  // });

  return (
    <Box
      // maxWidth='sm'
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: 'flex', xs: 'none', sm: 'none' },
          flex: 0.15,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '100vh',
            bgcolor: grey[900],
            flexDirection: 'column',
            mx: 3,
            margin: 0,
            gap: 2,
            paddingX: 2,
          }}
        >
          <Avatar
            sx={{
              mx: 'auto',
              my: '12',
              bgcolor: 'white',
              color: 'black',
              fontWeight: 500,
              mt: 2,
            }}
          >
            {auth?.user?.name[0].toUpperCase()}
            {auth?.user?.name.split(' ')[1] !== undefined
              ? auth?.user?.name.split(' ')[1][0].toUpperCase()
              : ''}
          </Avatar>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans' }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans' }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            sx={{
              bgcolor: red[300],
              ':hover': { bgcolor: red.A700 },
              color: 'white',
            }}
          >
            Clear conversation
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: 'column',
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: '40px',
            color: 'white',
            mb: 2,
            mx: 'auto',
            fontWeight: '600',
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            textAlign: 'justify',
            flexDirection: 'column',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
          }}
        >
          {chats.map((chat, index) => {
            return <ChatItem key={index} message={chat} />;
          })}
        </Box>
        <div
          style={{
            width: '100%',
            borderRadius: 8,
            backgroundColor: 'rgb(17,27,39)',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <input
            placeholder='enter your new question here'
            ref={inputRef}
            type='text'
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              padding: '30px',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '20px',
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: 'white', mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};
