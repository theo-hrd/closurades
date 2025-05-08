/**
 * Scrolls to an element with the given ID with smooth behavior
 */
export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Formats a date string for display
 */
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}