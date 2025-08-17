
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       this is App.js
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { Button, Space, DatePicker, version } from 'antd';

const App = () => (
  <div style={{ padding: '0 24px' }}>
    <h1>antd version: {version}</h1>
    <Space>
      <DatePicker />
      <Button type="primary">Primary Button</Button>
    </Space>

    <p>App</p>
  </div>
);

<p>App</p>

export default App;