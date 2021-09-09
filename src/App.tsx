
import { ChakraProvider } from "@chakra-ui/react";
import './styles/GlobalStyles.css'
import Routes from "./routes";
function App() {
  return (
    <ChakraProvider resetCSS={true}>
     
        <Routes />
     
    </ChakraProvider>
  );
}

export default App;
