const elemRefs = [
	'userName',
	'userGender',
	'userDobDay',
	'userDobMonth',
	'userDobYear',
	'userLove',
	'partnerName',
	'partnerGender',
	'partnerDobDay',
	'partnerDobMonth',
	'partnerDobYear',
	'partnerLove',
	'form',
	'submitBtn',
	'resultDialog',
	'resultDialogCloseBtn',
	'resultLabel',
	'checkAgain',
].reduce((acc, item) => ({ ...acc, [item]: document.getElementById(item) }), {});

const GENDER = ['Male', 'Female'];
const DAYS = new Array(31).fill().map((_, index) => `${index < 9 ? '0' : ''}${index + 1}`);
const MONTHS = new Array(12).fill().map((_, index) => `${index < 9 ? '0' : ''}${index + 1}`);
const START_YEAR = 1940;
const CURRENT_YEAR =  new Date().getFullYear();
const YEARS = [];

for (let year = START_YEAR; year <= CURRENT_YEAR; year++) {
	YEARS.push(year);
}

GENDER.map(gender => {
	const node = document.createElement("option");
	const textnode = document.createTextNode(gender);
	node.appendChild(textnode);
	elemRefs.userGender.appendChild(node.cloneNode(true));
	elemRefs.partnerGender.appendChild(node.cloneNode(true));
});

DAYS.map(day => {
	const node = document.createElement("option");
	const textnode = document.createTextNode(day);
	node.appendChild(textnode);
	elemRefs.userDobDay.appendChild(node.cloneNode(true));
	elemRefs.partnerDobDay.appendChild(node.cloneNode(true));
});

MONTHS.map(month => {
	const node = document.createElement("option");
	const textnode = document.createTextNode(month);
	node.appendChild(textnode);
	elemRefs.userDobMonth.appendChild(node.cloneNode(true));
	elemRefs.partnerDobMonth.appendChild(node.cloneNode(true));
});

YEARS.map(year => {
	const node = document.createElement("option");
	const textnode = document.createTextNode(year);
	node.appendChild(textnode);
	elemRefs.userDobYear.appendChild(node.cloneNode(true));
	elemRefs.partnerDobYear.appendChild(node.cloneNode(true));
});

const toggleDialog = (open = false) => {
	elemRefs.resultDialog.style.display = open ? "flex" : "none";
};

const validate = (fields = []) => {
	let isValid = true;
	fields.map(field => {
		const key = Object.keys(field)[0];
		let errorMessage = ' ';
		if (!field[key]) {
			isValid = isValid ? false : isValid;
			errorMessage = '* This field is required';
		} else if ((key === 'userLove' || key === 'partnerLove') && ((field[key] < 0 || field[key] > 100) || isNaN(field[key]))) {
			isValid = isValid ? false : isValid;
			errorMessage = '* Enter a valid score';
		}
		document.getElementById(`${key}Error`).innerText = errorMessage;
	});
	return isValid;
};

const handleSubmit = (evt) => {
	evt.preventDefault();
	const {
		userName,
		userGender,
		userDobDay,
		userDobMonth,
		userDobYear,
		userLove,
		partnerName,
		partnerGender,
		partnerDobDay,
		partnerDobMonth,
		partnerDobYear,
		partnerLove,
	} = Object.keys(elemRefs).reduce((acc, key) => ({ ...acc, [key]: elemRefs[key].value }), {});

	const isValid = validate([
		{ userName },
		{ userGender },
		{ userDobDay },
		{ userDobMonth },
		{ userDobYear },
		{ userLove },
		{ partnerName },
		{ partnerGender },
		{ partnerDobDay },
		{ partnerDobMonth },
		{ partnerDobYear },
		{ partnerLove }
	]);

	if (isValid) {
		const min = Math.ceil(0);
		const max = Math.floor(100);
		const result = Math.floor(Math.random() * (max - min + 1)) + min;
		elemRefs.resultLabel.innerText = `${result}%`;
		toggleDialog(true);
	}
};

window.addEventListener('click', evt => {
	switch (evt.target) {
		case elemRefs.resultDialog:
		case elemRefs.resultDialogCloseBtn:
			toggleDialog(false);
			break;
		case elemRefs.checkAgain:
			window.location.reload();
			break;
		case elemRefs.submitBtn:
			handleSubmit(evt);
			break;
		default:
			break;
	}
});