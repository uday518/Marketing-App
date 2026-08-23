'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteStaffButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Remove ${name} from your clinic? They will no longer be able to sign in.`)) {
      return;
    }

    setIsDeleting(true);

    const response = await fetch(`/api/staff/${id}`, { method: 'DELETE' });

    setIsDeleting(false);

    if (response.ok) {
      router.refresh();
    } else {
      const data = await response.json().catch(() => ({}));
      window.alert(data.error ?? 'Could not remove this staff member.');
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-lg border border-border-default px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isDeleting ? 'Removing…' : 'Remove'}
    </button>
  );
}