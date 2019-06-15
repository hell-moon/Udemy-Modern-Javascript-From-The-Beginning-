// listen for submit
document.querySelector('#loan-form').addEventListener('submit', (e)=>{
	// hide results
	const UIresults = document.querySelector('#results');
	UIresults.style.display = 'none';
	// show loading gif
	const UIloading = document.querySelector('#loading');
	UIloading.style.display = 'block';
	setTimeout(calculateResults, 2000);
	e.preventDefault();
});

// calculate results function
function calculateResults() {
	const UIloading = document.querySelector('#loading');
	UIloading.style.display = 'none';
	
	//UI variables
	const UIamount = document.querySelector('#amount');
	const UIinterest = document.querySelector('#interest');
	const UIyears = document.querySelector('#years');
	const UImonthyPayment = document.querySelector('#monthly-payment');
	const UItotalPayment = document.querySelector('#total-payment');
	const UItotalInterest = document.querySelector('#total-interest');

	// if(UIamount.value === '' || UIinterest.value === '' || UIyears.value === ''){
	// 	alert('Error with input');
	// }
	const principal = parseFloat(UIamount.value);
	const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
	const calculatedPayments = parseFloat(UIyears.value) * 12;

	// compute montly payments
	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principal * x * calculatedInterest) / (x - 1);

	// check if finite number
	if (isFinite(monthly)) {
		// display results in the fields
		UImonthyPayment.value = monthly.toFixed(2);	//set 2 decimal places
		UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
		UItotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
		const UIresults = document.querySelector('#results');
	UIresults.style.display = 'block';
	} else {
		showError('Please Check Your Numbers');
	}



	// console.log(UIamount.value);
}

// show error function
function showError(error) {
	// create div
	const errorDiv = document.createElement('div');
	// get elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');


	// add class attribute
	errorDiv.className = 'alert alert-danger';
	// create text node and append to div
	errorDiv.appendChild(document.createTextNode(error));

	// insert error above heading
	card.insertBefore(errorDiv, heading);

	// clear error after 3 seconds
	setTimeout(clearError, 3000);
}

// clear error
function clearError(){
	document.querySelector('.alert').remove();
}
