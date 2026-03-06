import { useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceTemplate from "./components/InvoiceTemplate";

function App() {
  const [data, setData] = useState(null);

  return (
    <div style={{padding:"20px"}}>
      <h2>Internet Bill Generator</h2>

      <InvoiceTemplate />

      {data && <InvoicePreview data={data} />}
    </div>
  );
}

export default App;