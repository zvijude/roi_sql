'use client'

export default function GlassPalletCard({ glassPallets }) {
  if (!glassPallets.length) return null

  return (
    <div className='space-y-2 p-4'>
      {glassPallets.map((pallet) => (
        <div key={pallet.glass_pallet_id} className='border rounded-lg shadow-sm p-3 bg-white'>
          <p className='text-lg font-medium'>📍 {pallet.loc}</p>

          {pallet.glass_list.length > 0 ? (
            <div className='mt-2 space-y-1'>
              {pallet.glass_list.map((glass) => (
                <div key={glass.glass_id} className='border rounded-md p-2 bg-gray-50'>
                  {glass.qntt && (
                    <p className='text-sm font-medium'>
                      זכוכית #{glass.glass_id}: כמות {glass.qntt}
                    </p>
                  )}
                  {glass.width && <p className='text-xs text-gray-600'>רוחב: {glass.width} מ"מ</p>}
                  {glass.height && <p className='text-xs text-gray-600'>גובה: {glass.height} מ"מ</p>}
                  {glass.note && <p className='text-xs text-gray-500'>{glass.note}</p>}
                  {glass.created_by_name && <p className='text-xs text-gray-400'>{glass.created_by_name}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className='text-sm text-gray-500 mt-2'>אין זכוכיות למשטח זה.</p>
          )}
        </div>
      ))}
    </div>
  )
}
