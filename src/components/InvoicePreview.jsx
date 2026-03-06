import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

export default function InvoicePreview({data}){

  const invoiceRef = useRef();

  const downloadPDF = async () => {

    const canvas = await html2canvas(invoiceRef.current);

    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p","mm","a4");

    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(img,"PNG",0,0,width,height);

    pdf.save("internet_invoice.pdf");
  };

  return(

    <div>

      <div ref={invoiceRef} style={{padding:"20px",border:"1px solid gray"}}>

        <h2>Cloud9 Broadband Services</h2>

        <p>Customer : {data.customerName}</p>
        <p>Email : {data.email}</p>
        <p>Mobile : {data.mobile}</p>
        <p>Address : {data.address}</p>
        <p>City : {data.city}</p>
        <p>State : {data.state}</p>
        <p>Zip : {data.zip}</p>

        <hr/>

        <h3>Billing Summary</h3>

        <p>Plan : {data.plan}</p>
        <p>Amount : ₹{data.amount}</p>

      </div>

      <button onClick={downloadPDF}>
        Download PDF
      </button>

    </div>
  )
}