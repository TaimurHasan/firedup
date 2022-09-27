import moment from "moment";

export const dateFormat = (eventDate) => {
  const date = new Date(eventDate*1);
  return moment(date).format("MMM Do YYYY, h:mm a");
};

export const calcDaysLeft = (eventDate) => {
  const date = new Date(eventDate * 1);
  const currentDate = new Date(moment().format());

  const timeDiff = Math.abs(date - currentDate);
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); 

  return (daysLeft === 1 ? `${daysLeft} day left` : `${daysLeft} days left`)
}