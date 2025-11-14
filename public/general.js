function timeAgo(dateString) {
    const pastDate = new Date(dateString);
    const now = new Date(); // Current date and time

    const secondsAgo = Math.floor((now - pastDate) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const monthsAgo = Math.floor(daysAgo / 30.44); // Average days per month
    const yearsAgo = Math.floor(daysAgo / 365.25); // Average days per year

    // Determine the most appropriate unit to display
    if (yearsAgo > 0) {
        return `${yearsAgo}y ago`;
    } else if (monthsAgo > 0) {
        return `${monthsAgo}mo ago`;
    } else if (daysAgo > 0) {
        return `${daysAgo}d ago`;
    } else if (hoursAgo > 0) {
        return `${hoursAgo} h ago`;
    } else if (minutesAgo > 0) {
        return `${minutesAgo}min ago`;
    } else {
        return `${secondsAgo}s ago`;
    }
}