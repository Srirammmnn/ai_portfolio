// Realistic Speech Synthesis Engine using native Web Speech API
class SpeechEngine {
  private synth: SpeechSynthesis | null = null;
  public isSpeaking: boolean = false;
  public enabled: boolean = true;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private onStateChangeListeners: ((isSpeaking: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prefer natural sounding English voices
    const preferred = voices.find(
      (v) =>
        (v.name.includes("Natural") ||
          v.name.includes("Google") ||
          v.name.includes("Samantha") ||
          v.name.includes("Daniel") ||
          v.name.includes("David")) &&
        v.lang.startsWith("en")
    );
    this.selectedVoice = preferred || voices.find((v) => v.lang.startsWith("en")) || voices[0] || null;
  }

  public subscribeState(listener: (isSpeaking: boolean) => void) {
    this.onStateChangeListeners.push(listener);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter((l) => l !== listener);
    };
  }

  private notify(isSpeaking: boolean) {
    this.isSpeaking = isSpeaking;
    this.onStateChangeListeners.forEach((fn) => fn(isSpeaking));
  }

  public speak(text: string, onEnd?: () => void) {
    if (!this.enabled || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    // Cancel ongoing speech
    this.synth.cancel();

    // Clean markdown formatting before speaking
    const cleanText = text
      .replace(/[*_#`~[\]]/g, "")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\n+/g, ". ")
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = 1.05; // natural human cadence
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.notify(true);
    };

    utterance.onend = () => {
      this.notify(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.notify(false);
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.notify(false);
    }
  }
}

export const speechEngine = new SpeechEngine();
