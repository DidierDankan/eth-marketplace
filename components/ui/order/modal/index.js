import { Modal, Button } from '@components/ui/common';
import { useEthPrice } from '@components/web3/useEthPrice';
import { useEffect, useState } from 'react';
import { createFormState } from '@helpers/modalMsg';

const defaultOrder = {
	price: '',
	email: '',
	confirmationEmail: '',
};

export default function OrderModal({ course, onClose, onSubmit }) {
	const [isOpen, setIsOpen] = useState(false);
	const [order, setOrder] = useState(defaultOrder);
	const [enablePrice, setEnablePrice] = useState(false);
	const [hasAgreedTOS, setHasAgreedTOS] = useState(false);

	const { eth } = useEthPrice();

	useEffect(() => {
		// !! mean if we have data, will be true, if there is nothing selected is null or false
		if (!!course) {
			setIsOpen(true);
			setOrder({
				...defaultOrder,
				price: eth.perItem,
			});
		}
	}, [course]);

	const _onClose = () => {
		onClose();
		setOrder(defaultOrder);
		setIsOpen(false);
		setEnablePrice(false);
		setHasAgreedTOS(false);
	};

	const formState = createFormState(order, hasAgreedTOS);

	return (
		<Modal isOpen={isOpen}>
			<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
				<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div className="sm:flex sm:items-start">
						<div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
							<h3
								className="mb-7 text-lg font-bold leading-6 text-gray-900"
								id="modal-title"
							>
								{course?.title}
							</h3>
							<div className="mt-1 relative rounded-md">
								<div className="mb-1">
									<label className="mb-2 font-bold">Price(eth)</label>
									<div className="text-xs text-gray-700 flex">
										<label className="flex items-center mr-2">
											<input
												type="checkbox"
												className="form-checkbox"
												checked={enablePrice}
												onChange={({ target: { checked } }) => {
													console.log('checked', checked);
													setOrder({
														...order,
														price: checked ? order.price : eth.perItem,
													});
													setEnablePrice(checked);
													console.log(order);
													console.log(enablePrice);
												}}
											/>
										</label>
										<span>
											Adjust Price - only when the price is not correct
										</span>
									</div>
								</div>
								<input
									disabled={!enablePrice}
									value={order.price}
									//this will be the same as (event) => price: event.target.value
									onChange={({ target: { value } }) => {
										setOrder({
											...order,
											price: value,
										});
									}}
									type="text"
									name="price"
									id="price"
									className="disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
								/>
								<p className="text-xs text-gray-700">
									Price will be verified at the time of the order. If the price
									will be lower, order can be declined (+- 2% slipage is
									allowed)
								</p>
							</div>
							<div className="mt-2 relative rounded-md">
								<div className="mb-1">
									<label className="mb-2 font-bold">Email</label>
								</div>
								<input
									onChange={({ target: { value } }) => {
										setOrder({
											...order,
											email: value.trim(),
										});
									}}
									type="email"
									name="email"
									id="email"
									className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
									placeholder="x@y.com"
								/>
								<p className="text-xs text-gray-700 mt-1">
									It&apos;s important to fill a correct email, otherwise the
									order cannot be verified. We are not storing your email
									anywhere
								</p>
							</div>
							<div className="my-2 relative rounded-md">
								<div className="mb-1">
									<label className="mb-2 font-bold">Repeat Email</label>
								</div>
								<input
									onChange={({ target: { value } }) => {
										setOrder({
											...order,
											confirmationEmail: value.trim(),
										});
									}}
									type="email"
									name="confirmationEmail"
									id="confirmationEmail"
									className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
									placeholder="x@y.com"
								/>
							</div>
							<div className="text-xs text-gray-700 flex">
								<label className="flex items-center mr-2">
									<input
										type="checkbox"
										className="form-checkbox"
										checked={hasAgreedTOS}
										onChange={({ target: { checked } }) => {
											setHasAgreedTOS(checked);
										}}
									/>
								</label>
								<span>
									I accept Eincode &apos;terms of service&apos; and I agree that
									my order can be rejected in the case data provided above are
									not correct
								</span>
							</div>
							{formState.message && (
								<div className="p-4 my-3 text-red-800 bg-red-200 rounded-lg text-sm">
									{formState.message}
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
					<Button
						disabled={formState.isDisabled}
						onClick={() => {
							onSubmit(order);
						}}
						variant="purple"
						className="mr-4 "
					>
						Submit
					</Button>
					<Button onClick={() => _onClose()} variant="red">
						Cancel
					</Button>
				</div>
			</div>
		</Modal>
	);
}