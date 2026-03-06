import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./invoice.css";

export default function InvoicePage() {

  const invoiceRef = useRef();

  const [form, setForm] = useState({
    customerCode: "",
    customerName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    billDate: "",
    dueDate: "",
    invoiceNumber: "",
    description: "",
    period: "",
    rate: "",
    amount: ""
  });

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value});
  };

  const isValid = Object.values(form).every(v => v !== "");

  const downloadPDF = async () => {

    const canvas = await html2canvas(invoiceRef.current);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p","mm","a4");

    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData,"PNG",0,0,width,height);

    pdf.save("internet_invoice.pdf");
  };

  return (

    <div className="container">

      <div ref={invoiceRef} className="invoice">

        <h2 className="title">Cloud9 Broadband Services</h2>

        <div className="invoiceGrid">

          <div className="left">

            <div className="row">
              <label>Customer code</label>
              <input name="customerCode" onChange={handleChange}/>
            </div>

            <div className="row">
              <label>Customer name</label>
              <input name="customerName" onChange={handleChange}/>
            </div>

            <div className="row">
              <label>Email ID</label>
              <input name="email" onChange={handleChange}/>
            </div>

            <div className="row">
              <label>Mobile no</label>
              <input name="mobile" onChange={handleChange}/>
            </div>

            <div className="row">
              <label>Address</label>
              <input name="address" onChange={handleChange}/>
            </div>

            <div className="row">
              <label>City</label>
              <input name="city" onChange={handleChange}/>
            </div>

            <div className="row">
              <label>State</label>
              <input name="state" onChange={handleChange}/>
            </div>

            <div className="row">
              <label>Zipcode</label>
              <input name="zipcode" onChange={handleChange}/>
            </div>

          </div>

          <div className="right">

            <div className="row">
              <label>Bill date</label>
              <input name="billDate" onChange={handleChange}/>
            </div>

            <div className="row">
              <label>Due date</label>
              <input name="dueDate" onChange={handleChange}/>
            </div>

            <div className="row">
              <label>Invoice number</label>
              <input name="invoiceNumber" onChange={handleChange}/>
            </div>

          </div>

        </div>

        <h3>Billing Summary</h3>

        <table className="table">

          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Time Period</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>

            <tr>

              <td>1</td>

              <td>
                <input name="description" onChange={handleChange}/>
              </td>

              <td>
                <input name="period" onChange={handleChange}/>
              </td>

              <td>
                <input name="rate" onChange={handleChange}/>
              </td>

              <td>
                <input name="amount" onChange={handleChange}/>
              </td>

            </tr>

          </tbody>

        </table>

      </div>

      <button
        disabled={!isValid}
        onClick={downloadPDF}
        className="downloadBtn"
      >
        Download PDF
      </button>

    </div>
  );
}