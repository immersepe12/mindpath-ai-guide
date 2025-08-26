
export const scrollToForm = () => {
  const formElement = document.getElementById('lead-form');
  if (formElement) {
    formElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};
