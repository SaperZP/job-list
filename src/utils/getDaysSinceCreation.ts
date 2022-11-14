function getDaysSinceCreation(dateOfCreation:string) {
  const dateOfCreationUNIX = new Date(dateOfCreation).getTime();
  const currentDate = new Date().getTime();
  const milSecInDay = 86400000;

  return Math.ceil((currentDate - dateOfCreationUNIX) / milSecInDay);
}

export default getDaysSinceCreation;
