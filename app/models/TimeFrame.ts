class TimeFrame {
  private firstDay;
  private lastDay;

  constructor(firstDay: Date, lastDay: Date) {
    this.firstDay = firstDay;
    this.lastDay = lastDay;
  }

  public getFirstDay() {
    return this.firstDay;
  }

  public getLastDay() {
    return this.lastDay;
  }

  *[Symbol.iterator]() {
    const currentDay = new Date(this.firstDay);

    while (currentDay < this.lastDay) {
      yield new Date(currentDay);
      currentDay.setDate(currentDay.getDate() + 1);
    }
  }
}

export default TimeFrame;
