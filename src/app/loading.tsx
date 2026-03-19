export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div
          className="w-12 h-12 border-3 border-gray-200 border-t-[var(--bronze-antique)] rounded-full animate-spin mx-auto mb-6"
          style={{ borderWidth: '3px' }}
        />
        <p className="text-lg text-gray-500 font-light italic font-[var(--font-cormorant)]">
          Chargement...
        </p>
      </div>
    </div>
  );
}
