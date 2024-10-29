const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level:Basic, Duration: 1 hours, NoOf Chapters:5, in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"course\": {\n    \"name\": \"Python Programming Fundamentals\",\n    \"description\": \"This course introduces the fundamentals of Python programming, covering essential concepts like variables, data types, operators, control flow, and functions. By the end of this course, you'll be able to write basic Python programs to solve simple problems.\",\n    \"chapters\": [\n      {\n        \"name\": \"Introduction to Python\",\n        \"about\": \"This chapter provides an overview of Python, its history, its applications, and how to set up your programming environment.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Variables and Data Types\",\n        \"about\": \"Learn about different data types in Python, including integers, floats, strings, and booleans. Understand how to declare and assign variables.\",\n        \"duration\": \"20 minutes\"\n      },\n      {\n        \"name\": \"Operators and Expressions\",\n        \"about\": \"Explore different operators in Python, such as arithmetic, comparison, logical, and assignment operators. Learn how to build expressions using these operators.\",\n        \"duration\": \"20 minutes\"\n      },\n      {\n        \"name\": \"Control Flow\",\n        \"about\": \"Discover conditional statements (if, elif, else) and loop structures (for, while) in Python. Understand how to control the flow of your programs based on conditions.\",\n        \"duration\": \"20 minutes\"\n      },\n      {\n        \"name\": \"Functions\",\n        \"about\": \"Learn how to define and call functions in Python. Understand the concept of function parameters and return values. See how functions help you organize and reuse code.\",\n        \"duration\": \"15 minutes\"\n      }\n    ]\n  },\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Basic\",\n  \"duration\": \"1 hour\",\n  \"noOfChapters\": 5\n}\n```\n"},
          ],
        },
      ],
    });
  
    export const GenerateChapterContent_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Explain the concept in Detail on Topic: React JS, Chapter:State Management with Redux, in JSON Format with list of array with field as title, description in detail, Code Example(Code field in <precode> format) if applicable"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"title\": \"Introduction to Redux\",\n    \"description\": \"Redux is a predictable state management library for JavaScript applications. It helps manage complex application states in a centralized and organized manner. Redux follows the unidirectional data flow principle, making it easier to reason about how data changes within your application.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Key Concepts in Redux\",\n    \"description\": \"Redux revolves around these core concepts:\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Store\",\n    \"description\": \"The store is a single source of truth for the entire application state. It holds the current state and provides methods to update it. It's a JavaScript object that holds the entire application state.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Actions\",\n    \"description\": \"Actions are plain JavaScript objects that describe an intent to change the state. They are sent to the store to trigger a state update. Actions must have a type field to identify what they do.\",\n    \"code\": \"<precode>const incrementAction = { type: 'INCREMENT' };</precode>\"\n  },\n  {\n    \"title\": \"Reducers\",\n    \"description\": \"Reducers are pure functions that take the current state and an action, returning a new state based on the action. They are responsible for handling state changes in response to actions.\",\n    \"code\": \"<precode>function counterReducer(state = 0, action) {  \\n  switch (action.type) {  \\n    case 'INCREMENT':  \\n      return state + 1;  \\n    case 'DECREMENT':  \\n      return state - 1;  \\n    default:  \\n      return state;  \\n  }  \\n}</precode>\"\n  },\n  {\n    \"title\": \"Dispatching Actions\",\n    \"description\": \"To update the state, you dispatch actions to the store. The store then invokes the appropriate reducer to handle the action and generate a new state.\",\n    \"code\": \"<precode>store.dispatch(incrementAction);</precode>\"\n  },\n  {\n    \"title\": \"Connecting Components to Redux\",\n    \"description\": \"To use Redux data in your React components, you need to connect them to the store using the `connect()` function from `react-redux`.\",\n    \"code\": \"<precode>import { connect } from 'react-redux';  \\n  \\nfunction CounterComponent(props) {  \\n  return (  \\n    <div>  \\n      <h1>Counter: {props.count}</h1>  \\n      <button onClick={() => props.increment()}>Increment</button>  \\n      <button onClick={() => props.decrement()}>Decrement</button>  \\n    </div>  \\n  );  \\n}  \\n  \\nconst mapStateToProps = (state) => ({  \\n  count: state.counter  \\n});  \\n  \\nconst mapDispatchToProps = (dispatch) => ({  \\n  increment: () => dispatch({ type: 'INCREMENT' }),  \\n  decrement: () => dispatch({ type: 'DECREMENT' })  \\n});  \\n  \\nconst ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(CounterComponent);  \\n  \\nexport default ConnectedCounter;</precode>\"\n  },\n  {\n    \"title\": \"Benefits of Redux\",\n    \"description\": \"Redux offers several advantages for managing application state:\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Centralized State\",\n    \"description\": \"Redux keeps all the application state in a single store, making it easy to access and understand the current state of the application.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Predictable State Changes\",\n    \"description\": \"The unidirectional data flow and the use of pure reducers guarantee that state changes are predictable and deterministic.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Improved Debugging\",\n    \"description\": \"Redux's time-traveling debugger allows you to step through past state changes, making debugging significantly easier.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Testability\",\n    \"description\": \"The pure nature of reducers makes it straightforward to write unit tests for your application logic.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Code Organization\",\n    \"description\": \"Redux encourages a clear separation of concerns between components, actions, and reducers, leading to a better-organized codebase.\",\n    \"code\": \"\"\n  }\n]\n```"},
          ],
        },
      ],
    });

    
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  