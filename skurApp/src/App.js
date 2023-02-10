import './App.css';
import CreateAd from './components/CreateAds/createAd'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <>
      <div className="App">
        <h1>Hello world</h1>
      </div>
      <CreateAd />
      </>
    </ChakraProvider>
  );
}

export default App;
