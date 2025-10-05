import type { PropsWithChildren } from 'react';
export default function Card({ children }: PropsWithChildren) {
return (
<div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 p-4">
{children}
</div>
);
}