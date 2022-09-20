const _createFormState = (isDisabled = false, message = '') => ({
	isDisabled,
	message,
});

export const createFormState = (
	{ price, email, confirmationEmail },
	hasAgreedTOS,
	isNewPurchase
) => {
	if (!price || Number(price) <= 0) {
		return _createFormState(true, 'Price is not valid');
	}

	if (isNewPurchase) {
		if (confirmationEmail.length === 0 || email.length === 0) {
			return _createFormState(true);
		} else if (email != confirmationEmail) {
			return _createFormState(true, 'Emails are note matching');
		}
	}

	if (!hasAgreedTOS) {
		return _createFormState(true, 'Need to agree with Terms of Service');
	}

	return _createFormState();
};
