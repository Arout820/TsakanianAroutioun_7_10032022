export const dateCorrection = (num) => {
  let options = {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  let dateProvisional = Date.parse(num);

  let dateFinal = new Date(dateProvisional).toLocaleDateString('fr-FR', options);

  return dateFinal.toString().split(',').join(' à').split(':').join('h');
};
