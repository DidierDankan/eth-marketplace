import useSwr from 'swr';

const URL =
	'https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false';

const COURSE_PRICE = 15;

const fetcher = async (url) => {
	const res = await fetch(url);
	const json = await res.json();
	console.log(json);
	//this json has a huge obj full of info, but what wer were looking for was the price of eth in usd
	return json.market_data.current_price.eur ?? null;
};

export const useEthPrice = () => {
	//you can pass the first param (URL identifier), as the params of the second param: (url) => { code... }
	const { data, ...rest } = useSwr(URL, fetcher, { refreshInterval: 10000 });
	let perItem = (data && COURSE_PRICE / Number(data))?.toFixed(6) ?? null;

	return { eth: { data, perItem, ...rest } };
};
