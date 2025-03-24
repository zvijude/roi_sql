import Qr from 'react-qr-code'

export default function QrImg({ qrNum, prjId, prjName }) {
  return (
    <div className='mx-auto' style={{ width: '50cm', height: '50cm', breakAfter: 'page' }}>
      <div>
        <div className='text-8xl font-bold flex justify-between mb-12 mx-auto' style={{ width: '30cm' }}>
          <p>{qrNum}#</p>
          <p>{`פרויקט ${prjName}`}</p>
        </div>
        <Qr
          value={`https://www.roicrmapp.com/project/${prjId}/qr/${qrNum}`}
          className='mx-auto'
          style={{ width: '30cm', height: '30cm' }}
        />
      </div>
    </div>
  )
}
