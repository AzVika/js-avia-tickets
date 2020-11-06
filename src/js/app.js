import './plugins';
import '../css/style.css';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import favoritesUI from './views/favorites';

document.addEventListener('DOMContentLoaded', e => {
	const form = formUI.form;

	//Events
	initApp();
	form.addEventListener('submit', e => {
		e.preventDefault();
		onFormSubmit();
	});


	favoritesUI.renderFavorites(favoritesUI.favorites);

	favoritesUI.cardsFavorite.addEventListener('click', e => {
		const target = e.target;
		if(target.classList.contains('delete-favorite')) {
			const cardParent = target.closest('.favorite-item');
			if(cardParent) {
				favoritesUI.deleteFavorite(cardParent.dataset.idd);
			}
		}
	});


	// Handlers
	async function initApp() {
		await locations.init();
		formUI.setAutocompleteData(locations.shortCities);
	}

	async function onFormSubmit() {
		// собрать данные из инпутов
		const origin = locations.getCityCodeByKey(formUI.originValue);
		const destination = locations.getCityCodeByKey(formUI.destinationValue);
		const depart_date = formUI.departDateValue;
		const return_date = formUI.returnDateValue;
		const currency = currencyUI.currencyValue;
		//CODE, CODE, 2020-09, 2020-09

		await locations.fetchTickets({
			origin,
			destination,
			depart_date,
			return_date,
			currency,
		});

		console.log(locations.lastSearch);
		ticketsUI.renderTickets(locations.lastSearch);

		favoritesUI.cardsSection.addEventListener('click', e => {
			const target = e.target;
			if(target.classList.contains('add-favorite')) {
				const cardParent = target.closest('.ticket-card');
				if(cardParent) {
					const cardId = cardParent.dataset.idd;
					const cardCurrency = cardParent.dataset.currency;
					const cardFavorite = locations.lastSearch.filter(item => item.idd === cardId);
					favoritesUI.addFavorite(cardId, cardCurrency, cardFavorite[0]);
				}
			}
			
		});

	}
});

/*
Реализовать функционал добавления билетов в избранные. 
У вас должно быть отдельное хранилище (store) для избранных билетов. 
При клике на кнопку "Add to favorites" объект билета нужно добавлять в хранилище.
В шапке есть дропдаун в котором нужно выводить все избранные билеты.

*/