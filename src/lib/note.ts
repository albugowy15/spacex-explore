export function deleteNote(launchId: string) {
  localStorage.removeItem(`launchId:${launchId}`);
}

export function getNote(launchId: string) {
  return localStorage.getItem(`launchId:${launchId}`);
}

export function saveNote(launchId: string, note: string) {
  deleteNote(launchId);
  localStorage.setItem(`launchId:${launchId}`, note);
}
