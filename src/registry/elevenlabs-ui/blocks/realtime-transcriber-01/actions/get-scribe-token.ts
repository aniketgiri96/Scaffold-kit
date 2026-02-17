"use server"

/**
 * Stub for Scribe transcription token.
 * Replace with a real implementation that fetches a token from your backend
 * (e.g. ElevenLabs Scribe API) so the Speech Input demo can transcribe.
 */
export async function getScribeToken(): Promise<
  { token: string } | { error: string }
> {
  return {
    error:
      "Configure getScribeToken to fetch a Scribe token from your backend.",
  }
}
