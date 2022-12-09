import './App.css';
import React from 'react'
import Menu from './components/admin/admin_page/Menu';
import { ChakraProvider } from '@chakra-ui/react';


function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Menu />
        {/* hihih */}
      </div>
    </ChakraProvider>

  );
}

export default App;
