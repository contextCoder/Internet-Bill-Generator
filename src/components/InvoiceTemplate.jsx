import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./invoice.css";
import logo from "../assets/cloud9-logo.png";

export default function InvoiceTemplate() {

	const invoiceRef = useRef();

const downloadPDF = async () => {

  const canvas = await html2canvas(invoiceRef.current, {
    scale: 3,
    useCORS: true
  });

  const img = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;

  pdf.addImage(img, "PNG", 0, 0, width, height);
  pdf.save("invoice.pdf");
};
	
	function InputFields({ label, placeholder , value, bg = false}) {
		return (
			<div className="row-input">
				<input className={`master-input ${bg ? 'bg' : ''}`} type="text" placeholder={placeholder} value={value} />
			</div>
		)
	}

	return (
		<>
		<div ref={invoiceRef} className="container">
			<div  className="invoice">
				<div className="header">
					<img src={logo} className="logo" />
					<div className="company">
						<h2>Cloud9 Broadband Services</h2>
						<span className="company-address">
							Flat No.10 Wing 'A' Shivpushpa Park Opp Apurva Medical Anandnagar
							suncity Road Pune - 411051 <br/>
							Contact: 9325315202 <br/>
							Email: cloud9broadbandftth@gmail.com <br/>
							Company PAN: Flat No.10 Wing 'A' Shivpushpa Park Opp Apurva<br/>
							Medical Anandnagar Suncity Road Pune - 411051
						</span>
						
					</div>
				</div>

				<div className="invoiceTitle">INVOICE</div>
				<div className="infoGrid">
					<div className="left">
						<div className="row"><span>Customer code</span><span><InputFields label="Customer code" placeholder="Enter customer code" /></span></div>
						<div className="row"><span>Customer name</span><span><InputFields label="Customer name" placeholder="Enter customer name" /></span></div>
						<div className="row"><span>Email ID</span><span><InputFields label="Email ID" placeholder="Enter email ID" /></span></div>
						<div className="row"><span>Mobile no</span><span><InputFields label="Mobile no" placeholder="Enter mobile number" /></span></div>
						<div className="row-address"><span>Address</span><span><textarea  className="master-textArea" label="Address" placeholder="Enter address" /></span></div>
						<div className="row"><span>City</span><span><InputFields label="City"  value="Pune"/></span></div>
						<div className="row"><span>State</span><span><InputFields label="State" value="Maharashtra" /></span></div>
						<div className="row"><span>Zipcode</span><span><InputFields label="Zipcode" value="411051" /></span></div>
					</div>

					<div className="right">
						<div className="row"><span>Bill date</span><span><InputFields label="Bill date" placeholder="Enter bill date" /></span></div>
						<div className="row"><span>Due date</span><span><InputFields label="Due date" placeholder="Enter due date" /></span></div>
						<div className="row"><span>Invoice number</span><span><InputFields label="Invoice number" placeholder="Enter invoice number" /></span></div>
					</div>
				</div>


				<div className="summaryBar">
					<span>Billing Summary</span>
					<span>Past Due : 0.00</span>
					<span>Current Charges : <InputFields label="Current Charges" placeholder="Enter current charges" bg="true" /></span>
					<span>Total Due : <InputFields label="Total Due" placeholder="Enter total due" bg="true" /></span>
				</div>

				<table className="billTable">
					<thead>
						<tr>
							<th>#</th>
							<th>Description</th>
							<th>Time period</th>
							<th>Rate</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td><InputFields label="Description" placeholder="Enter description" /></td>
							<td><InputFields label="Time period" placeholder="Enter time period" /></td>
							<td><InputFields label="Rate" placeholder="Enter rate" /></td>
						</tr>
					</tbody>
				</table>
				<div className="totals">
					<div>Total</div>
					 <InputFields label="Total" placeholder="Enter total" />
					<div className="words">Amount (in words): <span>< InputFields label="Amount in Words" placeholder="Enter amount in words" /></span></div>
				</div>

				<div className="note">
					* Note: This is a system generated invoice. No signature required.
				</div>
			</div>

		</div>
			<button onClick={downloadPDF}>Download PDF</button>
		</>
		
	);
}