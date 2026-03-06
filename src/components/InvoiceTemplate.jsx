import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./invoice.css";

export default function InvoiceTemplate(){

const invoiceRef = useRef();

const downloadPDF = async () => {

const canvas = await html2canvas(invoiceRef.current);

const img = canvas.toDataURL("image/png");

const pdf = new jsPDF("p","mm","a4");

const width = pdf.internal.pageSize.getWidth();
const height = canvas.height * width / canvas.width;

pdf.addImage(img,"PNG",0,0,width,height);

pdf.save("invoice.pdf");

};

return (

<div className="container">

<div ref={invoiceRef} className="invoice">

{/* HEADER */}

<div className="header">

<img src="" className="logo"/>

<div className="company">

<h2>Cloud9 Broadband Services</h2>

<p>Flat No.10 Wing 'A' Shivpushpa Park Opp Apurva Medical Anandnagar</p>

<p>Suncity Road Pune - 4110 51</p>

<p>Contact: 9325315202</p>

<p>Email: cloud9broadbandftth@gmail.com</p>

<p>Company PAN: Flat No.10 Wing 'A' Shivpushpa Park Opp Apurva</p>

<p>Medical Anandnagar Suncity Road Pune - 4110 51</p>

</div>

</div>

<div className="invoiceTitle">INVOICE</div>

{/* CUSTOMER SECTION */}

<div className="infoGrid">

<div className="left">

<div className="row"><span>Customer code</span><span>todkari_ftth</span></div>

<div className="row"><span>Customer name</span><span>Mr tukaram todkari</span></div>

<div className="row"><span>Email ID</span><span>Tukatodkari@gmail.com</span></div>

<div className="row"><span>Mobile no</span><span>8208442876</span></div>

<div className="row"><span>Address</span><span>
Flat n0. A10 rajanigandha apartments<br/>
near pushpak mangal karyalaya,<br/>
manik baug
</span></div>

<div className="row"><span>City</span><span>Pune</span></div>

<div className="row"><span>State</span><span>Maharashtra</span></div>

<div className="row"><span>Zipcode</span><span>411051</span></div>

</div>

<div className="right">

<div className="row"><span>Bill date</span><span>24 Jan 2026</span></div>

<div className="row"><span>Due date</span><span>24 Jan 2026</span></div>

<div className="row"><span>Invoice number</span><span>17862</span></div>

</div>

</div>

{/* BILLING SUMMARY */}

<div className="summaryBar">

<span>Billing Summary</span>

<span>Past Due : 0.00</span>

<span>Current Charges :600.00</span>

<span>Total Due :600.00</span>

</div>

{/* TABLE */}

<table className="billTable">

<thead>

<tr>

<th>#</th>
<th>Description</th>
<th>Time period</th>
<th>Unit type</th>
<th>Rate</th>
<th>Discount</th>
<th>Absolute cost</th>

</tr>

</thead>

<tbody>

<tr>

<td>1</td>
<td>80 Mbps Unlimited</td>
<td>01 Month (Jan 2026)</td>
<td></td>
<td>600.00</td>
<td>0.00</td>
<td>600.00</td>

</tr>

</tbody>

</table>

{/* TOTAL SECTION */}

<div className="totals">

<div>Sub Total</div>
<div>600.00</div>

<div>Total</div>
<div>₹ 600.00</div>

<div>Grand Total</div>
<div>₹ 600.00</div>

<div className="words">Amount (in words) : Six Hundred Rupees</div>

</div>

<div className="note">

* Note: This is a system generated invoice. No signature required.

</div>

</div>

<button onClick={downloadPDF}>Download PDF</button>

</div>

);

}