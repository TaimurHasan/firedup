import moment from "moment";

export const dateFormat = (eventDate) => {
  const date = moment(new Date(eventDate * 1)).format("MMM Do YYYY, h:mm a");

  return date;
};

export const calcDaysLeft = (eventDate) => {
  const date = new Date(eventDate * 1);
  const currentDate = new Date(moment().format());

  const daysLeft = date.getDate() - currentDate.getDate();

  if(daysLeft === 0) {
    return 'Today'
  }

  return (daysLeft === 1 ? `${daysLeft} day left` : `${daysLeft} days left`)
}