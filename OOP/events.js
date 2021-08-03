// Create an Event class

class Event {
  constructor(name, description, date) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.availableTickets = [];
    // to create new tickets for an event obj & add them to this.availableTickets
    this.addAvailableTickets = function(type, price) {
      this.availableTickets.push(new TicketType(type, price));
    };
    // to get a list of all tickets
    this.allTickets = function() {
      let str = 'All tickets: ';
      let index = 1;
      for (let ticket of this.availableTickets) {
          str +=  `${index}. ${ticket.type} ($${ticket.price}) `;
      }
      return str;
    }
    // to search by a price range
    this.searchTicketPrices = function(minPrice, maxPrice) {
      let eligibleTickets = []
      for (let ticket of this.availableTickets) {
        if (ticket.price > minPrice && ticket.price < maxPrice)
          eligibleTickets.push(ticket)
      }
      if (eligibleTickets.length < 1) {
        return `No tickets available.`
      }
      let str = 'Eligible tickets: ';
      let index = 1;
      for (let ticket of eligibleTickets) {
        str +=  `${index}. ${ticket.type} ($${ticket.price}) `;
    }
    return str;
   }
   // to search by a type of ticket
   this.searchTicketTypes = function(type) {
    let eligibleTicketTypes = []
     for (let ticket of this.availableTickets) {
       if (ticket.type === type) {
          eligibleTicketTypes.push(ticket)
       }
     }
     if (eligibleTicketTypes.length < 1) {
       return `No eligible tickets.`
     }
     let str = 'Eligible tickets: ';
     let index = 1;
     for (let ticket of eligibleTicketTypes) {
      str +=  `${index}. ${ticket.type} ($${ticket.price}) `;
   }
   return str;
  }
}
}
// class for tickets
class TicketType {
  constructor(type, price) {
    this.type = type;
    this.price = price;
  }
}

// random date generator for events
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
// The below statement creates an object

const eventObj1 = new Event(
  'Wintertime',
  'by Charles l. Mee',
  randomDate(new Date(2012, 0, 1), new Date())
);

// Create few more objects with different values

const eventObj2 = new Event('the ripple, the wave that carried me home', 'by Christina Anderson', randomDate(new Date(2012, 0, 1), new Date()));
const eventObj3 = new Event('Swept Away', 'by John Logan', randomDate(new Date(2012, 0, 1), new Date()));

// create an empty array for events

const eventArray = [];

// add them to the array
eventArray.push(eventObj1, eventObj2, eventObj3);

// add some tickets
eventObj2.addAvailableTickets("General Admission", 25)
eventObj2.addAvailableTickets("Floor Seating", 80)
eventObj3.addAvailableTickets("Orchestra", 300)
eventObj3.addAvailableTickets("Mezzanine", 200)
eventObj3.addAvailableTickets("Balcony", 100)

//jQuery method
// $(document).ready(function () {
//   let html = '';
//   $.each(eventArray, function (index, item) {
//     html += `<li>${item.name} - ${item.description} - ${item.date} - ${item.searchTicketTypes('Floor Seating')}</li>`;
//   });
//   // insert final html into #event...
//   $('#event').html(html);
// });

// without jQuery
  let html = '';
  let displayArea = document.querySelector('#event');
  eventArray.forEach(item => {
    html += `<li>${item.name} - ${item.description} - ${item.date} - ${item.searchTicketTypes('Floor Seating')}</li>`;
      displayArea.innerHTML = html;
  }
    )
