
class FavoritesUI {
	constructor() {
		this.container = document.querySelector('.dropdown-content');
		this.cardsFavorite = document.getElementById('dropdown1');
		this.cardsSection = document.querySelector('.tickets-sections');
		this.favorites = [
			{
			  "origin": "IEV",
			  "destination": "HRK",
			  "price": 111,
			  "transfers": 0,
			  "airline": "PS",
			  "flight_number": 145,
			  "departure_at": "05 Nov 2020 22:15",
			  "return_at": "06 Nov 2020 10:05",
			  "expires_at": "2020-11-05T18:15:00Z",
			  "origin_name": "Киев",
			  "destination_name": "Харьков",
			  "airline_logo": "http://pics.avs.io/200/200/PS.png",
			  "airline_name": "Ukraine International airlines",
			  "idd": "56746549854",
			  "currency": "$",
			},
			{
			  "origin": "IEV",
			  "destination": "HRK",
			  "price": 97,
			  "transfers": 0,
			  "airline": "7W",
			  "flight_number": 141,
			  "departure_at": "06 Nov 2020 12:15",
			  "return_at": "08 Nov 2020 10:05",
			  "expires_at": "2020-11-06T08:15:00Z",
			  "origin_name": "Киев",
			  "destination_name": "Харьков",
			  "airline_logo": "http://pics.avs.io/200/200/7W.png",
			  "airline_name": "Windrose Airlines",
			  "idd": "67546455454",
			  "currency": "€",
			}
		];
	}

	addFavorite (id, currency, ticket) {
		const ticketByIdd = this.favorites.filter(ticket => ticket.idd === id);
		if(!ticketByIdd.length) {
			ticket.currency = currency;
			this.favorites.push(ticket);
			this.renderFavorites(this.favorites);
		}
	}

	deleteFavorite (id) {
		this.favorites = this.favorites.filter(ticket => ticket.idd !== id);
		this.renderFavorites(this.favorites);
	}

	renderFavorites(tickets) {
		this.clearContainer();

		if(!tickets.length) {
			this.showEmptyMsg();
			return;
		}

		let fragment = '';

		tickets.forEach(ticket => {
			const template = FavoritesUI.favoriteTemplate(ticket);
			fragment += template;
		});

		this.container.insertAdjacentHTML('afterbegin', fragment);

	}

	clearContainer() {
		this.container.innerHTML = '';
	}

	showEmptyMsg() {
		const template = FavoritesUI.emptyMsgTemplate();
		this.container.insertAdjacentHTML('afterbegin', template);
	}

	static emptyMsgTemplate() {
		return `
		<div class="tickets-empty-res-msg">
        	У вас нет избранных билетов.
        </div>
		`;
	}

	static favoriteTemplate(ticket) {
		return `
			<div class="favorite-item  d-flex" data-idd=${ticket.idd}>
	        	<img
					src="${ticket.airline_logo}"
					class="favorite-item-airline-img"
	            />
				<div class="favorite-item-info d-flex">
	        		<div class="favorite-item-destination d-flex align-items-center">
	        			<div class="d-flex align-items-center mr-auto">
							<span class="favorite-item-city">${ticket.origin_name}</span>
							<i class="medium material-icons">flight_takeoff</i>
						</div>
						<div class="d-flex align-items-center">
							<i class="medium material-icons">flight_land</i>
							<span class="favorite-item-city">${ticket.destination_name}</span>
						</div>
					</div>
					<div class="ticket-time-price d-flex align-items-center">
						<span class="ticket-time-departure">${ticket.departure_at}</span>
						<span class="ticket-price ml-auto">${ticket.currency}${ticket.price}</span>
					</div>
					<div class="ticket-additional-info">
						<span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
						<span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
					</div>
					<a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
				</div>
			</div>
		`;
	}
}

const favoritesUI = new FavoritesUI();

export default favoritesUI;