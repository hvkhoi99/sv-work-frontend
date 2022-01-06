const helper = {
  scrollToTop: (topPosition) => {
    return window.scrollTo({ top: !topPosition ? 0 : topPosition, behavior: 'smooth' });
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