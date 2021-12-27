const helper = {
  scrollToTop: () => {
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  splitCommaString: (string, className) => {
    const items = string.split(",");
    return items.map((item, index) => (
      <span
        className={className}
        key={index}
      >{item.trim()}</span>
    ));
  }
}

export default helper;