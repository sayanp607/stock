import { API_BASE_URL } from '../main';

export async function saveProfileStep(uid, field, value) {
  await fetch(`${API_BASE_URL}/api/profile/step`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, field, value }),
  });
}
