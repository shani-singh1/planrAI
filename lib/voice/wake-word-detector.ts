export class WakeWordDetector {
  private static readonly WAKE_WORDS = ['hey assistant', 'hey bolt', 'start listening'];
  private lastPhrase: string = '';

  public detectWakeWord(text: string): boolean {
    this.lastPhrase = text.toLowerCase().trim();
    return WakeWordDetector.WAKE_WORDS.some(word => this.lastPhrase.includes(word));
  }

  public getCommandAfterWakeWord(): string {
    for (const wakeWord of WakeWordDetector.WAKE_WORDS) {
      if (this.lastPhrase.includes(wakeWord)) {
        return this.lastPhrase.substring(this.lastPhrase.indexOf(wakeWord) + wakeWord.length).trim();
      }
    }
    return '';
  }
}

export const wakeWordDetector = new WakeWordDetector();