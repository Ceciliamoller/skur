import './App.css';
import CreateAd from './components/CreateTools/createTool'
import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Box alignItems="center">
      <CreateAd />
      </Box>

    </ChakraProvider>
  );
}
export default App;
